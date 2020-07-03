<template>
  <div class="container">
      <div class="home-title">实验数据建模评估展示（DEMO）系统</div>
      <div class="img-row">
        <img src="~assets/img/sjjl.png" alt="" @click="handelGo(1)"  >
        <img src="~assets/img/xnpg.png" alt=""  @click="handelGo(2)">
      </div>
      <div class="img-row img-row2">
        <img src="~assets/img/cxtj.png" alt=""  @click="handelGo(3)" >
        <img src="~assets/img/sjdr.png" alt=""  @click="handelGo(4)">
      </div>
  </div>
</template>

<script>
  export default {
    name: "HomePage",
    data(){
      return {
        roleName: this.$store.getters.roles[0].name,
      }
    },
    methods: {
      handelGo(val){
        switch (val) {
          case 1:
            if(this.roleName == "实验员"){
              this.$router.push({path:'/dataRecordManagement/dataRecord'})
            }else{
              this.$message({
                message:'无权限',
                type:'warning',
                duration:1000
              })
            }
            break;
          case 2:
            if(this.roleName == "实验员"){
              this.$router.push({path:'/effectEvaluationManagement/effectEvaluation'})
            }else{
              this.$message({
                message:'无权限',
                type:'warning',
                duration:1000
              })
            }
            break;
          case 3:
            this.$router.push({path:'/dataQueryStatisticsManagement/dataQueryStatistics'})
            break;
          case 4:
            this.$message({
              message:'功能暂未开放',
              type:'warning',
              duration:1000
            })
            break;
        }
      }
    }
  }

</script>

<style scoped>
  .container {
    padding: 0 120px;
  }
  .home-title {
    font-size: 32px;
    font-weight: 700;
    text-align: center;
    padding: 30px 0;
    margin-right: 5%;
  }
  .img-row {
    display: flex;
    justify-content: center;
  }
  .img-row img{
    width: 32%;
    height: 30%;
  }
  .img-row img:nth-child(1){
    margin-left: -5%;
  }
  .img-row img:nth-child(2){
    margin-left: 5%;
  }
  .img-row2 {
    margin-top: 30px;
  }
</style>