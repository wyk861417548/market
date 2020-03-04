<template>
    <div class="">
        <div class="register_box">
            <el-form :model="registerForm" status-icon :rules="rules" ref="ruleForm" label-width="100px" class="register_form">
                <el-form-item label="用户名" prop="username" >
                    <el-input type="text" v-model="registerForm.username"></el-input>
                </el-form-item>
                <el-form-item label="密码" prop="password">
                    <el-input type="password" v-model="registerForm.password"></el-input>
                </el-form-item>
                <el-form-item label="确认密码" prop="checkpass">
                    <el-input type="password" v-model="registerForm.checkpass"></el-input>
                </el-form-item>
                <el-form-item label="年龄" prop="age">
                    <el-input type="age" v-model.number="registerForm.age"></el-input>
                </el-form-item>
                <el-form-item label="性别" prop="sex">
                    <el-input type="text" v-model="registerForm.sex"></el-input>
                </el-form-item>
                <el-form-item label="电话号码" prop="phone">
                    <el-input type="text" v-model="registerForm.phone"></el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary" @click="sign">去登录</el-button>
                    <el-button type="primary" @click="registeredForm('ruleForm')">注册
                    </el-button>
                </el-form-item>
            </el-form>
        </div>
    </div>
</template>

<script>
    export default {
        name: "register",
        data(){
            //对第一次输入密码的操作
            let validatePass = (rule, value, callback)=>{
                    if( value === "" ){
                        callback(new Error('请输入密码'));
                    }else {
                        if( value !== "" ){
                            this.$refs.ruleForm.validateField('checkpass');
                        }
                        callback();
                    }
            }
            //对第二次输入密码的验证
            let validatePass2 = (rule, value, callback)=>{
                    if( value === "" ){
                        callback(new Error('请再次输入密码'));
                    }else if( value !== this.registerForm.password ){
                        callback(new Error('密码不一致'));
                    }else {
                        callback()
                    }
            }
            return{
                //注册数据
                registerForm: {
                    username:'',
                    password: '',
                    checkpass: '',
                    age:'',
                    sex:'',
                    phone:''

                },
                //表单验证规则
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 5, max: 10, message: '长度在 5 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { validator: validatePass, trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
                    checkpass: [
                        { validator: validatePass2, trigger: 'blur' },
                        { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
                    ],
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
        methods:{
            registeredForm(formName) {
                this.$refs[formName].validate((valid) => {
                    //所有校验规则都成立才会成功
                    if (valid) {
                        //把用户信息提交给后台 axios已经放到vue的原型上去了可以this.$axios用
                        this.$axios.post('http://localhost:7878/register',{
                            username:this.registerForm.username,
                            password:this.registerForm.password,
                            age:this.registerForm.age,
                            sex:this.registerForm.sex,
                            phone:this.registerForm.phone
                        }).then(res=>{
                            if( res.data.errno){
                                this.$message({
                                    showClose: true,
                                    message: '用户名已存在',
                                    type: 'error'
                                });
                                return;
                            }
                            this.$message({
                                showClose: true,
                                message: '注册成功',
                                type: 'success'
                            });
                        })
                    }
                })
            },
            sign(){
                this.$router.push('/login')
            }
        }
    }
</script>

<style lang="less" scoped>
.register_box{
    position: relative;
    width: 450px;
    height: 350px;
    background: #fff;
    border: 1px solid #ddd;
    border-radius: 5px;
    margin: 100px auto;
    padding: 20px;
}
.register_form{
    position: absolute;
    top:20px;
    left: 50px;

}
</style>