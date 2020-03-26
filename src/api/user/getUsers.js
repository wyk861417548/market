const Users = require('./userTable.js')
module.exports = {
    //登录验证
    getUsers:function (req,res){
        let {username,password} = req.body;
        //( conditions, [projection,[options,[callback]]] )
        // conditions:查询条件
        // projection: 返回的内容选项
        // options: 查询配置选项
        // callback: 回调函数 或是使用promise, 会返回err或是data
        //如果找到用户返回0 否则返回1
        Users.findOne({username}).then(user=>{
            console.log('当前的用户验证',user)
            if( user == null ){
                res.send({errno:1})   //用户不存在
                return;
            }
            Users.findOne({username,password}).then(data=>{
                if( data == null ){
                    res.send({errno:3})    //密码错误
                    return;
                }
                if( data.limit == true ){
                    res.send({errno:0})
                } else {
                    res.send({errno:2})     //用户不被允许登录
                }
            })

        })
    },
    //注册验证
    setUsers:function (req,res){
        //console.log(req.body)
        let {username,password,age,sex,phone} = req.body;

        Users.findOne({username}).then(user=>{
            if( user){  //用户存在 不能注册
                res.send({errno:1})
                return;
            }
            res.send({errno:0});
            Users.create({
                username,
                password,
                age,
                sex,
                phone,
                limit:false,
                role:'普通用户',

            })

        })
    },
    //获取所有用户（分页）
    getUserList:function (req,res) {
        let {query,pagenum,pagesize} = req.body.params;
        //console.log("数据",req.body.params)
        //console.log("查询条件",query)
        if( query ==='' ){
            // Users.find({},{           //查询条件与返回内容选项
            //     __v:false,
            //     _id:false,
            //     password:false
            // },{
            //     skip:(pagenum-1)*pagesize,
            //     limit:Number(pagesize)
            // }).then(data=>{
            //     console.log(data)
            //     res.send(data)
            // })
            Promise.all([
                Users.find({},{           //查询条件与返回内容选项
                    __v:false,
                    _id:false,
                    password:false
                },{
                    skip:(pagenum-1)*pagesize,
                    limit:Number(pagesize)
                }),
                Users.countDocuments(),
                //console.log(Users.countDocuments())
            ]).then(data=>{res.send(data)})
        }else {
            Promise.all([
                Users.find({
                    username:{$regex:query}
                },{           //查询条件与返回内容选项
                    __v:false,
                    _id:false,
                    password:false
                },{
                    skip:(pagenum-1)*pagesize,
                    limit:Number(pagesize)
                }),
                Users.find({
                    username:{$regex:query}
                },{           //查询条件与返回内容选项
                    __v:false,
                    _id:false,
                    password:false
                }).countDocuments(true)
            ]).then(data=>{
                res.send(data)
                console.log("aaaaaa",data)
            })
        }
    },
    //更改用户状态
    updateUserLimit:function (req,res) {
        //console.log(req.body)
        Users.updateOne({username:req.body.username},{$set:{limit:req.body.limit}}).then(data=>{
            // res.send(data)
            //console.log(data)
            console.log('更新成功')
        }).catch(err=>{
            if( err ){throw err}
        })
    },
    //为用户分配角色
    setUserRole:function (req,res) {
        //console.log("传过来的",req.params.id,req.body.params)
        Users.updateOne({username:req.body.params},{$set:{role:req.params.id}}).then(()=>{
            console.log("为用户分配角色成功！！")
        })
    },
    //在登陆之后根据用户将其角色返回home页面
    setRoleList:function (req,res) {
        //console.log(req.params.id)
        Users.find({username:req.params.id},{
            __v:false,
            password:false,
            age:false,
            phone:false,
            limit:false,
            phone:false,
            sex:false
        }).then(data=>{
            //console.log(data)
            res.send(data[0])
        })
    },
    //查询用户自身的账号
    getselfUser:function (req,res) {
        Users.find({username:req.body.params},{           //查询条件与返回内容选项
            __v:false,
            _id:false,
            password:false
        }).then(data=>{
            res.send(data)
            console.log(data)
        })
    },
    //修改自身账号
    updateSelf:function (req,res) {
        //console.log("wwwwwwwwwwwww",req.body.params)
        const {username,age,sex,phone} = req.body.params
        Users.update({
            username:username
        },{
            $set:{
                age:age,
                sex:sex,
                phone:phone
            }
        }).then(data=>{
            console.log(data)
        })
    }
}
















