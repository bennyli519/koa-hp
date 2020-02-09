/*
 * @Description: 医生相关接口路由
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-02-10 00:25:23
 */
const router = require('koa-router')()
const DoctorController = require('../controllers/doctor');
router.prefix('/doctor')



//看诊记录
router.get('/getRecord',DoctorController.getMyPatientRecord)
//全部医生列表
router.get('/getDoctorList',DoctorController.getAllDoctorList)
//获取医生名下患者
router.get('/getPatientList',DoctorController.getMyPatientList)
//提交病历
router.post('/submitCase',DoctorController.consult)


module.exports = router