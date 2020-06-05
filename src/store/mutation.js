import Cookies from 'js-cookie'
import {constantRouterMap} from '../router'
export default {
  addVisitedView(state,view){
    if(state.visitedViews
      .some(item=>item.path === view.path))return
    state.visitedViews.push(
      Object.assign({},view,{
        title: view.meta.title||'no-name'
      })
    )
  },
  delView(state,view){
    for(const [i,v] of state.visitedViews.entries()){
      if(v.path == view.path){
        state.visitedViews.splice(i,1);
        break;
      }
    }
  },
  toggleSideBar(state){
    console.log(state);
    if(state.sidebar.opened){
      Cookies.set('sidebarStatus',1)
    }else{
      Cookies.set('sidebarStatus',0)
    }
    state.sidebar.opened = !state.sidebar.opened
  },
  setToken(state,token){
    state.token = token;
  },
  setRoles(state,roles){
    state.roles = roles;
  },
  setHeadPortrait(state,headPortrait){
    state.headPortrait = headPortrait;
  },
  setName(state,name){
    state.name = name
  },
  setNickName(state,nickName){
    state.nickName = nickName
  },
   setId(state,id){
     state.id = id
  },
  setRouters(state,routes){
    state.addRouters = routes;
    state.routers = constantRouterMap.concat(routes);
  }
}
