let mongoose = require('mongoose');
let bcrypt = require('bcrypt');
let config = require('../config/config');
Promise = require('bluebird');
Promise.promisifyAll(bcrypt);
let Schema = mongoose.Schema;

//  数据库集合名称：users
const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    nickname: {
        type: String
    },
    avatar: {
        type: String,
        default: 'http://www.baidu.jpg'
    },
    sex:{
        type: String,
    },
    password: {
        type:String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    signature: {
        type: String,
    },
    created_at: {
        type: Date,
        default: Date.now()
    },
    updated_at: {
        type: Date,
        default: Date.now()
    },
    phone: {
        type: Number,
    },
    state: {
        type: Number,
        default: 0 //1-正常，0-禁用
    },
    charactor:{
        type: Number,
        default: 0 //0-普通用户，1-管理员，2-游客
    }
});

UserSchema.pre('save',async function(next){
    let user = this;
    console.log(3,user);
    let salt = await bcrypt.genSaltAsync(config.user.saltRounds);
    console.log(2,salt);
    user.password = await bcrypt.hashAsync(user.password,salt);
    console.log(1,user.password);
    next();
})

const User = mongoose.model('User', UserSchema);
module.exports = User;