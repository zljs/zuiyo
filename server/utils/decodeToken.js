const jwt = require('jsonwebtoken');
const serect = 'zToken';  //密钥，不能丢
module.exports =(tokens) => {

  if (tokens){
    let toke = tokens.split(' ')[1];
    // 解析
    let decoded = jwt.decode(toke, serect);
    return decoded;
  }
};


