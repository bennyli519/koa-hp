/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-02-07 12:05:41
 */
const router = require('koa-router')()
const AppointController = require('../controllers/appoint');
router.prefix('/appoint')




//预约
router.post('/book',AppointController.book)
//看诊记录
router.get('/getRecord',AppointController.getRecord)

//获取相应的医生列表
router.post('/getDoctorList',AppointController.getDoctorList)


module.exports = router