const router = require('koa-router')()
const jwt = require('jsonwebtoken')
router.prefix('/user')

router.get('/', function (ctx, next) {
  ctx.body = 'this is a users response!'
})

router.get('/bar', function (ctx, next) {
  ctx.body = 'this is a users/bar response'
})

const sqlUser ={
  username:'admin',
  password:'benny',
  id:1
}
const secret = 'shared-secret'
router.post('/login', async(ctx,next)=>{
  const user = ctx.request.body;
  console.log(user)
  if (user && user.username === 'admin') {
    let userToken = {name: 'admin', id: 1001};
      ctx.success({
        token:jwt.sign(
          userToken,
          secret, 
          {expiresIn: '1h'}
        )
      },"嘿嘿我是管理员")
  } else if(user && user.username === 'patient'){
    let userToken = {name: 'patient', id: 1002};
    ctx.success({
      token:jwt.sign(
        userToken,
        secret, 
        {expiresIn: '1h'}
      )
    },"嘿嘿我是病人")
  } else if(user && user.username === 'doctor'){
    let userToken = {name: 'doctor', id: 1003};
    ctx.success({
      token:jwt.sign(
        userToken,
        secret, 
        {expiresIn: '1h'}
      )
    },"嘿嘿我是医生")
  }
  else {
     ctx.fail('失败啦啦啦',10086)
  }
})

router.get('/info', async (ctx, next)=> {
  console.log('==============================================')
  console.log(ctx.query.token)
  console.log('==============================================')
  let a = jwt.verify(ctx.query.token, secret)
  console.log(a)
  if(a.id == 1001){

    ctx.success({
      roles: ['admin'],
      introduction: 'I am a super administrator',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Super Admin'
    })
  }else if(a.id==1002){
    ctx.success({
      roles: ['patient'],
      introduction: 'I am an patient',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'patient'
    })
  }else{
    ctx.success({
      roles: ['doctor'],
      introduction: 'I am an doctor',
      avatar: 'https://wpimg.wallstcn.com/f778738c-e4f8-4870-b634-56703b4acafe.gif',
      name: 'Normal doctor'
    })
  }

})

module.exports = router
