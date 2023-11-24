// ==UserScript==
// @name         读取本地XLSX文件并转换为二维数组
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  读取本地XLSX文件并将表格中第一个工作簿转换为二维数组，然后打印在控制台
// @author       You
// @match        https://59.203.54.81:8012/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=54.81
// @require      https://unpkg.com/xlsx/dist/xlsx.full.min.js
// @grant        GM_xmlhttpRequest
// ==/UserScript==


const dataPostFetch = async (url, body) => {
    const resp = await fetch(url, {
        "headers": {
            "accept": "application/json, text/javascript, */*; q=0.01",
            "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5",
            "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
            "x-requested-with": "XMLHttpRequest"
        },
        "referrerPolicy": "strict-origin-when-cross-origin",
        "body": body,
        "method": "POST",
        "mode": "cors",
        "credentials": "include"
    })
    const rawData = await resp.json()
    const sortedDate = rawData.data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))//按日期排列，确保最新，因为可能有固定的
    return [sortedDate[0].title, sortedDate[0].publishDate]

    // try {

    // } catch (e) {
    //     console.log(e)
    //     return [null, null]
    // }
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

const getLatestNRGL = async (columnId,) => {//财政局网站
    return await dataPostFetch(
        `https://59.203.54.81:8012/content/getPage?IsAjax=1&dataType=JSON&_=${Math.random()}`,
        `pageIndex=0&pageSize=10&dataFlag=1&columnId=${columnId}&title=&conditionMap%5BisPublish%5D=1&startTime=&endTime=&isSelf=0&pagesize=10&condition=isPublish&status=1&isReferNews=`
    )
}


const process = async (item) => {
    try {
        if (item["栏目类型"] === "财政局网站") {
            return [item, ...await getLatestNRGL(item["唯一ID"])]
        } else if (item["栏目类型"] === "市政府网站") {
            return [item, ...await getLatestZFB(item["唯一ID"])]
        } else if (item["栏目类型"] === "财政局政务公开") {
            return [item, ...await getLatestZWGK(item["唯一ID"])]
        }
        // if (title && date) {
        //     const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
        //     const daysRemain = item["更新要求"] - distance
        //     const infoText = `${item["栏目名称"]}\n${title}\n${date}\n距今${distance}天，剩余${daysRemain}天\n========================================`
        //     if (daysRemain <= 0) {
        //         console.error(infoText)
        //     } else if (daysRemain <= 2) {
        //         console.warn(infoText)
        //     } else {
        //         console.log(infoText)
        //     }
        // }
    } catch (err) {
        return [null, item, err]
    }

}



// console.log()


const printResult = (info, distance, daysRemain) => {
    if (daysRemain <= 0) {
        console.error(infoText)
    } else if (daysRemain <= 2) {
        console.warn(infoText)
    } else {
        console.log(infoText)
    }
}


const calcResult = (result) => {
    const dateMap = {}
    const limitMap = {}
    for (let [item, title, date] of result) {
        if (String(item["更新要求"]).indexOf("@") !== -1) {
            const key = item["更新要求"].split("@")[0]
            limitMap[key] = Number(item["更新要求"].split("@")[1])
            dateMap[key] = dateMap[key] ? (dateMap[key] > new Date(date) ? dateMap[key] : new Date(date)) : new Date(date)
        }
    }
    for (let key of Object.keys(dateMap)) {
        const distance = Number.parseInt((new Date() - dateMap[key]) / 86400000)
        const daysRemain = limitMap[key] - distance
        console.log(`${key}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
    }

    //计算一般类型
    for (let [item, title, date] of result) {
        if (typeof item["更新要求"] === typeof 0) {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = item["更新要求"] - distance
            console.log(`${item["栏目名称"]}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
        }
    }

    //
    for (let [item, title, date] of result) {
        if (item["更新要求"] === "每月初") {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = 30 - distance
            console.log(`${item["栏目名称"]}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
        }
        if (item["更新要求"] === "每月底") {
            const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
            const daysRemain = 30 - distance
            console.log(`${item["栏目名称"]}\n距今${distance}天\t剩余${daysRemain}天\n===================================`)
        }
    }
}



const handelLocal = async (jsData) => {
    const result = []
    for (item of jsData) {
        if (item["更新要求"] !== -1 && item["host"] === window.location.host) {
            result.push(await process(item))
        }
    }
    console.log(result)
    calcResult(result)
}



(function () {
    console.log("running!")

    GM_xmlhttpRequest({
        method: "GET",
        url: "file:///C:/Users/lty/Documents/GitHub/govSiteWatcher/网站后台更新指南.xlsx",
        responseType: "arraybuffer",
        //url: "https://www.baidu.com/",
        onload: function (response) {
            //console.log("load success",response);
            const data = new Uint8Array(response.response)
            //console.log("data",data)
            const workbook = XLSX.read(data, { type: 'array' });
            const worksheet = workbook.Sheets[workbook.SheetNames[0]];
            const jsData = XLSX.utils.sheet_to_json(worksheet)
            console.log(jsData);
            handelLocal(jsData)
        },
        onerror: function (err) {
            console.log("load failed!", error);
        }
    });





})();