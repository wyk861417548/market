const Menulists = require('./menulistTable.js')

module.exports = {
    getMenulists : function (req,res) {
        Menulists.find({})
            .then(
                data=>{console.log("用户列表数据",data),res.send(JSON.stringify(data))})
            .catch(err=>{
                if( err ){
                    throw err
                }
            })
    },
    setMenulists :function (req,res) {
        Menulists.create({
        "authName":"库存管理","id":"1","limits":"10","childre":[{"id":"2","authName":"库存列表","path":"role"},{"id":"2","authName":"库存订单列表","path":"role"}]
        })
    }
}














