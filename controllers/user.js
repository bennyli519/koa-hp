/*
 * @Description: User 控制器
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-01-20 15:42:11
 */
const UserModel = require('../models/user');
const crypt = require('../config/crypt');
const jwt = require('jsonwebtoken')
//密钥
const secret = 'shared-secret'
class userController{
    /**
     * @author: Benny
     * @description:创键用户
     * @param {type} 
     */
    static async create(ctx){
        let req = ctx.request.body;
        console.log(req)
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

    /**
     * @author: Benny
     * @description: 登录且通过jwt生成token
     */
    static async login(ctx){
        try {
            const user = ctx.request.body;
            const { username , password } = user
            const res = await UserModel.verifyAccount(username)
            //用户名密码验证
            if(res && crypt.decrypt(password,res.user_pwd)){
                let userToken = {
                    userId:res.user_id,
                    name:res.user_name,
                }
                ctx.success({
                    token:jwt.sign(
                        userToken,
                        secret,
                        {expiresIn: '2h'}
                    ) 
                },'获取token成功')
            }else{
                ctx.fail('用户名或密码错误')
            }
            
        } catch (error) {
            ctx.fail('异常')
        }
    }

    /**
     * @author: Benny
     * @description: 获取用户信息
     */
    static async getUserInfo(ctx){
        console.log(ctx.query.token)
            
        let obj = jwt.verify(ctx.query.token,secret)
        const res = await UserModel.getUserInfo(obj.userId)
        console.log(res)
        ctx.success({
            userId:res.user_id,
            userName:res.user_name,
            roleName:[res.role.role_name],
            roleType:[res.user_type]
        })
      
        
    }
}

module.exports = userController