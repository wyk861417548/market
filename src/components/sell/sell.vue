<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>销售管理</el-breadcrumb-item>
            <el-breadcrumb-item>商品列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--搜索框-->
            <el-input placeholder="请输入内容" v-model="query" >
                <el-button class="select" slot="append" icon="el-icon-search" @click="selectQuery"></el-button>
            </el-input>
            <!--销售列表内容-->
            <el-table :data="stockll"  border  size="mini">
                <el-table-column label="商品" prop="productName" align="center"></el-table-column>
                <el-table-column label="价格" prop="price" align="center"></el-table-column>
                <el-table-column label="现有" prop="amount" align="center"></el-table-column>
                <el-table-column align="center" label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="putSell(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <el-card class="footer">
            <!--购物单-->
            <div>
                <el-button class="btn" type="info" plain
                           v-for="item in sellOrder"
                           :key="item.productName" @click="updatesell(item)">
                    <ul>
                        <li>商品：<span>{{item.productName}}</span></li>
                        <li>价格：<span>{{item.price}}</span></li>
                        <li>购买：<span>{{item.num}}</span></li>
                        <li>小计：<span>{{item.num*item.price}}</span></li>
                    </ul>
                </el-button>
            </div>
            <!--提交订单按钮-->
            <div class="btnput">
                <el-button type="danger" plain  @click="dialogSellOd=true">提交订单</el-button>
            </div>
            <p>总计：{{this.totalMoney=sum|xxx(2)}}</p>
        </el-card>
        <!--单个商品修改数量对话框-->
        <el-dialog
                title="提示"
                :visible.sync="dialogsell"
                width="30%" v-model="sellOd">
            <p>{{sellOd.sellName}}</p>
            <el-input type="number" v-model="sellOd.sellNum" :max=sellOd.sellAmount placeholder="请输入内容"></el-input>
            <span slot="footer" class="dialog-footer">
                <el-button @click="dialogsell = false">取 消</el-button>
                <el-button type="primary" @click="updatesure(sellOd)">确 定</el-button>
            </span>
        </el-dialog>
        <!--订单提交前确认-->
        <el-dialog
                title="提示"
                :visible.sync="dialogSellOd"
                width="30%">
            <span>你确定提交订单！！！</span>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogSellOd = false">取 消</el-button>
                    <el-button type="primary" @click="putSellOd">确 定</el-button>
                </span>
        </el-dialog>
    </div>
</template>

<script>
    export default {
        name: "sell",
        data(){
            return{
                stockll:[],   //库存获取的商品信息
                query:'',   //模糊查询条件
                sellOrder:[],  //待完成订单中添加的商品
                dialogsell:false,
                dialogSellOd:false,
                sellOd:{
                    sellName:'',    //销售商品名
                    sellNum:0,       //销售商品数
                    sellAmount:0,     //商品库存数
                },
                totalMoney:0
            }
        },
        created(){
            this.getStockll()
        },
        computed:{
            //商品价格之和
            sum(){
                return this.sellOrder.reduce((pre,cur)=>{
                    return pre + cur.price*cur.num;    /*加括号提升优先级*/
                },0)/*如果不设置初始值  会从数组第一个索引开始*/
                /*
                1、previousValue （上一次调用回调返回的值，或者是提供的初始值（initialValue））
                2、currentValue （数组中当前被处理的元素）
                3、index （当前元素在数组中的索引）
                4、array （调用 reduce 的数组）
                */
            }
        },
        filters:{
            //过滤保留两位小数
            xxx(price,num){
                return "￥"+price.toFixed(num)+"元"      /*toFixed()保留几位小数*/
            }
        },
        methods:{
            //库存获取商品信息
            getStockll:function () {
                this.$axios.post('http://localhost:7878/getStock',{params:this.query}).then(data=>{
                    this.stockll = data.data;
                })
            },
            //模糊查找
            selectQuery:function () {
                this.getStockll()
                this.query=''
            },
            //往订单中添加商品
            putSell:function (row) {
                //console.log('点击穿过来的',row)
                //console.log('存入的',this.sellOrder)
                for( let item of this.sellOrder ){
                    if( item.productName == row.productName){
                        item.num++;
                        //console.log('每次点击添加的',item.num)
                        return;
                    }
                }
                this.sellOrder.push(row);

            },
            //弹出修改购买数对话框
            updatesell:function (item) {
                this.dialogsell=true
                this.sellOd.sellNum = item.num;
                this.sellOd.sellName = item.productName;
                this.sellOd.sellAmount = item.amount;
            },
            //确认修改购买数
            updatesure:function (sel) {
                this.dialogsell=false
                for( let item of this.sellOrder ){
                    if( item.productName == sel.sellName){
                        item.num=sel.sellNum;
                        break;
                    }
                }

            },
            //提交订单,并将订单存入数据库  之后再请求库存数据库
            putSellOd:function () {
                let params = [];
                params.push(this.sellOrder,this.totalMoney)
                this.sellOrder = []
                this.dialogSellOd=false;
                Promise.all([
                    this.$axios.post('http://localhost:7878/updateStock',{params:params[0]}),
                    this.$axios.post('http://localhost:7878/setSellod',{params:params})
                ]).then(data=>{
                    console.log(data)
                    this.getStockll()
                })


                //console.log('代购商品',params)
                // this.$axios.post('http://localhost:7878/setSellod',{params:this.query}).then(data=>{
                //     this.stockll = data.data;
                // })
            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
     margin-top:15px;
}
.el-input{
     width: 150px;
    margin-bottom: 15px;
}
.select{
    margin: 0;
    padding: 0 0 0 12px;
    height: 40px;
}
.btn{
    text-align: justify;
    padding: 5px;
}
.footer div{
    display: flex;
    justify-content:center;
}
.footer .btnput{
    margin-top: 15px;
}
</style>