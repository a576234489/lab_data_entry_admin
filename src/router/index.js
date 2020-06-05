import Vue from 'vue'
import Router from 'vue-router'
Vue.use(Router)

const Login = ()=>import('views/login')

import Layout from 'views/layout/Layout'

const HomePage = ()=>import('views/homePage/HomePage')

const PlateformAccount = ()=>import('views/plateformAccount/PlateformAccount');
const Role = ()=>import('views/role/Role')
const ResourceCategory = ()=>import('views/resourceCategory/ResourceCategory')
const Resource = ()=>import('views/resource/Resource')
const Menu = ()=>import('views/menu/Menu')





const routes = [
  {
    path:'/login',
    component:Login,
    hidden:true
  },
  {
    path:'/',
    component:Layout,
    redirect:'/homePage',
    children:[
      {
        path:'homePage',
        name:'/',
        component:HomePage,
        meta:{title:'首页',icon:'dashboard',affix:true},
      }
    ]
  },
  {
    path:'/systemBasic',
    component:Layout,
    meta:{title:'系统基础管理',icon:'list'},
    children:[
      {
        path:'plateformAccount',
        component:PlateformAccount,
        name:'systemBasic',
        meta:{title:'平台账号管理',icon:'home'},
      },
      {
        path:'role',
        component:Role,
        name:'systemBasic',
        meta:{title:'角色管理',icon:'home'},
      },
      {
        path:'resourceCategory',
        component:ResourceCategory,
        name:'systemBasic',
        meta:{title:'资源分类管理',icon:'home'},
      },
      {
        path:'resource',
        component:Resource,
        name:'systemBasic',
        meta:{title:'资源管理',icon:'home'},
      },
      {
        path: 'menu',
        name: 'systemBasic',
        component:Menu,
        meta: {title: '菜单列表', icon: 'ums-menu'}
      },
    ]
  },



]

export const constantRouterMap = [
  {
    path:'/login',
    component:Login,
    hidden:true
  },
  {
    path:'',
    component:Layout,
    redirect:'/homePage',
    children:[
      {
        path:'homePage',
        name:'/',
        component:HomePage,
        meta:{title:'首页',icon:'dashboard',affix:true},
      }
    ]
  },
]

export const asyncRouterMap = [
  {
    path:'/systemBasic',
    component:Layout,
    meta:{title:'系统基础管理',icon:'home'},
    name:'systemBasic',
    children:[
      {
        path:'plateformAccount',
        component:PlateformAccount,
        name:'plateformAccount',
        meta:{title:'平台账号管理',icon:'gen'},
      },
      {
        path:'role',
        component:Role,
        name:'role',
        meta:{title:'角色管理',icon:'gen'},
      },
      {
        path:'resourceCategory',
        component:ResourceCategory,
        name:'resourceCategory',
        meta:{title:'资源分类管理',icon:'gen'},
      },
      {
        path:'resource',
        component:Resource,
        name:'resource',
        meta:{title:'资源管理',icon:'gen'},
      },
      {
        path: 'menu',
        name: 'menu',
        component:Menu,
        meta: {title: '菜单列表', icon: 'gen'}
      },
    ]
  }
]

const router = new Router({
  routes,
  mode:'history'
})

export default router
