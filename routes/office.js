/*
 * @Description: 科室路由
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-01-19 02:59:05
 */
const router = require('koa-router')()

const OfficeController = require('../controllers/office');
router.prefix('/office')




//新增科室
router.post('/createOffice',OfficeController.createOffice)
router.post('/deleteOffice',OfficeController.deleteOffice)

router.get('/getOfficeList',OfficeController.getOfficeList)


module.exports = router
