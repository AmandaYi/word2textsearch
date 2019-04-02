const TableWords = require("./../models/words")


var Sequelize = require('sequelize');
var Op = Sequelize.Op;















module.exports = {
    // 插入一条数据
    async INSERT(filename, filepath, filetext) {
        if (filename && filepath) {
            await TableWords.create({
                filename, filepath, filetext
            })
            console.log("检测数据插入!");
        } else {
            console.log("检测到空数据!");
        }
    },
    // 查询数据
    SELECT(query = {
        page: 1, size: 50, fileName: ""
    }) {
        let offset = query.page <= 0 ? 0 : query.page - 1
        let limit = query.size
        let fileName = query.fileName
        return TableWords.findAll({
            where: {
                filetext: {
                    [Op.like]: `%${fileName}%`
                },

            },
            offset: 0,
            limit: 50
        })
    },
    // 删除数据
    DELETE() { },
    // 修改数据
    UPDATE() { }

}