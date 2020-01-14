/*
 * @Description: 加盐加密
 * @Author: Benny
 * @Date: 2020-01-14 19:18:12
 * @LastEditTime : 2020-01-14 19:21:48
 */
const bcrypt = require('bcryptjs')

const encrypt = password =>{
    let salt = bcrypt.genSaltSync(5);
    let hash = bcrypt.hashSync(password,salt)
    return hash
}

const decrypt = (password,hash)=>{
    return bcrypt.compareSync(password,hash);
}

module.exports ={
    encrypt,
    decrypt
}