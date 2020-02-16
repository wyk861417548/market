const express =require("express");
const bodyParser = require('body-parser');
let app =express();

//对所有的请求都先处理
app.all("*", function (req, res, next) { //解决跨域请求问题
    res.header({
        'Access-Control-Allow-Credentials': true,
        'Access-Control-Allow-Origin': req.headers.origin || '*',
        'Access-Control-Allow-Headers': 'content-type',
        'Access-Control-Allow-Methods': 'PUT,POST,GET,DELETE,OPTIONS',
        'Content-Type': 'application/json; charset=utf-8'
    });
    if (req.method === "OPTIONS") {
        res.status(200).send("OK")
        // eslint-disable-next-line no-console
        //console.log("has option")
    } else {
        next()
    }
});
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

const {getUsers,setUsers} = require('./user/getUsers.js')



app.post('/login',getUsers)

app.post('/register',setUsers)

app.listen(7878,()=>{
    console.log("端口监听成功")
});











