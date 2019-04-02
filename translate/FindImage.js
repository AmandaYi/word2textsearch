const Path = require("path")
const FS = require("fs")
const Imageinfo = require("imageinfo")
class FindImage {
    constructor(unzipDir, cb) {
        this.cb = cb
        this.unzipDir = Path.join(unzipDir);
        // this.cb = cb
        // 图片的路径
        this.imagesPath = Path.join(unzipDir, "word", "media")
        console.log("开始寻找图片")
        // 存放此次的fileList
        this.filesList = []
        this.GetFileList(this.imagesPath)
    }



    // 4. 遍历找到图片
    GetMediaImagesFiles(filesList) {

        // console.log("images2text=>", this.unzipDir)
        let imagesList = []
        filesList.forEach((item, index) => {

            let data = FS.readFileSync(item.path);

            let info = Imageinfo(data);
            // 如果info.mimeType 为真，那么的话，证明是图片，加入到图片列表里面
            if (info.mimeType) {
                imagesList.push(item)
               

            } else {
                 console.log(item.filename,"不是一个图片", info.mimeType);
            }
        })
        this.cb(imagesList)

    }




    // 辅助方法
    // 得到全部的文件列表
    GetFileList(imagesPath) {
        console.log(imagesPath)
        let files
        try {
            files = FS.readdirSync(imagesPath);
        } catch (err) {
            console.log("该word内没有图片内容!")
            return
        }
        Array.from(files).forEach(item => {
            // 判断是不是目录
            let itemPath = Path.join(this.imagesPath, item)
            const stat = FS.statSync(itemPath)
            if (stat.isDirectory()) {
                // 如果是个目录那么递归读取全部的文件
                this.GetFileList(itemPath)
            } else {
                // 如果不是的话，存放当前的文件
                let obj = {
                    path: itemPath, // 图片的路径
                    filename: item,
                }
                this.filesList.push(obj)
            }
        })
        this.GetMediaImagesFiles(this.filesList)
    }
}
module.exports = FindImage; 