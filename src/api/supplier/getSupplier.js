const Supplier = require('./supplierTable.js')

module.exports ={
    //返回供货商
    getSupplier:function(req,res){
        Supplier.find({},{
            __v:false,
            _id:false,
            address:false,
            phone:false
        }).then(data=>{
            res.send(data);
        })
    },
    //添加供货商
    setSupplier:function (req,res) {
        //console.log("aaaaaaaa",req.body.params)
        let {supplier,boss,address,phone} = req.body.params;
        Supplier.findOne({supplier: supplier}).then(data=>{
            if( data ){
                res.send({errno:1})
                return;
            }
            res.send({errno:0});
            Supplier.create({
                supplier,
                boss,
                address,
                phone
            })
        })
    }
}














