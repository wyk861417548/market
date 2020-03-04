<template>
    <el-container class="home-content">
        <!--页面头部-->
        <el-header>
            <div>
                <span>丰民超市欢迎{{user}}用户</span>
            </div>
            <el-button v-on:click="quit">退出</el-button>
        </el-header>
        <!--页面主体区域-->
        <el-container>
            <!--页面侧边栏 router用了组件了路由方法开启后  绑定的index会作为跳转路由-->
            <el-aside :width="isCollapse?'64px':'200px'">
                <div class="toggle-button" @click="toggleCollapse">|||</div>
                <el-menu background-color="#333744" text-color="#fff"
                         active-text-color="#ffd04b" unique-opened
                         :collapse="isCollapse" :collapse-transition="false" router>
                    <el-submenu :index="item.id" v-for="item in menulist" :key="item.id">
                        <template slot="title">
                            <i class="el-icon-location"></i>
                            <span>{{item.authName}}</span>
                        </template>
                        <el-menu-item :index="'/'+subItem.path" v-for="subItem in item.children" :key="subItem._id">
                            <template slot="title">
                                <i class="el-icon-menu"></i>
                                <span>{{subItem.authName}}</span>
                            </template>
                        </el-menu-item>
                    </el-submenu>
                </el-menu>
            </el-aside>
            <!--右侧内容主体-->
            <el-main>
                <!--路由占位符 将匹配的组件渲染在此-->
                <router-view></router-view>
            </el-main>
        </el-container>
    </el-container>
</template>

<script>
    import {getCookie,delCookie} from "../common/js/cookie.js";
    export default {
        data() {
            return {
                menulist:[],
                isCollapse:false,
                user:'',
                role:[]
            }
        },
        created(){
            //this.getMenulist(),
            this.user = getCookie('username');
            this.getRole()
        },
        // mounted(){
        //     this.getRoleList(this.role)
        // },
        methods:{
            //删除cookie退出
            quit(){
                /*删除cookie*/
                delCookie('username');
                let uname = getCookie('username')
                if(uname == ""){
                    this.$router.push('/')
                }
            },
            //获取所有的菜单
            // getMenulist(){
            //     this.$axios.get('http://localhost:7878/menus').then(data=>{
            //         let datas = data.data;
            //         this.menulist = datas;
            //         console.log(datas)
            //     })
            // },

            //获取用户对应角色的权限信息
            getRole(){
                let _this = this;
                new Promise(function (resolve) {
                    _this.$axios.post(`http://localhost:7878/home/${_this.user}`).then(data=>{
                        console.log("aaaaaaa",data.data)
                        _this.role = data.data
                        resolve(_this.role)
                    })
                }).then(function (role) {
                    _this.$axios.post(`http://localhost:7878/home/role`,{params:role}).then(data=>{
                        console.log(data)
                        _this.menulist = data.data[0].children;
                        console.log(_this.menulist)
                        // this.role = data.data[0].role;
                    })
                })

            },
            toggleCollapse(){
                this.isCollapse = !this.isCollapse
            }
        }
    };
</script>

<style lang="less" scoped>
.home-content{
    height: 100%;
}
.el-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    background-color: #373d41;
    color: #fff;
    font-size: 30px;
}

.el-aside {
    background-color: #333744;
    .el-menu{
        border-right: 0;
    }
}
.el-main{
    background-color: #eaedf1;
}
.toggle-button{
    background-color: #4a5064;
    font-size: 10px;
    text-align: center;
    line-height: 20px;
    letter-spacing: 5px;
    color: #ddd;
}
</style>