const FS = require("fs")
const ApiService = require("./../services/Apiservice")
const Conf = require("./../inc.js")
class Turn2Text {
    constructor(imageItem, resultcb) {
        this.http = new ApiService()
        this.resultcb = resultcb
        this.imageItem = imageItem
        this.path = imageItem.path
        this.filename = imageItem.filename
        this.Trun(this.path)
    }
    // 5. 请求api得到图片中的内容
    Trun(path) {
        // 5.1 读取文件
        FS.readFile(path, (err, data) => {
            if (err) throw err;
            // console.log(data.toString());
            // 5.2 转码
            let imageBase64 = Buffer.from(data, "binary").toString('base64')
            // 5.3 请求
            // console.log(imageBase64);
            this.PostImages2Text(imageBase64)

        });
        // let data = FS.readFileSync(path)
        // let imageBase64 = Buffer.from(data,"binary").toString('base64')
        // this.PostImages2Text(imageBase64)
    }

    PostImages2Text(imageBase64) {
        this.http.FuncImages2Text({
            image: imageBase64,

        }, Conf.access_token)
            .then(res => {
                if (res.status == 200) {
                    this.MergeString(res.data)
                }
            })

    }

    MergeString(data) {
        let formatStr = ""
        data.words_result.forEach(item => {
            formatStr += item.words
        })
        this.resultcb({ resapi: data, formatStr, imageItem: this.imageItem })
    }








    // 6. 当前的文件保存到一个数据库里面

    // 7. 查询服务，上传服务，


}




module.exports = Turn2Text
