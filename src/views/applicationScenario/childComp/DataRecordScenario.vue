<template>
  <div style="max-height:405px;overflow-y: scroll;" class="content">
    <div class="lab-phenomenon" v-show="scenarioRelation.type == 2">
      <el-form
              :model="applicationScenarioDataListObj"
      >
        <div class="lab-phenomenon-parent">
          <div class="wby-tx">
            <el-form-item  class="scenario-form-input-item">
              <el-input placeholder="微波源"   clearable class="mid-input-little"></el-input>
            </el-form-item>
            <el-form-item  class="scenario-form-input-item">
              <el-input placeholder="天线"   clearable class="mid-input-little"></el-input>
            </el-form-item>
          </div>
          <div class="wby-img">
            <img src="~assets/img/wby.png">
            <div>微波源</div>
          </div>
          <div class="tx-img">
            <img src="~assets/img/tx.png">
            <div>天线</div>
          </div>
          <div class="center-border">

          </div>
          <div class="xyw-img">
            <img src="~assets/img/xyw.png">
            <div>效应物</div>
          </div>
          <div class="xyw">
            <el-form-item  class="scenario-form-input-item">
              <el-input placeholder="效应物"   clearable class="mid-input-little"></el-input>
            </el-form-item>
          </div>
        </div>
      </el-form>
      <div class="zt-border"></div>
    </div>

    <div class="lab-data lab-data-param" v-if="scenarioType==1">
      <el-form
              :model="applicationScenarioDataListObj"
      >
        <div class="scenario-data-data scenario-data-data-fs">
          <div>
            <el-form-item label="定耦耦合度" class="scenario-form-input-item">
              <el-input placeholder="定耦耦合度" v-model="applicationScenarioDataListObj.fsCouplingDegree"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="电缆衰减" class="scenario-form-input-item">
              <el-input placeholder="电缆衰减" v-model="applicationScenarioDataListObj.fsCableAttenuation"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="衰减器" class="scenario-form-input-item">
              <el-input placeholder="衰减器" v-model="applicationScenarioDataListObj.fsAttenuator"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="方向角" class="scenario-form-input-item">
              <el-input placeholder="方向角" v-model="applicationScenarioDataListObj.fsBearing"  clearable class="mid-input-little unit-input unit-input-angle">
                <template slot="append">°</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="俯仰角" class="scenario-form-input-item">
              <el-input placeholder="俯仰角" v-model="applicationScenarioDataListObj.fsPitchAngle"  clearable class="mid-input-little  unit-input unit-input-angle">
                <template slot="append">°</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="距离" class="scenario-form-input-item">
              <el-input placeholder="距离" v-model="applicationScenarioDataListObj.distance"  clearable class="mid-input-little unit-select-input">
                <template slot="append">
                  <el-select v-model="applicationScenarioDataListObj.distanceId"  clearable   @change="handleChange($event)">
                    <el-option
                            v-for="(item,index) in paramForAddData.distances"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </div>
        </div>
        <div class="scenario-data-data scenario-data-data-js">
          <div>
            <el-form-item label="定耦耦合度" class="scenario-form-input-item">
              <el-input placeholder="定耦耦合度" v-model="applicationScenarioDataListObj.jsCouplingDegree"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="电缆衰减" class="scenario-form-input-item">
              <el-input placeholder="电缆衰减" v-model="applicationScenarioDataListObj.jsCableAttenuation"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="衰减器" class="scenario-form-input-item">
              <el-input placeholder="衰减器" v-model="applicationScenarioDataListObj.jsAttenuator"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="天线增益" class="scenario-form-input-item">
              <el-input placeholder="天线增益" v-model="applicationScenarioDataListObj.jsAntennaGain"  clearable class="mid-input-little unit-input">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="效应物状态" class="scenario-form-input-item">
              <el-input placeholder="效应物状态" v-model="applicationScenarioDataListObj.effectorStatus"  clearable class="mid-input-little"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="scenario-data-data">
          <div>
            <el-form-item label="样本" class="scenario-form-input-item">
              <el-input placeholder="样本" v-model="applicationScenarioDataListObj.sampleNo"  clearable class="mid-input-little"  @input="handleChange($event)"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="型号" class="scenario-form-input-item" >
              <el-input placeholder="型号" v-model="applicationScenarioDataListObj.model"  clearable class="mid-input-little"  @input="handleChange($event)"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="类别" class="scenario-form-input-item" >
              <el-input placeholder="类别" v-model="applicationScenarioDataListObj.category"  clearable class="mid-input-little"  @input="handleChange($event)"></el-input>
            </el-form-item>
          </div>
        </div>
        <div class="scenario-data-data">
          <div>
            <el-form-item label="频率" class="scenario-form-input-item">
              <el-input placeholder="频率" v-model="applicationScenarioDataListObj.frequency"  clearable class="mid-input-little unit-select-input" @input="handleChange($event)">
                <template slot="append">
                  <el-select v-model="applicationScenarioDataListObj.frequencyId"  clearable  @change="handleChange($event)">
                    <el-option
                            v-for="(item,index) in paramForAddData.frequencies"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="功率" class="scenario-form-input-item">
              <el-input placeholder="功率" v-model="applicationScenarioDataListObj.power"  clearable class="mid-input-little unit-select-input"  @input="handleChange($event)">
                <template slot="append">
                  <el-select v-model="applicationScenarioDataListObj.powerId"  clearable  @change="handleChange($event)">
                    <el-option
                            v-for="(item,index) in paramForAddData.powers"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="脉宽" class="scenario-form-input-item">
              <el-input placeholder="脉宽" v-model="applicationScenarioDataListObj.pwm"  clearable class="mid-input-little unit-select-input"  @input="handleChange($event)">
                <template slot="append">
                  <el-select v-model="applicationScenarioDataListObj.pwmId"  clearable  @change="handleChange($event)">
                    <el-option
                            v-for="(item,index) in paramForAddData.pwms"
                            :key="index"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="重频" class="scenario-form-input-item">
              <el-input placeholder="重频" v-model="applicationScenarioDataListObj.mhz"  clearable class="mid-input-little unit-input"  @input="handleChange($event)">
                <template slot="append">Hz</template>
              </el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="串数" class="scenario-form-input-item">
              <el-input placeholder="串数" v-model="applicationScenarioDataListObj.numberOfStr"  clearable class="mid-input-little"  @input="handleChange($event)"></el-input>
            </el-form-item>
          </div>
          <div>
            <el-form-item label="天线增益" class="scenario-form-input-item">
              <el-input placeholder="天线增益" v-model="applicationScenarioDataListObj.antennaDirection"  clearable class="mid-input-little unit-input"  @input="handleChange($event)">
                <template slot="append">dB</template>
              </el-input>
            </el-form-item>
          </div>
          <div class="calc-button">
            <el-button  size="small" class="ground-add" @click="handleStartCalc" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4" >开始计算</el-button>
          </div>
        </div>
      </el-form>
    </div>
    <div class="lab-table">
      <el-table
              :data="applicationScenarioDataList"
              style="width: 100%"
              v-loading="scenarioLoading"
              border
              class="lab-data-table"
              @selection-change="handleSelectionChange"
      >
        <el-table-column type="selection" width="40" align="center"></el-table-column>
        <el-table-column label="炮次" width="80" align="center" :sortable="true" :sort-method="sortByDate">
          <template slot-scope="scope">P{{scope.row.shotNumber}}</template>
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
          <template slot-scope="scope">
            <el-form>
              <el-form-item>
                <el-input class="table-input" v-model="scope.row.fsDetectionValue" placeholder="检波值" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"  />
              </el-form-item>
            </el-form>
          </template>
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
          <template slot-scope="scope">
            <el-form>
              <el-form-item>
                <el-input class="table-input" v-model="scope.row.jsDetectionValue" placeholder="检波值" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"  />
              </el-form-item>
            </el-form>
          </template>
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
          <template slot-scope="scope">
            <el-form>
              <el-form-item>
                <el-input class="table-input" v-model="scope.row.pwm" placeholder="脉宽" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"  />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="功率密度比较"  width="110" align="center">
          <template slot-scope="scope">{{scope.row.powerDensityComparison}}</template>
        </el-table-column>


        <el-table-column label="示波器读数"  align="center" width="130px">
          <template slot-scope="scope">
            <el-form>
              <el-form-item>
                <el-input class="table-input" v-model="scope.row.oscilloscopeValue" placeholder="示波器读数" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"  />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="实验现象"  align="center"  width="190px">
          <template slot-scope="scope">
            <el-form>
              <el-form-item>
                <el-input class="table-input" v-model="scope.row.experimentalPhenomen" placeholder="实验现象" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"  />
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="4D类别" align="center" width="160px">
          <template slot-scope="scope">
            <el-form>
              <el-form-item class="scenario-form-input-item ground-select table-select">
                <div class="ground-parent">
                  <el-select placeholder="请选择4D类别" v-model="scope.row.fourDTypeId"  clearable  class="short-select-short" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4" >
                    <el-option
                            v-for="item in paramForAddData.fourDTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="设备类别"  align="center" width="160px">
          <template slot-scope="scope">
            <el-form>
              <el-form-item class="scenario-form-input-item ground-select table-select">
                <div class="ground-parent">
                  <el-select placeholder="请选择设备类别" v-model="scope.row.equipTypeId"  clearable  class="short-select-short" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4" >
                    <el-option
                            v-for="item in paramForAddData.fourDTypes"
                            :key="item.id"
                            :label="item.name"
                            :value="item.id">
                    </el-option>
                  </el-select>
                </div>
              </el-form-item>
            </el-form>
          </template>
        </el-table-column>
        <el-table-column label="操作"  width="115" align="center" v-if="scenarioRelation.type == 2">
          <template slot-scope="scope">
            <p>
              <el-button
                      size="mini"
                      type="text"
              >记录
              </el-button>
              <el-button
                      size="mini"
                      type="text"
              >比较
              </el-button>
            </p>
          </template>
        </el-table-column>
      </el-table>
    </div>
    <div class="lab-operation">
      <el-button
              size="small"
              @click="handleUpdateScenarioData()"
              class="update-btn"
              :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"
      >
        修改
      </el-button>
      <el-button
              size="small"
              @click="handleDeleteScenarioData()"
              class="del-btn"
              :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4"
      >
        删除
      </el-button>
    </div>
    <div class="lab-report">
      <div>
        <el-form
                :model="applicationScenarioData"
        >
          <el-form-item label="实验报告" class="report-textarea" >
            <el-input type="textarea" :rows="5" v-model="scenarioRelation.experimentReport" placeholder="请输入实验报告" :disabled="scenarioRelation.status != 1 && scenarioRelation.status != 4">

            </el-input>
          </el-form-item>
        </el-form>
      </div>
    </div>
    <div class="blank"></div>
    <el-dialog
            title="数据修改"
            :visible.sync="dataRecordUpdateDialog"
            :append-to-body='true'
            width="52%"
            class="data-record-update-dialog"
            :close-on-click-modal = 'false'
    >
      <div class="lab-data">
        <el-form
                :model="applicationScenarioDataListUpdateObj"
                class="record-update-form"
        >
          <div class="scenario-data-data-update scenario-data-data-fs">
            <div>
              <el-form-item label="定耦耦合度" class="scenario-form-input-item">
                <el-input placeholder="定耦耦合度" v-model="applicationScenarioDataListUpdateObj.fsCouplingDegree"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="电缆衰减" class="scenario-form-input-item">
                <el-input placeholder="电缆衰减" v-model="applicationScenarioDataListUpdateObj.fsCableAttenuation"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="衰减器" class="scenario-form-input-item">
                <el-input placeholder="衰减器" v-model="applicationScenarioDataListUpdateObj.fsAttenuator"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="方向角" class="scenario-form-input-item">
                <el-input placeholder="方向角" v-model="applicationScenarioDataListUpdateObj.fsBearing"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="俯仰角" class="scenario-form-input-item">
                <el-input placeholder="俯仰角" v-model="applicationScenarioDataListUpdateObj.fsPitchAngle"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="距离" class="scenario-form-input-item">
                <el-input placeholder="距离" v-model="applicationScenarioDataListUpdateObj.distance"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
          </div>
          <div class="scenario-data-data-update scenario-data-data-js">
            <div>
              <el-form-item label="定耦耦合度" class="scenario-form-input-item">
                <el-input placeholder="定耦耦合度" v-model="applicationScenarioDataListUpdateObj.jsCouplingDegree"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="电缆衰减" class="scenario-form-input-item">
                <el-input placeholder="电缆衰减" v-model="applicationScenarioDataListUpdateObj.jsCableAttenuation"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="衰减器" class="scenario-form-input-item">
                <el-input placeholder="衰减器" v-model="applicationScenarioDataListUpdateObj.jsAttenuator"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="天线增益" class="scenario-form-input-item">
                <el-input placeholder="天线增益" v-model="applicationScenarioDataListUpdateObj.jsAntennaGain"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="效应物状态" class="scenario-form-input-item">
                <el-input placeholder="效应物状态" v-model="applicationScenarioDataListUpdateObj.effectorStatus"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div></div>
          </div>
          <div class="scenario-data-data-update">
            <div>
              <el-form-item label="样本" class="scenario-form-input-item">
                <el-input placeholder="样本" v-model="applicationScenarioDataListUpdateObj.sampleNo"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="型号" class="scenario-form-input-item">
                <el-input placeholder="型号" v-model="applicationScenarioDataListUpdateObj.model"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="类别" class="scenario-form-input-item">
                <el-input placeholder="类别" v-model="applicationScenarioDataListUpdateObj.category"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div></div>
            <div></div>
            <div></div>
          </div>
          <div class="scenario-data-data-update">
            <div>
              <el-form-item label="频率" class="scenario-form-input-item">
                <el-input placeholder="频率" v-model="applicationScenarioDataListUpdateObj.frequency"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="功率" class="scenario-form-input-item">
                <el-input placeholder="功率" v-model="applicationScenarioDataListUpdateObj.power"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="脉宽" class="scenario-form-input-item">
                <el-input placeholder="脉宽" v-model="applicationScenarioDataListUpdateObj.pwm"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="重频" class="scenario-form-input-item">
                <el-input placeholder="重频" v-model="applicationScenarioDataListUpdateObj.mhz"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="串数" class="scenario-form-input-item">
                <el-input placeholder="串数" v-model="applicationScenarioDataListUpdateObj.numberOfStr"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
            <div>
              <el-form-item label="天线增益" class="scenario-form-input-item">
                <el-input placeholder="天线增益" v-model="applicationScenarioDataListUpdateObj.antennaDirection"  clearable class="mid-input-little"></el-input>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <div class="dialog-footer" style="text-align: center;">
        <el-button size="small" @click="handleUpdateScenarioDataCalc" class="next-step" >计算</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>

  import {columnSortMixin,commonMixin} from 'common/mixin';
  import {fetchCreate as fetchScenarioDataCreate,fetchGetByApplicationScenarioId,fetchUpdateApplicationScenario,fetchDeleteBatch as fetchScenarioDataDeleteBatch,fetchUpdate as fetchScenarioDataUpdate,} from 'network/applicationScenarioData'
  export default {
    name: "DataRecordScenario",
    props: {
      applicationScenarioData: {
        type: Object,
        default: {}
      },
      paramForAddData: {
        type: Object,
        default: {}
      },
      applicationScenarioDataListObj: {
        type: Object,
        default: {}
      },
      scenarioType: {
        type: String,
        default: null
      },
      scenarioRelation: {
        type: Object,
        default: {}
      }
    },
    data() {
      return {
        //应用场景数据集合
        applicationScenarioDataList: [],
        scenarioLoading:true,
        multipleSelection:[],
        //场景数据修改弹框
        dataRecordUpdateDialog: false,
        //要修改的应用场景数据对象
        applicationScenarioDataListUpdateObj: {

        },
        // applicationScenarioDataListObj: this.applicationScenarioDataListObj
      }
    },
    created(){
      this.handleGetApplicationScenarioData();
    },
    methods: {
      handleChange(e){
        this.$forceUpdate()
      },
      handleStartCalc(){
        this.applicationScenarioDataListObj.applicationScenarioId = this.applicationScenarioData.id;
        this.applicationScenarioDataListObj.scenarioRelationId = this.scenarioRelation.id;
        let shotNumber;
        if(this.applicationScenarioDataList.length > 0){
          shotNumber = parseInt(this.applicationScenarioDataList[this.applicationScenarioDataList.length-1].shotNumber)+ 1;
        }else {
          shotNumber = 1;
        }
        this.applicationScenarioDataListObj.shotNumber = shotNumber;
        let applicationScenarioAddParam = {
          applicationScenarioDatas: this.applicationScenarioDataList,
          applicationScenarioData: this.applicationScenarioDataListObj
        };
        fetchScenarioDataCreate(applicationScenarioAddParam).then(res => {
          if(res.code == 200 ){
            this.handleGetApplicationScenarioData();
            // this.applicationScenarioDataListObj = JSON.parse(JSON.stringify(defaulApplicationScenarioDataListObj))
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      handleSelectionChange(val){
        this.multipleSelection = val;
      },
      handleGetApplicationScenarioData(){
        console.log("11xx")
        this.scenarioLoading = true
        fetchGetByApplicationScenarioId({scenarioRelationId:this.scenarioRelation.id}).then(res => {
          this.applicationScenarioDataList = res.data;
          this.scenarioLoading = false
        })
      },
      handleDeleteScenarioData(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择删除的数据',
            type: 'warning',
            duration: 1000
          });
          return;
        }else {
          this.$confirm('是否要删除该数据记录?', '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning'
          }).then(() => {
            let ids = [];
            this.multipleSelection.forEach(res => {
              console.log(res);
              ids.push(res.id);
            })
            let applicationScenarioAddParam = {
              applicationScenarioDatas: this.applicationScenarioDataList,
              ids: ids
            };
            fetchScenarioDataDeleteBatch(applicationScenarioAddParam).then(res => {
              if(res.code == 200){
                this.handleGetApplicationScenarioData();
              }else {
                this.$message({
                  message: res.message,
                  type: 'error',
                  duration: 1000
                });
              }
            })
          })
        }
      },
      handleUpdateScenarioDataCalc(){
        let applicationScenarioAddParam = {
          applicationScenarioDatas: this.applicationScenarioDataList,
          applicationScenarioData: this.applicationScenarioDataListUpdateObj
        };
        fetchScenarioDataUpdate(applicationScenarioAddParam).then(res => {
          if(res.code == 200){
            this.dataRecordUpdateDialog = false;
            this.handleGetApplicationScenarioData();
          }else {
            this.$message({
              message: res.message,
              type: 'error',
              duration: 1000
            });
          }
        })
      },
      handleUpdateScenarioData(){
        if(this.multipleSelection==null||this.multipleSelection.length<1){
          this.$message({
            message: '请选择要修改的数据',
            type: 'warning',
            duration: 1000
          });
          return;
        }else if(this.multipleSelection.length > 1){
          this.$message({
            message: '单次修改数据不能超过一条',
            type: 'warning',
            duration: 1000
          });
          return;
        }else {
          let applicationScenarioDataListUpdateObjTemp = this.multipleSelection[0];//列表中的值
          let applicationScenarioDataListObjTemp = Object.assign({},this.applicationScenarioDataListObj)//场景的值
          applicationScenarioDataListObjTemp.id = applicationScenarioDataListUpdateObjTemp.id;
          applicationScenarioDataListObjTemp.applicationScenarioId = this.applicationScenarioData.id;;
          applicationScenarioDataListObjTemp.scenarioRelationId = this.scenarioRelation.id;
          applicationScenarioDataListObjTemp.shotNumber = applicationScenarioDataListUpdateObjTemp.shotNumber;
          applicationScenarioDataListObjTemp.fsCouplingDegree = applicationScenarioDataListUpdateObjTemp.fsCouplingDegree;
          applicationScenarioDataListObjTemp.fsCableAttenuation = applicationScenarioDataListUpdateObjTemp.fsCableAttenuation;
          applicationScenarioDataListObjTemp.fsAttenuator = applicationScenarioDataListUpdateObjTemp.fsAttenuator;
          applicationScenarioDataListObjTemp.fsBearing = applicationScenarioDataListUpdateObjTemp.fsBearing;
          applicationScenarioDataListObjTemp.fsPitchAngle = applicationScenarioDataListUpdateObjTemp.fsPitchAngle;
          applicationScenarioDataListObjTemp.distance = applicationScenarioDataListUpdateObjTemp.distance;
          applicationScenarioDataListObjTemp.jsCouplingDegree = applicationScenarioDataListUpdateObjTemp.jsCouplingDegree;
          applicationScenarioDataListObjTemp.jsCableAttenuation = applicationScenarioDataListUpdateObjTemp.jsCableAttenuation;
          applicationScenarioDataListObjTemp.jsAttenuator = applicationScenarioDataListUpdateObjTemp.jsAttenuator;
          applicationScenarioDataListObjTemp.jsAntennaGain = applicationScenarioDataListUpdateObjTemp.jsAntennaGain;
          applicationScenarioDataListObjTemp.effectorStatus = applicationScenarioDataListUpdateObjTemp.effectorStatus;
          applicationScenarioDataListObjTemp.sampleNo = applicationScenarioDataListUpdateObjTemp.sampleNo;
          applicationScenarioDataListObjTemp.model = applicationScenarioDataListUpdateObjTemp.model;
          applicationScenarioDataListObjTemp.category = applicationScenarioDataListUpdateObjTemp.category;
          // 频率值在列表中没有存
          // applicationScenarioDataListObjTemp.frequency = applicationScenarioDataListUpdateObjTemp.frequency;
          // 功率值在列表中没有存
          // applicationScenarioDataListObjTemp.power = applicationScenarioDataListUpdateObjTemp.power;
          applicationScenarioDataListObjTemp.pwm = applicationScenarioDataListUpdateObjTemp.pwm;
          applicationScenarioDataListObjTemp.mhz = applicationScenarioDataListUpdateObjTemp.mhz;
          applicationScenarioDataListObjTemp.numberOfStr = applicationScenarioDataListUpdateObjTemp.numberOfStr;
          //天线增益值在列表中没有存
          // applicationScenarioDataListObjTemp.antennaDirection = applicationScenarioDataListUpdateObjTemp.antennaDirection;
          this.applicationScenarioDataListUpdateObj = applicationScenarioDataListObjTemp;
          this.dataRecordUpdateDialog = true
        }
      },
    },
    mixins: [columnSortMixin,commonMixin],
  }
</script>

<style scoped>
  .lab-phenomenon .zt-border {
    width: 98%;
    height: 1px;
    background-color: #000;
    margin: 45px 0 10px 0;
  }
  .lab-data-param {
    position: relative;
    top: -20px;
  }
  .measure-module .param-one > div,.measure-module .param-two > div,js-module .param-one > div,.js-module .param-two > div {
    flex: 1;
  }
  .data-content .scenario-type-img img {
    margin-top: 0;
  }
  .data-content .two-ele span:nth-child(2) {
    margin-left: 110px;
  }

  .data-content > div {
    padding: 5px 0px;
  }
  .lab-phenomenon {
    padding-bottom: 30px;
    padding-top: 10px;
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

  .report-textarea {
    display: flex;
    flex-wrap: wrap;
  }
  .record-update-form {
    position: relative;
    top: -30px;
  }
  .lab-operation {
    margin-top: 20px;
  }
  .lab-table {
    margin-top: 30px;
    font-size: 14px;
  }
  .calc-button {
    display: flex;
    align-items: flex-end;
  }
  .calc-button button {
    bottom: 3px;
    position: relative;
    width: 80px;
  }
  .scenario-data-data {
    display: flex;
    margin-top: 15px;
  }
  .scenario-data-data > div {
    width: 12%;
  }
  .scenario-data-data-update {
    display: flex;
  }
  .scenario-data-data-update>div{
   flex: 1;
  }
  .next-step {
    height: 24px;
    line-height: 24px;
    width: 55px;
    padding: 0;
  }
  .next-step,.ground-add,.update-btn,.ground-add:hover,.update-btn:hover {
    background-color: #4d83ff;
    color: #fff;
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
  .params-two > div {
    width: 33%;
  }
  .params-border div {
    width: 100%;
    height: 1px;
    background-color: #000;
  }

</style>