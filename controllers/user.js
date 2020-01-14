/*
 * @Description: User 控制器
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-01-14 20:01:22
 */
const UserModel = require('../models/user');
const crypt = require('../config/crypt');

class userController{
    static async create(ctx){
        let req = ctx.request.body;
        req.password = crypt.encrypt(req.password)

        const {username,password,userType}  = req
        if(username 
            && password
            && userType ){
            const res = await UserModel.createAccount(req)
            ctx.success('创建用户成功')
        }else{
            ctx.fail('参数不齐全')
        }
    }
}

module.exports = userController