const getLatest = async (columnId, parentId) => {
    try {
        const resp = await fetch(`http://59.203.54.81:8012/content/${columnId ? "getPage" : "getPageByParentId"}?IsAjax=1&dataType=JSON&_=${Math.random()}`, {
            "headers": {
                "accept": "application/json, text/javascript, */*; q=0.01",
                "accept-language": "zh-CN,zh;q=0.9,en;q=0.8,en-GB;q=0.7,en-US;q=0.6,zh-TW;q=0.5",
                "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
                "x-requested-with": "XMLHttpRequest"
            },
            "referrerPolicy": "strict-origin-when-cross-origin",
            "body": `pageIndex=0&pageSize=10&dataFlag=1&columnId=${columnId ? columnId : parentId}&title=&conditionMap%5BisPublish%5D=1&startTime=&endTime=&isSelf=0&pagesize=10&condition=isPublish&status=1&isReferNews=`,
            "method": "POST",
            "mode": "cors",
            "credentials": "include"
        })
        const rawData = await resp.json()
        const sortedDate = rawData.data.sort((a, b) => new Date(b.publishDate) - new Date(a.publishDate))//按日期排列，确保最新，因为可能有固定的
        return [sortedDate[0].title, sortedDate[0].publishDate]
    } catch (e) {
        console.log(e)
        return [null,null]
    }
}


const jsData = [
    [
        "栏目名称",
        "访问url",
        "xpath",
        "日期格式化",
        "更新间隔",
        "责任科室",
        "备注",
        "列id",
        "父id"
    ],
    [
        "图片新闻",
        "https://czj.chuzhou.gov.cn/",
        "pass",
        null,
        null,
        null,
        null,
        null,
        null
    ],
    [
        "工作动态",
        "https://czj.chuzhou.gov.cn/czdt/czdt/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        14,
        null,
        null,
        5443728,
        null
    ],
    [
        "县市区动态",
        "https://czj.chuzhou.gov.cn/czdt/xqdt/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        14,
        "办公室徐安然",
        null,
        5443742,
        null
    ],
    [
        "涉企政策",
        "https://czj.chuzhou.gov.cn/czdt/sqzc/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        180,
        null,
        null,
        5443754,
        null
    ],
    [
        "通知公告",
        "https://czj.chuzhou.gov.cn/czdt/tzgg/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        180,
        null,
        null,
        5443806,
        null
    ],
    [
        "公共信用",
        "https://czj.chuzhou.gov.cn/ztzl/ggxy/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        30,
        null,
        " 每月初更新，自己发，”公共信用信息目录基础数据报送情况“",
        51557591,
        null
    ],
    [
        "财经新闻",
        "https://czj.chuzhou.gov.cn/czdt/cjxw/index.html",
        "//*[@id='ls_navjz']/ul/li[1]/span/text()",
        "%Y-%m-%d",
        14,
        null,
        "http://czt.ah.gov.cn/czdt/czyw/index.html",
        5444251,
        null
    ],
    [
        "财政收支分析",
        "https://czj.chuzhou.gov.cn/czdt/czszfx/index.html",
        "//*[@id='ls_navjz']/ul/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "预算科邸琦琪",
        "不用催，每月底，需要复制到政务公开/人民政府/财政收支情况和政务公开/市财政局决策部署落实情况",
        11673033,
        null
    ],
    [
        "政府预决算公开",
        "https://czj.chuzhou.gov.cn/czdt/zfyjsgk/index.html",
        "//*[@id='ls_navjz']/ul/li[3]/span/text()",
        "%Y-%m-%d",
        180,
        "办公室（本局）、预算科（市级）",
        "每年二月、九月",
        15649889,
        null
    ],
    [
        "机关党建工作",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[1]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "机关党委",
        null,
        null,
        35842110
    ],
    [
        "八五普法",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[2]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "税政科",
        null,
        37011249,
        null
    ],
    [
        "依法行政",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[3]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "税政科",
        null,
        37011277,
        null
    ],
    [
        "文明创建",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[4]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "机关党委",
        null,
        null,
        54978783
    ],
    [
        "扫黑除恶进行时",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[5]/li[3]/span/text()",
        "%Y-%m-%d",
        30,
        null,
        "http://www.chinapeace.gov.cn/chinapeace/c100007/list2020.shtml",
        81815035,
        null
    ],
    [
        "减税降费",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[6]/li[4]/span/text()",
        "%Y-%m-%d",
        30,
        "税政科",
        null,
        122293640,
        null
    ],
    [
        "政府采购（政府购买服务）专栏",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[7]/li[2]/span/text()",
        "%Y-%m-%d",
        180,
        null,
        null,
        null,
        160685364
    ],
    [
        "滁州会计网",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[8]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        "会计科陈伟",
        null,
        null,
        160685383
    ],
    [
        "国有资产-通知公告",
        "https://czj.chuzhou.gov.cn/ztzl/sjgyzcgl/tzgg/index.html",
        "/html/body/div[1]/div[2]/div[2]/div[2]/ul/li[1]/span/text()",
        "[%Y-%m-%d]",
        180,
        null,
        null,
        160685391,
        null
    ],
    [
        "国有资产-工作动态",
        "https://czj.chuzhou.gov.cn/ztzl/sjgyzcgl/gzdt/index.html",
        "/html/body/div[1]/div[2]/div[2]/div[2]/ul/li[1]/span/text()",
        "[%Y-%m-%d]",
        14,
        null,
        null,
        160685392,
        null
    ],
    [
        "国有资产-政策法规",
        "https://czj.chuzhou.gov.cn/ztzl/sjgyzcgl/zcfg/index.html",
        "/html/body/div[1]/div[2]/div[2]/div[2]/ul/li[1]/span/text()",
        "[%Y-%m-%d]",
        180,
        null,
        null,
        160685395,
        null
    ],
    [
        "国有资产-下载中心",
        "https://czj.chuzhou.gov.cn/ztzl/sjgyzcgl/xzzx/index.html",
        "/html/body/div[1]/div[2]/div[2]/div[2]/ul/li[1]/span/text()",
        "[%Y-%m-%d]",
        180,
        null,
        null,
        160685396,
        null
    ],
    [
        "反腐倡廉",
        "https://czj.chuzhou.gov.cn/ztzl/index.html",
        "//*[@id=\"ls_navjz\"]/ul[10]/li[2]/span/text()",
        "%Y-%m-%d",
        30,
        null,
        null,
        5444262,
        null
    ]
]




for (obj of jsData.slice(2)) {
    [title, date] = await getLatest(obj[7], obj[8])
    console.log(title, date , Number.parseInt(obj[4] - (new Date() - new Date(date))/345600000)+"天"  )
    //剩余天数 - （当前日期 - 最新的更新的日期）
}