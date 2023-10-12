    //获取oa人员
    (async () => {
        const dataGetFetch = async (url) => await fetch(url).then(resp => resp.json())
        const ksList = await dataGetFetch("http://59.203.54.120:8081/system/person/getPersonTree4UnitManager?dataFlag=1&parentId=100028430&_=1695860634845")
        const resultRaw = await Promise.all(ksList.map(async item => [item, await dataGetFetch(`http://59.203.54.120:8081/system/person/getPersonTree4UnitManager?dataFlag=1&parentId=${item.id}&_=${new Date().getTime()}`)]))
        const resultRemap = resultRaw.map(([ks, personList]) => [ks.name, personList.map(person => `${person.name}_${person.id}`)])
        const output = Object.fromEntries(resultRemap)
        console.log(output)
    })()