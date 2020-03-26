const Stock = require('./stockTable.js')

module.exports ={
    //将订单存入库存
    setStock:function (req,res) {
        //console.log(req.body.params)
        let Sto = req.body.params;
        //console.log('要存入数据库的',Sto)
        for (let i = 0,len=Sto.length; i <len ; i++) {
            Stock.find({productName:Sto[i].productName}).then(data=>{
                    //console.log('商品',data)
                    if( data && data.length > 0 ){
                        let amount = data[0].amount + Sto[i].amount;
                        //console.log(data[0].productName,amount);
                        Stock.updateOne({productName:Sto[i].productName}, {
                            $set:{amount:amount}
                        }).then(data=>{
                            console.log(data);
                        })
                        return;
                    }
                    Stock.create({
                        productName:Sto[i].productName,
                        price:Sto[i].price,
                        amount:Sto[i].amount,
                        num:1
                    })
                }
            )

        }


    },
    //从库存中得到商品信息
    getStock:function (req,res) {
        //console.log(req.body.params)
        let productName = req.body.params;
        //console.log(productName)
        if( productName == '' ){
            Stock.find({},{
                _id:false,
                __v:false
            }).then(data=>{
                res.send(data)
            })
            return;
        }
        Stock.find({
            productName:{
                $regex:productName
            }
        },{
            _id:false,
            __v:false
        }).then(data=>{
            res.send(data)
        })
    },
    //更新库存
    updateStock:function (req,res) {
        let arr = req.body.params;
        for (let j = 0,len=arr.length; j < len; j++) {
            console.log(11111111)
            console.log(j,arr[j].productName)
            Stock.find({productName:arr[j].productName}).then(data=>{
                console.log(data);
                if( data && data.length >0 ){
                    let amount = data[0].amount - arr[j].num;
                    console.log(amount);
                    Stock.updateOne({productName:arr[j].productName}, {
                        $set:{amount:amount}
                    }).then(data=>{
                        res.send(data);
                        console.log(data);
                    })
                    return;
                }
            })
        }
    }
}












