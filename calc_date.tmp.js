


(() => {
    //计算合并类型
    const result = [
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 工作动态",
                "栏目名称": "工作动态",
                "唯一ID": 5443728,
                "栏目类型": "财政局网站",
                "更新要求": 14,
                "责任科室": "各科室",
                "详细说明": "基本不用管，科室更新的还蛮频繁的"
            },
            "上海市杨浦区财政局一行来我局考察交流",
            "2023-11-23 10:33:38"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 县市区动态",
                "栏目名称": "县市区动态",
                "唯一ID": 5443742,
                "栏目类型": "财政局网站",
                "更新要求": 14,
                "责任科室": "办公室",
                "详细说明": "县市区自己会上传，办公室选择发布，联系徐安然"
            },
            "落实农机购置补贴政策 推进农业生产机械化",
            "2023-11-14 12:25:56"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 涉企政策",
                "栏目名称": "涉企政策",
                "唯一ID": 5443754,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "管理员",
                "详细说明": "参考以往内容，从上级网站找"
            },
            "关于延续实施支持农村金融发展企业所得税政策的公告",
            "2023-10-07 09:05:04"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 通知公告",
                "栏目名称": "通知公告",
                "唯一ID": 5443806,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "各科室",
                "详细说明": "基本不用管"
            },
            "滁州市财政局（市政府国有资产监督管理委员会）2023年度公开遴选公务员拟遴选人选公示",
            "2023-11-22 20:21:51"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 公共信用",
                "栏目名称": "公共信用",
                "唯一ID": 51557591,
                "栏目类型": "财政局网站",
                "更新要求": "每月初",
                "责任科室": "管理员",
                "详细说明": "与采购和监督局确认后，每月初发情况说明，即便产生事项，也会早早就能知道的"
            },
            "滁州市财政局关于2023年10月份市级公共信用信息目录基础数据报送情况的说明",
            "2023-11-07 11:29:42"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 财经新闻",
                "栏目名称": "财经新闻",
                "唯一ID": 5444251,
                "栏目类型": "财政局网站",
                "更新要求": 14,
                "责任科室": "管理员",
                "详细说明": "https://czt.ah.gov.cn/czdt/czyw/index.html\r\nhttp://www.mof.gov.cn/zhengwuxinxi/caizhengxinwen"
            },
            "强化财政服务保障 推进文化强省建设",
            "2023-11-21 15:36:30"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 财政收支分析",
                "栏目名称": "财政收支分析",
                "唯一ID": 11673033,
                "栏目类型": "财政局网站",
                "更新要求": "每月底",
                "责任科室": "预算科",
                "详细说明": "引用到【市直部门 > 滁州市财政局（市政府国有资产监督管理委员会） > 主动公开 > 决策部署落实情况】 和 【滁州市人民政府办公室 > 主动公开 > 财政资金 > 财政收支情况】"
            },
            "2023年1-10月财政收支运行情况",
            "2023-11-07 11:08:20"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 政府预决算公开",
                "栏目名称": "政府预决算公开",
                "唯一ID": 15649889,
                "栏目类型": "财政局网站",
                "更新要求": "每年2月、9月",
                "责任科室": "办公室、预算科",
                "详细说明": "引用到【滁州市人民政府办公室 > 主动公开 > 财政资金 > 年度财政预决算及“三公”经费情况 > 政府年度财政预决算及“三公”经费】"
            },
            "滁州市2022年决算债务公开",
            "2023-10-25 16:18:57"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "信息发布 > 时政要闻",
                "栏目名称": "时政要闻",
                "唯一ID": 160686322,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "详细说明": "貌似工程师在操作更新"
            },
            "习近平出席亚太经合组织第三十次领导人非正式会议并发表重要讲话",
            "2023-11-18 11:11:15"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 党章党规收录",
                "栏目名称": "党章党规收录",
                "唯一ID": 35842245,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "中国共产党处分违纪党员批准权限和程序规定",
            "2023-08-17 09:53:53"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > “两学一做”学习教育常态化制度化",
                "栏目名称": "“两学一做”学习教育常态化制度化",
                "唯一ID": 35842355,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "抬高站位主动作为     围绕中心精准发力\n强力推进“六亮”行动走深走实",
            "2022-07-14 17:20:41"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 机关党建质量提升",
                "栏目名称": "机关党建质量提升",
                "唯一ID": 35842434,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）组织主题教育专题党课辅导",
            "2023-10-30 16:18:54"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 党组理论学习中心组学习",
                "栏目名称": "党组理论学习中心组学习",
                "唯一ID": 35842464,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局党委理论学习中心组开展第五次集体学习",
            "2023-05-30 17:27:52"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 意识形态工作",
                "栏目名称": "意识形态工作",
                "唯一ID": 35842490,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）开展“三微”宣讲活动",
            "2023-09-05 16:24:23"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 网上党支部",
                "栏目名称": "网上党支部",
                "唯一ID": 35842531,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "滁州市财政局（国资委）组织“迎八一 · 双拥情”国防教育主题党日活动",
            "2023-07-26 10:36:19"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 机关群团工作",
                "栏目名称": "机关群团工作",
                "唯一ID": 35842558,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局开展“关爱女性健康，减压赋能”心理健康讲座",
            "2023-05-04 16:13:11"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 文明创建、双拥工作",
                "栏目名称": "文明创建、双拥工作",
                "唯一ID": 35842663,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）开展“传承红色基因  筑牢信仰之基”主题党日活动",
            "2023-10-30 16:23:22"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 非公（行业）党建工作",
                "栏目名称": "非公（行业）党建工作",
                "唯一ID": 35842739,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）调研指导非公党建工作",
            "2023-09-18 09:25:15"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 党务公开",
                "栏目名称": "党务公开",
                "唯一ID": 35842864,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）机关党委听取2023年上半年党建工作汇报",
            "2023-07-14 16:43:44"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 机关党建工作 > 机关纪检监察工作",
                "栏目名称": "机关纪检监察工作",
                "唯一ID": 51201423,
                "栏目类型": "财政局网站",
                "更新要求": "机关党建工作@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）举办党风廉政教育讲座",
            "2023-10-13 10:41:19"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 八五普法",
                "栏目名称": "八五普法",
                "唯一ID": 37011249,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "税政科",
                "详细说明": "http://legalinfo.moj.gov.cn/pub/sfbzhfx/zhfxfzzx/fzzxyw/"
            },
            "国家知识产权局：进一步加快建设知识产权强国",
            "2023-11-22 09:02:52"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 依法行政",
                "栏目名称": "依法行政",
                "唯一ID": 37011277,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "税政科",
                "详细说明": "http://www.legaldaily.com.cn/"
            },
            "最高法加强和规范综合治理类司法建议工作\n突出确有必要原则 促进更高水平社会治理",
            "2023-11-22 09:04:31"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 文明创建 > 行业诚信文化宣传",
                "栏目名称": "行业诚信文化宣传",
                "唯一ID": 74317572,
                "栏目类型": "财政局网站",
                "更新要求": "文明创建@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "滁州市注册会计师资产评估行业党委组织开展“七一”主题党日活动",
            "2023-07-04 15:23:51"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 文明创建 > 文明创建",
                "栏目名称": "文明创建",
                "唯一ID": 74317605,
                "栏目类型": "财政局网站",
                "更新要求": "文明创建@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "市财政局（国资委）开展“传承红色基因  筑牢信仰之基”主题党日活动",
            "2023-10-30 16:23:22"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 文明创建 > 网络公益宣传",
                "栏目名称": "网络公益宣传",
                "唯一ID": 160685508,
                "栏目类型": "财政局网站",
                "更新要求": "文明创建@30",
                "责任科室": "机关党委",
                "详细说明": "联系机关党委更新"
            },
            "10月起，这些新规将施行",
            "2023-10-30 14:46:23"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 扫黑除恶进行时",
                "栏目名称": "扫黑除恶进行时",
                "唯一ID": 81815035,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "管理员"
            },
            "公安部督办非法机顶盒大案告破：涉案2亿元！",
            "2023-11-13 08:38:55"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 减税降费",
                "栏目名称": "减税降费",
                "唯一ID": 122293640,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "税政科"
            },
            "关于延续实施文化体制改革中经营性文化事业单位转制为企业有关税收政策的公告",
            "2023-11-14 14:50:56"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 >  政府采购（政府购买服务）专栏 > 政府采购政策法规",
                "栏目名称": "政府采购政策法规",
                "唯一ID": 160685365,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "采购科"
            },
            "政府采购品目分类目录",
            "2023-11-01 17:12:31"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 >  政府采购（政府购买服务）专栏 > 政府购买服务政策法规",
                "栏目名称": "政府购买服务政策法规",
                "唯一ID": 160685366,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "采购科"
            },
            "一本关于政府购买服务改革政策案例的电子书",
            "2023-11-21 11:00:45"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 >  政府采购（政府购买服务）专栏 > 行政处罚",
                "栏目名称": "行政处罚",
                "唯一ID": 160685367,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "采购科"
            },
            "滁州市财政局2023年行政处罚情况",
            "2023-06-05 16:11:32"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 >  政府采购（政府购买服务）专栏 > “徽采云”系统咨询",
                "栏目名称": "“徽采云”系统咨询",
                "唯一ID": 160686387,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "采购科"
            },
            "省财政厅编制“一本通”指导采购人使用“徽采云”",
            "2023-04-26 15:06:43"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 滁州会计网 > 通知公告",
                "栏目名称": "通知公告",
                "唯一ID": 160685384,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "会计科"
            },
            "关于我市2023年度会计专业技术中级资格考试成绩查询等有关事项的通知",
            "2023-10-31 08:48:01"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 滁州会计网 > 法规制度",
                "栏目名称": "法规制度",
                "唯一ID": 160685386,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "会计科"
            },
            "关于印发《政府债券登记托管结算管理办法》的通知",
            "2023-08-07 15:11:26"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 滁州会计网 > 问题解答",
                "栏目名称": "问题解答",
                "唯一ID": 160685388,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "会计科"
            },
            "2023年度会计中级资格考试安徽考区报名常见问题解答",
            "2023-06-08 15:05:19"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 滁州会计网 > 下载专区",
                "栏目名称": "下载专区",
                "唯一ID": 160685389,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "会计科"
            },
            "2023年正高级和高级会计师专业技术资格评审附件",
            "2023-08-04 08:52:25"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 通知公告",
                "栏目名称": "通知公告",
                "唯一ID": 160685391,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "滁州市财政局（国资委）关于公布第一批全市国有企业“白名单”及假冒国企行为举报方式的公告",
            "2023-09-28 16:31:30"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 工作动态",
                "栏目名称": "工作动态",
                "唯一ID": 160685392,
                "栏目类型": "财政局网站",
                "更新要求": 14,
                "责任科室": "资产科"
            },
            "关于滁州市盘活闲置国有资产的调研报告",
            "2023-11-09 10:26:06"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 办事指南",
                "栏目名称": "办事指南",
                "唯一ID": 160685393,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "安徽省财政厅关于下放“资产评估机构和分支机构备案及违反资产评估法有关行为的处罚”行政权力事项的通知",
            "2023-06-12 14:53:59"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 资产评估机构备案",
                "栏目名称": "资产评估机构备案",
                "唯一ID": 160686379,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "滁州市财政局关于安徽中信房地产土地资产价格评估有限公司滁州分公司备案的公告",
            "2023-11-16 10:00:29"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 他山之石",
                "栏目名称": "他山之石",
                "唯一ID": 160685394,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "安徽省省属企业合规管理办法（解读）",
            "2023-11-09 16:11:24"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 政策法规",
                "栏目名称": "政策法规",
                "唯一ID": 160685395,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "滁州市国资委国资监管责任约谈工作规则（试行）政策解读",
            "2023-06-07 10:29:47"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 市级国有资产管理 > 下载中心",
                "栏目名称": "下载中心",
                "唯一ID": 160685396,
                "栏目类型": "财政局网站",
                "更新要求": 180,
                "责任科室": "资产科"
            },
            "安徽省财政厅关于下放“资产评估机构和分支机构备案及违反资产评估法有关行为的处罚”行政权力事项的通知",
            "2023-06-07 16:35:45"
        ],
        [
            {
                "host": "59.203.54.81:8012",
                "完整地址": "专题专栏 > 反腐倡廉",
                "栏目名称": "反腐倡廉",
                "唯一ID": 5444262,
                "栏目类型": "财政局网站",
                "更新要求": 30,
                "责任科室": "机关党委"
            },
            "甘肃切实保障特约监察员履职 搭建平台主动问计",
            "2023-11-13 08:48:45"
        ]
    ]

    //计算合并类型
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




})()