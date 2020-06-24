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
        <span>数据记录</span>
      </div>
      <div>
        <el-button
                class="next-step"
                size="mini"
                @click="handleAdd()"
        >
          添加
        </el-button>
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
        <el-table-column label="实验名称" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.experimentName}}</template>
        </el-table-column>
        <el-table-column label="创建人" width="150" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="创建日期" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.createTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="状态" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="115px">
          <template slot-scope="scope">
            <p>
              <el-button
                      size="mini"
                      type="text"
                      @click="handleShowGo(scope.$index, scope.row)">查看
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
    :title="scenarioRelation.type == 2?'实验效能评估':'实验数据记录'"
    :visible.sync="dataRecordDialog"
    :append-to-body='true'
    width="80%"
    class="data-record-dialog"
    :close-on-click-modal = 'false'
    >
      <data-record-scenario
      :applicationScenarioData="applicationScenarioData"
      ref="dataRecordScenarioChild"
      :paramForAddData = "paramForAddData"
      :applicationScenarioDataListObj = "applicationScenarioDataListObj"
      scenarioType="1"
      :scenarioRelation = "scenarioRelation"
      >
      </data-record-scenario>
      <div class="dialog-footer">
        <el-button size="small" @click="handleCommitApplicationScenario(1)" class="next-step" v-show="applicationScenarioData.status==1">提交</el-button>
        <el-button  size="small"  class="next-step"  @click="handleCommitApplicationScenario(2)" >保存</el-button>
      </div>
    </el-dialog>
    <el-dialog
            :title="isDataAdd?'添加数据记录':'查看数据记录'"
            :visible.sync="dataShowDialog"
            :append-to-body='true'
            width="40%"
            class="data-show-dialog"
    >
      <div style="max-height:405px;overflow-y: scroll;" class="content">
        <el-form
                :model="applicationScenarioData"
        >
            <div class="param-one-data">
              <el-form-item label="实验名称" class="scenario-form-input-item">
                <el-input placeholder="实验名称" v-model="scenarioRelation.experimentName"  clearable class="mid-input" :disabled="isDataAdd?false:true"></el-input>
              </el-form-item>
              <el-form-item label="场景类型" class="scenario-form-input-item scenario-form-input-item-first">
                <el-select v-model="scenarioRelation.scenarioId"  clearable  class="mid-input" :disabled="isDataAdd?false:true">
                  <el-option
                          v-for="(item,index) in applicationScenarioList"
                          :key="index"
                          :label="item.scenarioName"
                          :value="item.id">
                  </el-option>
                </el-select>
              </el-form-item>
            </div>
        </el-form>
        <data-show-no-bar
                v-show="isShowData"
                :applicationScenarioData="applicationScenarioData"
        >
        </data-show-no-bar>
      </div>
      <div class="dialog-footer" v-show="scenarioRelation.scenarioId">
        <el-button size="small" @click="handleGoDataRecordDialog(1)" class="next-step data-record"  v-if="isDataAdd">进行实验数据记录</el-button>
        <el-button size="small" @click="handleGoDataRecordDialog()" class="next-step data-record"  v-if="!isDataAdd">查看实验数据记录</el-button>
      </div>
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
  import {fetchCreate as fetchScenarioCreate,fetchGetListPage,fetchGetParamForAdd,fetchDelete,fetchGetByUserId,fetchGetById} from 'network/applicationScenario'
  import {fetchCreate as fetchscenarioRelationCreate,fetchGetListPage as fetchScenarioRelationGetListPage} from 'network/scenarioRelation'
  import {fetchCreate as fetchScenarioDataCreate,fetchGetByApplicationScenarioId,fetchUpdateApplicationScenario} from 'network/applicationScenarioData'
  import {fetchCreateGround,fetchCreateEnvironment} from 'network/dropDown'
  let formatDate = require("common/utils");
  import {columnSortMixin,commonMixin,applicationScenarioMixin} from 'common/mixin';
  import DataRecordScenario from 'views/applicationScenario/childComp/DataRecordScenario';
  import DataShowNoBar from 'components/common/dataShow/DataShowNoBar';
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
  const defaultScenarioRelation = {
    scenarioId: null,
    experimentName: null
  };
  export default {
    name: "DataRecord",
    data(){
      return {
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        //应用场景集合:
        applicationScenarioList: [],
        isShowData: false,
        //应用场景
        applicationScenarioData: JSON.parse(JSON.stringify(defaultApplicationScenarioData)),
        //应用场景数据集合
        // applicationScenarioDataList: [],
        //应用场景数据对象
        applicationScenarioDataListObj: JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj)),
        //数据记录
        scenarioRelation: JSON.parse(JSON.stringify(defaultScenarioRelation)),
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
      this.handleGetScenarioByUserId();
    },
    methods: {
      handleAdd(){
        this.isDataAdd = true;
        this.scenarioRelation =  JSON.parse(JSON.stringify(defaultScenarioRelation)),
        this.dataShowDialog = true;
      },
      handleGetScenarioByUserId(){
        let umsId = this.$store.getters.id;
        fetchGetByUserId({umsId}).then(res => {
          this.applicationScenarioList = res.data;
        })
      },
      handleShow(){
        //设置场景类型名称
        this.paramForAddData.scenes.find( item => {
          if(item.id == this.applicationScenarioData.sceneId){
            this.applicationScenarioData.sceneName = item.name
          }
        })
        //设置地面类型名称
        this.paramForAddData.grounds.find( item => {
          if(item.id == this.applicationScenarioData.groundId){
            this.applicationScenarioData.groundName = item.name
          }
        })
        //设置环境类型
        this.paramForAddData.environments.find( item => {
          if(item.id == this.applicationScenarioData.environmentId){
            this.applicationScenarioData.environmentName = item.name
          }
        })
        //设置微波源类别
        this.paramForAddData.microwaveSources.find( item => {
          if(item.id ==  this.applicationScenarioData.microwaveSourceId){
            this.applicationScenarioData.microwaveSourceName = item.name
          }
        })
        //设置效应物
        this.paramForAddData.effectors.find( item => {
          if(item.id == this.applicationScenarioData.effectorId){
            this.applicationScenarioData.effectorNameType = item.name
          }
        })
        //设置后门类型
        this.paramForAddData.backDoors.find( item => {
          if(item.id == this.applicationScenarioData.backDoorId){
            this.applicationScenarioData.backDoorName = item.name
          }
        })

        this.applicationScenarioDataListObj = JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj));
        this.dataShowDialog = true;
        Object.assign(this.applicationScenarioDataListObj,this.applicationScenarioData );
      },
      handleShowGo(index,row){
        this.scenarioRelation = JSON.parse(JSON.stringify(defaultScenarioRelation))
        this.scenarioRelation = row
        this.dataShowDialog = true;
        this.isDataAdd = false;
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
        let isAdd = true;
        if(!type){
          isAdd = false;
        }
        if(isAdd){
          this.scenarioRelation.umsId  = this.$store.getters.id;
          this.scenarioRelation.type = type;
          fetchscenarioRelationCreate(this.scenarioRelation).then(res => {
            if(res.code == 200) {
              this.dataShowDialog = false;
              this.dataRecordDialog = true;
              console.log(res);
              this.scenarioRelation.id = res.data;
              Object.assign(this.applicationScenarioDataListObj,this.applicationScenarioData);
              setTimeout(()=>{
                this.$refs.dataRecordScenarioChild.handleGetApplicationScenarioData();},200)
            }else {
              this.$message({
                message: res.message,
                type: 'error',
                duration: 1000
              });
            }
          })
        }else {
          this.dataShowDialog = false;
          this.dataRecordDialog = true;
        }

      },

      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleGetListPage(){
        this.listLoading = true;
        this.listQuery.umsId = this.$store.getters.id;
        fetchScenarioRelationGetListPage(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
          if(this.list.length == 0){
            this.listLoading = true;
            fetchScenarioRelationGetListPage(this.listQuery).then(res => {
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
      DataShowNoBar
    },
    //isShowData
    watch:{
      'scenarioRelation.scenarioId'(val){
        console.log(val)
        if(!val){
          this.isShowData = false;
          this.applicationScenarioData = JSON.parse(JSON.stringify(defaultApplicationScenarioData))
        }else {
          this.isShowData = true;
          fetchGetById({id:val}).then(res => {
            this.applicationScenarioData = res.data;
            this.handleShow();
          })
        }
      }
    }
  }

</script>

<style scoped>
  .dialog-footer {
    position: relative;
    top: 15px;
    text-align: center;
  }
  .param-one-data {
    display: flex;
  }
  .param-one-data > div {
   flex: 1;
  }
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