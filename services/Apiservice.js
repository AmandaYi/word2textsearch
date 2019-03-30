const Http = require("./http")
const constants = require("./constants")
const { AIToken, GeneralBasic } = constants
const { configWord2pdf2text } = require("../config");
class ApiServer {
    constructor() {
        // console.log("api init")
    }




    // 获取API的token

   static GetToken() {
        const params = {
            'grant_type': 'client_credentials',
            'client_id': configWord2pdf2text.APIKey,
            'client_secret': configWord2pdf2text.SecretKey
        };

        return Http.get(AIToken, {
            params
        })
    }
    // 把图片提交上去，然后进行转码
    FuncImages2Text(Body,Token) {
        let config = {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded"
            },
            params:{
                access_token:Token
            }
        };
        return Http.post(GeneralBasic, xw(Body), config, () => { })
    }

}

function xw (Body) {
    let USParams = new URLSearchParams()
    for (let item in Body) {
        USParams.append(item,Body[item])
    }
    return USParams;
}







module.exports = ApiServer