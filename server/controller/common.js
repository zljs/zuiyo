const CommonService = require('./service/common.js')
module.exports = {
    checkUpdate: async (ctx, _next) => {
        const params = ctx.request.body
        const _VERSION = params.version
        const { data, errmsg } = await CommonService.checkUpdate(_VERSION)
        data && ctx.send(data)
        errmsg && ctx.sendError(errmsg)
    }
}