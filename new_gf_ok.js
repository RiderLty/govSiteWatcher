// ==UserScript==
// @name         网站更新检测
// @namespace    http://tampermonkey.net/
// @version      1.1
// @description  网站更新检测
// @author       You
// @match        https://59.203.54.81:8012/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=54.81
// @require      https://unpkg.com/xlsx/dist/xlsx.full.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


//export tree=================================
const sleep = async s => new Promise(resolve => setTimeout(resolve, s * 1000));

const listChildren = (root) => [...root.querySelectorAll(`li.level${Number(root.className.slice(5)) + 1}`)]

const dfsVisit = async (node) => {
    const span = node.querySelector("span")
    if (span.className.indexOf("docu") === -1 && span.className.indexOf("open") === -1) {
        span.click()
        for (let count = 0; listChildren(node).length === 0 && count <= 10; count++) {
            await sleep(0.1)
        }
    }
    const nodeName = (node.querySelector("a > span.node_name")).innerText
    const uid = node.querySelector("a").title.match(/\d+/g)[0]
    const display = `${nodeName}][ID:${uid}`
    const sonList = await Promise.all(listChildren(node).map(async son => await dfsVisit(son)));
    return sonList.length === 0 ? display : { [display]: sonList }
}

const linePrint = (obj, head) => typeof obj === typeof "str" ?
    [[...head, obj]] :
    Object.keys(obj).flatMap(key => obj[key].flatMap(son => linePrint(son, [...head, key])))

const dfs = async () => {
    const root = document.querySelectorAll("li.level0")
    const elemFrost = await Promise.all([...root].map(elem => dfsVisit(elem)))
    return elemFrost.map(tree => linePrint(tree, [])).flat()
}

//==================================================================================
const waitAndClick = async (path, interval) => {
    return new Promise((resolve, reject) => {
        const intervalId = setInterval(() => {
            const element = document.querySelector(path);
            if (element) {
                element.click();
                console.log("path:", path, "clicked!")
                clearInterval(intervalId);
                resolve();
            }
        }, interval);
    });
};

const readLocalExcel = async (url) => {
    return new Promise((resolve, reject) => {
        GM_xmlhttpRequest({
            method: "GET",
            url: url,
            responseType: "arraybuffer",
            onload: function (response) {
                const data = new Uint8Array(response.response)
                const workbook = XLSX.read(data, { type: 'array' });
                const worksheet = workbook.Sheets[workbook.SheetNames[0]];
                const jsData = XLSX.utils.sheet_to_json(worksheet)
                console.log(`成功读取了${jsData.length}个数据`);
                resolve(jsData)
            },
            onerror: function (err) {
                console.log("读取本地表格失败!", err);
                reject(err)
            }
        });
    })
}

const exportExcel = async (data, name) => {
    const workbook = XLSX.utils.json_to_sheet(data);
    const workbookOutput = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbookOutput, workbook, "Sheet1");
    const excelBuffer = XLSX.write(workbookOutput, {
        bookType: "xlsx",
        type: "array",
    });
    const blob = new Blob([excelBuffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = name;
    link.style.display = "none";
    document.body.appendChild(link);
    link.click();
    URL.revokeObjectURL(url);
    document.body.removeChild(link);
}

const dataPostFetch = async (url, body) => {
    const resp = await fetch(url, {
        headers: {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        referrerPolicy: "strict-origin-when-cross-origin",
        body: body,
        method: "POST",
        mode: "cors",
        credentials: "include"
    })
    const rawData = await resp.json()
    const sortedDate = rawData.data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))//按日期排列，确保最新，因为可能有固定的
    return [sortedDate[0].title, sortedDate[0].publishDate]
}

const getLatestZFB = async (catId) => {//市政府网站
    return await dataPostFetch(
        "https://59.203.54.81:8008/public/content/getPage?isAjax=1&dataType=json",
        `siteId=2653861&organId=152523227&type=DRIVING_PUBLIC&catId=${catId}&key=&startDate=&endDate=&attribute=ATTRIBUTE_OTHER&isPublish=1&pageIndex=0&pageSize=20&sortField=&sortOrder=`
    )
}
const getLatestZWGK = async (catId) => {//财政局政务公开
    return await dataPostFetch(
        "https://59.203.54.81:8008/public/content/getPage?isAjax=1&dataType=json",
        `siteId=2653861&organId=2681665&type=DRIVING_PUBLIC&catId=${catId}&key=&startDate=&endDate=&attribute=ATTRIBUTE_OTHER&isPublish=1&pageIndex=0&pageSize=20&sortField=&sortOrder=`
    )
}

const getLatestNRGL = async (columnId,) => {//财政局门户网站
    return await dataPostFetch(
        `https://59.203.54.81:8012/content/getPage?IsAjax=1&dataType=JSON&_=${Math.random()}`,
        `pageIndex=0&pageSize=10&dataFlag=1&columnId=${columnId}&title=&conditionMap%5BisPublish%5D=1&startTime=&endTime=&isSelf=0&pagesize=10&condition=isPublish&status=1&isReferNews=`
    )
}

const printResult = (info, title, distance, daysRemain) => {
    const infoText = [
        typeof info === typeof "" ? info : `${info["栏目名称"]}\n${info["完整地址"]}\n${info["详细说明"] || ""}`,
        title,
        `距今${distance}天\t剩余${daysRemain}天`,
        "---------------------------------------",
    ].join("\n")
    if (daysRemain <= 0) {
        console.error(infoText)
        return
    }
    if (daysRemain <= 2) {
        console.warn(infoText)
        return
    }
    console.log(infoText)
}

const calcResult = (__result) => {
    const result = __result.filter(val => val)
    const dateMap = {}
    const limitMap = {}
    for (let [item, title, date] of result) {
        if (item === null) {

        }
    }

    for (let [item, title, date] of result) {
        if (item && String(item["更新要求"]).indexOf("@") !== -1) {
            const key = item["更新要求"].split("@")[0]
            limitMap[key] = Number(item["更新要求"].split("@")[1])
            dateMap[key] = dateMap[key] ? (dateMap[key] > new Date(date) ? dateMap[key] : new Date(date)) : new Date(date)
        }
    }
    for (let key of Object.keys(dateMap)) {
        const distance = Number.parseInt((new Date() - dateMap[key]) / 86400000)
        const daysRemain = limitMap[key] - distance
        printResult(key, "标题略", distance, daysRemain)
    }

    //计算一般类型and额外天数要求
    for (let [item, title, date] of result) {
        if (item && typeof item["更新要求"] === typeof 0) {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = item["更新要求"] - distance
            printResult(item, title, distance, daysRemain)
        }
        else if (item && String(item["更新要求"]).indexOf("[") !== -1 && String(item["更新要求"]).indexOf("]") !== -1) {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = Number(String(item["更新要求"]).split("[")[1].split("]")[0]) - distance
            printResult(item, title, distance, daysRemain)
        }
    }

    //
    for (let [item, title, date] of result) {
        if (item && item["更新要求"] === "每月初") {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = 30 - distance
            // console.log(`${item["栏目名称"]}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
            printResult(item, title, distance, daysRemain)
        }
        if (item && item["更新要求"] === "每月底") {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = 30 - distance
            // console.log(`${item["栏目名称"]}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
            printResult(item, title, distance, daysRemain)
        }
    }
}

let lock = false
const mainFunction = async () => {
    const excelList = await readLocalExcel("file:///C:/Users/lty/Documents/GitHub/govSiteWatcher/网站后台更新指南.xlsx")
    const excelPathMap = {}
    excelList.forEach(element => {
        excelPathMap[element["完整地址"]] = element
    });
    console.log(excelPathMap)
    if (lock) {
        console.log("已在运行中")
        return
    }
    lock = true
    const lmList = await dfs()
    const result = []
    const exportDataWhenMiss = []
    let missFlag = false

    await Promise.all(lmList.map(async (lm, index) => {
        const [name, id] = lm[lm.length - 1].split("][ID:")
        const head = lm[0].split("][ID:")[0]
        const path = lm.map(name => name.split("][ID:")[0]).join(" > ")
        const block = {
            "完整地址": path,
            "栏目名称": name,
            "更新要求": null,
            "责任科室": null,
            "详细说明": null,
        }
        try {
            if (excelPathMap[path]) {
                block["更新要求"] = excelPathMap[path]["更新要求"]
                block["责任科室"] = excelPathMap[path]["责任科室"]
                block["详细说明"] = excelPathMap[path]["详细说明"]
                // exportDataWhenMiss.push(block)
                exportDataWhenMiss[index] = block
                if (excelPathMap[path]["更新要求"] === -1) {
                    return
                } else {
                    let fetchResult = null
                    if (head === "滁州市人民政府办公室") {//市政府网站
                        fetchResult = await getLatestZFB(id)
                    } else if (head === "市直部门") {//财政局政务公开
                        fetchResult = await getLatestZWGK(id)
                    } else {//财政局门户网站
                        fetchResult = await getLatestNRGL(id)
                    }
                    console.log(fetchResult)
                    // result.push([excelPathMap[path], ...fetchResult])
                    result[index] = [excelPathMap[path], ...fetchResult]
                }
            } else {
                console.warn("miss! : ", path)
                block["更新要求"] = "NULL"
                block["责任科室"] = "NULL"
                block["详细说明"] = "NULL"
                // exportDataWhenMiss.push(block)
                exportDataWhenMiss[index] = block
                missFlag = true
                return
            }
        } catch (err) {
            console.error(path, "\n", err)
        }
    }))
    // for (let lm of lmList) {

    // }
    if (missFlag) {
        exportExcel(exportDataWhenMiss, "栏目缺失")
    }
    calcResult(result)
    lock = false
}


(async () => {
    const button = document.createElement("button");
    button.textContent = "读取";
    button.style.width = "50px";
    button.style.height = "50px";
    button.style.position = "absolute";
    button.style.bottom = "0";
    button.style.left = "0";
    button.onclick = mainFunction
    button.style.zIndex = 999
    document.body.appendChild(button);
})()