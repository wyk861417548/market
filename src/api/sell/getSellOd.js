const Sellod = require('./sellTable')
const {getDate} = require('../../common/js/getDate.js')

module.exports = {
    //将销售订单存入数据库中
    setSellod:function (req,res) {
        //console.log('当前的订单',req.body.params)
        let time = getDate();
        let totalMoney = req.body.params[1];
        let arr = req.body.params[0];
        Sellod.create({
            totalMoney:totalMoney,
            time:time,
            children:arr
        }).then(data=>{
            res.send(data);
        })
    },
    //从销售数据库中获取已购订单列表
    getSellod:function (req,res) {
       Sellod.find({},{
           __v:false,
           _id:false
       }).then(data=>{
           res.send(data);
       })
    }
}















