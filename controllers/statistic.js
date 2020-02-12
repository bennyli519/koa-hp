/*
 * @Description: 数据统计
 * @Author: Benny
 * @Date: 2020-01-14 16:45:53
 * @LastEditTime : 2020-02-12 15:34:00
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
        let a = await statisticModel.hotOffice()
        ctx.success(a)
    }


   
}

module.exports = statisticController