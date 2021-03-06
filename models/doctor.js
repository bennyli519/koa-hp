/*
 * @Author: Benny
 * @Date: 2020-02-05 23:08:01
 * @LastEditors  : Please set LastEditors
 * @LastEditTime : 2020-02-12 14:09:49
 * @Description: 
 */
const models = require('../config/db');
const Appoint = models.appoint;
const User = models.user;
const Doctor = models.doctor;
const Office = models.office;
const Patient = models.patient;
const Case = models.case;
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
Appoint.belongsTo(User,{foreignKey:'user_id'})
Appoint.belongsTo(Doctor,{foreignKey:'doctor_id'})
Appoint.belongsTo(Patient,{foreignKey:'patient_id'})
Case.belongsTo(Patient,{foreignKey:'patient_id'})
Case.belongsTo(Office,{foreignKey:'office_id'})
Doctor.belongsTo(Office,{foreignKey:'office_id'})
Patient.belongsTo(User,{foreignKey:'user_id'})

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
                doctor_id:doctor.doctor_id,
                a_status:'待看诊'
            },
            include:[
                {
                    model:User,
                    attributes:['user_id','user_name']
                },
                {
                    model:Patient,
                    attributes:['patient_id','p_name','p_gender','p_age']
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
    static async getMyPatientList(req){
        //是否查全部
        if(req.selectValue == 1){
            return await Patient.findAll({
                include:[
                    {
                        model:User,
                        attributes:['user_id','user_name']
                    }
                ]
            })
        }else if(req.selectValue == 2){
            let doctor = await Doctor.findOne({
                where:{
                    user_id:req.userId
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
        }else if(req.selectValue == 3){
            return await Patient.findAll({
                where:{
                    p_name:{
                        [Op.like]:'%' +req.content + '%' 
                    }
                },
                include:[
                    {
                        model:User,
                        attributes:['user_id','user_name']
                    }
                ]
            })
        }else if(req.selectValue == 4){
            return await Patient.findAll({
                where:{
                    user_id:{
                        [Op.like]:'%' +req.content + '%' 
                    }
                },
                include:[
                    {
                        model:User,
                        attributes:['user_id','user_name']
                    }
                ]
            })
        }
    }

    /**
     * @author: Benny
     * @description: 新增病历
     * @param {type} 
     */
    static async addConsult(data){
        let doctor = await Doctor.findOne({
            where:{
                user_id:data.userId
            }
        })
        //将患者归到该医生名下
        Patient.update(
            {
                doctor_id:doctor.doctor_id
            },
            {
                where:{
                    patient_id:data.patientId
                }
            }
        )
        return await Case.create({
            office_id:doctor.office_id,
            patient_id:data.patientId,
            c_content:data.content,
            c_conclude:data.conclude,
            c_suggest:data.suggest,
            c_cure:data.medicine,
            c_date:new Date()
        })
    }

    /**
     * @author: Benny
     * @description: 获取病历汇总
     */
    static async getCaseList(){
        return await Case.findAll({
            include:[
                {
                    model:Patient,
                    attributes:['p_name','p_gender','p_age']
                },
                {
                    model:Office,
                    attributes:['o_name']
                }
            ]
        })
    }

}

module.exports =  DoctorModel