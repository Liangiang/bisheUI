import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'


//vue页面
import Home from '@/components/Home'
import Login from '@/components/Login'
import index from '@/page/index/index'
import manNews from '@/page/news/manNews'//管理员-首页
/*import managerOrder from '@/page/order/managerOrder'//管理员-订单中心
import examineUser from '@/page/managerExamine/examineUser'//管理员-审核用户
import examineShop from '@/page/managerExamine/examineShop'//管理员-审核店铺
import SamplingInspection from '@/page/SamplingInspection/SamplingInspection'//管理员-抽样检测*/


import userRegister from '@/page/register/userRegister'//顾客-注册
import ShoppingCar from '@/page/ShoppingCar/ShoppingCar'//顾客-购物车
import beforeUserOrder from '@/page/order/beforeUserOrder'//顾客-立即购买
import userOrder from '@/page/order/userOrder'//顾客-订单中心
import pay from '@/page/pay/pay'//顾客-支付页面
import addReport from '@/page/report/add'//顾客-支付页面
// import userInfo from '@/page/userInfo/userInfo'//顾客-顾客信息页面

import shopRegister from '@/page/register/shopRegister'//店铺-注册
import shopIndex from '@/page/index/shopIndex'//店铺-首页
import shopOrder from '@/page/order/shopOrder'//店铺-订单中心
import publishGoods from '@/page/publishGoods/publishGoods'//店铺-商品发布
//
import goodsInfo from '@/page/goodsInfo/goodsInfo'//商品详情

Vue.use(Router)

export const routes = [
  //初始化页面重定向
  {
    path: '/',
    redirect: '/index'
  },
  //-----登录
  {
    path: "/Login",
    component: Login,
    name: "登录",
  },
  //-----开店
  {
    path: "/shopRegister",
    component: shopRegister,
    name: "开店",
  },
  //商品详情###################
  {
    path: "/goodsInfo",
    component: Home,
    name: 'goodsInfo',
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/goodsInfo",
        name: "商品信息",
        component: goodsInfo,
        isPage: true,

      },
    ],
  },
  //-----用户注册
  {
    path: "/userRegister",
    component: userRegister,
    name: "顾客注册",

  },
  //顾客=============首页
  {
    path: "/index",
    component: Home,
    name: Home,
    isPage: true,
    hidden: false,
    children: [
      {
        path: "/index",
        name: "index",
        component: index,
        isPage: true,
        hidden: true
      },
    ],
  },
  //顾客=============购物车---ShoppingCart
  {
    path: "/ShoppingCar",
    component: Home,
    name: "用户购物车",
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/ShoppingCar",
        component: ShoppingCar,
        isPage: true,
        hidden: true,
        name: "",
        meta: {
          keepAlive: true
        }
      },
    ]
  },
  //顾客=============订单中心---userOrder
  {
    path: "/userOrder",
    component: Home,
    name: "用户订单中心",
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/userOrder",
        component: userOrder,
        isPage: true,
        hidden: true,
        name: "",
        meta: {
          keepAlive: true
        }
      },
      {
        path: "/beforeUserOrder",
        component: beforeUserOrder,
        isPage: true,
        hidden: true,
        name: "",
        meta: {
          keepAlive: true
        }
      },
    ]
  },
  //顾客=============支付---pay
  {
    path: "/pay",
    component: Home,
    name: "支付",
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/pay",
        component: pay,
        isPage: true,
        hidden: true,
        name: "",
        meta: {
          keepAlive: true
        }
      },
    ]
  },
//顾客=============添加报告---ShoppingCart
  {
    path: "/addReport",
    component: Home,
    name: "生成报告",
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/addReport",
        component: addReport,
        isPage: true,
        hidden: true,
        name: "",
        meta: {
          keepAlive: true
        }
      },
    ]
  },

  //店铺============首页---shopIndex
  {
    path: "/shopIndex",
    component: Home,
    name: 'g',
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/shopIndex",
        name: "首页",
        component: shopIndex,
        isPage: true,

      },
    ],
  },
  //店铺============订单中心---shopOrder
  {
    path: "/shopOrder",
    component: Home,
    name: 'shopOrder',
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/shopOrder",
        name: "订单中心",
        component: shopOrder,
        isPage: true,

      },
    ],
  },
  //店铺============商品发布---publishGoods
  {
    path: "/publishGoods",
    component: Home,
    name: 'publishGoods',
    isPage: true,
    hidden: true,
    children: [
      {
        path: "/publishGoods",
        name: "发布宝贝",
        component: publishGoods,
        isPage: true,

      },
    ],
  },

  //管理员=============首页
  {
    path: "/index",
    component: Home,
    name: Home,
    isPage: true,
    hidden: false,
    children: [
      {
        path: "/manIndex",
        name: "manNews",
        component: manNews,
        isPage: true,
        hidden: true
      },
    ],
  },
];
export default new Router({
  routes: routes,
})
