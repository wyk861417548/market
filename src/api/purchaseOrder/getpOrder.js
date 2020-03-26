const Porder = require('./pOrderTable.js')
const {getDate} = require('../../common/js/getDate.js')
module.exports = {
    //设置进货订单
    setporder:function (req,res) {
        //console.log(req.body.params);
        let {sup:supplier,pro:children} = req.body.params;
        if( children == undefined ){
            return;
        }
        let time = getDate()
        console.log(supplier,children)
        Porder.create({
            supplier,
            children,
            time
        })
    },
    //获取进货订单
    getporder:function (req,res) {
        Porder.find({}).then(data=>{
            res.send(data);
        })
    }
}
















