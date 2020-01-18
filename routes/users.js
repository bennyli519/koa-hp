/*
 * @Description: 
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @LastEditTime : 2020-01-19 02:59:05
 */
const router = require('koa-router')()
const jwt = require('jsonwebtoken')
const UserController = require('../controllers/user');
router.prefix('/user')




//注册
router.post('/register',UserController.create)

//登录
router.post('/login',UserController.login)

//获取用户信息
router.get('/info',UserController.getUserInfo)

module.exports = router
