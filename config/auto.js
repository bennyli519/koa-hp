/*
 * @Description: 
 * @Author: Benny
 * @Date: 2020-01-20 11:20:14
 * @LastEditTime: 2020-01-21 11:25:39
 */

const SequelizeAuto = require('sequelize-auto')
const auto = new SequelizeAuto(
    'hostital',     //数据库的库名
    'root',         //mysql数据库的用户名
    '123456789',     //mysql数据库的密码
    {
        host: '127.0.0.1',      // 数据库服务器ip
        dialect: 'mysql',
        directory: './schema',  // prevents the program from writing to disk
        port: '3306',           // 数据库运行端口
        additional: {
            timestamps: false
        }
    }
)
auto.run(function (err) {
    if (err) throw err;
    // console.log(auto.tables); // table list
    // console.log(auto.foreignKeys); // foreign key list
 
    //生成models表后，直接执行项目
    require('../bin/www');
})