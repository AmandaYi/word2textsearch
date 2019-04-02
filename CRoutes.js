const FS = require("fs")
const Path = require("path")
const Router = require("koa-router");
const AppRouter = new Router();

const Words = require("./dao/words")
const Translate = require("./translate/Translate")
const send = require('koa-send');
class CRouter {
    constructor() {
        // 注册全部的路由
        this.InitRoutes();
    }
    InitRoutes() {
        // 测试路由
        AppRouter.get("/test", async (ctx) => {
            ctx.body = {
                errno: 0,
                errmsg: "服务器正常响应!"
            }
        })
        // 注册路由
        // 资源路由
        this.UploadRoutes()

        this.GetFileList()
        this.DownloadFile()
        this.OtherRoutes()

    }
    // 得到全部的已经上传的列表
    GetFileList() {
        AppRouter.get("/words/list", async (ctx) => {
            // console.log(ctx.query)
            await Words.SELECT(ctx.query)
                .then(res => {
                    // console.log(res)
                    ctx.body = {
                        errno: 0,
                        data: res
                    }
                })
        })
    }

    // 上传资源路由
    UploadRoutes() {
        // word上传
        AppRouter.post("/uploadfile", async (ctx) => {
            // 获取上传的文件
            const file = ctx.request.files.word;
            // 创建可读流
            const fileReader = FS.createReadStream(file.path);
            let filePath = Path.join(__dirname, "public", "doclist", `/${file.name}`)
            // 相对路径
            let  relativePath = Path.join("public", "doclist",  `/${file.name}`)
            //创建可写流
            const upStream = FS.createWriteStream(filePath);
            fileReader.pipe(upStream)
            // 这里用来把数据保存起来

            ctx.body = {
                errno: 0
            };
 
            upStream.on("open",()=>{
                console.log("开始写入文件")
            })
            upStream.on("error",()=>{
                console.log("文件写入出错")
            })
            upStream.on("finish",()=>{
                console.log("完成文件写入")
                // 写入完成之后,开始调用转码文件
                new Translate(filePath,"zip",(imagesList)=>{
                    // console.log("准备插入数据表")
                    let filetext = Array.from(imagesList).map((item,index)=>{
                        return item.formatStr
                    }).join("\n")
                    // console.log(filetext)
                    // console.log("1AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA")
                    // return
                    Words.INSERT(file.name, relativePath, filetext)
                })
            })
        });
    }

    // 对所有的图片进行处理
    FormatFile() {
        // 对全部的数据进行处理,每次点击一个
        AppRouter.post("/applyFormatFile", async (ctx) => {

        })
        // 请求完毕之后,把字符串保存一下子
        // 然后就把数据库的已经请求过了数据改为1

    }
    DownloadFile (){
        AppRouter.get ("/public/doclist/:name",async(ctx)=>{
            const name = ctx.params.name;
            const path = Path.join("public","doclist",name)
            ctx.attachment(path);
            await send(ctx, path);
        })
    }

    OtherRoutes() {
        AppRouter.all("/*", async (ctx) => {
            // (KoaStatic(Path.join(__dirname, "public", "doclist"), {
            //     extensions: ["docx"]
            // }))

            ctx.body = {
                errno: 404,
                errmsg: "您访问一个不存在的路径!"
            }
        })
    }
}
new CRouter()

module.exports = AppRouter




 