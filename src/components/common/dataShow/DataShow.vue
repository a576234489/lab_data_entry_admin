<template>
  <div style="max-height:405px;overflow-y: scroll;" class="content">
    <div class="data-content">
      <div class="scene-type">
        <span>场景类型：</span>{{this.applicationScenarioData.sceneName}}
      </div>
      <div class="scenario-type-img">
        <img src="~assets/img/dimian.png" v-show="applicationScenarioData.sceneId == 1">
        <img src="~assets/img/anshi.png" v-show="applicationScenarioData.sceneId == 2">
      </div>
      <div class="desc">
        <p v-show="applicationScenarioData.sceneId == 1">描述：地面的场景.地面的场景描述,场景的特点,场景的注意事项...............地面的场景.地面的场景描述,场景的特点,场景的注意事项...............</p>
        <p v-show="applicationScenarioData.sceneId == 2">描述：暗室的场景.暗室的场景描述,暗室的特点,暗室的注意事项...............</p>
      </div>
      <div v-show="applicationScenarioData.sceneId == 1">
        <span>地面类型：</span>{{this.applicationScenarioData.groundName}}
      </div>
      <div v-show="applicationScenarioData.sceneId == 2">
        <span>数值：</span>计算公式：PG/4πr2
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one">
        <span>环境设置：{{this.applicationScenarioData.environmentName}}</span>
        <span>温度：{{this.applicationScenarioData.temperature}}</span>
        <span>湿度：{{this.applicationScenarioData.humidity}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one">
        <span>微波源类别：{{this.applicationScenarioData.microwaveSourceName}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one">
        <span>频率：{{this.applicationScenarioData.frequency}}</span>
        <span>功率：{{this.applicationScenarioData.power}}</span>
        <span>脉宽：{{this.applicationScenarioData.pwm}}</span>
        <span>重频：{{this.applicationScenarioData.mhz}}</span>
        <span>串数：{{this.applicationScenarioData.numberOfStr}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one">
        <span>天线增益：{{this.applicationScenarioData.antennaDirection}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one">
        <span>效应物名称：{{this.applicationScenarioData.effectorName}}</span>
        <span>效应物类型：{{this.applicationScenarioData.effectorNameType}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one" v-show="this.applicationScenarioData.effectorId == 1">
        <span>类别：{{this.applicationScenarioData.category}}</span>
        <span>型号：{{this.applicationScenarioData.model}}</span>
        <span>样本号：{{this.applicationScenarioData.sampleNo}}</span>
        <span>距离：{{this.applicationScenarioData.distance}}</span>
        <span>角度：{{this.applicationScenarioData.angle}}</span>
      </div>
      <div class="param-show-one" v-show="this.applicationScenarioData.effectorId == 1">
        <span>工作频率：{{this.applicationScenarioData.workingFrequency}}</span>
        <span>带宽：{{this.applicationScenarioData.bandwidth}}</span>
        <span>效应物天线增益：{{this.applicationScenarioData.antennaGain}}</span>
        <span></span>
      </div>
      <div class="param-show-one" v-show="this.applicationScenarioData.effectorId == 2">
        <span>类别：{{this.applicationScenarioData.category}}</span>
        <span>型号：{{this.applicationScenarioData.model}}</span>
        <span>距离：{{this.applicationScenarioData.distance}}</span>
        <span>角度：{{this.applicationScenarioData.angle}}</span>
      </div>
      <div class="param-show-one" v-show="this.applicationScenarioData.effectorId == 2">
        <span>后门类型：{{this.applicationScenarioData.backDoorName}}</span>
        <span>数值：{{this.applicationScenarioData.numberValue}}</span>
        <span>效应物状态：{{this.applicationScenarioData.effectorStatus}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one" style="color: #006837">
        <span>定耦耦合度：{{this.applicationScenarioData.fsCouplingDegree}}</span>
        <span>电缆衰减：{{this.applicationScenarioData.fsAttenuator}}</span>
        <span>衰减器：{{this.applicationScenarioData.fsAttenuator}}</span>
        <span>方向角：{{this.applicationScenarioData.fsBearing}}</span>
        <span>俯仰角：{{this.applicationScenarioData.fsPitchAngle}}</span>
      </div>
      <div class="params-border">
        <div></div>
      </div>
      <div class="param-show-one" style="color: #6a2d94">
        <span>定耦耦合度：{{this.applicationScenarioData.jsCouplingDegree}}</span>
        <span>电缆衰减：{{this.applicationScenarioData.jsAttenuator}}</span>
        <span>衰减器：{{this.applicationScenarioData.jsAttenuator}}</span>
        <span>接收天线增益：{{this.applicationScenarioData.jsAntennaGain}}</span>
      </div>

      <!--<div class="temp-img">-->

      <!--</div>-->
    </div>
    <div class="blank"></div>
  </div>
</template>

<script>
  export default {
    name: "DataShow",
    props: {
      applicationScenarioData: {
        type: Object,
        default: {}
      },
    },
  }
</script>

<style scoped>
  .param-show-one {
    display: flex;
  }
  .param-show-one > span{
    flex: 1;
  }
  .measure-module .param-one > div,.measure-module .param-two > div,js-module .param-one > div,.js-module .param-two > div {
    flex: 1;
  }
  .data-content {
    position: relative;
    top: -20px;
  }
  .data-content .scenario-type-img img {
    margin-top: 0;
  }
  .data-content .desc {
    line-height: 20px;
  }
  .data-content .params-border {
    padding: 10px 0;
  }
  .data-content .three-ele {
    display: flex;
    justify-content: space-between;
  }
  .data-content .two-ele span:nth-child(2) {
    margin-left: 110px;
  }

  .data-content {
    font-size: 14px;
    font-weight: 500;
    color: #999999;
  }
  .data-content > div {
    padding: 5px 0px;
  }
  .wby-img img {
    margin-left: 10px;
  }
  .xyw-img img {
    margin-right: 10px;
  }

  .xyw-img > div {
    position: relative;
    left: -8px;
  }

  .calc-button button {
    bottom: 3px;
    position: relative;
    width: 80px;
  }

  .scenario-data-data > div {
    width: 12%;
  }

  .scenario-data-data-update>div:nth-child(n+1) {
    width: 33%;
  }

  .params-two > div {
    width: 33%;
  }

  .params-border {
    padding: 30px 0 20px 0;
  }
  .params-border div {
    width: 100%;
    height: 1px;
    background-color: #000;
  }

</style>