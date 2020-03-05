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
            <el-table border >
                <el-table-column label="index" ></el-table-column>
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
        name: "sellod"
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
</style>