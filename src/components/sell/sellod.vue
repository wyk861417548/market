<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>销售管理</el-breadcrumb-item>
            <el-breadcrumb-item>销售订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--销售订单内容-->
            <el-table border size="mini" :data="Sellod">
                <!--展开显示详细订单-->
                <el-table-column type="expand">
                    <template slot-scope="scope">
                        <el-row v-for="(item) in scope.row.children"  :key="item._id" id="proder">
                            <el-button type="info" plain class="btn">
                                <ul >
                                    <li>商品：<span>{{item.productName}}</span></li>
                                    <li>价格：<span>{{item.price}}</span></li>
                                    <li>已购：<span>{{item.num}}</span></li>
                                    <li>小计：<span>{{item.num*item.price}}</span></li>
                                </ul>
                            </el-button>
                        </el-row>
                    </template>
                </el-table-column>
                <el-table-column label="总计" prop="totalMoney"></el-table-column>
                <el-table-column label="时间" prop="time"></el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateSelf(scope.row)"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "sellod",
        data(){
            return{
                Sellod:[]
            }
        },
        created(){
            this.getSellod()
        },
        methods:{
            getSellod:function () {
                this.$axios.post('http://localhost:7878/getSellod').then(data=>{
                    this.Sellod = data.data.reverse();
                    //console.log('已有订单',this.Sellod)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
.btn{
    text-align: justify;
    padding: 5px;
}
</style>