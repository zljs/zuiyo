const Koa = require('koa')
const app = new Koa()
const router = require('./router')
const middleware = require('./middleware')

const mongo = require('./db-school')
mongo(app)
middleware(app)
router(app)

