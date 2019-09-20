<template>
  <div class="cardType">
    <div class="type">
      <div class="cardTypeTitle">会员级别</div>
      <div class="cardTypeContent">普通卡</div>
    </div>
    <div class="type">
      <div class="cardTypeTitle">品种范围</div>
      <div class="cardTypeContent">
        <el-checkbox-group v-model="checkedCategories">
          <el-checkbox label="1" class="goods-sale">
            <div class="onSales">全场商品打
              <el-input v-model="sales" placeholder="请输入折扣"></el-input>
              折
            </div>
          </el-checkbox>
          <el-checkbox label="2" class="goods-type">
            <div class="title">品类商品</div>
            <div class="rules-handle clearfix">
              <el-button type="primary" class="fl">添加商品</el-button>
              <el-button type="primary" class="fl">删除</el-button>
            </div>
            <el-table
              ref="multipleTable"
              :data="ctableData"
              tooltip-effect="dark"
              fit
              :border="true"
              style="width: 100%"
              @selection-change="handleCommonSelectionChange"
            >
              <el-table-column
                type="selection"
                width="55">
              </el-table-column>
              <el-table-column label="品类" prop="category" width="220"></el-table-column>
              <el-table-column label="折扣" width="200">
                <template slot-scope="scope">
                  <el-input-number
                    :controls="false"
                    v-model="scope.row.sale"
                    @change="getSalesChange(scope.row, scope.$index)"
                    placeholder="请输入折扣"
                  >
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox>
          <el-checkbox label="3" class="goods-specify">
            <div class="title">指定商品</div>
            <div class="rules-handle clearfix">
              <el-button type="primary" class="fl">添加商品</el-button>
              <el-button type="primary" class="fl">删除</el-button>
            </div>
            <el-table
              ref="multipleTable"
              :data="tableData"
              tooltip-effect="dark"
              fit
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
                    <span v-for="(item, key) in scope.row.material"
                          :key="key">{{key === 'company' ? item : item+ '/'}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="零售价" width="120">
                <template slot-scope="scope">
                  <div class="numberBox">
                    <el-input-number
                      class="number-input"
                      :controls="false"
                      v-model="scope.row.amount"
                      :disabled="true"
                    >
                    </el-input-number>
                    <i class="unit">￥</i>
                  </div>
                </template>
              </el-table-column>
              <el-table-column label="折扣" width="120">
                <template slot-scope="scope">
                  <el-input-number
                    :controls="false"
                    v-model="scope.row.credits"
                    @change="getChooseChange(scope.row, scope.$index)"
                  >
                  </el-input-number>
                </template>
              </el-table-column>
            </el-table>
          </el-checkbox>
        </el-checkbox-group>
        <el-pagination
          layout="prev, pager, next, jumper"
          :total="10"
          :page-size="2"
          @current-change="pageChange"
          hide-on-single-page
        >
        </el-pagination>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "cardType",
        data() {
            return {
                sales: '',
                checkedCategories: [],
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
            pageChange(val) {
                console.log(val, '页面改变');
            },
            getSalesChange(val, index) {
                this.ctableData[index] = val;
            },
            getChooseChange(val, index) {
                this.tableData[index] = val;
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/variables.scss";

  .cardType {
    width: 100%;
    padding: 10px 10px;
    border: 1px dashed $border;

    .type {
      display: flex;

      .cardTypeTitle {
        width: 80px;
      }

      .cardTypeContent {
        .title {
          line-height: 30px;
        }

        /deep/ {
          .el-pagination {
            float: right;
            margin: 10px 0;
          }
        }

        .rules-handle {
          margin-bottom: 20px;

          /deep/ {
            .el-button {
              min-width: 92px;
              background-color: transparent;
              border-radius: 2px;
              border: 1px solid $border;
              color: $menuActiveText;
              box-sizing: border-box;

              &:hover {
                border-color: $menuActiveText;
                background-color: $menuActiveText;
                color: #ffffff;
              }
            }
          }
        }

        .onSales {
          /deep/ {
            .el-input {
              width: 200px;
            }
          }
        }

        .goods-sale {
          line-height: 30px;
        }

        .goods-type {
          /deep/ {
            .el-checkbox__input {
              vertical-align: top;
              margin-top: 8px;
            }

            .el-input-number {
              width: 100px;
            }
          }
        }

        .goods-specify {
          /deep/ {
            .el-checkbox__input {
              vertical-align: top;
              margin-top: 8px;
            }
          }
        }

        .numberBox {
          position: relative;

          /deep/ {
            .el-input-number {
              border: none;

              .el-input__inner {
                cursor: auto;
              }
            }
          }

          .unit {
            position: absolute;
            top: 50%;
            left: 14%;
            font-size: 12px;
            font-style: normal;
            transform: translateY(-50%);
          }
        }
      }
    }


  }
</style>
