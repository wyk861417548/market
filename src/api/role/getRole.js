const Role = require('./roleTable.js')

module.exports = {
    getRole:function (req,res) {
        Role.find({}).then(data=>{
            res.send(data)
        })
    },
    setRole:function (req,res) {
        Role.create(
            {
                "id": 11,
                "roleName": "后勤",
                "roleDesc": "库存管理员",
                "children": [
                    {

                        "id": 101,
                        "authName": "用户管理",
                        "path": null,
                        "children": [
                            // {
                            //     "id": 104,
                            //     "authName": "用户列表",
                            //     "path": null,
                            // },
                            {
                                "id": 105,
                                "authName": "账号信息",
                                "path": null,
                            }
                        ],
                    },
                    // {
                    //     "id": 201,
                    //     "authName": "商品信息",
                    //     "path": null,
                    //     "children": [
                    //         {
                    //             "id": 204,
                    //             "authName": "商品列表",
                    //             "path": null,
                    //         },
                    //     ],
                    // },
                    // {
                    //     "id": 201,
                    //     "authName": "权限管理",
                    //     "path": null,
                    //     "children": [
                    //         {
                    //             "id": 204,
                    //             "authName": "权限列表",
                    //             "path": null,
                    //         },
                    //         {
                    //             "id": 205,
                    //             "authName": "角色列表",
                    //             "path": null,
                    //         }
                    //     ],
                    // },
                    // {
                    //     "id": 301,
                    //     "authName": "销售管理",
                    //     "path": null,
                    //     "children": [
                    //         {
                    //             "id": 304,
                    //             "authName": "商品列表",
                    //             "path": null,
                    //         },
                    //         {
                    //             "id": 305,
                    //             "authName": "销售订单",
                    //             "path": null,
                    //         }
                    //     ],
                    // },
                    {

                        "id": 401,
                        "authName": "进货管理",
                        "path": null,
                        "children": [
                            {
                                "id": 404,
                                "authName": "进货列表",
                                "path": null,
                            },
                            {
                                "id": 405,
                                "authName": "进货订单",
                                "path": null,
                            }
                        ],
                    },
                    {

                        "id": 501,
                        "authName": "库存管理",
                        "path": null,
                        "children": [
                            {
                                "id": 504,
                                "authName": "库存列表",
                                "path": null
                            },
                            {
                                "id": 505,
                                "authName": "库存订单",
                                "path": null,
                            }
                        ]
                    }
                ]
            }
        )
    },
    //获取登录用户对应角色的权限
    getRoleList:function (req,res) {
        //console.log(req.body.params.role)
        Role.find({roleName:req.body.params.role}).then(data=>{
            //console.log(data)
            res.send(data)
        })
    },
}















