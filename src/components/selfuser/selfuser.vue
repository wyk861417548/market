<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>本人账号</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--用户列表内容-->
            <el-table border :data="selfuser">
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="年龄" prop="age"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="电话号码" prop="phone"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
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
    import {getCookie} from "../../common/js/cookie.js";
    export default {
        name: "selfuser",
        data(){
            return{
                selfuser:[],
                user:''
            }
        },
        created(){
            this.user = getCookie('username');
            this.getselfUser()
        },
        methods:{
            //获取用户自身账号信息
            getselfUser(){
                this.$axios.post('http://localhost:7878/selfuser',{params:this.user}).then(data=>{
                    console.log(data)
                    this.selfuser = data.data
                })
            },
            //修改自身信息
            updateSelf(){

            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
</style>