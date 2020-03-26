const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/supermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功supermarket")
}).catch(() => {
    console.log("连接失败")
});

const pOrderTableSchema = new mongoose.Schema({
    supplier:{
        type:String,
        required:true
    },
    time:{
        type:String,
        required:true
    },
    children:[{
        productName:{
            type:String,
            required:true
        },
        price:{
            type:Number,
            required:true
        },
        amount:{
            type:Number,
            required:true
        }
    }]
})

module.exports = mongoose.model('porder',pOrderTableSchema);
































