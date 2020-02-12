/*
 * @Description:医生相关接口
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-02-12 13:30:21
 */
const doctorModel = require('../models/doctor');
const appointModel = require('../models/appoint');
const jwt = require('jsonwebtoken')
//密钥
const secret = 'shared-secret'
class doctorController{
    /**
     * @author: Benny
     * @description: 获取待看诊列表
     * @param {type} 
     */
    static async getMyPatientRecord(ctx){
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        // console.log(obj)
        try {

            const res = await doctorModel.getMyPatientRecord(obj.userId)
            console.log(res)
            let list = []
            res.map(i=>{
                
                let obj = {
                    date:i.a_time,
                    userName:i.user.user_name,
                    // doctorName:i.doctor && i.doctor.d_name,
                    reason:i.a_reason,
                    status:i.a_status,        
                    phone:i.a_phone,
                    appointId:i.appoint_id,
                    patientId:i.patient_id,
                    age:i.patient && i.patient.p_age,
                    gender:i.patient && i.patient.p_gender == 'male'?'男':'女'
                  }
                  console.log(obj)
                  list.push(obj)
                  
            })
            
            if(res)
                ctx.success(list)
            else
                ctx.fail('获取失败')
        } catch (error) {
            console.log(error)
            ctx.fail(error)
        }
    }
    
    /**
     * @author: Benny
     * @description: 获取院医生列表
     */
    static async getAllDoctorList(ctx){
        const res = await doctorModel.getDoctorList()
        let list = []
        res.map(i=>{
            
            let obj = {
                id:i.doctor_id,
                userId:i.user_id,
                userName:i.d_name,
                // doctorName:i.doctor && i.doctor.d_name,
                gender:i.d_gender == 'male'?'男':'女',
                age:i.d_age,        
                phone:i.d_phone,
                officeName:i.office.o_name
              }
              console.log(obj)
              list.push(obj)
              
        })
        ctx.success(list)
    }

    /**
     * @author: Benny
     * @description: 看诊
     */
    static async consult(ctx){
        let req = ctx.request.body;
        console.log(req)
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        req.userId = obj.userId;
        if(req){
            let res = await doctorModel.addConsult(req)
            let appoint = {
                appointId:   req.appointId,
                status:'待取药'
            }
            appointModel.updateRecord(appoint)
            ctx.success('提交成功')
        }else{
            ctx.fail('提交失败')
        }
    }

    /**
     * @author: Benny
     * @description: 获取医生名下患者
     */
    static async getMyPatientList(ctx){
        let req = ctx.request.body;
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        req.userId = obj.userId
        const res = await doctorModel.getMyPatientList(req)

        let list = []
        res.map(i=>{
            
            let obj = {
                userId:i.user_id,
                patientId:i.patient_id,
                userName:i.p_name,
                // doctorName:i.doctor && i.doctor.d_name,
                gender:i.p_gender == 'male'?'男':'女',
                age:i.p_age,        
                phone:i.p_phone,
                address:i.p_address
              }
              console.log(obj)
              list.push(obj)
              
        })
        console.log(res)
        ctx.success(list)
    }

    /**
     * @author: Benny
     * @description: 获取案例汇总
     */
    static async getCaseList(ctx){
        const res  = await doctorModel.getCaseList()
        let list = []
        res.map(i=>{
            
            let obj = {
                caseId:i.case_id,
                patientId:i.patient_id,
                patientName:i.patient.p_name,
                office:i.office.o_name,
                caseContent:i.c_content,
                caseConclude:i.c_conclude,
                caseSuggest:i.c_suggest,
                caseCure:i.c_cure,
                caseDate:i.c_date,
                
                gender:i.patient.p_gender == 'male'?'男':'女',
                age:i.patient.p_age,        
              }
              console.log(obj)
              list.push(obj)
              
        })
        ctx.success(list)
    }
   
   
}

module.exports = doctorController