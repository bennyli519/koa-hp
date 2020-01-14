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

// error handler
onerror(app)
// middlewares
app.use(bodyparser({
  enableTypes:['json', 'form', 'text']
}))


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
          ctx.status = 401;
          ctx.body = {
              code: 401,
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

// error-handling
app.on('error', (err, ctx) => {
  console.error('server error', err, ctx)
});

module.exports = app
