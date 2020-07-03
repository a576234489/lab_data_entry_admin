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
                  class="shadow-button"
          >
            重置
          </el-button>
          <el-button
                  size="small"
                  @click="handleSearchList()"
                  class="shadow-button"
          >
            搜索
          </el-button>
        </div>
      </div>
      <div style="margin-top: 15px" >
        <el-form :inline="true" :model="listQuery" size="small" label-width="140px">
          <div>
            <el-form-item label="实验现象:">
              <el-input style="width: 203px" v-model="listQuery.experimentalPhenomen" placeholder="实验现象" clearable></el-input>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>
    <el-card class="operate-container" style="position: relative">
      <div>
        <i class="el-icon-tickets"></i>
        <span>数据记录</span>
        <el-button class="export-excel shadow-button" @click="handleDownloadExcel" icon="el-icon-document" type="primary" size="small">
          Export Excel
        </el-button>
        <el-button class="export-excel shadow-button" @click="handleSdtTest"  type="primary" size="small">
          散点图测试
        </el-button>
      </div>

    </el-card>
    <div class="table-container">
      <el-table
              :data="list"
              style="width: 100%"
              v-loading="listLoading"
              class="lab-data-table"
              @selection-change="handleSelectionChange"
              border
              :row-class-name="tableRowClassName"
              :header-cell-style="tableHeaderColor"
      >
        <el-table-column type="selection" width="60" align="center"></el-table-column>
        <el-table-column label="编号" width="100" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="类别" width="80" align="center">
          <template slot-scope="scope">{{scope.row.category}}</template>
        </el-table-column>
        <el-table-column label="型号" width="80" align="center">
          <template slot-scope="scope">{{scope.row.model}}</template>
        </el-table-column>
        <el-table-column label="样本" width="80" align="center">
          <template slot-scope="scope">{{scope.row.sampleNo}}</template>
        </el-table-column>
        <el-table-column label="定耦耦合度" width="100" align="center">
          <template slot-scope="scope">{{scope.row.fsCouplingDegree}}</template>
        </el-table-column>
        <el-table-column label="电缆衰减"  width="80" align="center">
          <template slot-scope="scope">{{scope.row.fsCableAttenuation}}</template>
        </el-table-column>
        <el-table-column label="衰减器" width="100" align="center">
          <template slot-scope="scope">{{scope.row.fsAttenuator}}</template>
        </el-table-column>
        <el-table-column label="检波值" width="110" align="center">
          <template slot-scope="scope">{{scope.row.fsDetectionValue}}</template>
        </el-table-column>
        <el-table-column label="检波功率" width="80" align="center">
          <template slot-scope="scope">{{scope.row.fsDetectionPower}}</template>
        </el-table-column>
        <el-table-column label="源功率" width="80" align="center">
          <template slot-scope="scope">{{scope.row.fsSourcePower}}</template>
        </el-table-column>
        <el-table-column label="方向角" width="100" align="center">
          <template slot-scope="scope">{{scope.row.fsBearing}}</template>
        </el-table-column>
        <el-table-column label="俯仰角"  width="80" align="center">
          <template slot-scope="scope">{{scope.row.fsCableAttenuation}}</template>
        </el-table-column>
        <el-table-column label="靶点增益" width="100" align="center">
          <template slot-scope="scope">{{scope.row.fstargetGain}}</template>
        </el-table-column>
        <el-table-column label="距离" width="80" align="center">
          <template slot-scope="scope">{{scope.row.distance}}</template>
        </el-table-column>
        <el-table-column label="到靶功率密度" width="110" align="center">
          <template slot-scope="scope">{{scope.row.fsPowerDensity}}</template>
        </el-table-column>
        <el-table-column label="定耦耦合度" width="100" align="center">
          <template slot-scope="scope">{{scope.row.jsCouplingDegree}}</template>
        </el-table-column>
        <el-table-column label="电缆衰减" width="100" align="center">
          <template slot-scope="scope">{{scope.row.jsCableAttenuation}}</template>
        </el-table-column>
        <el-table-column label="衰减器"  width="80" align="center">
          <template slot-scope="scope">{{scope.row.jsAttenuator}}</template>
        </el-table-column>
        <el-table-column label="检波值" width="110" align="center">
          <template slot-scope="scope">{{scope.row.jsDetectionValue}}</template>
        </el-table-column>
        <el-table-column label="检波功率" width="80" align="center">
          <template slot-scope="scope">{{scope.row.jsDetectionPower}}</template>
        </el-table-column>
        <el-table-column label="接收功率" width="80" align="center">
          <template slot-scope="scope">{{scope.row.jsPower}}</template>
        </el-table-column>
        <el-table-column label="天线增益" width="80" align="center">
          <template slot-scope="scope">{{scope.row.jsAntennaGain}}</template>
        </el-table-column>
        <el-table-column label="有效面积"  width="80" align="center">
          <template slot-scope="scope">{{scope.row.jsEffectiveArea}}</template>
        </el-table-column>
        <el-table-column label="天线测得功率密度" width="140" align="center">
          <template slot-scope="scope">{{scope.row.jsPowerByAntenna}}</template>
        </el-table-column>
        <el-table-column label="效应物状态" width="100" align="center">
          <template slot-scope="scope">{{scope.row.effectorStatus}}</template>
        </el-table-column>
        <el-table-column label="重频" width="80" align="center">
          <template slot-scope="scope">{{scope.row.mhz}}</template>
        </el-table-column>
        <el-table-column label="串数" width="80" align="center">
          <template slot-scope="scope">{{scope.row.numberOfStr}}</template>
        </el-table-column>
        <el-table-column label="脉宽" width="110" align="center">
          <template slot-scope="scope">{{scope.row.pwm}}</template>
        </el-table-column>
        <el-table-column label="功率密度比较"  width="110" align="center">
          <template slot-scope="scope">{{scope.row.powerDensityComparison}}</template>
        </el-table-column>
        <el-table-column label="示波器读数"  align="center" width="130px">
          <template slot-scope="scope">{{scope.row.oscilloscopeValue}}</template>
        </el-table-column>
        <el-table-column label="实验现象"  align="center"  width="190px">
          <template slot-scope="scope">{{scope.row.experimentalPhenomen}}</template>
        </el-table-column>
        <el-table-column label="4D类别" align="center" width="160px">
          <template slot-scope="scope">{{scope.row.fourDTypeId}}</template>
        </el-table-column>
        <el-table-column label="设备类别"  align="center" width="160px">
          <template slot-scope="scope">{{scope.row.equipTypeId}}</template>
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
            title="散点图测试 "
            :visible.sync="sdtDialog"
            :append-to-body='true'
            width="60%"
            class="scenario-add-Dialog"
    >
       <div class="total-class" ref="myChart" id="myChart" :style="{width: '100%', height: '400px'}">

       </div>

    </el-dialog>
  </div>
</template>

<script>
  import {fetchGetListPage} from 'network/applicationScenarioData'
  import {columnSortMixin,commonMixin} from 'common/mixin'
  import {export_json_to_excel} from '@/vendor/Export2Excel'
  let formatDate = require("common/utils");
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
    experimentalPhenomen: null,
  };
  export default {
    name: "DataAnalysis",
    data(){
      return {
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        listLoading: false,
        total: null,
        list: null,
        downloadLoading: false,
        multipleSelection: [],
        sdtDialog: false
      }
    },
    created() {
      this.handleGetList();
    },
    methods: {
      handleSdtTest(){
        this.sdtDialog = true;
         setTimeout(()=>{
           console.log(document.getElementById('myChart'))
           let myChart = this.$echarts.init(document.getElementById('myChart'))
           // myChart.setOption = {
           //   xAxis: {},
           //   yAxis: {},
           //   series: [{
           //     symbolSize: 20,
           //     data: [
           //       [10.0, 8.04],
           //       [8.0, 6.95],
           //       [13.0, 7.58],
           //       [9.0, 8.81],
           //       [11.0, 8.33],
           //       [14.0, 9.96],
           //       [6.0, 7.24],
           //       [4.0, 4.26],
           //       [12.0, 10.84],
           //       [7.0, 4.82],
           //       [5.0, 5.68]
           //     ],
           //     type: 'scatter'
           //   }]
           // };
           var option  = {
             xAxis: {},
             yAxis: {},
             series: [{
               symbolSize: 20,
               data: [
                 [10.0, 8.04],
                 [8.0, 6.95],
                 [13.0, 7.58],
                 [9.0, 8.81],
                 [11.0, 8.33],
                 [14.0, 9.96],
                 [6.0, 7.24],
                 [4.0, 4.26],
                 [12.0, 10.84],
                 [7.0, 4.82],
                 [5.0, 5.68]
               ],
               type: 'scatter'
             }]
           };

           myChart.setOption(option);
         },1000)
      },
      tableHeaderColor({ row, column, rowIndex, columnIndex }) {
        if (rowIndex === 0) {
          return 'color: #000;font-weight:500;font-size:14px;font-weight:700;text-align:center'
        }
      },
      tableRowClassName({row, rowIndex}) {
        if (rowIndex % 2 == 1) {
          return 'warning-row';
        } else {
          return 'success-row';
        }
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleDownloadExcel(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要导出的数据',
            type: 'warning',
            duration: 1000
          });
          return;
        };
        this.downloadLoading = true;
        const tHeader = ['数据编号','类别','型号','样本','定耦耦合度','电缆衰减','衰减器','检波值','检波功率','源功率','方向角','俯仰角','靶点增益','距离','到靶功率密度','定耦耦合度','电缆衰减','衰减器','检波值','检波功率','接收功率','天线增益','有效面积','天线测得功率密度','效应物状态','重频','串数','脉宽','功率密度比较','示波器读数','实验现象','4D类别','设备类别'];
        const filterVal = ['id','category','model','sampleNo','fsCouplingDegree','fsCableAttenuation','fsAttenuator','fsDetectionValue','fsDetectionPower','fsSourcePower','fsBearing','fsCableAttenuation','fstargetGain','distance','fsPowerDensity','jsCouplingDegree','jsCableAttenuation','jsAttenuator','jsDetectionValue','jsDetectionPower','jsPower','jsAntennaGain','jsEffectiveArea','jsPowerByAntenna','effectorStatus','mhz','numberOfStr','pwm','powerDensityComparison','oscilloscopeValue','experimentalPhenomen','fourDTypeId','equipTypeId']
        const list = this.multipleSelection;
        const data = this.formatJson(filterVal, list);
        export_json_to_excel({
          header: tHeader,
          data,
          filename: this.filename,
          autoWidth: this.autoWidth,
          bookType: this.bookType
        })
        this.downloadLoading = false
      },
      formatJson(filterVal, jsonData) {
        return jsonData.map(v => filterVal.map(j => {
          if (j === 'timestamp') {
            return parseTime(v[j])
          } else {
            return v[j]
          }
        }))
      },
      handleSearchList(){
        this.listQuery.pageNum = 1;
        this.handleGetList()
      },
      handleResetSearch(){
        this.listQuery = Object.assign({},defaultListQuery)
        this.handleGetList()
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
      handleSizeChange(val){//改变每页显示多少条时触发
        this.listQuery.pageNum = 1;
        this.listQuery.pageSize = val;
        this.handleGetList();
      },
      handleCurrentChange(val){
        this.listQuery.pageNum = val;
        this.handleGetList();
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
    mixins: [columnSortMixin,commonMixin],
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