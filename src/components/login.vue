<template>
    <div class="login_container">
        <div class="login_box">
            <el-form :model="loginForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="login_form">
                <el-form-item label="用户名" prop="username" >
                    <el-input type="text" v-model="loginForm.username" prefix-icon="el-icon-user"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="loginForm.password" prefix-icon="el-icon-goods"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="submitForm('ruleForm')">登录</el-button>
                    <el-button type="primary" @click="registered">免费注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    import '../common/css/login.css'
    import {setCookie} from "../common/js/cookie.js";
    export default {
        data(){
            return {
                loginForm: {
                    username:'',
                    password: '',
                },
                //表单验证规则
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ]
                }
            }

        },
        methods: {
            //表单ref="ruleForm" @click="submitForm('ruleForm')传表单的ref然后引用表单的方法validate
            submitForm(formName) {
                this.$refs[formName].validate(async (valid) => {
                    //所有校验规则都成立才会成功
                    if (valid) {
                        //把用户信息提交给后台 axios已经放到vue的原型上去了可以this.$axios用
                        await this.$axios.post('http://localhost:7878/login',{
                            username:this.loginForm.username,
                            password:this.loginForm.password
                        }).then(res=>{
                            console.log(res.data.errno) //后端返回来的数据 0或 1
                            if( res.data.errno){
                                this.$message({
                                    showClose: true,
                                    message: '用户名或密码错误',
                                    type: 'error'
                                });
                                //alert("登录失败")
                                return;
                            }
                            this.$message({
                                showClose: true,
                                message: '登录成功',
                                type: 'success',

                            });
                            setCookie('username',this.loginForm.username,60*60*24)
                            this.$router.push('/home')
                        })
                    } else {
                        console.log('error submit!!');
                        return false;
                    }

                });
            },
            registered(){
                this.$router.push('/register')
            }
        }
    }

</script>

<style lang="less" scoped>
.login_container{
    background: #ddd;
    height: 100%;
}
.login_box{
    width: 450px;
    height: 300px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    position: relative;
    left: 50%;
    top: 50%;
    transform: translate(-50%,-50%);
}
.login_form{
    position: absolute;
    bottom: 50px;
    left: 50px;

}
/*.login_box{*/
    /*width: 450px;*/
    /*height: 300px;*/
    /*border: 2px solid #ddd;*/
    /*border-radius: 5px;*/
    /*position: absolute;*/
    /*right: 50px;*/
    /*top: 200px;*/

/*}*/
</style>