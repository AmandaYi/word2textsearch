const FormatFile = require("./FormatFile.js")
const FindImage = require("./FindImage.js")

const Turn2Text = require("./Turn2Text.js")
let subs = []
// 翻译word图片
let that  = null
class Translate {

    constructor(filepath, postfix, cb) {
        this.filetext = "111"
        this.cb = cb
        this.filepath = filepath
        this.postfix = postfix
      
        console.log("开始执行图片翻译工作")

        // 一进来就开始翻译,最后把翻译的结果给出去
        this.InitMain()
    }


    InitMain() {
        that = this
        // console.l
        // InitToken()
        // 得到文件中的图片
        new FormatFile(this.filepath, this.postfix, this.FormatImage)
    }
    // 对图片进行操作得到字符串
    FormatImage(repath, postFix, basename) {

        new FindImage(repath, (imagesList) => {
            console.log("开始进行转码")
            // console.log(imagesList)

            let timer = 0;
            let i = 0;
            let len = imagesList.length;
            // 对每一个元素进行请求,可以不要求顺序了
            Array.from(imagesList).forEach((item, index) => {
                // console.log(`开始计算第${index}张图片`)
                setTimeout(() => {
                    new Turn2Text(item, (resultData) => {
                        item.formatStr = resultData.formatStr
                        // console.log(item)
                        // 对每次的处理进行判断,如果图片处理完毕了,那么就开始做其他的
                        if (index == imagesList.length - 1) {
                            console.log("全部处理完毕了");
                            // console.log(imagesList)
                            // console.log(this.filepath)
                            // console.log(that.cb)
                            // that.cb(imagesList)
                            // 这里插入???
                            that.cb(imagesList)

                        }

                    })
                }, 3000)

            })
        })
    }
}



module.exports = Translate