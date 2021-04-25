import Vue from "vue"
import VueRouter from "vue-router";

// 引入主面板组件
import Layout from "../views/layout/LayOut"
import rechargeOrder from "../views/customer/rechargeOrder/index.vue"
import withdrawOrder from "../views/customer/withdrawOrder/index.vue"
Vue.use(VueRouter);

let routes = [
    //Customer service
    // {
    //   path:"/",   //一上来就重定向s
    //   redirect:"/customer/rechargeOrder"  
    // },
    {
        path:"/",
        name:"LayOut",
        component:Layout,
        redirect:"/index",
        children:[
            {path:"index",name:"index",component:()=>import("@/views/home/index")}
        ]
    },
    {
        path:"/customer",
        component:Layout,
        children: [
            {path: "rechargeOrder",name:"rechargeOrder",component:rechargeOrder},
            {path: "withdrawOrder",name:"withdrawOrder",component:withdrawOrder},
        ]
    },
    // {path:"*",name:"notFound",component:()=>import('@/views/NotFound')},
];

let router = new VueRouter({
    routes
});
// 全局路由守卫
// router.beforeEach((to,form,next)=>{
//     if(to.path === "/customer/rechargeOrder"){
//        return  next();
//     }
//     let token = window.sessionStorage.getItem("token");
//     // if(!token){
//     //     return  next("/login");
//     // }
//     next();
// })
export default router;







































