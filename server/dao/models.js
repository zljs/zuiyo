module.exports = {
    version: {
        version: {
            type: String,
            required: true
        }
    },
    user: {
        phone: { type: String, required: true },
        name: { type: String, default: this.phone },
        password: { type: String, required: true },
        uuid: { type: String, default: '' },
        avatar: { type: String, default: '' },
        roles: { type: Array, default: [] },
        createTime: { type: Date, default: Date.now },
        token: { type: String, default: '' },
        loginTime: Date
    },

}