
const FS = require("fs")
const Path = require("path")


// 压缩包
const Zlib = require("zlib")
var Unzip = require("unzip");
class FormatFile {
    constructor(file, postFix, cb) {
        this.file = file;
        this.postFix = postFix
        this.cb = cb
        // console.log(this.file)
        // this.ChangePostfix()
        // this.GetMediaImages()
        this.TarZip("./1.zip", "./1")
       
    }



    // 1. 拿到文件和文件后缀,   // 2.修改后缀名为zip
    ChangePostfix() {
        let extName = Path.extname(this.file)
        let basename = Path.basename(this.file, extName)

        FS.rename(this.file, `${basename}.${this.postFix}`, (err) => {
            if (err) {
                console.log(err.errno == -4058 ? "找不到文件" : "其他错误");
                return
            };
            console.log('Rename complete!');
            // 解压
            this.TarZip(`${basename}.${this.postFix}`, `./${basename}`)

        });

    }
    // 3.解压zip
    TarZip(file, dir) {
        // console.log(file)
        // console.log(dir)
        FS.createReadStream(file)
            .pipe(Unzip.Extract({ path: dir }))

        // .pipe();
        this.cb(dir)

    }



}


module.exports = FormatFile





