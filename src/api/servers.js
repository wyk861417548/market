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

const {getUsers,setUsers,getUserList,updateUserLimit,setUserRole,setRoleList,getselfUser,updateSelf} = require('./user/getUsers.js')
//const {getMenulists,setMenulists} = require('./menulist/getMenulists.js')
const {getRole,setRole,getRoleList} = require('./role/getRole.js')
const {setSupplier,getSupplier} = require('./supplier/getSupplier.js')
const {setPurchase,getPurchase} = require('./purchase/getPurchase.js')
const {setporder,getporder} = require('./purchaseOrder/getpOrder.js')
const {setStock,getStock,updateStock} = require('./stock/getStock')
const {setSellod,getSellod} = require('./sell/getSellOd')

app.post('/login',getUsers)  //登录
app.post('/register',setUsers)  //注册
app.post('/user',getUserList)   //用户列表
app.post('/user/limit',updateUserLimit)  //更改用户状态
//app.get('/menus',getMenulists)   //左侧菜单
app.post('/selfuser',getselfUser)  //获取用户自身的账号
app.post('/updateSelf',updateSelf)  //修改用户自身的账号信息
app.post('/role',getRole)   //获取角色
app.post('/addrole',setRole)   //添加角色
app.post('/home/role',getRoleList)   //根据角色返回左侧权限列表
app.post('/user/:id',setUserRole)   //为用户分配角色
app.post('/home/:id',setRoleList)   //不同用户返回不同功能

//进货
app.post('/setSupplier',setSupplier)   //添加供货商
app.post('/getSupplier',getSupplier)   //返回供货商
app.post('/setPurchase',setPurchase)   //添加商品
app.post('/getPurchase',getPurchase)   //获取商品
app.post('/setporder',setporder)   //提交订单
app.post('/getporder',getporder)   //获取订单

//库存
app.post('/setStock',setStock)   //获取订单存入库存
app.post('/getStock',getStock)   //从库存得到商品
app.post('/updateStock',updateStock)   //销售之后更新库存

//销售
app.post('/setSellod',setSellod)   //获取销售订单存入数据库中
app.post('/getSellod',getSellod)   //从销售数据库中获取销售订单
//app.get('/aa',setMenulists)
app.listen(7878,()=>{
    console.log("端口监听成功")
});











