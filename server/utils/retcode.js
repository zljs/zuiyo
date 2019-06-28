/*
 * 返回码
 */
const RetCode = {
    SessionExpired: '-1=session过期',             //session过期
    Fail: '00=登陆失效',                        
    Success: '01=成功',                     //成功
    ArgsError: '02=参数错误',                   //参数错误
    SchemaFail: '03=查询失败',
    RegisterFail: '04=注册失败',
    LoginFail: '05=登录失败',
    LogoutFail: '06=登出失败',
    PhoneError: '09=请输入正确的手机号',
    UserExisted: '10=手机号已经被注册',                //手机号已经存在
    PhoneOrPasswordError: '11=手机号或者密码错误',    //手机号或者密码错误      
    UserNotExist: '12=手机号不存在',               //手机号不存在 
    SmsCodeError: '13=验证码错误', //验证码错误
    ReSendSms:'14=请重新发送验证码'
};

module.exports = RetCode
