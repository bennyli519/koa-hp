/*
 * @Description:医生相关接口
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-02-10 00:24:00
 */
const doctorModel = require('../models/doctor');
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
        console.log(obj)
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
        ctx.success(res)
    }

    /**
     * @author: Benny
     * @description: 看诊
     */
    static async consult(ctx){
        let req = ctx.request.body;
        if(req){
            let res = await doctorModel.addConsult(req)
            ctx.success('提交成功')
        }else{
            ctx.fail('提交失败')
        }
    }

    /**
     * @author: Benny
     * @description: 获取医生名下患者
     */
    static async getMyPatientList(){
        const token = ctx.cookies.get('vue_admin_template_token');
        const obj = jwt.verify(token,secret)
        const res = await doctorModel.getMyPatientList(obj.userId)
        ctx.success(res)
    }

   
   
}

module.exports = doctorController