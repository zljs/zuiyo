const Koa = require('koa')
const app = new Koa()

const router = require('./router')
const middleware = require('./middleware')
const paramSchema = require('./utils/joi')

// 验证

// if (value.error) { throw error; }

const mongo = require('./db-school')
mongo(app)
middleware(app)
router(app)

