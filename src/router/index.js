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
const ApplicationScenario = ()=>import('views/applicationScenario/ApplicationScenario')
const DataRecord = ()=>import('views/dataRecord/DataRecord')
const DataRecordAudit = ()=>import('views/dataRecordAudit/DataRecordAudit')
const DataRecordViewAudit = ()=>import('views/dataRecordViewAudit/DataRecordViewAudit')
const DataQueryStatistics = ()=>import('views/dataQueryStatistics/DataQueryStatistics')




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
  },
  {
    path:'/applicationScenarioManagement',
    component:Layout,
    meta:{title:'应用场景管理',icon:'home'},
    name:'applicationScenarioManagement',
    children:[
      {
        path:'applicationScenario',
        component:ApplicationScenario,
        name:'applicationScenario',
        meta:{title:'应用场景',icon:'gen'},
      },
    ]
  },
  {
    path:'/dataRecordManagement',
    component:Layout,
    meta:{title:'数据记录管理',icon:'home'},
    name:'dataRecordManagement',
    children:[
      {
        path:'dataRecord',
        component:DataRecord,
        name:'dataRecord',
        meta:{title:'数据记录',icon:'gen'},
      },
    ]
  },
  {
    path:'/auditManagement',
    component:Layout,
    meta:{title:'审核管理',icon:'home'},
    name:'auditManagement',
    children:[
      {
        path:'dataRecordAudit',
        component:DataRecordAudit,
        name:'dataRecordAudit',
        meta:{title:'数据记录提交审核',icon:'gen'},
      },
      {
        path:'dataRecordViewAudit',
        component:DataRecordViewAudit,
        name:'dataRecordViewAudit',
        meta:{title:'数据记录查看审核',icon:'gen'},
      },
    ]
  },
  {
    path:'/dataQueryStatisticsManagement',
    component:Layout,
    meta:{title:'数据查询统计管理',icon:'home'},
    name:'dataQueryStatisticsManagement',
    children:[
      {
        path:'dataQueryStatistics',
        component:DataQueryStatistics,
        name:'dataQueryStatistics',
        meta:{title:'数据查询统计',icon:'gen'},
      },
    ]
  }
]

const router = new Router({
  routes,
  mode:'history'
})

export default router
