
const FS = require("fs")
const Path = require("path")


// 压缩包
const Zlib = require("zlib")
var Unzip = require("unzip");
class FormatFile {
    constructor(filepath, postFix, cb) {
        this.filepath = filepath;
        this.postFix = postFix
        this.cb = cb
        this.timer = null
        // console.log(this.file)
        console.log("开始执行文件解码格式化操作")
        this.ChangePostfix()
        // this.GetMediaImages()
        // this.TarZip("./1.zip", "./1")

    }



    // 1. 拿到文件和文件后缀,   // 2.修改后缀名为zip
    ChangePostfix() {
        // 文件后缀 .docx
        let extName = Path.extname(this.filepath)
        // 文件前缀,xxx
        let basename = Path.basename(this.filepath, extName)
        // 重命名
        console.log("开始重命名")
 
        // 指定重名的路径
        let repath = `${Path.join(__dirname, "..", "public", "tmpzip", "/")}${basename}`
        console.log(repath)
        let destPath =  repath + `.docx`;
        FS.copyFileSync(this.filepath,destPath)
        FS.rename(destPath, repath + `.${this.postFix}`, (err) => {
            if (err) {
                console.log(err.errno == -4058 ? "找不到文件" : "其他错误");
                return
            }
        })
        console.log("2秒后开始解压")
        this.timer = setTimeout(() => {
            this.TarZip(`${basename}`, repath)
        }, 2000)
        return
    }
 
 
    // 3.解压zip
    TarZip(basename, repath) {
        clearTimeout(this.timer)
        FS.mkdir(repath, (err) => {
        })
        // 开始解压文件
        console.log("开始解压文件")
        let rd = FS.createReadStream(`${repath}.${this.postFix}`)
        rd.pipe(Unzip.Extract({ path: repath }))

        // //已打开要读取的文件事件
        // rd.on('open', (fd) => {
        //     console.log('文件已打开:', fd);
        // });
        // 回调回去
        rd.on("close", () => {
            console.log("解压word完成,开始寻找图片")
            this.cb(repath, this.postFix, basename,this)
        })
    }
}



 

module.exports = FormatFile





