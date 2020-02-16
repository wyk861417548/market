const Users = require('./users.js')
module.exports = {
    getUsers:function (req,res){
        let {username,password} = req.body;
        //( conditions, [projection,[options,[callback]]] )
        // conditions:查询条件
        // projection: 返回的内容选项
        // options: 查询配置选项
        // callback: 回调函数 或是使用promise, 会返回err或是data
        //如果找到用户返回0 否则返回1
        Users.findOne({username,password}).then(user=>{
            if( user ){
                res.send({errno:0})
            }else {
                res.send({errno:1})
            }
        })
    },
    setUsers:function (req,res){
        console.log(req.body)
        let {username,password,age,sex} = req.body;

        Users.findOne({username}).then(user=>{
            if( user ){  //用户存在 不能注册
                res.send({errno:1})
                return;
            }
            res.send({errno:0});
            Users.create({
                username,
                password,
                age,
                sex,
                limit:1
            })

        })
    }
}
















