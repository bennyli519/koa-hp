/*
 * @Description: 科室路由
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-01-31 13:27:14
 */
const router = require('koa-router')()

const OfficeController = require('../controllers/office');
router.prefix('/office')




//新增科室
router.post('/createOffice',OfficeController.createOffice)
//删除科室
router.post('/deleteOffice',OfficeController.deleteOffice)
//获取科室列表
router.get('/getOfficeList',OfficeController.getOfficeList)


module.exports = router
