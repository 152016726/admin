<template>
  <div class="activityDetail">
    <div class="handle">
      <el-button type="primary" class="save">保存</el-button>
      <el-button type="primary" class="cancel">取消</el-button>
    </div>
    <div class="orgForm">
      <div class="row org">
        <div class="columnTitle"><span>业务机构</span></div>
        <div class="columnContent"><span>身康大药房</span></div>
      </div>
      <div class="row">
        <div class="columnTitle"><span>活动名称</span></div>
        <div class="columnContent">
          <div class="details">
            <div class="strip">
              <el-input v-model="activityName" placeholder="请输入活动名称" class="activityName"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columnTitle"><span>活动日期</span></div>
        <div class="columnContent">
          <div class="details">
            <div class="strip">
              <el-date-picker
                v-model="activityPeriod"
                type="datetimerange"
                range-separator="~"
                start-placeholder="开始日期"
                end-placeholder="结束日期">
              </el-date-picker>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columnTitle"><span></span></div>
        <div class="columnContent">
          <div class="details">
            <div class="strip direction">
              <div class="rules-handle clearfix">
                <el-button type="primary" class="fl">添加商品</el-button>
                <el-button type="primary" class="fl" @click="editColumn">添加优惠券</el-button>
                <el-button type="primary" class="fl">删除</el-button>
              </div>
              <el-table
                ref="multipleTable"
                :data="tableData"
                tooltip-effect="dark"
                style="width: 100%"
                :border="true"
                @selection-change="handleSelectionChange"
              >
                <el-table-column
                  type="selection"
                  width="55">
                </el-table-column>
                <el-table-column label="兑换物" width="560">
                  <template slot-scope="scope">
                    <div>
                      <span v-for="(item, key) in scope.row.material" :key="key">{{key === 'company' ? item : item+ '/'}}</span>
                    </div>
                  </template>
                </el-table-column>
                <el-table-column label="数量" width="120">
                  <template slot-scope="scope">
                    <el-input-number
                      :controls="false"
                      v-model="scope.row.amount"
                      @change="getAmountsChange(scope.row, scope.$index)"
                    >
                    </el-input-number>
                  </template>
                </el-table-column>
                <el-table-column label="兑换积分" width="120">
                  <template slot-scope="scope">
                    <el-input-number
                      :controls="false"
                      v-model="scope.row.credits"
                      @change="getIntegralChange(scope.row, scope.$index)"
                    >
                    </el-input-number>
                  </template>
                </el-table-column>
              </el-table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "activityDetail",
        data() {
            return {
                activityPeriod: '',
                activityName: '',
                tableData: [
                    {
                        material: {
                            no: '01010204001',
                            name: '阿司匹林肠溶片',
                            dosage: '50mg*25片*3（片剂）',
                            unit: '盒',
                            company: '大同市利群药业有限责任公司'
                        },
                        amount: '1',
                        credits: '100'
                    },
                    {
                        material: {
                            no: '01010204001',
                            name: '阿司匹林肠溶片',
                            dosage: '50mg*25片*3（片剂）',
                            unit: '盒',
                            company: '大同市利群药业有限责任公司'
                        },
                        amount: '1',
                        credits: '100'
                    }
                ],
                multipleSelection: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            getAmountsChange(val, index) {
                this.tableData[index] = val
            },
            getIntegralChange(val, index) {
                this.tableData[index] = val
            },
            editColumn() {

            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/activity/activityDetail.scss";
</style>
