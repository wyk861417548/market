const mongoose = require('mongoose')

mongoose.connect('mongodb://127.0.0.1:27017/supermarket',{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(() => {
    console.log("连接成功supermarket")
}).catch(() => {
    console.log("连接失败")
});

const stockSchema = mongoose.Schema({
    productName:String,
    price:Number,
    amount:Number,
    num:Number
})

module.exports = mongoose.model('stock',stockSchema);













