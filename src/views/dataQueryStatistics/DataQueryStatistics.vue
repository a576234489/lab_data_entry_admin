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
            <el-form-item label="提交人名称:">
              <el-input style="width: 203px" v-model="listQuery.userName" placeholder="提交人名称" clearable></el-input>
            </el-form-item>
            <el-form-item label="审核人名称：">
              <el-input style="width: 203px" v-model="listQuery.auditName" placeholder="审核人名称" clearable></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="提交日期：">
              <el-date-picker
                      style="width: 203px"
                      class="input-width"
                      v-model="listQuery.submitTime"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="datetime"
                      placeholder="请选择提交日期">
              </el-date-picker>
            </el-form-item>
            <el-form-item label="审核日期：">
              <el-date-picker
                      style="width: 203px"
                      class="input-width"
                      v-model="listQuery.auditTime"
                      value-format="yyyy-MM-dd"
                      format="yyyy-MM-dd"
                      type="datetime"
                      placeholder="请选择审核日期">
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
        <el-button class="export-excel" @click="handleApplyExport(1,1)" icon="el-icon-document" size="small" v-show="roleName == '指导员'">
          Export Excel
        </el-button>
      </div>

    </el-card>
    <div class="table-container">
      <el-table
              :data="list"
              style="width: 100%"
              v-loading="listLoading"
              border
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">{{scope.row.id}}</template>
        </el-table-column>
        <el-table-column label="应用场景名称" width="150" align="center">
          <template slot-scope="scope">{{scope.row.scenarioName}}</template>
        </el-table-column>
        <el-table-column label="实验报告" width="250" align="center">
          <template slot-scope="scope">{{scope.row.experimentReport}}</template>
        </el-table-column>
        <el-table-column label="提交人姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.userName}}</template>
        </el-table-column>
        <el-table-column label="提交日期"  align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.submitTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="审核人姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.auditName}}</template>
        </el-table-column>
        <el-table-column label="审核日期"  align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.auditTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="操作"  align="center" width="185px">
          <template slot-scope="scope">
            <p>
              <el-button
                      v-show="scope.row.adminScenarioType == 2 || roleName == '指导员'"
                      size="mini"
                      type="text"
                      @click="handleShow(scope.$index, scope.row)">查看
              </el-button>
              <el-button
                      v-show="scope.row.adminScenarioType != 2 && roleName != '指导员'"
                      :disabled="scope.row.adminScenarioType == 1"
                      size="mini"
                      type="text"
                      @click="handleApplyView(scope.$index, scope.row)">申请查看
              </el-button>
              <el-button
                      v-show="scope.row.adminScenarioType != 2"
                      :disabled="scope.row.adminScenarioType == 1"
                      size="mini"
                      type="text"
                      @click="handleApplyExport(scope.$index, scope.row)">申请导出
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="batch-operate-container">
      <div>


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
            title="申请查看"
            :visible.sync="applyViewDialog"
            :append-to-body='true'
            width="40%"
            class="audit-dialog"
            :close-on-click-modal = 'false'
    >
      <div>
        <el-form
                :model="applyViewParam"
        >
          <el-form-item label="申请原因" class="audit-reason" >
            <el-input type="textarea" :rows="5" v-model="applyViewParam.applyReason" placeholder="请输入申请原因" >

            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small"  class="next-step" @click="handleApplySubmit()">提交</el-button>
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
      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="handleGoDataRecordDialog()" class="next-step data-record dialog-footer-show" >{{this.applicationScenarioData.type==1?'查看实验数据记录':'查看实验效能评估'}}</el-button>
      </div>
    </el-dialog>
    <el-dialog
            :title="applicationScenarioData.type == 2?'实验效能评估':'实验数据记录'"
            :visible.sync="dataRecordDialog"
            :append-to-body='true'
            width="80%"
            class="data-record-dialog"
    >
      <data-record-scenario
              :applicationScenarioData="applicationScenarioData"
              ref="dataRecordScenarioChild"
              :paramForAddData = "paramForAddData"
              scenarioType="2"
              :applicationScenarioDataListObj = "applicationScenarioDataListObj"
      >
      </data-record-scenario>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchGetListPage} from 'network/applicationScenario'
  import {fetchCreateDataApply} from 'network/applyData'
  import {columnSortMixin,commonMixin,applicationScenarioMixin} from 'common/mixin'
  import {fetchGetParamForAdd} from 'network/applicationScenario'
  import DataShow from 'components/common/dataShow/DataShow';
  import DataRecordScenario from 'views/applicationScenario/childComp/DataRecordScenario';
  let formatDate = require("common/utils");
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    scenarioName: null,
    userName: null,
    auditName: null,
    submitTime: null,
    auditTime: null,
    type: 2,
    userId: null
  };
  const defaultApplyViewParam = {
    applicationScenarioId: null,
    applicationScenarioName: null,
    submitUmsId: null,
    applyReason: null
  }
  export default {
    name: "DataQueryStatistics",
    data(){
      return {
        roleName: this.$store.getters.roles[0].name,
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        applyViewParam: JSON.parse(JSON.stringify(defaultApplyViewParam)),
        listLoading: true,
        total: null,
        list: null,
        applyViewDialog: false,
        applicationScenarioData: {},
        applicationScenarioDataListObj: {},
        dataShowDialog: false,
        dataRecordDialog: false
      }
    },
    created() {
      this.handleGetList();
    },
    methods: {
      handleApplyExport(index,row) {
        this.$message({
          message:'开发中',
          type:'warning',
          duration:1000
        })
      },
      handleGoDataRecordDialog(){
        this.dataShowDialog = false;
        this.dataRecordDialog = true;
      },
      handleShow(index,row){
        console.log(11)
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

        this.applicationScenarioDataListObj = {};
        this.dataShowDialog = true;
        Object.assign(this.applicationScenarioDataListObj,this.applicationScenarioData );
      },
      handleSearchList(){
        this.listQuery.pageNum = 1;
        this.handleGetList()
      },
      handleResetSearch(){
        this.listQuery = Object.assign({},defaultListQuery)
      },
      handleGetList(){
        this.listLoading = true;
        this.listQuery.userId = this.$store.getters.id;
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
      handleSizeChange(val){//改变每页显示多少条时触发
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.handleGetList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.handleGetList();
      },
      handleGetParamForAdd() {
        fetchGetParamForAdd().then(res => {
          this.paramForAddData = res.data
        })
      },
      handleApplyView(index,row){
        this.applyViewParam = JSON.parse(JSON.stringify(defaultApplyViewParam));
        this.applyViewParam.applicationScenarioId = row.id;
        this.applyViewParam.applicationScenarioName = row.scenarioName;
        this.applyViewDialog = true;
      },
      handleApplySubmit(){
        this.applyViewParam.submitUmsId = this.$store.getters.id;
        fetchCreateDataApply(this.applyViewParam).then(res => {
          if(res.code == 200){
            this.$message({
              message: res.message,
              type:'success',
              duration:1000
            })
            this.applyViewDialog = false;
            this.handleGetList();
          }else {
            this.$message({
              message: res.message,
              type:'error',
              duration:1000
            })
          }
        })
      }
    },
    filters: {
      formatCreateTime(time) {
        if (time == null || time == '') {
          return ""
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    mixins: [columnSortMixin,commonMixin,applicationScenarioMixin],
    components:{
      DataShow,
      DataRecordScenario
    }
  }
</script>

<style scoped>
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
  .params-border {
    padding: 30px 0 20px 0;
  }
  .params-border div {
    width: 100%;
    height: 1px;
    background-color: #000;
  }
  .next-step {
    background-color: #4d83ff;
    color: #fff;
  }
  .reject {
    background-color: #cc2e3a;
    color: #fff;
  }
  .dialog-footer .data-record {
    height: 24px;
    line-height: 24px;
    width: 120px;
    padding: 0;
  }
  .dialog-footer-show {
    position: relative;
    bottom: -13px;
  }
  .lab-phenomenon-parent {
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .wby-img img {
    margin-left: 10px;
  }
  .xyw-img img {
    margin-right: 10px;
  }
  .wby-img,.tx-img {
    width: 62px;
    color: rgb(96, 98, 102);
    font-size: 12px;
  }
  .xyw-img {
    width: 72px;
    color: rgb(96, 98, 102);
    font-size: 12px;
  }
  .xyw-img > div {
    position: relative;
    left: -8px;
  }
  .wby-img,.xyw-img,.tx-img {
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
  }
  .wby-tx,.xyw {
    position: relative;
    top: -8px;
  }
  .center-border {
    background-color: #4d83ff;
    height: 2px;
    width: 200px;
    margin: 0 8px;
    position: relative;
    top: -5px;
  }
  .lab-phenomenon {
    padding-bottom: 30px;
    padding-top: 10px;
  }
  .report-textarea {
    display: flex;
    flex-wrap: wrap;
  }
  .audit-reason label {
    font-weight: 500;
  }
  .audit-reason {
    position: relative;
    top: -30px;
  }
</style>