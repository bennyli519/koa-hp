/*
 * @Description: 科室路由
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-02-12 15:26:44
 */
const router = require('koa-router')()

const statisticController = require('../controllers/statistic');
router.prefix('/statistic')




//新增科室
// router.post('/createOffice',OfficeController.createOffice)
// //删除科室
// router.post('/deleteOffice',OfficeController.deleteOffice)
// //获取科室列表
router.get('/check',statisticController.checkHotOffice)


module.exports = router
