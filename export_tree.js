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
    const uid = node.querySelector("a").title
    const display = nodeName + "\t" + uid
    const sonList = await Promise.all([...listChildren(node)].map(async son => await dfsVisit(son)));
    return sonList.length === 0 ? display : { [display]: sonList }
}


const linePrint = (obj, head) => {
    if (typeof obj === typeof "str") {
        const path = [...head, obj]
        // console.log( path.join(" > ")  )
        console.log(  obj )


    } else {
        for (let key in obj) {
            // console.log("#".repeat(head.length+1), key)
            for (let son of obj[key]) {
                linePrint(son, [...head, key])
            }
        }
    }
}

const dfs = async () => {
    const root = document.querySelectorAll("li.level0")
    for (let elem of root) {
        const res = await dfsVisit(elem)
        linePrint(res, [])
        // console.log(JSON.stringify(res, null, "--"))
    }
}
dfs()