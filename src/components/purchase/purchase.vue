<template>
    <div>
        <!--面包屑-->
        <el-breadcrumb separator-class="el-icon-arrow-right">
            <el-breadcrumb-item :to="{ path: '/home' }">首页</el-breadcrumb-item>
            <el-breadcrumb-item>进货管理</el-breadcrumb-item>
            <el-breadcrumb-item>供货商</el-breadcrumb-item>
        </el-breadcrumb>
        <el-card>
            <!--添加列表框-->
            <el-row :gutter="20">
                <!--选择供货商-->
                <el-col :span="4">
                    <el-select ref="selectSup" v-model="selectsup"  placeholder="请选择供货商">
                        <el-option
                                v-for="item in supplier"
                                :key="item.boss"
                                :label="item.supplier"
                                :value="item.supplier"
                        >
                        </el-option>
                    </el-select>
                </el-col>
                <el-col :span="6">
                    <el-input placeholder="请输入内容">
                        <el-button slot="append" icon="el-icon-search" ></el-button>
                    </el-input>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogsupplier=true">添加供货商</el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" @click="dialogproduct=true">添加商品</el-button>
                </el-col>
            </el-row>
        </el-card>
        <el-card>
            <!--进货列表内容-->
            <el-table :data="productlist" size="mini" border max-height="320">
                <el-table-column type="index"></el-table-column>
                <el-table-column label="商品" prop="productName"></el-table-column>
                <el-table-column label="价格" prop="price"></el-table-column>
                <el-table-column label="购买数" prop="amount">
                </el-table-column>
                <el-table-column label="操作" >
                    <template>
                        <el-button type="primary" icon="el-icon-circle-close" size="mini" @click="delPurchase"></el-button>
                    </template>
                </el-table-column>
            </el-table>
            <el-button type="danger" plain class="btn" @click="dialogPurchase=true">提交订单</el-button>
            <!--添加供货商对话框-->
            <el-dialog title="提示" :visible.sync="dialogsupplier" width="30%">
                <el-form :model="supplierForm" ref="supplierForm" label-width="100px">
                    <el-form-item label="供货商" >
                        <el-input v-model="supplierForm.supplier"></el-input>
                    </el-form-item>
                    <el-form-item label="老板">
                        <el-input v-model="supplierForm.boss"></el-input>
                    </el-form-item>
                    <el-form-item label="地址">
                        <el-input v-model="supplierForm.address"></el-input>
                    </el-form-item>
                    <el-form-item label="电话">
                        <el-input v-model="supplierForm.phone"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogsupplier = false">取 消</el-button>
                    <el-button type="primary" @click="setSupplier(supplierForm)">确 定</el-button>
                </span>
            </el-dialog>
            <!--添加商品对话框-->
            <el-dialog title="提示" :visible.sync="dialogproduct" width="30%">
                <el-form :model="productForm" ref="supplierFrom" label-width="100px">
                    <el-form-item label="供货商" >
                        <!--选择供货商-->
                        <el-select v-model="selectsup"  placeholder="请选择供货商">
                            <el-option
                                    v-for="item in supplier"
                                    :key="item._id"
                                    :label="item.supplier"
                                    :value="item.supplier">
                            </el-option>
                        </el-select>
                    </el-form-item>
                    <el-form-item label="商品">
                        <el-input v-model="productForm.productName"></el-input>
                    </el-form-item>
                    <el-form-item label="价格">
                        <el-input v-model="productForm.price"></el-input>
                    </el-form-item>
                    <el-form-item label="数量">
                        <el-input v-model="productForm.amount"></el-input>
                    </el-form-item>
                </el-form>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogproduct = false">取 消</el-button>
                    <el-button type="primary" @click="setPurchase(selectsup)">确 定</el-button>
                </span>
            </el-dialog>
            <!--订单提交前确认-->
            <el-dialog
                    title="提示"
                    :visible.sync="dialogPurchase"
                    width="30%">
                <span>你确定提交订单！！！</span>
                <span slot="footer" class="dialog-footer">
                    <el-button @click="dialogPurchase = false">取 消</el-button>
                    <el-button type="primary" @click="addPurchase">确 定</el-button>
                </span>
            </el-dialog>
        </el-card>
    </div>
</template>

<script>
    export default {
        name: "purchase",
        data(){
            return{
                dialogsupplier:false,
                dialogproduct:false,
                dialogPurchase:false,
                supplierForm:{},   //添加供货商
                productForm:{},     //添加商品
                supplier:[],       //供货商
                selectsup:'',      //所选择的供货商
                productlist:[],
                selepurchase:[]    //订单
            }
        },

        created(){
            this.getsupplier()
        },
       
        methods:{
            //获取所有供货商以及对应的商品
            getsupplier:function(){
                this.$axios.post('http://localhost:7878/getSupplier').then(data=>{
                        this.supplier = data.data;
                        this.selectsup = data.data[0].supplier;
                        //获取商品
                        this.getPurchase(this.selectsup)
                        // this.$axios.post('http://localhost:7878/getPurchase',{params:this.selectsup}).then(data=>{
                        //     console.log(data);
                        //     this.productlist = data.data.children;
                        // })
                    }
                )
            },
            //添加供货商
            setSupplier:function (supplierForm) {
                //console.log("商品信息",this.supplierForm)
                this.$axios.post('http://localhost:7878/setSupplier',{params:supplierForm}).then(data=>{
                    if( data.data.errno ){
                        this.$message({
                            showClose: true,
                            message: '供货商已存在',
                            type: 'error',

                        });
                        return;
                    }
                    this.$message({
                        showClose: true,
                        message: '添加成功！！!',
                        type: 'success',

                    });
                    //console.log(data)
                })
                this.supplier.push({supplier:supplierForm.supplier,boss:supplierForm.boss})
                //console.log('3',this.supplier)
                this.dialogsupplier = false;
            },
            //添加商品
            setPurchase:function (supplier) {
                //console.log(11111);
                this.$axios.post('http://localhost:7878/setPurchase',
                    {params:{supplier,productForm:this.productForm}}).then(data=>{
                    if( !data.data.errno){
                        this.$message({
                            showClose: true,
                            message: '添加成功',
                            type: 'success'
                        });
                    }


                })
                this.productForm ={};
                this.dialogproduct = false;
                this.getPurchase(supplier);
            },
            //删除商品
            delPurchase:function(){},
            //获取商品
            getPurchase:function (selectsup) {
                // console.log(1)
                this.$axios.post('http://localhost:7878/getPurchase',{params:selectsup}).then(data=>{
                    this.productlist = data.data.children;
                    //console.log('当前商品',this.productlist)
                })
            },
            //订单确认
            addPurchase:function(){
                this.dialogPurchase=false
                this.putPurchase()
            },
            //提交订单
            putPurchase:function () {
                let params = {sup:this.selectsup,pro:this.productlist}
                this.$axios.post('http://localhost:7878/setporder',{params:params}).then(data=>{
                    console.log(data)
                })
                //console.log('当前订单内的东西',this.selectsup)
            },

        },
        watch:{
            selectsup(newName,oldName){
                if( newName == oldName ){
                   return;
                }
                //console.log("o",oldName)
                //console.log("n",newName)
                this.getPurchase(newName);

            }
        }
    }
</script>

<style lang="less" scoped>
.el-card{
    margin-top:15px;
}
.el-table{
    margin-top: 15px;
}
.btn{
    margin-top: 20px;
}
</style>