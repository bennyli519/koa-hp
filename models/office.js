const models = require('../config/db');
const Office = models.office;


class OfficeModel {
    static async addOffice(data){
        return await Office.create({
            o_name:data.oName
        })
    }
    static async getOffice(){
        return await Office.findAll()
    }
    static async deleteOffice(officeId){
        return await Office.destroy({
            where:{
                office_id:officeId
            }
        })
    }
}

module.exports =  OfficeModel