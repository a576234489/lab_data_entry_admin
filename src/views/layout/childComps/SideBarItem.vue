<template>
  <div class="menu-wrapper">
    <!--:index 这个属性是父组件中collapse default-active能生效的关键-->
    <div v-for="item in routes" v-if="!item.hidden" class="side-bar-one">
      <router-link v-if="hasOneShowChildren(item.children)" :to="item.path+'/'+item.children[0].path">
        <el-menu-item :index="item.path+'/'+item.children[0].path">
          <!--<svg-icon v-if="item.children[0].meta.icon" :icon-class="item.children[0].meta.icon"></svg-icon>-->
          <span class="icon-one"></span>
          <span slot="title">{{item.children[0].meta.title}}</span>
        </el-menu-item>
      </router-link>

      <el-submenu v-else :index="item.path">
        <div slot="title">
          <!--<svg-icon v-if="item.meta.icon" :icon-class="item.meta.icon"></svg-icon>-->
          <span class="icon-one"></span>
          <span>{{item.meta.title}}</span>
        </div>
        <div v-for="child in item.children" v-if="!child.hidden" class="sub-menu">
          <router-link :to="item.path+'/'+child.path">
            <el-menu-item :index="item.path+'/'+child.path">
              <!--<svg-icon v-if="child.meta.icon" :icon-class="child.meta.icon"></svg-icon>-->
              <span class="icon-one icon-two"></span>
              <span>{{child.meta.title}}</span>
            </el-menu-item>
          </router-link>
        </div>
      </el-submenu>
    </div>
  </div>
</template>

<script>
  export default {
    name: "SideBarItem",
    props:{
      routes:{
        type:Array,
        default(){
          return [];
        }
      },
    },
    data(){
      return{
        affixTags:[]
      }
    },
    methods:{
      hasOneShowChildren(children){
        const showChildren = children.filter(item=>{
          return !item.hidden
        })
        if(showChildren.length == 1){
          return true;
        }
        return false
      },
    },
  }
</script>

<style scoped>
  .svg-icon {
    margin-right: 16px;
  }
  .router-link-active li{
    color: #3e3a39 !important;
    background-color: #fff !important;
  }
  .sub-menu a li{
    background-color: #fff;
  }
  .icon-one{
    display: inline-block;
    width: 17px;
    height: 17px;
    background-color: #4d83ff;
    border-radius: 50%;
    margin-right: 10px;
  }
  .icon-two{
    width: 8px;
    height: 8px;
  }
</style>
