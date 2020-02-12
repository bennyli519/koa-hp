/*
 * @Description: 医生相关接口路由
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-02-12 13:48:47
 */
const router = require('koa-router')()
const DoctorController = require('../controllers/doctor');
router.prefix('/doctor')



//看诊记录
router.get('/getRecord',DoctorController.getMyPatientRecord)
//全部医生列表
router.get('/getDoctorList',DoctorController.getAllDoctorList)
//获取医生名下患者
router.post('/getPatientList',DoctorController.getMyPatientList)
//获取病历汇总
router.get('/getCaseList',DoctorController.getCaseList)
//提交病历
router.post('/submitCase',DoctorController.consult)


module.exports = router