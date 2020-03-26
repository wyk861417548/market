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
                    <template >
                        <el-button type="primary" icon="el-icon-edit" size="mini" @click="updateSelf"></el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-card>
        <!--修改用户对话框-->
        <el-dialog title="提示" :visible.sync="editdialogVisible" width="30%">
            <el-form :model="editForm" :rules="editRules" ref="ruleForm" label-width="100px">
                <el-form-item label="用户名" >
                    <el-input v-model="editForm.username" disabled></el-input>
                </el-form-item>
                <el-form-item label="年龄">
                    <el-input v-model="editForm.age"></el-input>
                </el-form-item>
                <el-form-item label="性别">
                    <el-input v-model="editForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="电话">
                    <el-input v-model="editForm.phone"></el-input>
                </el-form-item>
                <el-form-item label="角色">
                    <el-input v-model="editForm.role" disabled></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                    <el-button @click="editdialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="editupdateSelf">确 定</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import {getCookie} from "../../common/js/cookie.js";
    export default {
        name: "selfuser",
        data(){
            return{
                selfuser:[],
                user:'',
                editdialogVisible:false,
                editForm:[],
                editRules:{
                    age: [
                        { required: true, message:'请输入年龄' , trigger: 'blur' },
                        { type: 'number', message: '年龄必须为数字值',trigger: 'blur' },
                    ],
                    sex: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 1, max: 2, message: '长度在 1 到 2 个字符', trigger: 'blur' }
                    ],
                    phone:[
                        { required: true, message: '请输入电话号码', trigger: 'blur' },
                        { min: 11, max: 11, message: '长度在 11个字符', trigger: 'blur' }
                    ]
                }
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
                    //console.log("ssssssssssss",data)
                    this.selfuser = data.data
                    this.editForm = data.data[0]
                    //console.log("ssssssssssss",this.selfuser)
                })
            },
            //修改自身信息
            updateSelf(){
                this.editdialogVisible = true;
            },
            editupdateSelf(){
                this.$axios.post('http://localhost:7878/updateSelf',{params:this.editForm}).then()
                this.editdialogVisible = false;
            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
</style>