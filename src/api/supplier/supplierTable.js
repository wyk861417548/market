const mongoose = require('mongoose');

mongoose.connect("mongodb://127.0.0.1:27017/supermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功supermarket")
}).catch(() => {
    console.log("连接失败")
});
const supplierSchema = new mongoose.Schema({
    supplier:{
        type:String,
        required:true
    },
    boss:{
        type:String,
        required:true
    },
    address:{
        type:String,
        required:true
    },
    phone:{
        type:String,
        required:true
    }
})

module.exports = mongoose.model('supplier',supplierSchema);














