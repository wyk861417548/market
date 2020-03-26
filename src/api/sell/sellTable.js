const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/supermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功sellod表")
}).catch(() => {
    console.log("连接失败")
});

const sellodSchema = new mongoose.Schema({
    totalMoney:{
        type:Number,
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
        num:{
            type:Number,
            required:true
        }
    }]
})

module.exports = mongoose.model('sellod',sellodSchema);
















