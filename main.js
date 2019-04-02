const FS = require("fs")
const Path = require("path")
const KoaStatic = require("koa-static")
require("url-search-params-polyfill")
const Koa = require("koa")
// 跨域
const Cors = require("@koa/cors")
// 文件上传
const KoaBody = require("koa-body");
const KoaBodyOptions = {
    multipart: true,
    formidable: {
        uploadDir: Path.join(__dirname, "public", "upload"), // 设置文件上传目录
        keepExtensions: true,    // 保持文件的后缀
        onFileBegin: (name, file) => { // 文件上传前的设置
            // console.log(`name: ${name}`);
            // console.log(file);
        },
    }
    // encoding:'gzip', 
    // patchNode :true,
    // uploadDir :Path.join(__dirname,"upload")
}
const Views = require('koa-views')
// 路由处理
const AppRouter = require("./CRoutes")
// // 对word进行处理
// const FormatFile = require("./translate/FormatFile")
// // 找到全部的word里的图片
// const FindImage = require("./translate/FindImage")
// // 请求AI进行图片转码为文字
// const Turn2Text = require("./Turn2Text")

const App = new Koa()
const Apiservice = require("./services/Apiservice.js");
const Conn = require("./models/conn")
// 前端静态资源代理

// 配置静态web服务的中间件
// KoaStatic.sta
// console.log(Path.join(__dirname, "public", "doclist"))


const Static = require('koa-static-router');

App

    .use(KoaBody(KoaBodyOptions))
    .use(Cors())
    .use(KoaStatic(__dirname + "/views/"))
    .use(AppRouter.routes())

    .use(AppRouter.allowedMethods())
    // .use(Views(Path.join(__dirname, "views"), { map :{html: "ejs" }}))
    .use(Static([
        {
            dir: 'public/doclist',    //静态资源目录对于相对入口文件index.js的路径
            router: '/public/doclist/'   //路由命名   路由长度 =2
        },
    ]))

    .listen(5000, () => {
        console.log("server is at port 5000 ")
    })

// InitToken()
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


















// const mysql = require("mysql")
// const connection = mysql.createConnection({
//     host: "localhost",
//     user: "root",
//     password: '123456',
//     port: 3306
// })
// let count = 0 

// connection.connect((err)=>{
//     if(err){
//         if(count >= 10 ) {
//             return false
//         }
//         count ++ 
//         console.log(err)
//         console.log("重试中!");
//         // setTimeout(funcConn,1000)
//         return
//     }
//     console.log("连接成功!");
// });

// //  mysql测试
// const MysqlCore =  require("./models/mysql.js")



// const {connection,funcConn} = MysqlCore;

// funcConn()
// var userAddSql = "INSERT INTO user(id,name,sex,age) VALUES(?,?,?,?)";
// var userAddSql_params = [2,"小明","女",20]
// var showuser = "SELECT * FROM user"
// var deleteusesql = "DELETE FROM user WHERE name='小明'"
// connection.query(userAddSql,userAddSql_params,function(err,result){
//     if(err) return 
//     console.log("show result ->" ,result)
//     console.log("show result ->", result.affectedRows);
// })
// connection.end()