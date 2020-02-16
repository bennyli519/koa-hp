/*
 * @Description: 数据统计
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime: 2020-02-16 13:54:11
 */
const statisticModel = require('../models/statistic');


class statisticController{
    /**
     * @author: Benny
     * @description:创键科室
     * @param {type} 
     */
    static async checkHotOffice(ctx){
        console.log('==asdfadsf')
        let resultList = await statisticModel.hotOffice()
        let obj = {
            totalCount:0,
            officeList:[],
            dataList:[]
        }

        resultList.map(res=>{
            obj.officeList.push(res.office.o_name)
            res.o_name= res.office.o_name;
            obj.dataList.push(res)
        })

        
        ctx.success(obj)
    }


   
}

module.exports = statisticController