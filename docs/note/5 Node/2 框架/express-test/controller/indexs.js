const { exec, escape } = require('../db/helper')

const getPassword = async ( username ) => {
    const sql = `select password from users where username=${escape(username)}`
    const result = await exec(sql)
    return result[0].password
} 

module.exports = {
    getPassword
}