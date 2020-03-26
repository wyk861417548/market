<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>用户管理</el-breadcrumb-item>
            <el-breadcrumb-item>用户列表</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--搜索框-->
            <el-row :gutter="20">
                <el-col :span="7">
                    <el-input placeholder="请输入内容" v-model="queryInfo.query">
                        <el-button class="select" slot="append" icon="el-icon-search" @click="getUserList"></el-button>
                    </el-input>
                </el-col>
                <el-col :span="6">
                    <el-button type="primary" @click="dialogVisible=true">添加用户</el-button>
                </el-col>
            </el-row>
            <!--用户列表内容-->
            <el-table size="mini" border :data="userlist" max-height="380">
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="用户名" prop="username"></el-table-column>
                <el-table-column label="年龄" prop="age"></el-table-column>
                <el-table-column label="性别" prop="sex"></el-table-column>
                <el-table-column label="电话号码" prop="phone"></el-table-column>
                <el-table-column label="角色" prop="role"></el-table-column>
                <el-table-column label="状态" prop="limit">
                    <template slot-scope="scope">
                        <el-switch v-model="scope.row.limit" @change="userLimit(scope.row)">
                        </el-switch>
                    </template>
                </el-table-column>
                <el-table-column label="操作" width="180px">
                    <template slot-scope="scope">
                        <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                        <el-tooltip effect="dark" content="分配角色" placement="top" >
                            <el-button type="warning" icon="el-icon-setting" size="mini" @click="setRole(scope.row)"></el-button>
                        </el-tooltip>
                    </template>
                </el-table-column>
            </el-table>
            <!--分页 current-page当前页 page-size每页最大-->
            <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="queryInfo.pagenum"
                    :page-sizes="[6, 10, 15, 20]"
                    :page-size="queryInfo.pagesize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="total">
            </el-pagination>
            <!--添加用户对话框-->
            <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
                <span>添加用户</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
                </span>
            </el-dialog>
            <!--分配角色对话框-->
            <el-dialog title="分配角色" :visible.sync="setRoledialogVisible" @close="dialogVisibleClose" width="30%">
                <div>
                    <p>当前用户：{{userInfo.username}}</p>
                    <p>当前角色：{{userInfo.role}}</p>
                    <p>当前选中角色：
                        <el-select v-model="selectRoleId" placeholder="请选择">
                            <el-option
                                    v-for="item in roleList"
                                    :key="item.id"
                                    :label="item.roleName"
                                    :value="item.roleName">
                            </el-option>
                        </el-select></p>
                </div>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="setRoledialogVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveRoleInfo">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "user",
        data(){
            return{
                queryInfo:{  //搜索字
                    query:'',
                    pagenum:1,  //当前页
                    pagesize:6  //当前每页显示多少条数据
                },
                userlist:[],  //用户列表
                total:0,      //总用户数
                dialogVisible:false,    //用户对话框的显示
                setRoledialogVisible:false,  //分配角色对话框
                userInfo:{},     //存储每行用户信息
                roleList:[], //获取所有角色列表
                selectRoleId:'',//当前选中的角色id
            }
        },
        created(){
            this.getUserList()
        },
        methods:{
            //获取所有用户
            getUserList() {
                this.$axios.post('http://localhost:7878/user',{params:this.queryInfo}).then(data=>{
                    //console.log("bbb",data)

                    this.userlist = data.data[0]
                    this.total = data.data[1]
                    // console.log("aaa",this.userlist)
                })
            },
            //实现用户状态改变
            userLimit(limit){
                this.$axios.post('http://localhost:7878/user/limit',
                    {username:limit.username,limit:limit.limit}).then(()=>{

                })
            },
            //分页  监听pagesize改变
            handleSizeChange(newSize){
               // console.log(newSize)
                this.getUserList();
                this.queryInfo.pagesize = newSize

            },
            //分页 监听页码值改变
            handleCurrentChange(newPage){
                this.getUserList();
                this.queryInfo.pagenum = newPage
            },
            //展示分配权限，通过scope.row把每行对应数据传过来
            setRole(userInfo){
                this.userInfo =userInfo;    //点击分配角色按钮  每次获取点击该行的信息
                this.$axios.post('http://localhost:7878/role').then(data=>{
                    this.roleList = data.data
                })
                this.setRoledialogVisible = true
            },
            //点击按钮 分配角色
            saveRoleInfo(){
                if( !this.selectRoleId ){
                    return this.$message.error("请选择要分配的角色")
                }
                this.$axios.post(`http://localhost:7878/user/${this.selectRoleId}`,{params:this.userInfo.username}).then(()=>{
                    this.$message("角色分配成功");
                    //console.log("bbb",this.userlist)
                })
                this.userInfo.role = this.selectRoleId ;
                this.setRoledialogVisible = false
            },
            //关闭分配角色对话框
            dialogVisibleClose(){
                this.selectRoleId = ''
            }
        }
    }
</script>

<style lang="less" ng="" scoped>
.el-breadcrumb{
   margin-bottom: 15px;
}
.el-table{
    margin-top: 15px;
}
.el-pagination{
    margin-top: 15px;
}
.el-input{
    width: 150px;
}
.select{
    margin: 0;
    padding: 0 0 0 12px;
    height: 40px;
}
</style>