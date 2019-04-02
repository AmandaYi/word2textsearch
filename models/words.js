const Sequelize = require('sequelize');
const conn = require("./conn")

module.exports = conn.define("words", {
    // 索引
    // id: {
    //     type: Sequelize.SMALLINT(),
    //     primaryKey: true,
    // },
    // 文件名
    filename: Sequelize.STRING(),
    // 文件的相对服务器的路径使用E://这种形式的
    filepath: Sequelize.STRING(),
    // 文件识别以后的文字
    filetext: Sequelize.TEXT()
},{
    timestamps: false,
    freezeTableName: true
})