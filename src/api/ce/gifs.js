const mongoose = require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/supermarket", {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("连接成功supermarket")
}).catch(() => {
    console.log("连接失败")
});

const gifs = new mongoose.Schema({
    name:"String",
    age:"String"
})

gifs.create('{name:}');












