<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>进货订单</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--进货列表内容-->
            <el-table border >
                <el-table-column label="商品" prop="username"></el-table-column>
                <el-table-column label="价格" prop="age"></el-table-column>
                <el-table-column label="现有" prop="sex"></el-table-column>
                <el-table-column label="库存" prop="phone"></el-table-column>
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
        name: "purchaseod"
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
</style>