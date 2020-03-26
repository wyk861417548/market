<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>角色管理</el-breadcrumb-item>
            <el-breadcrumb-item>角色列表</el-breadcrumb-item>
        </el-breadcrumb>

        <!--角色列表内容-->
        <el-card>
            <!--<el-button type="primary" @click="setRoleList">添加角色</el-button>-->
            <el-table  border size="mini" :data="roleList" >
                <!--展开列-->
                <el-table-column type="expand" >
                    <template slot-scope="scope">
                        <el-row :class="['bdbottom','ali-center',
                        index ===0?'bdtop':'']"
                        v-for="(item1,index) in scope.row.children"  :key="item1.id">
                            <!--渲染一级权限-->
                            <el-col :span='5'>
                                <el-tag>{{item1.authName}}</el-tag>
                                <i class="el-icon-caret-right"></i>
                            </el-col>
                            <!--渲染二级权限和三级权限-->
                            <el-col :span='19'>
                                <el-row :class="[index===0?'':'bdtop','ali-center']"
                                        v-for="(item2,index) in item1.children" :key="item2.id">
                                    <el-col :span='6'>
                                        <el-tag type="success">{{item2.authName}}</el-tag>
                                        <i class="el-icon-caret-right"></i>
                                    </el-col>
                                    <el-col :span='18'>
                                        <el-tag type="success" @close="removeRoleId" v-for="(item3) in item2.children"
                                                :key="item3.id" closable>
                                            {{item3.authName}}
                                        </el-tag>
                                    </el-col>
                                </el-row>
                            </el-col>
                        </el-row>
                    </template>
                </el-table-column>
                <!--索引列-->
                <el-table-column type="index" ></el-table-column>
                <el-table-column label="角色名称" prop="roleName"></el-table-column>
                <el-table-column label="角色描述" prop="roleDesc"></el-table-column>
                <el-table-column label="操作" >
                    <el-button type="danger" icon="el-icon-delete" size="mini"></el-button>
                    <el-tooltip effect="dark" content="分配角色" placement="top" >
                        <el-button type="warning" icon="el-icon-setting" size="mini"></el-button>
                    </el-tooltip>
                </el-table-column>

            </el-table>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "role",
        data(){
            return{
                roleList:[]
            }
        },
        created(){
            this.getRoleList()
        },
        methods:{
            getRoleList(){
                this.$axios.post('http://localhost:7878/role').then(data=>{
                    this.roleList = data.data
                })
            },
            setRoleList(){
                this.$axios.post('http://localhost:7878/addrole').then()
            },
            removeRoleId(){
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                })
            }
        }
    }
</script>

<style lang="less" scoped>
.el-breadcrumb{
    margin-bottom: 15px;
}

.bdtop{
    border-top:1px solid #eee
}
.bdbottom{
    border-bottom:1px solid #eee
}
.ali-center{
    display: flex;
    align-items: center;
}
.el-col{
    padding: 5px 0;
}
</style>