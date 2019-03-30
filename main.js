const FS = require("fs")
const Path = require("path")
const Koa = require("koa")
const Views = require('koa-views')
const Router = require("koa-router");
const AppRouter = new Router();
// 对word进行处理
const FormatFile = require("./FormatFile")
// 找到全部的word里的图片
const FindImage = require("./FindImage")
// 请求AI进行图片转码为文字
const Turn2Text = require("./Turn2Text")

const App = new Koa()
const Apiservice = require("./services/Apiservice.js");
require('url-search-params-polyfill');
// 初始化
// InitMain()
// 程序初始化
function InitMain() {
    InitToken()
    // 得到文件中的图片
    new FormatFile("./1.docx", "zip", FormatImage)
}


// 对图片进行操作得到字符串
function FormatImage(dir) {
    // console.log("main = >dir", dir)
    new FindImage(dir, ReqApi)
}
function ReqApi(imagesList) {
    let timer = 0
    let count = 0
    let len = imagesList.length
    // 一次一次的，5s一次， 否则容易封号，不要着急
    // imagesList.forEach((item, index) => {
    // .docode
    // })

    imagesList.forEach(imagesItem => {
        timer = setTimeout(() => {
            if (count >= len) {
                clearTimeout(timer)
                return
            }
            count++;
            new Turn2Text(imagesItem, ResultText)
        }, 5000)

    })


}
function ResultText(resultData) {
    // { resapi:
    //     { log_id: 6554221906336640000,
    //       words_result_num: 10,
    //       words_result:
    //        [ [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object],
    //          [Object] ] },
    //    formatStr: '“你笑什么?”终于,在厨房忙碌的叶欢也被夏天的笑声吸引,皱着眉头冷声问道。“没事,我想到了一个笑话。”夏天连忙摇头说道。叶欢赖得搭理她,反正这个女人一向是神经兮兮的,继续忙着手头的工作。夏天用一手手撑看头,就这样看着叶欢,忽然,她想起 自己还有没有洗漱,头发还是这样乱糟糟的,也没有化妆。夏天想立刻跑到卫生间去洗漱,却又舍不得眼前这一幕,叶欢在厨房做饭的样子让她觉得十分温馨。其实夏天不知道,她这副颓废的样子,反倒别有一种可爱的韵味。夏天心中微微—动,她真的好渴望,每天都能看到这一幕,这样,两人就好像一对真正的夫妻。贴心的丈夫在厨房忙碌,可爱的馋嘴小妻子就在顶点小说厅静静地等待着丈夫的成果,这一幕,当真是 夏天幻想的美好未',
    //    imageItem:
    //     { path: 'C:\\Users\\node\\Desktop\\word2textsearch\\1\\word\\media\\image1.png',
    //       filename: 'image1.png' } }
    console.log(resultData)
}
// 数据库操作类
// 怎么保存，一个word算一条数据，插入到数据库里面


// -----------------------------------------------
// 前端浏览器界面处理地方

AppRouter.get("/", async(ctx) => {
    // ctx.body =1

    await ctx.render('index', { message: "首页" })
})

// ------------------------------------------------
App
    .use(async (ctx, next) => {
        // 继续向下匹配路由
        await next();
    })
    .use(Views(Path.join(__dirname, "views"), { map :{html: "ejs" }}))
    .use(AppRouter.routes())

    .listen(5000, () => {
        console.log("server is at port 5000 ")
    })


function InitToken() {
    Apiservice.GetToken()
        .then(res => {
            if (res.status == 200) {
                // console.log("获取AI Token成功");
            }
            let data = `module.exports=${JSON.stringify(res.data)}`
            //    console.log(data)
            CreateFile(data)
        })
}


function CreateFile(data) {
    FS.writeFile("./inc.js", data, {}, () => {
        console.log("配置信息初始化成功！")
    })
}




