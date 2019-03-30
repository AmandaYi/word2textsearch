const Path = require("path")
const FS = require("fs")
const Imageinfo = require ("imageinfo")
class FindImage {


    constructor(unzipDir,cb) {
        this.cb =cb
        this.unzipDir = Path.join(__dirname, unzipDir);
        // 图片的路径
        this.imagesPath = Path.join(__dirname, unzipDir, "word", "media")

        // 存放此次的fileList
        this.filesList = []
        this.GetFileList(this.imagesPath)
    }



    // 4. 遍历找到图片
    GetMediaImagesFiles(filesList) {
        // console.log("images2text=>", this.unzipDir)
        let imagesList = []
        filesList.forEach((item,index) => {
            
           let data =  FS.readFileSync(item.path);

            let info = Imageinfo(data);
            // 如果info.mimeType 为真，那么的话，证明是图片，加入到图片列表里面
            if(info.mimeType){
                imagesList.push(item) 
                // 如果是图片直接请求

            }else{
                // console.log(item.filename,"不是一个图片", info.mimeType);
            }
        })
        // console.log(imagesList)
        
        // 回掉出去
        this.cb(imagesList)
        return imagesList;
    }




    // 辅助方法
    // 得到全部的文件列表
     GetFileList(imagesPath) {
        // 得到全部的文件
        let files = FS.readdirSync(imagesPath);
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
        // console.log(this.filesList)
        this.GetMediaImagesFiles(this.filesList)
    }

    // 通过判断是不是图片把图片得到
    // GetFileList() {
    //     let  filesList = []; 
    //     ReadFileList(path, filesList);
    //     return filesList;
    // }



}
module.exports = FindImage; 