/*
 * @Author: Benny
 * @Date: 2019-12-29 21:01:50
 * @Description: 
 * @LastEditTime: 2020-02-11 16:52:05
 */
const Router = require('koa-router')
// const ArticleController = require('../controllers/article')

const router = new Router({
  prefix:'/api/v1'
})

// router.post('/article',ArticleController.create)
// router.get('/article/:id',ArticleController.detail)

// router.get('/', async (ctx, next) => {
//   await ctx.render('index', {
//     title: 'Hello Koa 2!'
//   })
// })

// router.get('/string', async (ctx, next) => {
//   ctx.body = 'koa2 string'
// })

// router.get('/json', async (ctx, next) => {
//   ctx.body = {
//     title: 'koa2 json'
//   }
// })

module.exports = router
