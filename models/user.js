/*
 * @Description: 用户model
 * @Author: Benny
 * @Date: 2020-01-14 16:11:49
 * @LastEditTime : 2020-01-14 20:36:13
 */

const models = require('../config/db');
const User = models.user;
const Doctor = models.doctor;
const sequelize = models.sequelize;


class UserModel {
    //创建用户
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
}
module.exports = UserModel
