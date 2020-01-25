/*
 * @Description: Office 控制器
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-01-20 15:42:11
 */
const officeModel = require('../models/office');


class officeController{
    /**
     * @author: Benny
     * @description:创键科室
     * @param {type} 
     */
    static async createOffice(ctx){
        let req = ctx.request.body;
        console.log(req)
        try {
            if(req && req.oName){
                const res = await officeModel.addOffice(req)
                ctx.success('创建科室成功')
            }else{
                ctx.fail('参数不齐全')
            
            }
        } catch (error) {
            console.log(error)
            ctx.fail(error)
        }
    }
     /**
     * @author: Benny
     * @description:创键科室
     * @param {type} 
     */
    static async getOfficeList(ctx){
        const res = await officeModel.getOffice();
        ctx.success(res)
    }

    static async deleteOffice(ctx){
        const { officeId }  = ctx.request.body
        const res = await officeModel.deleteOffice(officeId);
        ctx.success(res,'删除成功')
    }

   
}

module.exports = officeController