var Joi = require('joi');
let paramSchema = Joi.object().keys({
    // 3 - 30 个 数字、字符 
    username: Joi.string().alphanum().min(3).max(30).required(),

    // 3 - 30 位 字母数字组合密码 
    password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/),

    // string || number 都可以通过 
    access_token: [Joi.string(), Joi.number()],

    // 生日限制 
    birthyear: Joi.number().integer().min(1900).max(2018),

    // email 限制 
    email: Joi.string().email(),

    // URI限制 
    website: Joi.string().uri({ scheme: ['git', /git+https?/] }),

    // ==== 允许为空/ 否认不允许为空 ==== 
    search: Joi.string().allow(''),

    // 验证枚举值，如果不传，默认为all 
    type: Joi.string().valid('disabled', 'normal', 'all').default('all'),

    // 开始时间 会自动格式化 
    startTime: Joi.date().min('1-1-1974').max('now'),

    // 结束时间 必须大于开始时间，小于2100-1-1 
    endTime: Joi.when(
        Joi.ref('startTime'),
        {
            is: Joi.date().required(),
            then: Joi.date().max('1-1-2100')
        }
    ),

    // 页码 限制最小值 
    page: Joi.number().integer().min(1).default(1),
    pageSize: Joi.number().integer().default(8),
    // deleteWhenLtTen: Joi.number().integer().max(10).strip(), 

    // 数组中包含某个字段 && 数字 
    arrayString: Joi.array().items(
        // 数组中必须包含 name1 
        Joi.string().label('name1').required(),
        // 数组中必须包含 数字 
        Joi.number().required(),
        // 除掉【以上类型的以外字段】---数组中可以包含其他类型，如bool
        Joi.any().strip()
    ),

    // 数组对象, 如需其参考以上字段 
    arrayObject: Joi.array().items(
        Joi.object().keys({
            age: Joi.number().integer().max(200),
            sex: Joi.boolean()
        })
    )
})
// with ('isA', 'AVal') //意思是，isA 和 AVal 这两字段如果填写了isA，也必须要填写AVal
// with ('isB', 'BVal') //道理同上
// without('isA', 'isB'); //意思是 isA 和 isB 只能填写其中一个    
// or('isA', 'isB') //意思是 isA 和 isB 这两字段至少填写其一


/**
 * validate helper via Joi package
 * @param {String} position the validate object position
 * @returns {Function} return one function contain two arguments：checkObj 
 * --- the object need validate, schema --- joi validate schema;
 * and return one message for info or false to show validate successful
 */
const joiValite = (checkObj, schema) => {
    const { error } = Joi.validate(checkObj, schema, {
        convert: false, allowUnknown: true, abortEarly: true
    })
    if (error) {
        const {
            details: [ { message, path } ]
        } = error
        return `请检查参数${path[0]}是否正确，${message}`
    }
    return false
}

const checkUser = (testData) => {
    let JoiUser = Joi.object().keys({
        phone: Joi.string().regex(/^1[3-9][0-9]\d{8}$/).length(11).required(),
        password: Joi.string().regex(/^[a-zA-Z0-9]{3,30}$/).allow(''),
        authcode: Joi.string().allow('')
    }).or('password', 'authcode')
    return joiValite(testData, JoiUser)
}

const checkPhone = (obj) => {
    let phoneScame = Joi.string().regex(/^1[3-9][0-9]\d{8}$/).length(11).required()
    return joiValite(obj, phoneScame)
}
module.exports = { joiValite, checkUser, checkPhone }

