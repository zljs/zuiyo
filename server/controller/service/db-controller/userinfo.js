let User = global.dbHelper.getModel('user')


/**
 * 根据UserName得到一条数据
 * @param  {object} args  参数
 * @return {object}       结果
 */
const findUser = async (args) => {
    try {
        const oldUserDoc = await User.findOne(args)
        if (oldUserDoc) {
            return oldUserDoc
        }
        return null
    } catch (e) {
        throw 500
    }
}
/**
   * 增加一条数据
   * @param  {object} user  参数
   * @return {object}       结果
   */
const createUser = async (user = {}) => {
    try {
        const newUserDoc = await User.create(user)
        if (oldUserDoc) {
            return oldUserDoc
        }
        return null
    } catch (e) {
        throw 500
    }
}
module.exports = { findUser, createUser }