/*
 * @Description: User 控制器
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-02-12 13:17:22
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
        req.pass = crypt.encrypt(req.pass)
        if(req){
            const res = await UserModel.createAccount(req)
            ctx.success('创建用户成功')
        }else{
            ctx.fail('创建失败')
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
            ctx.fail(error)
        }
    }

    /**
     * @author: Benny
     * @description: 获取用户信息
     */
    static async getUserInfo(ctx){
        try {       
            //验证token是否有效
            let obj = jwt.verify(ctx.query.token,secret)
            const res = await UserModel.getUserInfo(obj.userId)
            ctx.success({
                userId:res.user_id,
                userName:res.user_name,
                roleName:[res.role.role_name],
                roleType:[res.user_type]
            })       
        } catch (error) {
            ctx.fail(error)
        }
    }
    /**
     * @author: Benny
     * @description: 获取用户列表
     */
    static async getAccountList(ctx){
        try {
          const res =  await UserModel.getAccountList()
          let list = []
          res.map(i=>{
            console.log(i)
              let obj = {
                  userId:i.user_id,
                  userName:i.user_name,
                  userType:i.user_type,
                  userTypeName:i.role.role_name
                }
                list.push(obj)
           
          })
      
       
          ctx.success(list)
        } catch (error) {
            console.log(error)
        }
    }

    // static async logout(ctx){
    //     console.log('========')
    //     ctx.cookies.set('vue_admin_template_token','')
    //     ctx.response.redirect('/')
    // }
}

module.exports = userController