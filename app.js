/*
 * @Description: 
 * @Author: Benny
 * @Date: 2020-01-20 11:20:14
 * @LastEditTime : 2020-02-11 22:22:47
 */
const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')
const logger = require('koa-logger')
const cors = require('koa-cors')
const koajwt = require('koa-jwt')

const index = require('./routes/index')
const users = require('./routes/users')
const office = require('./routes/office')
const appoint = require('./routes/appoint')
const doctor = require('./routes/doctor')
const stat = require('./routes/statistic')

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))

   //使用
// const koaBody = require('koa-body')({
//     multipart: true,  // 允许上传多个文件
// });
// app.use(koaBody)


app.use(json())
app.use(logger())
app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
  extension: 'pug'
}))
// 使用koa-cors
app.use(cors());

// logger
app.use(async (ctx, next) => {
  const start = new Date()
  await next()
  const ms = new Date() - start
  // console.log(`${ctx.method} ${ctx.url} - ${ms}ms`)
})


// 对token进行验证
// 中间件对token进行验证
app.use(async (ctx, next) => {
  return next().catch((err) => {
      if (err.status === 401) {
          ctx.status = 50008;
          ctx.body = {
              code: 50008,
              msg: err.message
          }
      } else {
          throw err;
      }
  })
});
// console.log('==============================================')
// const SECRET = 'shared-secret'; // demo，可更换
// app.use(koajwt({ secret: SECRET }).unless({
//     // 登录，注册接口不需要验证
//     path: [/^\/user\/login/]
// }));

//统一格式
function routerResponse(option={}){
  return async(ctx,next)=>{
      ctx.success = (data,msg,code)=> {

          ctx.body = {
              status : true,
              msg : msg || 'success',
              data,
              code:code || 200
          }
      }

      ctx.fail =  (msg,code)=> {
          ctx.body = {
              status:false,
              msg : msg || 'fail',
              data:null,
              code:code || -1
          }
      }

     await next()
  }

}
app.use(routerResponse())
// routes
app.use(index.routes(), index.allowedMethods())
app.use(users.routes(), users.allowedMethods())
app.use(office.routes(), office.allowedMethods())
app.use(appoint.routes(), appoint.allowedMethods())
app.use(doctor.routes(), doctor.allowedMethods())
app.use(stat.routes(), stat.allowedMethods())
// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
