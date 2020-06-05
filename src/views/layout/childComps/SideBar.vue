<template>
  <div>
    <div class="menu-head">
      <div class="menu-head-content"></div>
    </div>
    <el-menu
            background-color="#fff"
            text-color="#3e3a39"
            :default-active="$route.path"
            active-text-color="#409EFF"
            :collapse="isCollapse"
    >
      <side-bar-item :routes="routes" id="side-bar-item"></side-bar-item>
    </el-menu>
  </div>

</template>

<script>
  import {mapGetters} from 'vuex'
  import SideBarItem from 'views/layout/childComps/SideBarItem'
  export default {
    name: "SideBar",
    computed:{
      ...mapGetters(['sidebar','routers']),
      isCollapse(){
        return !this.sidebar.opened
      },
      routes(){
        return this.routers
      },
    },
    created(){
      console.log(this.$router.options.routes)
    },
    components:{
      SideBarItem,
    }

  }
</script>

<style scoped>
  .menu-head {
    height: 35px;
    padding: 23px 20px 8px ;
    border-right: 1px solid #8d8c8c;
  }
  .menu-head-content {
    width: 100%;
    height: 100%;
    background-color: #4d83ff;
    border-radius: 50px;
  }
</style>
