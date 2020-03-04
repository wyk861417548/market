const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/supermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功supermarket")
}).catch(() => {
    console.log("连接失败")
});

const menulistSchema = new mongoose.Schema({
    authName:{
        type:String,
        required:true
    },
    id:{
        type:String,
        required: true
    },
    limits:{
        type:Number,
        required: true
    },
    childre:[{
        id:{
            type:String,
            required:true
        },
        authName:{
            type:String,
            required:true
        },
        path:{
            type:String,
            required:true
        }
    }]
})
// var munulist ={"authName":"权限管理","id":"1","limits":"10","childre":[{"id":"1","authName":"权限列表","path":"power"},{"id":"0","authName":"角色列表","path":"role"}]}
module.exports = mongoose.model('menulist',menulistSchema);











