const Purchase = require('./purchaseTable.js')
module.exports = {
    //添加商品
    setPurchase:function (req,res) {
        //console.log("aaaaaaaa",req.body.params)
        let {supplier} = req.body.params;
        let {productName,price,amount} = req.body.params.productForm;
        //console.log(supplier,productName,price,amount)
        Purchase.find({supplier:supplier}).then(data=>{
            console.log('供货商',data)
            if( data && data.length > 0){
                //console.log(1)
                Purchase.updateOne({supplier:supplier},{
                    $push:{
                        children:[{
                            productName,
                            price,
                            amount
                        }]
                    }
                }).then(data=>{
                    console.log(data);
                    res.send({errno:0})
                })
                return;
            }
            Purchase.create({
                supplier:supplier,
                children: [{
                    productName,
                    price,
                    amount
                }]
            })
        })
    },
    //获取商品
    getPurchase:function (req,res) {
        let supplier = req.body.params;
        //console.log('dawd',supplier)
        Purchase.findOne({supplier:supplier},{}).then(data=>{
            res.send(data)
        })
    }
}














