<template> 
  <div class="app-container-no-page">
    <el-card shadow="never" class="operate-container">
      <div>
        <i class="el-icon-tickets"></i>
        <span>检波列表</span>
      </div>
      <div>
        <el-button size="mini" class="btn-add" @click="handleAdd()">添加</el-button>
      </div>
    </el-card>
    <div class="table-container">
      <el-table
              :data="list"
              style="width: 100%;"
              v-loading="listLoading" border
      >
        <el-table-column label="编号" width="100" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">{{(listQuery.pageNum - 1) * listQuery.pageSize + scope.$index + 1}}</template>
        </el-table-column>
        <el-table-column label="名称" align="center">
          <template slot-scope="scope">{{scope.row.name}}</template>
        </el-table-column>
        <el-table-column label="创建时间" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">{{scope.row.createTime | formatDateTime}}</template>
        </el-table-column>

        <el-table-column label="操作" width="180" align="center">
          <template slot-scope="scope">
            <el-button size="mini"
                       type="text"
                       @click="handleShow(scope.$index, scope.row)">查看
            </el-button>
            <el-button size="mini"
                       type="text"
                       @click="handleDelete(scope.$index, scope.row)">删除
            </el-button>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="blank"></div>
    <el-dialog
            title="添加检波曲线"
            :visible.sync="dialogEditVisible"
            v-if='dialogEditVisible'
            :append-to-body='true'
            width="40%">
      <el-form :model="detectionCurve"
               label-width="208px" size="small"
      >
        <el-form-item label="名称：" prop="name">
          <el-input placeholder="请输入名称" v-model="detectionCurve.name" style="width: 250px" clearable></el-input>
        </el-form-item>
        <el-form-item label="检波曲线：">
          <div class="ui-upload">
            <label>选择文件</label>
            <input type="file" accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel" style="width: 250px" @change="handleImportf(this)">
          </div>
          <span style="color: red;position: relative;bottom: 5px" v-show="excelStatusSuccess">（上传成功）</span>
          <span style="color: red;position: relative;bottom: 5px" v-show="excelStatusFail">（上传失败）</span>
        </el-form-item>

      </el-form>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogEditVisible = false" size="small">取 消</el-button>
        <el-button type="primary" @click="handleDialogConfirm()" size="small">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
            :title="detectionCurveName"
            :visible.sync="dialogDetectionCurve"
            :append-to-body='true'
            width="40%">

        <div class="curve-chart"  ref="detectionCurveChart" id="detectionCurveChart" :style="{width: '100%', height: '400px'}">

        </div>

    </el-dialog>
  </div>
</template>
<script>
  import {fetchListAll,fetchCreate,fetchGetListPage,fetchDelete} from 'network/detectionCurve';
  import {columnSortMixin,commonMixin} from 'common/mixin'
  let formatDate = require("common/utils");
  const defaultDetectionCurve={
    name:null,
    createTime: null,
    curveKeys: null,
    curveValues: null,
  };
  const defaultListQuery = {
    pageNum: 1,
    pageSize: 5,
  };
  export default {
    name: 'DetectionCurve',
    data() {
      return {
        list: null,
        listLoading: false,
        dialogEditVisible:false,
        dialogDetectionCurve: false,
        //检波曲线对象
        detectionCurve: JSON.parse(JSON.stringify(defaultDetectionCurve)),
        detectionCurveName: null,
        isEdit:false,
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        excelStatusSuccess:false,
        excelStatusFail:false
      }
    },
    mixins: [columnSortMixin,commonMixin],
    created() {
      this.getList();
    },
    filters:{
      formatDateTime(time) {
        if (time == null || time === '') {
          return 'N/A';
        }
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm:ss')
      }
    },
    methods: {
      handleImportf(obj){
        let _this = this;
        let inputDOM = this.$refs.inputer;   // 通过DOM取文件数据
        this.file = event.currentTarget.files[0];
        let rABS = false; //是否将文件读取为二进制字符串
        let f = this.file;
        let reader = new FileReader();
        //if (!FileReader.prototype.readAsBinaryString) {
        FileReader.prototype.readAsBinaryString = function(f) {
          let binary = "";
          let rABS = false; //是否将文件读取为二进制字符串
          let pt = this;
          let wb; //读取完成的数据
          let outdata;
          let reader = new FileReader();
          reader.onload = function(e) {
            let bytes = new Uint8Array(reader.result);
            let length = bytes.byteLength;
            for(let i = 0; i < length; i++) {
              binary += String.fromCharCode(bytes[i]);
            }
            let XLSX = require('xlsx');
            if(rABS) {
              wb = XLSX.read(btoa(fixdata(binary)), { //手动转化
                type: 'base64'
              });
            } else {
              wb = XLSX.read(binary, {
                type: 'binary'
              });
            }
            // outdata就是你想要的东西 excel导入的数据
            outdata = XLSX.utils.sheet_to_json(wb.Sheets[wb.SheetNames[0]]);
            // excel 数据再处理
            console.log(outdata);
            let curveKeys = [];
            let curveValues = []
            outdata.map(v => {
              curveKeys.push(v.功率);
              curveValues.push(v.Vp);
            })
             _this.detectionCurve.curveKeys = curveKeys.toString();
             _this.detectionCurve.curveValues = curveValues.toString();
            _this.excelStatusSuccess = true;
          }
          reader.readAsArrayBuffer(f);
        }
        if(rABS) {
          reader.readAsArrayBuffer(f);
        } else {
          reader.readAsBinaryString(f);
        }
      },
      handleAdd() {
        this.dialogEditVisible = true;
        this.excelStatusSuccess = false;
        this.excelStatusFail = false
        this.detectionCurve = Object.assign({},defaultDetectionCurve);
      },
      handleShow(index,row){
        this.dialogDetectionCurve = true;
        this.detectionCurve = JSON.parse(JSON.stringify(defaultDetectionCurve));
        this.detectionCurve = JSON.parse(JSON.stringify(row));
        this.detectionCurveName = row.name;
        setTimeout(()=>{
          let detectionCurveChart = this.$echarts.init(document.getElementById('detectionCurveChart'))
          let option = {
            xAxis: {
              type: 'category',
              data: this.detectionCurve.curveKeys.split(","),
              name:'功率',
            },
            yAxis: {
              type: 'value',
              name:'V(p)'
            },
            series: [{
              data: this.detectionCurve.curveValues.split(","),
              type: 'line'
            }]
          };
          detectionCurveChart.setOption(option,true);
        },1000)

      },
      handleDelete(index,row){
        this.$confirm('是否要删除该资源分类?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchDelete(row.id).then(res => {
            this.handleDialogConfirmResult(res)
          });
        });
      },
      handleDialogConfirm() {
        this.$confirm('是否要确认?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          fetchCreate(this.detectionCurve).then(res => {
            this.handleDialogConfirmResult(res)
          })
        })
      },
      handleDialogConfirmResult(res){
        if (res.code == 200) {
          this.$message({
            message: res.message,
            type: 'success',
          });
          this.dialogEditVisible = false;
          this.getList();
        } else {
          this.$message({
            message: res.message,
            type: 'error'
          });
        }
      },
      getList() {
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
      }
    }
  }
</script>
<style>
  .curve-chart {
    position: relative;
    top: -20px;
  }
  .ui-upload {
    font-size: 14px;
    width: 80px;
    height: 30px;
    line-height: 30px;
    text-align: center;
    position: relative;
    cursor: pointer;
    color: #fff;
    background: #00abff;
    border-radius: 3px;
    overflow: hidden;
    display: inline-block;
    text-decoration: none;
  }

  .ui-upload input {
    position: absolute;
    font-size: 100px;
    right: 0;
    top: 0;
    opacity: 0;
    filter: alpha(opacity=0);
    cursor: pointer
  }
  .operate-container{
    margin-top: 20px;
  }
  .operate-container .btn-add{
    float: right;
  }
  .app-container{
    padding: 25px;
  }
</style>
