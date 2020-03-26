<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>权限管理</el-breadcrumb-item>
            <el-breadcrumb-item>权限列表</el-breadcrumb-item>
        </el-breadcrumb>
        <!--权限列表内容-->
        <el-card>
            <el-table border size="mini" :data="limitList">
            <el-table-column type="index" ></el-table-column>
            <el-table-column label="权限名称" prop="authName"></el-table-column>
            <el-table-column label="路径" prop="path"></el-table-column>
            <!--<el-table-column label="权限等级" prop="limit">-->
                <!--<template slot-scope="scope">-->
                    <!--<el-tag  v-if="scope.row.id ==='101'">一级</el-tag>-->
                    <!--<el-tag  type='success' v-if="scope.row.id ==='201'">二级</el-tag>-->
                    <!--<el-tag  type='warning' v-if="scope.row.id ==='301'">三级</el-tag>-->
                <!--</template>-->
            <!--</el-table-column>-->
            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "power",
        data(){
            return{
                limitList:[],
                item:[]
            }
        },
        created(){
            this.getLimitList()
        },
        methods:{
            getLimitList(){
                this.$axios.post('http://localhost:7878/role').then(data=>{
                    console.log("wwwwwwwww",data.data[0].children)
                    this.limitList=data.data[0].children;

                })
            }
        }
    }
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 15px;
}
.el-table{
    margin-top: 15px;
}
</style>