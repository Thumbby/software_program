import Vue from 'vue';
import Router from 'vue-router';
import Register from '@/views/Register';
import Login from "@/views/Login";
import WorkBench from "@/views/WorkBench"
import FindPassword from "@/views/FindPassword";
import Doc from "@/views/Doc";
import User from "@/views/User";

Vue.use(Router)


const routes = [
    {
        path: '/register',
        name: 'register',
        component: Register,
        meta: {
            title: '注册',
            nacy: 'true'
        }
    },
    {
        path: '/login',
        name: 'login',
        component: Login,
        meta: {
            title: '登录',
            nacy: 'true'
        }
    },
    {
        path: '/findPassword',
        name: 'findPassword',
        component: FindPassword,
        meta: {
            title: '找回密码',
            nacy: 'true'
        }
    },
    {
        path: '/doc',
        name: 'doc',
        component: Doc,
        meta: {
            title: '编辑文本',
            nacy: 'false'
        }
    },
    {
        path: '/workbench',
        name: 'WorkBench',
        component: WorkBench,
        meta: {
            title: '工作台',
            name: '工作台',
            nacy: 'false'
        },

    },
    {
        path: '/user',
        name: 'user',
        component: User,
        meta: {
            title: '个人信息',
            name: '个人资料',
            nacy: 'false'
        }
    },

]

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router