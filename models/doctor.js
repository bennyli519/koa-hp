/*
 * @Author: Benny
 * @Date: 2020-02-05 23:08:01
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-10 00:22:59
 * @Description: 
 */
const models = require('../config/db');
const Appoint = models.appoint;
const User = models.user;
const Doctor = models.doctor;
const Office = models.office;
const Patient = models.patient;
const Case = models.case;
Appoint.belongsTo(User,{foreignKey:'user_id'})
Appoint.belongsTo(Doctor,{foreignKey:'doctor_id'})
Doctor.belongsTo(Office,{foreignKey:'office_id'})

class DoctorModel {
    /**
     * @author: Benny
     * @description: 获取待看诊记录
     */
    static async getMyPatientRecord(userId){
        let doctor = await Doctor.findOne({
            where:{
                user_id:userId
            }
        })
    
        return await Appoint.findAll({
            where:{
                doctor_id:doctor.doctor_id
            },
            include:[
                {
                    model:User,
                    attributes:['user_id','user_name']
                }
            ]
        })
    }
    /**
     * @author: Benny
     * @description: 获取全院医生列表
     */
    static async getDoctorList(){
        return await Doctor.findAll({
            include:[
                {
                    model:Office
                }
            ]
        })
    }

    /**
     * @author: Benny
     * @description: 获取医生名下的患者
     */
    static async getMyPatientList(){
        let doctor = await Doctor.findOne({
            where:{
                user_id:userId
            }
        })
    
        return await Patient.findAll({
            where:{
                doctor_id:doctor.doctor_id
            },
            include:[
                {
                    model:User,
                    attributes:['user_id','user_name']
                }
            ]
        })
    }

    /**
     * @author: Benny
     * @description: 新增病历
     * @param {type} 
     */
    static async addConsult(data){
        return await Case.create({
            office_id:data.officeId,
            patient_id:data.patientId,
            c_content:data.cContent,
            c_conclude:data.cConclude,
            c_suggest:data.cSuggest,
            c_cure:data.cCure,
            c_date:new Date()
        })
    }
}

module.exports =  DoctorModel