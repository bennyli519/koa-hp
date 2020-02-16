/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime: 2020-02-16 14:56:53
 */
const router = require('koa-router')()
const AppointController = require('../controllers/appoint');
router.prefix('/appoint')




//预约
router.post('/book',AppointController.book)
//看诊记录
router.get('/getRecord',AppointController.getRecord)
//修改状态
router.post('/updateStatus',AppointController.updateStatus)

//获取相应的医生列表
router.post('/getDoctorList',AppointController.getDoctorList)

//取药
router.post('/getMedicine',AppointController.getMedicine)
//获取病历
router.post('/getCase',AppointController.getCase)


module.exports = router