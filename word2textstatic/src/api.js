


import Axios from "axios"


export const server = "http://localhost:5000/"
export const url = {
    test: `${server}test`,
    fileList: `${server}words/list`,
}


class ApiService {
    constructor() {
        console.log("ApiService init");
    }

    static Test() {
        return Axios.get(url.test)
    }

    // 得到全部的列表
    static GetFileList(Body = {
        page: 1,
        size: 50,
        // 搜索服务
        fileName: ""
    }) {
        return Axios.get(url.fileList, {
            params: Body
        })
    }


}




export default ApiService