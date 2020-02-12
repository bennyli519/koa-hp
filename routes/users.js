/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-02-12 01:15:27
 */
const router = require('koa-router')()
const UserController = require('../controllers/user');
router.prefix('/user')




//注册
router.post('/register',UserController.create)

//登录
router.post('/login',UserController.login)

//获取用户信息
router.get('/info',UserController.getUserInfo)

//获取用户列表
router.get('/infoList',UserController.getAccountList)

// router.post('/logout',UserController.logout)

module.exports = router
