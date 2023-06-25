import { createRouter,createWebHashHistory } from "vue-router"

const routes = [
    { path: '/', redirect:"/home" },
    { path: '/home',name:'home', component:()=>import('@/views/home/index.vue'),meta:{keepAlive:true} },
    { path: '/order',name:'order', component: ()=>import('@/views/order/index.vue') },
    { path: '/message',name:'message', component: ()=>import('@/views/message/index.vue') ,meta:{hideTabBar:true}},
    { path: '/favor',name:'favor', component: ()=>import('@/views/favor/index.vue') },
    { path: '/city',name:'city', component: ()=>import('@/views/city/index.vue'),meta:{hideTabBar:true,keepAlive:true} },
    { path: '/search',name:'search', component: ()=>import('@/views/search/index.vue'),meta:{hideTabBar:true} },
    { path: '/detail/:id',name:'detail', component: ()=>import('@/views/detail/index.vue'),meta:{hideTabBar:true} },
  ]

const router=createRouter({
    history:createWebHashHistory(),
    routes
})

export default router