/*
 * @Author: Benny
 * @Date: 2020-02-05 23:08:01
 * @LastEditors  : Benny
 * @LastEditTime : 2020-02-06 22:01:28
 * @Description: 
 */
const models = require('../config/db');
const Appoint = models.appoint;
const User = models.user;
const Doctor = models.doctor;
Appoint.belongsTo(User,{foreignKey:'user_id'})
Appoint.belongsTo(Doctor,{foreignKey:'doctor_id'})

class AppointModel {
    static async addAppointRecord(data){
        return await Appoint.create({
            doctor_id:data.doctorId,
            user_id:data.userId,
            a_time:data.appointDate,
            a_reason:data.appointReason,
            a_status:data.appointStatus,
            a_phone:data.appointPhone,
        })
    }
    static async getAppointRecord(userId){
        return await Appoint.findAll({
            where:{
                user_id:userId
            },
            include:[
                {
                    model:Doctor,
                    attributes:['doctor_id','d_name']
                },
                {
                    model:User,
                    attributes:['user_id','user_name']
                }
            ]
        })
    }
    static async getDoctorList(officeId){
        return await Doctor.findAll({
            where:{
                office_id:officeId
            }
        })
    }
}

module.exports =  AppointModel