
const mongoose = require('mongoose')
const mongodbConf = require('../config')().mongodb
// 账号登陆
const DB_URL = `mongodb://${mongodbConf.address}/${mongodbConf.dbname}`
global.dbHelper = require('../dao/dbHelper.js');

const mongo = (app) => {

    mongoose.Promise = global.Promise
    global.db = mongoose.connect(DB_URL, err => {
        if (err) {
            console.log("数据库连接失败！")
        } else {
            console.log("数据库连接成功！")
            app.listen(process.env.PORT || 3000, () => {
                console.log('server is running at http://localhost:3000')
              })
        }
    })
}
module.exports = mongo