/*
 * @Description: 用户model
 * @Author: Benny
 * @Date: 2020-01-14 16:11:49
 * @LastEditTime : 2020-01-31 17:40:18
 */

const models = require('../config/db');
const User = models.user;
const Doctor = models.doctor;
const Patient = models.patient;
const Role = models.role;
const sequelize = models.sequelize;
// models.sync();
User.belongsTo(Role,{foreignKey:'user_type'})
User.belongsTo(Patient,{foreignKey:'user_id'})
User.belongsTo(Doctor,{foreignKey:'user_id'})

class UserModel {
    /**
     * @author: Benny
     * @description: 创建用户
     */    
    static async createAccount(data){
        return  sequelize.transaction( t=>{
            return  User.create({
                user_name:data.name,
                user_pwd:data.pass,
                user_type:data.usertype
            },{transaction:t}).then(user=>{
                if(user.user_type == 1){
                    return Patient.create({
                        user_id:user.user_id,
                        p_name:user.user_name,
                        p_gender:data.gender,
                        p_age:data.age,
                        p_phone:data.mobile,
                        p_address:'广州市增城无缝花园2懂301'

                    },{transaction:t})
                }else if(user.user_type == 2){
                    return Doctor.create({
                        user_id:user.user_id,
                        d_name:user.user_name,
                        d_gender:data.gender,
                        d_age:data.age,
                        office_id:data.office,
                        d_phone:data.mobile,
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
            include:[
                {
                    model:Role,
                    attributes:['role_id','role_name']
                }
            ]
        })
    }
    /**
     * @author: Benny
     * @description: 获取账号列表
     * @param {type} 
     */
    static async getAccountList(){
        return await User.findAll({
            // where:{
            //     user_type:1
            // },
            order:[['user_id','ASC']],
            attributes:{
                exclude:['user_pwd'],
            },
            include:[
                {
                    model:Role,
                    attributes:['role_id','role_name']
                },
                // {
                //     model:Patient,
                //     attributes:['p_age','p_gender']
                // },
                // {
                //     model:Doctor,
                //     attributes:['d_phone']
                // }
            ]
        })
    }

 
}
module.exports = UserModel
