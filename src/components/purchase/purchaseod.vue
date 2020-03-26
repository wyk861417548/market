<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>进货订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--进货列表内容-->
            <el-table border size="mini" :data="proder" max-height="480">
                <!--展开显示详细订单-->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item) in scope.row.children"  :key="item._id" id="proder">
                            <el-button type="info" plain class="btn">
                                <ul >
                                    <li>商品：<span>{{item.productName}}</span></li>
                                    <li>价格：<span>{{item.price}}</span></li>
                                    <li>已购：<span>{{item.amount}}</span></li>
                                </ul>
                            </el-button>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="供货商" prop="supplier"></el-table-column>
                <el-table-column label="订单时间" prop="time"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="success" icon="el-icon-check" size="mini" @click="showproder(scope.row)"></el-button>
                        <el-button type="danger" icon="el-icon-delete" size="mini" ></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <!--存入库存前确认订单-->
            <el-dialog
                    title="提示"
                    :visible.sync="dialogPurchase"
                    width="30%">
                <span>订单已到货！！！</span>
                <span slot="footer" class="dialog-footer">
    <el-button @click="dialogPurchase = false">否</el-button>
    <el-button type="primary" @click="putproder">是</el-button>
  </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "purchaseod",
        data(){
            return{
                dialogPurchase:false,
                proder:[],   //订单
                pproder:[], //当前要提交的订单,
            }
        },
        created(){
            this.getporder()
        },
        methods:{
            //获取订单
            getporder:function () {
                this.$axios.post('http://localhost:7878/getporder').then(data=>{
                    this.proder = data.data.reverse();
                    //console.log('本次的数据',this.proder);
                })
            },
            //获取当前要提交的订单数据
            showproder:function (data) {
                this.dialogPurchase = true
                this.pproder = data.children;
            },
            //确认订单存入数据库
            putproder:function () {
                this.dialogPurchase = false;

                this.$axios.post('http://localhost:7878/setStock',{params:this.pproder})
            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
#proder{
    display: inline-block;
    margin: 0 0 15px 15px;
}
#proder .el-button ul li{
    text-align: justify;
}
.btn{
     text-align: justify;
     padding: 5px;
}
</style>