<template>
  <div class="dayDetail">
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
              <el-input v-model="activityName" placeholder="请输入活动名称"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columnTitle"><span>生效日期</span></div>
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
        <div class="columnTitle"><span>会员折扣</span></div>
        <div class="columnContent">
          <div class="details">
            <div class="strip">
              <span>折扣优先级为指定商品>品类>全场，即若某指定商品打5折，全场商品打8折，则购买该指定商品享受5折优惠</span>
            </div>
            <div class="strip card">
              <el-form ref="commonForm" label-width="80px">
                <el-form-item label="会员级别">
                  <span>普通卡</span>
                </el-form-item>
                <el-form-item label="品种范围">
                  <div>全场商品打
                    <el-input v-model="sales" placeholder="请输入折扣"></el-input>
                    折
                  </div>
                </el-form-item>
                <el-form-item>
                  <span>品类商品</span>
                </el-form-item>
                <el-form-item>
                  <div class="rules-handle clearfix">
                    <el-button type="primary" class="fl">添加商品</el-button>
                    <el-button type="primary" class="fl">删除</el-button>
                  </div>
                  <el-table
                    ref="multipleTable"
                    :data="ctableData"
                    tooltip-effect="dark"
                    style="width: 100%"
                    :border="true"
                    @selection-change="handleCommonSelectionChange"
                  >
                    <el-table-column
                      type="selection"
                      width="55">
                    </el-table-column>
                    <el-table-column label="品类" prop="category" width="200"></el-table-column>
                    <el-table-column label="折扣" width="120">
                      <template slot-scope="scope">
                        <el-input-number
                          :controls="false"
                          v-model="scope.row.amount"
                          :disabled="true"
                          placeholder="请输入折扣"
                        >
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
                <el-form-item>
                  <span>指定商品</span>
                </el-form-item>
                <el-form-item>
                  <div class="rules-handle clearfix">
                    <el-button type="primary" class="fl">添加商品</el-button>
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
                          :disabled="true"
                        >
                        </el-input-number>
                      </template>
                    </el-table-column>
                    <el-table-column label="兑换积分" width="120">
                      <template slot-scope="scope">
                        <el-input-number
                          :controls="false"
                          v-model="scope.row.credits"
                          :disabled="true"
                        >
                        </el-input-number>
                      </template>
                    </el-table-column>
                  </el-table>
                </el-form-item>
              </el-form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "dayDetail",
        data() {
            return {
                sales: '',
                activityPeriod: '',
                activityName: '',
                ctableData: [
                    {
                        category: '中西成药>抗维生素药>维生素',
                        sale: ''
                    },
                    {
                        category: '中西成药>补益类药',
                        sale: ''
                    }
                ],
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
                multipleSelection: [],
                multipleCommonSelection: []
            }
        },
        methods: {
            handleSelectionChange(val) {
                this.multipleSelection = val
            },
            handleCommonSelectionChange(val) {
                this.multipleCommonSelection = val
            },
            editColumn() {

            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/day/dayDetail.scss";
</style>
