import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import home from '../components/home.vue'
import register  from '../components/register.vue'
import welcome  from '../components/welcome.vue'
import user from '../components/user/user.vue'
import selfuser from '../components/selfuser/selfuser.vue'
import power from '../components/power/power.vue'
import role from '../components/role/role.vue'
import sell from '../components/sell/sell.vue'
import sellod from '../components/sellod/sellod.vue'
import purchase from '../components/purchase/purchase.vue'
import purchaseod from '../components/purchaseod/purchaseod.vue'
import stock from  '../components/stock/stock.vue'
import stockod from '../components/stockod/stockod.vue'
import aa from '../components/aa.vue'
import {getCookie} from "../common/js/cookie.js";

Vue.use(VueRouter)

const router =  new VueRouter({
    routes : [
        {
            path:'/',
            redirect:'/login'
        },
        {
            path:'/login',
            component:login
        },
        {
            path:'/home',
            component:home,
            redirect:'/welcome',
            children:[{
                path:'/welcome',
                component:welcome
            },{
                path:'/user',
                component:user
            },{
                path:'/selfuser',
                component:selfuser
            },{
                path:'/power',
                component:power
            },{
                path:'/role',
                component:role
            },{
                path:'/sell',
                component:sell
            },{
                path:'/sellod',
                component:sellod
            },{
                path:'/purchase',
                component: purchase
            },{
                path:'/purchaseod',
                component: purchaseod
            },{
                path:'/stock',
                component: stock
            },{
                path:'/stockod',
                component: stockod
            }]
        },
        {
            path:'/register',
            component:register
        },
        {
            path:'/aa',
            component:aa
        }
    ]
})

router.beforeEach((to,path,next)=>{
    let uname = getCookie('username');
    if(to.path === '/login') return next();
    if(to.path === '/register') return next();
    if(!uname)return next('/login');

    next()

})
export default router


