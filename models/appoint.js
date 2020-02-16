/*
 * @Author: Benny
 * @Date: 2020-02-05 23:08:01
 * @LastEditors: Please set LastEditors
 * @LastEditTime : 2020-02-11 17:48:16
 * @Description: 
 */
const models = require('../config/db');
const Appoint = models.appoint;
const User = models.user;
const Doctor = models.doctor;
const Patient = models.patient;
const Case = models.case;
Appoint.belongsTo(User,{foreignKey:'user_id'})
Appoint.belongsTo(Doctor,{foreignKey:'doctor_id'})

class AppointModel {
    static async addAppointRecord(data){
        const patient = await Patient.findOne({
            user_id:data.userId
        }) 
        return await Appoint.create({
            doctor_id:data.doctorId,
            patient_id:patient.patient_id,
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

    static async updateRecord(appoint){
        return await Appoint.update(
            {
                a_status:appoint.status
            },
            {
                where:{
                    appoint_id:appoint.appointId
                }
            }
        )
    }

    
    static async getMedicine(parentId){
        return await Case.findOne(
            {
                where:{
                    patient_id:parentId
                },
                include:{
                    model:Patient
                }
            }
        )
    }

       
    // static async getCase(parentId){
    //     return await Case.findOne(
    //         {
    //             where:{
    //                 patient:parentId
    //             },
    //         }
    //     )
    // }
}

module.exports =  AppointModel