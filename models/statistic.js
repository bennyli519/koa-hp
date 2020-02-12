/*
 * @Author: Benny
 * @Date: 2020-02-11 22:19:34
 * @Description: 
 * @LastEditTime : 2020-02-12 22:32:06
 */
const models = require('../config/db');
const Office = models.office;
const Case = models.case;
Case.belongsTo(Office,{foreignKey:'office_id'})
const sequelize = require('sequelize')

class statisticModel {
    static async hotOffice(data){
        console.log('===============')
        console.log('asdfasf')
        return await Case.findAll({
            include:[
                {
                    model:Office,
                    attributes:['office_id','o_name']
                }
            ],
            attributes: {
                exclude: ['c_content','c_conclude','c_suggest','c_date','c_cure'] ,
                include: [
                    [sequelize.fn('COUNT', sequelize.col('Office.office_id')), 'count']
                ] 
            },
            group:'Office.office_id',
            rollup:true

        })
    //    return await Case.findAll({attributes:['office_id', [sequelize.fn('SUM', sequelize.col('office_id')), 'SUM']], group:'office_id', having:['COUNT(?)>?', 'office_id', 1], raw:true}).then(function(result){
    //         console.log(result);
    //     })
   
        // return await Office.create({
        //     o_name:data.oName
        // })
    }

}

module.exports =  statisticModel