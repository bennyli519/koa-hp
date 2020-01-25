/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-12-29 21:26:44
 * @LastEditTime : 2020-01-20 14:48:45
 */
const Sequelize = require('sequelize');

const sequelize = new Sequelize('hostital', 'root', '123456789', {
    host: 'localhost',
    dialect: 'mysql',
    operatorsAliases: false,
    dialectOptions: {
        // 字符集
        charset: "utf8mb4",
        collate: "utf8mb4_unicode_ci",
        supportBigNumbers: true,
        bigNumberStrings: true
    },

    pool: {
        max: 5,
        min: 0,
        acquire: 30000,
        idle: 10000
    },
    timezone: '+08:00' //东八时区
});

const fs = require('fs');


let files = fs.readdirSync('schema');

let js_files = files.filter((f)=>{
    return f.endsWith('.js');
}, files);

module.exports = {sequelize};

for (let f of js_files) {
   
    let name = f.substring(0, f.length - 3);

    module.exports[name] = sequelize.import('../schema/' + f);
}

// module.exports = {
//     sequelize
// }


module.exports.sync = () => {
    sequelize.sync();
};
