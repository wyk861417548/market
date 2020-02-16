import Vue from 'vue'
import VueRouter from 'vue-router'
import login from '../components/login.vue'
import sell from '../components/sell.vue'
import register  from '../components/register.vue'

Vue.use(VueRouter)

export default  new VueRouter({
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
            path:'/sell',
            component:sell
        },
        {
            path:'/register',
            component:register
        }
    ]
})



