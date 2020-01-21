/*
 * @Description: 用户model
 * @Author: Benny
 * @Date: 2020-01-14 16:11:49
 * @LastEditTime : 2020-01-20 15:36:56
 */

const models = require('../config/db');
const User = models.user;
const Doctor = models.doctor;
const Role = models.role;
const sequelize = models.sequelize;
// models.sync();
User.belongsTo(Role,{foreignKey:'user_type'})

class UserModel {
    /**
     * @author: Benny
     * @description: 创建用户
     */    
    static async createAccount(data){
        return  sequelize.transaction( t=>{
            return  User.create({
                user_name:data.username,
                user_pwd:data.password,
                user_type:data.userType
            },{transaction:t}).then(user=>{
        
                if(user.user_type == 1){

                }else if(user.user_type == 2){
                    return Doctor.create({
                        user_id:user.user_id,
                        d_name:user.user_name
                    },{transaction:t})
                }
                 
            })
        }).then(result =>{
            
        })
    }

    /**
     * @author: Benny
     * @description: 查询是否有该账号
     */
    static async verifyAccount(data){
        return await User.findOne({
            where: {
              user_name:data,
            },
        })
    }
    /**
     * @author: Benny
     * @description: 获取用户信息
     */
    static async getUserInfo(data){
        return await User.findOne({
            where:{
                user_id:data
            },
            include:[{
                model:Role,
                attributes:['role_id','role_name']
            }]
        })
    }

 
}
module.exports = UserModel
