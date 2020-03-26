<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>库存管理</el-breadcrumb-item>
            <el-breadcrumb-item>库存列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--库存列表内容-->
            <el-table border size="mini" :data="stock" height="490">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品" prop="productName"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column label="现有" prop="amount"></el-table-column>
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
        name: "stock",
        data(){
            return{
                stock:[]
            }
        },
        created(){
            this.getStock()
        },
        methods:{
            //库存获取商品信息
            getStock:function () {
                this.$axios.post('http://localhost:7878/getStock',{params:''}).then(data=>{
                    this.stock = data.data;
                    //console.log(this.stock)
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
</style>