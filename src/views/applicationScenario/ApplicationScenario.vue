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
            <el-form-item label="描述:">
              <el-input style="width: 203px" v-model="listQuery.scenarioDescription" placeholder="描述" clearable></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="提交日期：">
              <el-date-picker
                      class="input-width"
                      v-model="listQuery.submitStart"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      type="datetime"
                      placeholder="请选择时间">
              </el-date-picker>
              <span class="wave">~</span>
              <el-date-picker
                      class="input-width"
                      v-model="listQuery.submitEnd"
                      value-format="yyyy-MM-dd HH:mm"
                      format="yyyy-MM-dd HH:mm"
                      type="datetime"
                      placeholder="请选择时间">
              </el-date-picker>
            </el-form-item>
          </div>
        </el-form>
      </div>
    </el-card>

  </div>
</template>

<script>
  import {fetchGetListPage,fetchGetParamForAdd} from 'network/applicationScenario'
  const defaultListQuery = {
    pageNum:1,
    pageSize:5,
    scenarioName:null,
    scenarioDescription:null,
    submitStart:null,
    submitEnd: null,
  }
  export default {
    name: "ApplicationScenario",
    data(){
      return {
        listQuery: JSON.parse(JSON.stringify(defaultListQuery)),
        applicationScenarioData: null,
        listLoading: true,
        total:null,
        list: null,
        ParamForAddData: null
      }
    },
    created(){
      this.handleGetListPage();
      this.handleGetParamForAdd();
    },
    methods: {
      handleGetListPage(){
        this.listLoading = true;
        fetchGetListPage(this.listQuery).then(res => {
          this.listLoading = false;
          this.list = res.data.list;
          this.total = res.data.total;
        })
      },
      handleGetParamForAdd() {
        fetchGetParamForAdd().then(res => {
          this.ParamForAddData = res.data
        })
      }
    }
  }

</script>

<style scoped>
  .wave {
    margin: 0 5px;
  }
</style>