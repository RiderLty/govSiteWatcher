const sleep = async (s) => {
    return new Promise(resolve => setTimeout(resolve, s * 1000));
}


const listChildren = (root) => {//root为li 且class为levelX X是数字
    const level = Number(root.className.slice(5))
    return root.querySelectorAll(`li.level${level + 1}`)
}

const dfsVisit = async (node) => {

    const span = node.querySelector("span")
    if (span.className.indexOf("docu") === -1 && span.className.indexOf("open") === -1) {
        span.click()
        while (listChildren(node).length === 0) {
            await sleep(0.05)
        }
    }

    const nodeName = (node.querySelector("a > span.node_name")).innerText
    console.log(nodeName)

    const sonList = await Promise.all([...listChildren(node)].map(async son => await dfsVisit(son)));
    return sonList.length === 0 ? nodeName : { [nodeName]: sonList }
}

const dfs = async () => {
    const root = document.querySelectorAll("li.level0")
    for (let elem of root) {
        console.log(JSON.stringify(await dfsVisit(elem), null, "--"))
    }
}
dfs()