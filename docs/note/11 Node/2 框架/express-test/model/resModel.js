class BaseModel {
    constructor(data, message) {
        if (typeof data === 'string') { // 如果 data 是字符串（不是对象），则表明只返回一个信息
            this.message = data
            data = null // 两个设置为 null ，则不走下面的判断了
            message = null
        }
        if (data) { // 
            this.data = data
        }
        if (message) {
            this.message = message
        }
    }
}
// 成功的模型，code = 1
class SuccessModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 1
    }
}
// 失败的模型，code = 0
class ErrorModel extends BaseModel {
    constructor(data, message) {
        super(data, message)
        this.code = 0
    }
}

module.exports = {
    SuccessModel,
    ErrorModel
}