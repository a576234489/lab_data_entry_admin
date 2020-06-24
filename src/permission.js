import router from './router'
import {getToken} from "./common/auth";
import store from './store'
import {setCookie} from "common/support";

const whiteList = ['/login']
router.beforeEach((to,from,next)=>{
  if(getToken()){
    if(to.path == '/login'){
      next({path:"/"})
    }else{
      console.log("permission-------------")
      if(store.getters.roles.length == 0){
        store.dispatch('getInfo').then(res =>{
          let menus = res.data.menus;
          let username = res.data.username;
          store.dispatch('GenerateRoutes',{menus,username}).then(res => {
            router.addRoutes(store.getters.addRouters);//动态添加可访问路由表
            //console.log(...to)
            next({...to,replace:true})
          })
        }).catch(err =>{
          console.log(err);
        })
      }else{
        next();
      }
    }
  }else{
    if(whiteList.indexOf(to.path) !== -1){//要跳转的路径在白名单中存在
      next();
    }else{//不存在
      // handleLogin();
      next('/login')
    }
  }
})
function handleLogin(){
  store.dispatch('Login',{username:'18163912083',password:'123456'}).then(() => {
    setCookie("username",this.loginForm.username,15);
    setCookie("password",this.loginForm.password,15);
    this.$router.push({path:'/'});
  }).catch((msg) => {
    this.$message({
      message: msg,
      type: 'error',
    });
  })
}
