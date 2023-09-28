const dataPostFetch = async (url, body) => {
    try {
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
    } catch (e) {
        console.log(e)
        return [null, null]
    }
}

const getLatestZWGK = async (catId) => {
    return await dataPostFetch(
        "http://59.203.54.81:8002/public/content/getPage?isAjax=1&dataType=json",
        `siteId=2653861&organId=2681665&type=DRIVING_PUBLIC&catId=${catId}&key=&startDate=&endDate=&attribute=ATTRIBUTE_OTHER&isPublish=1&pageIndex=0&pageSize=20&sortField=&sortOrder=`
    )
}

const getLatestNRGL = async (columnId, parentId) => {
    return await dataPostFetch(
        `http://59.203.54.81:8012/content/${columnId ? "getPage" : "getPageByParentId"}?IsAjax=1&dataType=JSON&_=${Math.random()}`,
        `pageIndex=0&pageSize=10&dataFlag=1&columnId=${columnId ? columnId : parentId}&title=&conditionMap%5BisPublish%5D=1&startTime=&endTime=&isSelf=0&pagesize=10&condition=isPublish&status=1&isReferNews=`
    )
}



(async function () {
    for (obj of jsData.slice(2)) {
        [title, date] = await getLatestNRGL(obj[2], obj[3])
        const distance = Number.parseInt((new Date() - new Date(date)) / 86400000)
        const daysRemain = obj[1] - distance
        const infoText = `${obj[0]}\t${obj[1]}\n${title}\n${date}\n距今${distance}天，剩余${daysRemain}天\n========================================`
        if (daysRemain < 0) {
            console.warn(infoText)
        } else {
            console.log(infoText)
        }
    }
    console.log("整完！")
})()


[
    2667882,
    8550430,
    161734542,
    5351999,
    170072079,
    161734757,
    2667871,
    161731869,
    161732075,
    161733536,
    161735039,
    161732374,
    161732916,
    161735369,
    2667885,
    161732545,
    161732601,
    161732614,
    2667905,
    161733802,
    161733868,
    161734163,
    161734264,
    5350442,
    119361791
].forEach(cid => getLatestZWGK(cid).then(console.log))

// getLatestZWGK(8550430).then(console.log)

dataPostFetch(
    "http://59.203.54.81:8002/public/content/getPage?isAjax=1&dataType=json",
    "siteId=2653861&organId=2681665&catId=&type=PUBLIC_ANNUAL_REPORT&key=&startDate=&endDate=&isPublish=1&pageIndex=0&pageSize=20&sortField=&sortOrder="
).then(console.log)








    //获取oa人员
    (async () => {
        const dataGetFetch = async (url) => await fetch(url).then(resp => resp.json())
        const ksList = await dataGetFetch("http://59.203.54.120:8081/system/person/getPersonTree4UnitManager?dataFlag=1&parentId=100028430&_=1695860634845")
        const resultRaw = await Promise.all(ksList.map(async item => [item, await dataGetFetch(`http://59.203.54.120:8081/system/person/getPersonTree4UnitManager?dataFlag=1&parentId=${item.id}&_=${new Date().getTime()}`)]))
        const resultRemap = resultRaw.map(([ks, personList]) => [ks.name, personList.map(person => `${person.name}_${person.id}`)])
        const output = Object.fromEntries(resultRemap)
        console.log(output)
    })()