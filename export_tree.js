const sleep = async (s) => new Promise(resolve => setTimeout(resolve, s * 1000));

const listChildren = (root) => {//root为li 且class为levelX X是数字
    const level = Number(root.className.slice(5))
    return root.querySelectorAll(`li.level${level + 1}`)
}

const dfsVisit = async (node) => {
    const span = node.querySelector("span")
    
    if (span.className.indexOf("docu") === -1 && span.className.indexOf("open") === -1) {
        span.click()
        let count = 0
        while (listChildren(node).length === 0 && count <= 10) {//三秒超时 空栏目
            await sleep(0.3)
            count += 1
        }
    }
    
    const nodeName = (node.querySelector("a > span.node_name")).innerText
    const uid = node.querySelector("a").title.match(/\d+/g)[0]
    const display = `${nodeName}][ID:${uid}`
    const sonList = await Promise.all([...listChildren(node)].map(async son => await dfsVisit(son)));
    return sonList.length === 0 ? display : { [display]: sonList }
}

const linePrint = (obj, head) => {
    if (typeof obj === typeof "str") {
        return [[...head, obj]]
    } else {
        return Object.keys(obj).flatMap(key => obj[key].flatMap(son => linePrint(son, [...head, key])));
    }
}

const dfs = async () => {
    const root = document.querySelectorAll("li.level0")
    const elemFrost = await Promise.all([...root].map(elem => dfsVisit(elem)))
    const listVer = elemFrost.map(tree => linePrint(tree, [])).flat()
    return listVer
}

console.log(dfs())