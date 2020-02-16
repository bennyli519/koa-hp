/*
 * @Description: book 控制器
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime: 2020-02-16 14:56:36
 */
const appointModel = require('../models/appoint');
const jwt = require('jsonwebtoken')
//密钥
const secret = 'shared-secret'
class appointController{

    /**
     * @author: Benny
     * @description: 预约
     */
    static async book(ctx){
        let req = ctx.request.body;
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        req.userId = obj.userId;
        req.appointStatus = '待看诊'
        try {
            if(req){
                const res = await appointModel.addAppointRecord(req)
                ctx.success(res,'预约成功')
            }else{
                ctx.fail('预约失败')
            }
        } catch (error) {
            ctx.fail(error)
        }
    }

    /**
     * @author: Benny
     * @description: 获取预约记录
     */
    static async getRecord(ctx){
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        console.log(obj)
        try {
            const res = await appointModel.getAppointRecord(obj.userId)
            let list = []
            res.map(i=>{
               
                let obj = {
                    appointId:i.appoint_id,
                    patientId:i.patient_id,
                    date:i.a_time,
                    userName:i.user.user_name,
                    doctorName:i.doctor && i.doctor.d_name,
                    reason:i.a_reason,
                    status:i.a_status,        
                    phone:i.a_phone,
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
    //获取医生列表
    static async getDoctorList(ctx){
        let {officeId} = ctx.request.body;
        const res = await appointModel.getDoctorList(officeId)
        ctx.success(res)
    }
    //取药记录
    static async getMedicine(ctx){
        let {patientId} = ctx.request.body;
        const res = await appointModel.getMedicine(patientId)
        ctx.success(res)
    }

    //修改看诊状态
    static async updateStatus(ctx){
        
        const req = ctx.request.body;
        req.status = '看诊结束'
        const res = await appointModel.updateRecord(req)
        ctx.success('修改状态成功')
    }

    static async getCase(ctx){
        let {patientId} = ctx.request.body;
        const res = await appointModel.getMedicine(patientId)
        ctx.success(res)
    }

   
   
}

module.exports = appointController