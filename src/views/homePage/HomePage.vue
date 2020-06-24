<template>
  <div class="container">
      <div class="home-title">实验数据建模评估展示（DEMO）系统</div>
      <div class="img-row">
        <img src="~assets/img/sjjl.png" alt="">
        <img src="~assets/img/xnpg.png" alt="">
      </div>
      <div class="img-row img-row2">
        <img src="~assets/img/cxtj.png" alt="">
        <img src="~assets/img/sjdr.png" alt="">
      </div>
  </div>
</template>

<script>
  export default {
    name: "HomePage"
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