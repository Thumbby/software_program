import Vue from 'vue'
import Router from 'vue-router'
import Register from '@/views/Register'
import Login from "@/views/Login";
import WorkBench from "@/views/WorkBench"
import User from "@/views/User";

Vue.use(Router)


const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录'
        }
    },
    {
        path: '/workbench',
        name: 'WorkBench',
        component: WorkBench,
        meta: {
            title: '控制台',
            name: '控制台'
        },
        children:[
            {
                path: '/user',
                name: 'user',
                component: User,
                meta: {
                    title: '个人信息',
                    name:'个人资料'
                }
            },
        ]
    }

]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router