const config = require("./config")
// 创建orm
const Sequelize = require('sequelize');
const conn = new Sequelize(config.database,
    config.username,
    config.password,
    {
        host: config.host,
        dialect: "mysql",
        pool: {
            max: 5,
            min: 0,
            idle: 30000
        },
        timestamps: false
        //最好关掉timestamps , 框架自动帮你添加时间到UpdatedAt上边
    }
)



module.exports = conn














// var sequelize = new Sequelize(config.database, config.username, config.password, {
//     host: config.host,
//     dialect: 'mysql',
//     pool: {
//         max: 5,
//         min: 0,
//         idle: 30000
//     },
//     timestamps: false
//     //最好关掉timestamps , 框架自动帮你添加时间到UpdatedAt上边
// });
// const Pet = sequelize.define("pet", {
//     id: {
//         type: Sequelize.STRING(50),
//         primaryKey: true,
//     },
//     name: Sequelize.STRING(60)
// }, {
//         timestamps: false,
//         freezeTableName: true
//     })

// var now = (new Date()).now
// const MakeDog = async () => {
//     let dog = await Pet.create({
//         id: "1231",
//         name: "阿黄"

//     })
//     console.log(JSON.stringify(dog))
// }
// MakeDog()





















// const mysql = require("mysql")
// const connection = mysql.createConnection({
//     host:"localhost",
//     user:"root",
//     password:'123456',
//     database:"testapp",
//     port:3306
// })
// let count = 0 
//  function funcConn (){
//     connection.connect((err)=>{
//         if(err){
//             if(count >= 10 ) {
//                 return false
//             }
//             count ++ 
//             console.log(err)
//             console.log("重试中!");
//             setTimeout(funcConn,1000)
//             return
//         }
//         console.log("连接成功!");
//     });
// }




// module.exports = {
//     connection,funcConn
// }