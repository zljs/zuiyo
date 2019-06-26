const ip = require('ip')

module.exports = () => {
    return {
        env: process.env.NODE_ENV || 'development',
        projectName: 'zuiyo',
        appLogLevel: 'debug',
        dir: 'logs',
        serverIp: ip.address(),
        mongodb: {
            address: 'localhost:27017',
            dbname: 'zuiyo'
        }
    }
}