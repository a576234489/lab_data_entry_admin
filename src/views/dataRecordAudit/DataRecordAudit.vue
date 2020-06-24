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
            <el-form-item label="提交人姓名:">
              <el-input style="width: 203px" v-model="listQuery.submitNickName" placeholder="提交人姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="处理人姓名:">
              <el-input style="width: 203px" v-model="listQuery.auditNickName" placeholder="处理人姓名" clearable></el-input>
            </el-form-item>
            <el-form-item label="审核状态:">
              <el-select
                      clearable
                      size="small"
                      v-model="listQuery.status" placeholder="审核状态"
                      style="width: 203px"
              >
                <el-option
                        v-for="(item,index) in auditStatus"
                        :key="index"
                        :label="item.label"
                        :value="item.value"
                >
                </el-option>
              </el-select>
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
        <span>审核记录</span>
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
        <el-table-column label="提交人姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.submitNickName}}</template>
        </el-table-column>
        <el-table-column label="应用场景名称" width="250" align="center">
          <template slot-scope="scope">{{scope.row.applicationScenarioName}}</template>
        </el-table-column>
        <el-table-column label="提交日期" width="150" align="center" :show-overflow-tooltip="true">
          <template slot-scope="scope">{{scope.row.submitTime | formatCreateTime}}</template>
        </el-table-column>
        <el-table-column label="审核状态"  align="center">
          <template slot-scope="scope">{{scope.row.status | formatStatus}}</template>
        </el-table-column>
        <el-table-column label="处理人姓名" width="150" align="center">
          <template slot-scope="scope">{{scope.row.auditNickName}}</template>
        </el-table-column>
        <el-table-column label="审核理由" width="150" align="center">
          <template slot-scope="scope">{{scope.row.reason}}</template>
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
                      v-show="scope.row.status == 1"
                      size="mini"
                      type="text"
                      @click="handleAuth(scope.$index, scope.row)">审批
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
    <el-dialog
            title="数据审批"
            :visible.sync="auditDialog"
            :append-to-body='true'
            width="40%"
            class="audit-dialog"
            :close-on-click-modal = 'false'
    >
      <div>
        <el-form
                :model="auditParam"
        >
          <el-form-item label="审批理由" class="audit-reason" >
            <el-input type="textarea" :rows="5" v-model="auditParam.reason" placeholder="请输入审批理由" >

            </el-input>
          </el-form-item>
        </el-form>
      </div>

      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small"  class="next-step" @click="handleAudit(2)">批准</el-button>
        <el-button size="small"  class="next-step reject"  @click="handleAudit(3)">驳回</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import {fetchGetListPage,fetchUpdateAudio} from 'network/audit'
  import {fetchGetById} from 'network/applicationScenario'
  import {columnSortMixin,commonMixin,applicationScenarioMixin} from 'common/mixin'
  import {fetchGetParamForAdd} from 'network/applicationScenario'
  import {fetchGetByApplicationScenarioId} from 'network/applicationScenarioData'
  import DataShow from 'components/common/dataShow/DataShow';
  import DataRecordScenario from 'views/applicationScenario/childComp/DataRecordScenario';
  let formatDate = require("common/utils");
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    submitNickName: null,
    auditNickName: null,
    status: null,
    submitTime: null,
    auditTime: null,
    type: 1
  };
  const defaultAuditParam = {
    id: null,
    reason: null,
    status: null,
    handleId: null,
    applicationScenarioId: null,
    type: 1
  }
  export default {
    name: "dataRecordAudit",
    data(){
      return {
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        auditStatus:[
          {
            label:'待审核',
            value:'1',
          },
          {
            label:'已通过',
            value:'2',
          },
          {
            label:'已拒绝',
            value:'3',
          },
        ],
        listLoading: true,
        total: null,
        list:null,
        //应用场景
        applicationScenarioData: {},
        dataShowDialog: false,
        dataRecordDialog: false,
        auditDialog: false,
        auditParam: JSON.parse(JSON.stringify(defaultAuditParam)),
        applicationScenarioDataListObj: {},
        scenarioLoading: true,
        //应用场景数据集合
        applicationScenarioDataList: [],
      }
    },
    created() {
      this.handleGetList();
    },
    methods: {
      handleAudit(status){
        this.auditParam.status = status;
        this.auditParam.handleId = this.$store.getters.id;;
        fetchUpdateAudio(this.auditParam).then(res => {
          if(res.code == 200){
            this.auditDialog = false;
            this.handleGetList();
            this.$message({
              message: res.message,
              type: 'success',
              duration: 1000
            })
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            })
          }
        })
      },
      handleAuth(index,row){
        this.auditParam = JSON.parse(JSON.stringify(defaultAuditParam));
        this.auditParam.id = row.id;
        this.auditParam.applicationScenarioId = row.applicationScenarioId;
        this.auditDialog = true;
      },
      handleSearchList(){
        this.listQuery.pageNum = 1;
        this.handleGetList()
      },
      handleResetSearch(){
        this.listQuery = Object.assign({},defaultListQuery)
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
      handleGetList(){
        this.listLoading = true;
        fetchGetListPage(this.listQuery).then(res=>{
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
      handleShow(index,row){
        fetchGetById({id:row.applicationScenarioId}).then(res => {
          this.applicationScenarioData = res.data
        })
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
      handleGetParamForAdd() {
        fetchGetParamForAdd().then(res => {
          this.paramForAddData = res.data
        })
      },
      handleGoDataRecordDialog(){
        this.dataShowDialog = false;
        this.dataRecordDialog = true;
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
            return '待审核';
          case 2:
            return '已通过';
          case 3:
            return '已拒绝';
        }
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
  .data-content .scenario-type-img img {
    margin-top: 0;
  }

  .data-content .two-ele span:nth-child(2) {
    margin-left: 110px;
  }

  .data-content > div {
    padding: 5px 0px;
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

  .wby-img img {
    margin-left: 10px;
  }
  .xyw-img img {
    margin-right: 10px;
  }

  .audit-reason label {
    font-weight: 500;
  }
  .audit-reason {
    position: relative;
    top: -30px;
  }
</style>