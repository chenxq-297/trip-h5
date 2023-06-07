import { createRouter,createWebHashHistory } from "vue-router"
import Home from '@/views/home/index.vue'

const routes = [
    { path: '/', redirect:"/home" },
    { path: '/home',name:'home', component:Home },
    { path: '/order',name:'order', component: ()=>import('@/views/order/index.vue') },
    { path: '/message',name:'message', component: ()=>import('@/views/message/index.vue') },
    { path: '/favor',name:'favor', component: ()=>import('@/views/favor/index.vue') },
    { path: '/city',name:'city', component: ()=>import('@/views/city/index.vue'),meta:{hideTabBar:true,keepAlive:true} },
  ]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router