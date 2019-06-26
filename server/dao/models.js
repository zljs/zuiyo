module.exports = {
    version:{
        version:{
            type:String,
            required:true
        }
    },
    user: {
        name:{
            type:String,
            required:true
        },
        password: {
            type:String,
            required: true
        },
        nickname: String,
        uuid:String,
        avatar: String,
        roles: Array,
        createTime: { type: Date, default: Date.now},
        loginTime: Date
    },

}