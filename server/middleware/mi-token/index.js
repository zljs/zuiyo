const decodeToken = require('../../utils/decodeToken')
const unless = require('koa-unless');
module.exports = () => {
    const selfCheck = async (ctx, next) => {
        let token = ctx.request.header.authorization;
        let res = decodeToken(token)
        console.log('authorization',res)
       if (res && res.exp <= new Date()/1000){
         ctx.throw(401)
       } else {
         ctx.body = {
           token: token.split(' ')[1],
           code:1
         }
         return next()
       }
    }
    selfCheck.unless = unless
    return selfCheck
}