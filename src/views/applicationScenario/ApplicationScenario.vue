<template>
  <div class="app-container">
    <el-card class="main-search">
      <div class="main-search-info">
        <div>
          <i class="el-icon-search"></i>
          <span style="margin-left: 2px">筛选</span>
        </div>
        <div class="main-search-info">
          <el-button
                  size="small"
                  @click="handleResetSearch()"
          >
            重置
          </el-button>
          <el-button
                  size="small"
                  @click="handleSearchList()"
          >
            搜索
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px" >
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <div>
            <el-form-item label="应用场景名称:">
              <el-input style="width: 203px" v-model="listQuery.scenarioName" placeholder="应用场景名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="创建日期：">
              <el-date-picker
                      style="width: 203px"
                      class="input-width"
                      v-model="listQuery.createTime"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="datetime"
                      placeholder="创建日期">
              </el-date-picker>
            </el-form-item>
          </div>

        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" style="position: relative">
      <div>
        <i class="el-icon-tickets"></i>
        <span>应用场景</span>
      </div>
      <div>
        <el-button
                class="next-step"
                size="mini"
                @click="handleAdd(1)"
        >
          添加
        </el-button>
        <!--<el-button-->
                <!--class="btn-add-lab next-step"-->
                <!--size="mini"-->
                <!--@click="handleAdd(2)"-->
        <!--&gt;-->
          <!--添加实验效能评估-->
        <!--</el-button>-->
      </div>
    </el-card>
    <div class="table-container">
      <el-table
              :data="list"
              style="width: 100%"
              v-loading="listLoading"
              @selection-change="handleScenarioSelectionChange"
              border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="应用场景名称" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.scenarioName}}</template>
        </el-table-column>
        <el-table-column label="创建人" width="150" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="115px">
          <template slot-scope="scope">
            <p>
              <el-button
                      size="mini"
                      type="text"
                      @click="handleShow(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                      size="mini"
                      type="text"
                      @click="handleDelete(scope.$index, scope.row)">删除
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <div>
        <el-select
                size="small"
                v-model="operateType" placeholder="批量操作"
        >
          <el-option
                  v-for="item in operates"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
          >
          </el-option>
        </el-select>
        <el-button
                class="batch-button"
                type="primary"
                size="small"
                @click="handleBatchOperate()"
        >
          确定
        </el-button>
      </div>
      <div class="pagination-container">
        <el-pagination
                background
                @size-change="handleSizeChange"
                @current-change="handleCurrentChange"
                layout="total, sizes,prev, pager, next,jumper"
                :page-size="listQuery.pageSize"
                :page-sizes="[5,10,15]"
                :current-page.sync="listQuery.pageNum"
                :total="total">
        </el-pagination>
      </div>
    </div>
    <el-dialog
            :title="scenarioAddTitle"
            :visible.sync="scenarioAddDialog"
            :append-to-body='true'
            width="40%"
            class="scenario-add-Dialog"
            :close-on-click-modal = 'false'
    >
      <el-form
              :model="applicationScenarioData"
      >
        <div style="max-height:405px;overflow-y: scroll;" class="content">
          <div v-show="showStatus[0]">
            <el-form-item label="场景名称" class="scenario-form-input-item">
              <el-input placeholder="填写场景名称" v-model="applicationScenarioData.scenarioName"  clearable class="long-input"></el-input>
            </el-form-item>
            <el-form-item label="场景类型" class="scenario-form-input-item">
              <el-select v-model="applicationScenarioData.sceneId"  clearable  class="short-select">
                <el-option
                        v-for="(item,index) in paramForAddData.scenes"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
            </el-form-item>
            <div class="scenario-type-img">
              <img src="~assets/img/dimian.png" v-show="applicationScenarioData.sceneId == 1">
              <img src="~assets/img/anshi.png" v-show="applicationScenarioData.sceneId == 2">
            </div>
            <div class="scenario-typ-desc">
              <div v-show="applicationScenarioData.sceneId == 1 || applicationScenarioData.sceneId == 2">描述</div>
              <p v-show="applicationScenarioData.sceneId == 1">地面的场景.地面的场景描述,场景的特点,场景的注意事项...............地面的场景.地面的场景描述,场景的特点,场景的注意事项...............</p>
              <p v-show="applicationScenarioData.sceneId == 2">暗室的场景.暗室的场景描述,暗室的特点,暗室的注意事项...............</p>
            </div>
            <div class="scenario-typ-desc" v-show="applicationScenarioData.sceneId == 2">
              <div>数值</div>
              <p>计算公式：PG/4πr2</p>
            </div>
            <el-form-item label="地面类型" class="scenario-form-input-item ground-select" v-show="applicationScenarioData.sceneId == 1">
              <div class="ground-parent">
                <el-select v-model="applicationScenarioData.groundId"  clearable  class="short-select">
                  <el-option
                          v-for="(item,index) in paramForAddData.grounds"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                  </el-option>
                </el-select>
                <el-button  size="small" class="ground-add" @click="handleAddGround">新增</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-show="showStatus[1]" class="scenario-environment">
          <el-form-item label="环境类型" class="scenario-form-input-item ground-select environment-select">
            <div class="ground-parent">
              <el-select v-model="applicationScenarioData.environmentId"  clearable  class="short-select">
                <el-option
                        v-for="(item,index) in paramForAddData.environments"
                        :key="index"
                        :label="item.name"
                        :value="item.id">
                </el-option>
              </el-select>
              <el-button  size="small" class="ground-add" @click="handleAddEnvironment">新增</el-button>
            </div>
          </el-form-item>
          <el-form-item label="温度" class="scenario-form-input-item">
            <el-input placeholder="温度" v-model="applicationScenarioData.temperature"  clearable class="short-input"></el-input>
          </el-form-item>
          <el-form-item label="湿度" class="scenario-form-input-item">
            <el-input placeholder="湿度" v-model="applicationScenarioData.humidity"  clearable class="short-input"></el-input>
          </el-form-item>
        </div>
          <div v-show="showStatus[2]" class="scenario-params">
            <el-form-item label="微波源类别" class="scenario-form-input-item ground-select environment-select">
              <div class="ground-parent">
                <el-select v-model="applicationScenarioData.microwaveSourceId"  clearable  class="short-select">
                  <el-option
                          v-for="(item,index) in paramForAddData.microwaveSources"
                          :key="index"
                          :label="item.name"
                          :value="item.id">
                  </el-option>
                </el-select>
              </div>
            </el-form-item>
            <div class="params-one">
              <el-form-item label="频率" class="scenario-form-input-item">
                <el-input placeholder="频率" v-model="applicationScenarioData.frequency"  clearable class="mid-input"></el-input>
              </el-form-item>
              <el-form-item label="功率" class="scenario-form-input-item">
                <el-input placeholder="功率" v-model="applicationScenarioData.power"  clearable class="mid-input"></el-input>
              </el-form-item>
              <el-form-item label="脉宽" class="scenario-form-input-item">
                <el-input placeholder="脉宽" v-model="applicationScenarioData.pwm"  clearable class="mid-input"></el-input>
              </el-form-item>
            </div>
            <div class="params-two">
              <el-form-item label="重频" class="scenario-form-input-item">
                <el-input placeholder="重频" v-model="applicationScenarioData.mhz"  clearable class="mid-input"></el-input>
              </el-form-item>
              <el-form-item label="串数" class="scenario-form-input-item">
                <el-input placeholder="串数" v-model="applicationScenarioData.numberOfStr"  clearable class="mid-input"></el-input>
              </el-form-item>

              <div style="width: 33%;">

              </div>
             </div>
            <div class="params-border">
              <div></div>
            </div>
            <el-form-item label="天线增益" class="scenario-form-input-item ">
              <div class="ground-parent mid-input-long-parent">
                <el-input placeholder="增益值" v-model="applicationScenarioData.antennaDirection"  clearable class="mid-input-long tx-mid-input-long "></el-input>
                <el-button  size="small" class="in-radiation-direction">导入辐射方向</el-button>
              </div>
            </el-form-item>
          </div>
          <div v-show="showStatus[3]" class="effector-module">
            <div class="input-select">
              <el-form-item label="效应物名称" class="scenario-form-input-item">
                <el-input placeholder="效应物名称" v-model="applicationScenarioData.effectorName"  clearable class="mid-input-long-long"></el-input>
              </el-form-item>
              <el-form-item label="效应物类型" class="scenario-form-input-item  environment-select">
                <div class="ground-parent">
                  <el-select v-model="applicationScenarioData.effectorId"  clearable  class="short-select xyw-select">
                    <el-option
                            v-for="(item,index) in paramForAddData.effectors"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </div>
            <div class="params-three params-three-qm" v-show="applicationScenarioData.effectorId == 1">
              <el-form-item label="类别" class="scenario-form-input-item">
                <el-input placeholder="类别" v-model="applicationScenarioData.category"  clearable class="mid-input-little" ></el-input>
              </el-form-item>
              <el-form-item label="型号" class="scenario-form-input-item">
                <el-input placeholder="型号" v-model="applicationScenarioData.model"  clearable class="mid-input-little" ></el-input>
              </el-form-item>
              <el-form-item label="样本号" class="scenario-form-input-item" v-show="applicationScenarioData.effectorId == 1">
                <el-input placeholder="样本号" v-model="applicationScenarioData.sampleNo"  clearable class="mid-input-little"></el-input>
              </el-form-item>
              <el-form-item label="距离" class="scenario-form-input-item" v-show="applicationScenarioData.effectorId == 1 || applicationScenarioData.effectorId == 2">
                <el-input placeholder="距离" v-model="applicationScenarioData.distance"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div class="params-three params-three-hm" v-show="applicationScenarioData.effectorId == 2">
              <el-form-item label="类别" class="scenario-form-input-item">
                <el-input placeholder="类别" v-model="applicationScenarioData.category"  clearable class="mid-input-little" ></el-input>
              </el-form-item>
              <el-form-item label="型号" class="scenario-form-input-item">
                <el-input placeholder="型号" v-model="applicationScenarioData.model"  clearable class="mid-input-little" ></el-input>
              </el-form-item>
              <el-form-item label="距离" class="scenario-form-input-item" v-show="applicationScenarioData.effectorId == 1 || applicationScenarioData.effectorId == 2">
                <el-input placeholder="距离" v-model="applicationScenarioData.distance"  clearable class="mid-input-little"></el-input>
              </el-form-item>
              <el-form-item label="角度" class="scenario-form-input-item" v-show="applicationScenarioData.effectorId == 1 || applicationScenarioData.effectorId == 2">
                <el-input placeholder="角度" v-model="applicationScenarioData.angle"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div class="params-four" v-show="applicationScenarioData.effectorId == 1">
              <el-form-item label="角度" class="scenario-form-input-item">
                <el-input placeholder="角度" v-model="applicationScenarioData.angle"  clearable class="mid-input-little"></el-input>
              </el-form-item>
              <el-form-item label="工作频率" class="scenario-form-input-item">
                <el-input placeholder="工作频率" v-model="applicationScenarioData.workingFrequency"  clearable class="mid-input-little"></el-input>
              </el-form-item>
              <el-form-item label="带宽" class="scenario-form-input-item">
                <el-input placeholder="带宽" v-model="applicationScenarioData.bandwidth"  clearable class="mid-input-little"></el-input>
              </el-form-item>
              <el-form-item label="天线增益" class="scenario-form-input-item">
                <el-input placeholder="天线增益" v-model="applicationScenarioData.antennaGain"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div class="params-four" v-show="applicationScenarioData.effectorId == 1">
              <el-form-item label="效应物状态" class="scenario-form-input-item">
                <el-input placeholder="效应物状态" v-model="applicationScenarioData.effectorStatus"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div class="input-select"  v-show="applicationScenarioData.effectorId == 2">
              <el-form-item label="后门类型" class="scenario-form-input-item  environment-select hm-select">
                <div class="ground-parent">
                  <el-select v-model="applicationScenarioData.backDoorId"  clearable  class="short-select short-select-hm">
                    <el-option
                            v-for="(item,index) in paramForAddData.backDoors"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
              <el-form-item label="数值" class="scenario-form-input-item number-value">
                <el-input placeholder="数值" v-model="applicationScenarioData.numberValue"  clearable class="mid-input-long-long"></el-input>
              </el-form-item>
              <el-form-item label="效应物状态" class="scenario-form-input-item effector-status">
                <el-input placeholder="效应物状态" v-model="applicationScenarioData.effectorStatus"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
          </div>
          <div v-show="showStatus[4]" class="measure-module">
            <div class="fs-module">
              <div>辐射部分</div>
              <div class="param-one">
                <el-form-item label="定耦耦合度" class="scenario-form-input-item">
                  <el-input placeholder="定耦耦合度" v-model="applicationScenarioData.fsCouplingDegree"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <el-form-item label="电缆衰减" class="scenario-form-input-item">
                  <el-input placeholder="电缆衰减" v-model="applicationScenarioData.fsCableAttenuation"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <el-form-item label="衰减器" class="scenario-form-input-item">
                  <el-input placeholder="衰减器" v-model="applicationScenarioData.fsAttenuator"  clearable class="mid-input-little"></el-input>
                </el-form-item>
              </div>
              <div class="param-two">
                <el-form-item label="辐射方向角" class="scenario-form-input-item">
                  <el-input placeholder="辐射方向角" v-model="applicationScenarioData.fsBearing"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <el-form-item label="辐射俯仰角" class="scenario-form-input-item">
                  <el-input placeholder="辐射俯仰角" v-model="applicationScenarioData.fsPitchAngle"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <div style="flex: 1">

                </div>
              </div>
              <div class="params-border">
                <div></div>
              </div>
            </div>
            <div class="js-module">
              <div>接收部分</div>
              <div class="param-one">
                <el-form-item label="定耦耦合度" class="scenario-form-input-item">
                  <el-input placeholder="定耦耦合度" v-model="applicationScenarioData.jsCouplingDegree"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <el-form-item label="电缆衰减" class="scenario-form-input-item">
                  <el-input placeholder="电缆衰减" v-model="applicationScenarioData.jsCableAttenuation"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <el-form-item label="衰减器" class="scenario-form-input-item">
                  <el-input placeholder="衰减器" v-model="applicationScenarioData.jsAttenuator"  clearable class="mid-input-little"></el-input>
                </el-form-item>
              </div>
              <div class="param-one">
                <el-form-item label="天线增益" class="scenario-form-input-item">
                  <el-input placeholder="天线增益" v-model="applicationScenarioData.jsAntennaGain"  clearable class="mid-input-little" ></el-input>
                </el-form-item>
                <div></div>
                <div></div>
              </div>
            </div>
          </div>
          <div class="blank"></div>
        </div>
      </el-form>
      <div class="dialog-footer">
        <el-button size="small" @click="handlePrev" class="next-step" v-show="active != 0 && active != 4 && active != 3">上一步</el-button>
        <el-button  size="small" class="next-step"  @click="handleNextStep" v-show="active != 4 && active != 3">下一步</el-button>
        <el-button size="small" @click="handlePrev" class="next-step" v-show="applicationScenarioData.effectorId != null && applicationScenarioData.effectorId != '' && active == 3">上一步</el-button>
        <el-button  size="small" class="next-step"  @click="handleNextStep" v-show="applicationScenarioData.effectorId != null&& applicationScenarioData.effectorId != '' && active == 3">下一步</el-button>
        <!--<el-button size="small" @click="handleGoDataRecordDialog(1)" class="next-step data-record" v-show="active == 4 && addType == 1">进行实验数据记录</el-button>-->
        <!--<el-button  size="small" @click="handleGoDataRecordDialog(2)" class="next-step performance-evaluation"   v-show="active == 4 && addType == 2" >进行实验效能评估</el-button>-->
        <el-button  size="small" @click="handleGoDataRecordDialog()" class="next-step performance-evaluation"   v-show="active == 4" >保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
            :title="applicationScenarioData.scenarioName"
            :visible.sync="dataShowDialog"
            :append-to-body='true'
            width="40%"
            class="data-show-dialog"
    >
      <data-show
       :applicationScenarioData="applicationScenarioData"
      >
      </data-show>
    </el-dialog>
    <el-dialog
            :title="dropDownTitle"
            :visible.sync="dropDownDialog"
            :append-to-body='true'
            width="28%"
            class="data-record-update-dialog"
    >
      <div class="drop-down-data">
        <el-form
                :model="ground"
                class="record-update-form"
        >
          <el-form-item label="地面名称" class="scenario-form-input-item">
            <el-input placeholder="填写地面名称" v-model="ground.name"  clearable class="long-input"></el-input>
          </el-form-item>
          <el-form-item label="导电率" class="scenario-form-input-item">
            <el-input placeholder="填写导电率" v-model="ground.conductivity"  clearable class="long-input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="handleAddDropDown" class="next-step" >确定</el-button>
      </div>
    </el-dialog>
    <el-dialog
            :title="dropDownEnvironmentTitle"
            :visible.sync="dropDownEnvironmentDialog"
            :append-to-body='true'
            width="28%"
            class="data-record-update-dialog"
    >
      <div class="drop-down-data">
        <el-form
                :model="environment"
                class="record-update-form"
        >
          <el-form-item label="环境名称" class="scenario-form-input-item">
            <el-input placeholder="填写环境名称" v-model="environment.name"  clearable class="long-input"></el-input>
          </el-form-item>
        </el-form>
      </div>
      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="handleAddEnvironmentDropDown" class="next-step" >确定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchCreate as fetchScenarioCreate,fetchGetListPage,fetchGetParamForAdd,fetchDelete} from 'network/applicationScenario'
  import {fetchCreate as fetchScenarioDataCreate,fetchGetByApplicationScenarioId,fetchUpdateApplicationScenario} from 'network/applicationScenarioData'
  import {fetchCreateGround,fetchCreateEnvironment} from 'network/dropDown'
  let formatDate = require("common/utils");
  import {columnSortMixin,commonMixin,applicationScenarioMixin} from 'common/mixin';
  import DataRecordScenario from './childComp/DataRecordScenario';
  import DataShow from 'components/common/dataShow/DataShow';
  const defaultListQuery = {
    pageNum:1,
    pageSize:5,
    scenarioName:null,
    experimentReport:null,
    submitStart:null,
    submitEnd: null,
    type: 1,
    umsId: null
  };
  const defaultApplicationScenarioData = {
    id: null,
    scenarioName: null,
    sceneId: 1,
    sceneName: null,
    groundId: 1,
    groundName: null,
    environmentId: 1,
    environmentName: null,
    temperature: null,
    humidity: null,
    microwaveSourceId: 1,
    microwaveSourceName: null,
    frequency: null,
    power: null,
    pwm: null,
    mhz: null,
    numberOfStr:null,
    antennaDirection:null,
    effectorName:  null,
    effectorId: null,
    effectorNameType: null,
    model: null,
    sampleNo: null,
    distance: null,
    angle: null,
    workingFrequency: null,
    bandwidth: null,
    antennaGain: null,
    backDoorId: 1,
    backDoorName: null,
    numberValue: null,
    experimentReport: null,
    type: null,
    //默认是待提交
    status: 1,
    category:null,
    effectorStatus: null,
    fsCouplingDegree: null,
    fsCableAttenuation: null,
    fsAttenuator: null,
    fsBearing: null,
    fsPitchAngle: null,
    jsCouplingDegree: null,
    jsCableAttenuation: null,
    jsAttenuator: null,
    jsAntennaGain: null
  };
  // const defaultApplicationScenarioData = {
  //   id: null,
  //   scenarioName: "测试场景",
  //   sceneId: 2,
  //   sceneName: '地面',
  //   groundId: 1,
  //   groundName: '沙地',
  //   environmentId: 1,
  //   environmentName: '晴天',
  //   temperature: 1,
  //   humidity: 1,
  //   microwaveSourceId: 1,
  //   microwaveSourceName: '窄带',
  //   frequency: 1,
  //   power: 1,
  //   pwm: 1,
  //   mhz: 1,
  //   numberOfStr:1,
  //   antennaDirection:1,
  //   effectorName:  1,
  //   effectorId: 2,
  //   effectorNameType: '前门',
  //   model: 1,
  //   sampleNo: 1,
  //   distance: 1,
  //   angle: 1,
  //   workingFrequency: 1,
  //   bandwidth: 1,
  //   antennaGain: 1,
  //   backDoorId: 1,
  //   backDoorName: '组件',
  //   numberValue: 1,
  //   experimentReport: 1,
  //   type: 1,
  // };
  const defaulApplicationScenarioDataListObj = {
    id: null,
    applicationScenarioId: null,
    fsCouplingDegree: null,
    fsCableAttenuation: null,
    fsAttenuator: null,
    fsBearing: null,
    fsPitchAngle: null,
    jsCouplingDegree: null,
    jsCableAttenuation: null,
    jsAttenuator: null,
    distance:null,
    jsAntennaGain: null,
    effectorStatus: null,
    oscilloscopeValue: null,
    experimentalPhenomen: null,
    fourDTypeId: null,
    oscilloscopeValue: null,
  };
  const defaultGround = {
    id: null,
    name: null,
    conductivity: null
  }
  const defaultEnvironment = {
    id: null,
    name: null,
  }
  export default {
    name: "ApplicationScenario",
    data(){
      return {
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        //应用场景
        applicationScenarioData: JSON.parse(JSON.stringify(defaultApplicationScenarioData)),
        //应用场景数据集合
        // applicationScenarioDataList: [],
        //应用场景数据对象
        applicationScenarioDataListObj: JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj)),
        //添加状态 1代表实验数据记录 2代表实验效能评估
        addType: null,
        //下拉框集合
        paramForAddData:{},
        listLoading: true,

        total:null,
        list: null,
        scenarioMultipleSelection: [],
        multipleSelection:[],
        operates:[
          {
            label:'删除应用场景',
            value:'deleteAccountBatch'
          }
        ],
        operateType:null,
        active: 0,
        //场景弹框
        scenarioAddDialog: false,
        //场景数据弹框
        dataRecordDialog: false,

        //查看弹框
        dataShowDialog: false,
        //下拉框添加弹框
        dropDownDialog: false,
        dropDownTitle: null,
        dropDownEnvironmentDialog: false,
        dropDownEnvironmentTitle: null,
        scenarioAddTitle: '场景选择',
        // showStatus: [false, false, true, false],
        showStatus: [true, false, false, false, false],
        //是否是添加动作
        isDataAdd: true,
        ground: JSON.parse(JSON.stringify(defaultGround)),
        environment:JSON.parse(JSON.stringify(defaultEnvironment)),
      }
    },
    created(){
      this.handleGetListPage();
      // this.handleGetApplicationScenarioData();
    },
    methods: {
      handleShow(index,row){
        this.applicationScenarioData = JSON.parse(JSON.stringify(row));
        //设置场景类型名称
        this.paramForAddData.scenes.find( item => {
          if(item.id == row.sceneId){
            this.applicationScenarioData.sceneName = item.name
          }
        })
        //设置地面类型名称
        this.paramForAddData.grounds.find( item => {
          if(item.id == row.groundId){
            this.applicationScenarioData.groundName = item.name
          }
        })
        //设置环境类型
        this.paramForAddData.environments.find( item => {
          if(item.id == row.environmentId){
            this.applicationScenarioData.environmentName = item.name
          }
        })
        //设置微波源类别
        this.paramForAddData.microwaveSources.find( item => {
          if(item.id == row.microwaveSourceId){
            this.applicationScenarioData.microwaveSourceName = item.name
          }
        })
        //设置效应物
        this.paramForAddData.effectors.find( item => {
          if(item.id == row.effectorId){
            this.applicationScenarioData.effectorNameType = item.name
          }
        })
        //设置后门类型
        this.paramForAddData.backDoors.find( item => {
          if(item.id == row.backDoorId){
            this.applicationScenarioData.backDoorName = item.name
          }
        })

        this.applicationScenarioDataListObj = JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj));
        this.isDataAdd = false;
        this.dataShowDialog = true;
        Object.assign(this.applicationScenarioDataListObj,this.applicationScenarioData );
      },
      handleScenarioSelectionChange(val){
        this.scenarioMultipleSelection = val;
      },
      handleBatchOperate(){
        console.log(this.operateType)
        if(this.operateType == null){
          this.$message({
            message:'请选择操作类型',
            type:'warning',
            duration:1000
          })
          return
        };
        if(this.scenarioMultipleSelection==null||this.scenarioMultipleSelection.length<1){
          this.$message({
            message: '请选择要操作的应用场景',
            type: 'warning',
            duration: 1000
          });
          return;
        };
        this.$confirm('是否要进行该批量操作?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          this.scenarioMultipleSelection.forEach(item => {
            ids.push(item.id)
          })
          let params = new URLSearchParams();
          params.append("ids",ids);//后台如果不是用对象接受
          fetchDelete(params).then(res => {
            if(res.code == 200) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              this.handleGetListPage();
            }else{
              this.$message({
                message: res.message,
                type: 'error',
                duration: 1000
              });
            }
          })
        })
      },
      handleDelete(index,row){
        this.$confirm('是否要删除该应用场景?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          let ids = [];
          ids.push(row.id)
          let params = new URLSearchParams();
          params.append("ids",ids);//后台如果不是用对象接受
          fetchDelete(params).then(res => {
            if(res.code == 200) {
              this.$message({
                message: res.message,
                type: 'success',
                duration: 1000
              });
              this.handleGetListPage();
            }else{
              this.$message({
                message: res.message,
                type: 'error',
                duration: 1000
              });
            }
          })
        });
      },
      handleAddGround() {
        this.ground = JSON.parse(JSON.stringify(defaultGround));
        this.dropDownTitle = '新增地面';
        this.dropDownDialog = true
      },
      handleAddEnvironment() {
        this.ground = JSON.parse(JSON.stringify(defaultGround));
        this.dropDownTitle = '新增环境';
        this.dropDownEnvironmentDialog = true
      },
      handleAddDropDown(){
        fetchCreateGround(this.ground).then(res => {
          if(res.code == 200){
            this.dropDownDialog = false
            this.handleGetParamForAdd();
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      handleAddEnvironmentDropDown(){
        fetchCreateEnvironment(this.environment).then(res => {
          if(res.code == 200){
            this.dropDownEnvironmentDialog = false
            this.handleGetParamForAdd();
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      handleSearchList(){
        this.listQuery.pageNum = 1;
        this.handleGetListPage()
      },
      handleResetSearch(){
        this.listQuery = Object.assign({},defaultListQuery)
        this.handleGetListPage()
      },
      handleCommitApplicationScenario(type){
        let applicationScenarioAddParam = {
          applicationScenarioDatas: this.$refs.dataRecordScenarioChild.applicationScenarioDataList,
          applicationScenario: this.applicationScenarioData,
          type:type
        };
        fetchUpdateApplicationScenario(applicationScenarioAddParam).then(res => {
          console.log(res);
          if(res.code == 200){
            this.dataRecordDialog = false;
            this.handleGetListPage();
            this.applicationScenarioDataListObj = JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj));
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })
      },

      handleGoDataRecordDialog(type){
        // let isAdd = true;
        // if(!type){
        //   type = this.applicationScenarioData.type;
        //   isAdd = false;
        // }
        // if(isAdd){
        //   this.applicationScenarioData.umsId  = this.$store.getters.id;
        //   this.applicationScenarioData.type = type;
        //   fetchScenarioCreate(this.applicationScenarioData).then(res => {
        //     if(res.code == 200) {
        //       this.scenarioAddDialog = false;
        //       this.dataRecordDialog = true;
        //       console.log(res);
        //       this.applicationScenarioData.id = res.data;
        //       Object.assign(this.applicationScenarioDataListObj,this.applicationScenarioData);
        //       setTimeout(()=>{
        //         this.$refs.dataRecordScenarioChild.handleGetApplicationScenarioData();},200)
        //     }else {
        //       this.$message({
        //         message: res.message,
        //         type: 'error',
        //         duration: 1000
        //       });
        //     }
        //   })
        // }else {
        //   this.dataShowDialog = false;
        //   this.dataRecordDialog = true;
        //   setTimeout(()=>{
        //     this.$refs.dataRecordScenarioChild.handleGetApplicationScenarioData();},200)
        // }
        this.applicationScenarioData.umsId  = this.$store.getters.id;
        fetchScenarioCreate(this.applicationScenarioData).then(res => {
          if(res.code == 200) {
            this.scenarioAddDialog = false;
            this.handleGetListPage();
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })

      },
      handlePrev() {
        if (this.active > 0 && this.active < this.showStatus.length) {
          this.active--;
          this.hideAll();
          this.$set(this.showStatus,this.active,true);
          this.handleScenarioAddTitle(this.active)
        }
      },
      handleNextStep() {
        console.log(this.active,this.showStatus.length)
        console.log(this.showStatus)
        if (this.active <= this.showStatus.length - 1) {
          this.active++;
          this.hideAll();
          this.$set(this.showStatus,this.active,true);
          this.handleScenarioAddTitle(this.active)
        }
      },
      handleScenarioAddTitle(active){
        switch (active) {
          case 0:
            this.scenarioAddTitle = '场景选择';
            break
          case 1:
            this.scenarioAddTitle = '环境设置';
            break
          case 2:
            this.scenarioAddTitle = '参数预设';
            break
          case 3:
            this.scenarioAddTitle = '效应物模块';
            break
          case 4:
            this.scenarioAddTitle = '测量模块';
            break
        }
      },
      hideAll() {
        for (let i = 0; i < this.showStatus.length; i++) {
          this.showStatus[i] = false;
        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleGetListPage(){
        this.listLoading = true;
        this.listQuery.umsId = this.$store.getters.id;
        fetchGetListPage(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          if(this.list.length == 0){
            this.listLoading = true;
            fetchGetListPage(this.listQuery).then(res => {
              this.listLoading = false;
              this.list = res.data.list;
              this.total = res.data.total;
            })
          }
        })

      },
      handleGetParamForAdd() {
        fetchGetParamForAdd().then(res => {
          this.paramForAddData = res.data
        })
      },
      handleSizeChange(val){//改变每页显示多少条时触发
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.handleGetListPage();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.handleGetListPage();
      },
      handleAdd(type){
        this.showStatus = [true, false, false, false];
        this.active = 0;
        this.scenarioAddDialog = true;
        this.applicationScenarioData = Object.assign({},defaultApplicationScenarioData);
        this.isDataAdd = true;
        this.addType = type;
      }
    },
    filters:{
      formatCreateTime(time){
        if(time == null || time == ''){
          return ""
        }
        let date = new Date(time);
        return formatDate(date,'yyyy-MM-dd hh:mm:ss')
      },
      formatStatus(val){
        switch (val) {
          case 1:
            return '待提交';
          case 2:
            return '待审核';
          case 3:
            return '已通过';
          case 4:
            return '被驳回';
        }
      }
    },
    mixins: [columnSortMixin,commonMixin,applicationScenarioMixin],
    components:{
      DataRecordScenario,
      DataShow
    }
  }

</script>

<style scoped>
  .measure-module .param-one,.measure-module .param-two,.js-module .param-one,.js-module .param-two {
    display: flex;
  }
  .measure-module .param-one > div,.measure-module .param-two > div,js-module .param-one > div,.js-module .param-two > div {
    flex: 1;
  }
  .param-one {
    margin-top: 15px;
  }
  .measure-module {
    color: #6a2d94 !important;
  }
  .js-module {
    color: #006837;
    margin-top: 10px;
  }
  .data-content .scenario-type-img img {
    margin-top: 0;
  }
  .data-content .params-border {
    padding: 10px 0;
  }
  .data-content .two-ele span:nth-child(2) {
    margin-left: 110px;
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

  .record-update-form {
    position: relative;
    top: -30px;
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

  .wave {
    margin: 0 5px;
  }
 .next-step {
    height: 24px;
    line-height: 24px;
    width: 55px;
    padding: 0;
  }
 .next-step,.ground-add,.in-radiation-direction,.ground-add:hover {
    background-color: #4d83ff;
    color: #fff;
  }
 .dialog-footer .data-record,.dialog-footer .performance-evaluation, .btn-add-lab {
   height: 24px;
   line-height: 24px;
   width: 120px;
   padding: 0;
 }

 .dialog-footer-show {
   position: relative;
   bottom: -13px;
 }
 .ground-parent {
   display: flex;
   align-items: center;
 }
  .ground-add {
    height: 34px;
    line-height: 34px;
    width: 60px;
    padding: 0;
    margin-left: 5px;
  }
  .in-radiation-direction {
    height: 34px;
    line-height: 34px;
    width: 100px;
    padding: 0;
    margin-left: 5px;
  }
  .scenario-environment,.params-one,.params-two,.params-three,.params-four {
    display: flex;
  }
  .params-two > div {
    width: 33%;
  }
  .params-three,.params-four {
    justify-content: space-between;
  }
  .params-one {
    margin-top: 10px;
  }
  .params-three {
    margin-top: 17px;
  }
  .params-border {
    padding: 30px 0 20px 0;
  }
  .params-border div {
    width: 100%;
    height: 1px;
    background-color: #000;
  }
  .input-select {
    display: flex;
  }
</style>