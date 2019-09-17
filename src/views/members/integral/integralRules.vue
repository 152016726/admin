<template>
  <div class="integralRules">
    <div v-if="isShowTable" class="show-table">
      <div class="searchTitle">
        <el-select placeholder="按业务机构筛选" v-model="filterOrg">
          <el-option
            v-for="(item, index) in testSelection"
            :key="index"
            :value="item.value"
            :label="item.label"
          >
          </el-option>
        </el-select>
        <el-button type="primary" class="search-btn">搜索</el-button>
      </div>
      <div class="line"></div>
      <div class="rulesForm">
        <div class="rules-handle clearfix">
          <el-button type="primary" class="fl">新增</el-button>
          <el-button type="primary" class="fl" @click="editColumn">编辑</el-button>
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
          <el-table-column label="赠送规则" width="600">
            <template slot-scope="scope">
              <span>
                对于普通卡，没消费{{scope.row.givingRules.common.cost}}元，赠送{{scope.row.givingRules.common.give}}积分；
                对于银卡，每消费{{scope.row.givingRules.silver.cost}}元，赠送{{scope.row.givingRules.silver.give}}积分；
                对于金卡，每消费{{scope.row.givingRules.gold.cost}}元，赠送{{scope.row.givingRules.gold.give}}积分
              </span>
            </template>
          </el-table-column>
          <el-table-column label="消费规则" width="160">
            <template slot-scope="scope">
              <span>
                下单时，每{{scope.row.consumeRules.integral}}积分，抵消{{scope.row.consumeRules.cost}}元
              </span>
            </template>
          </el-table-column>
          <el-table-column label="有效期限制" width="200">
            <template slot-scope="scope">
              <span>
                每笔积分从赠送日起，有效期为{{scope.row.validity}}个月
              </span>
            </template>
          </el-table-column>
          <el-table-column prop="createTime" label="创建时间" width="160"></el-table-column>
          <el-table-column label="是否启用">
            <template slot-scope="scope">
              <el-switch
                v-model="!scope.row.isOpened"
                @change=""
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
          <el-table-column prop="organization" label="业务机构"></el-table-column>
        </el-table>
        <div class="convenientHandle">
          <el-button type="primary" class="handle" @click.prevent="handleAll">全选</el-button>
          <el-button type="primary" class="handle" @click.prevent="handleNone">取消全选</el-button>
          <el-button type="primary" class="handle" @click.prevent="handleInvert">反选</el-button>
        </div>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "integralRules",
        data() {
            return {
                filterOrg: '',
                testSelection: [
                    {label: '测试', value: '测试'},
                    {label: '测试', value: '测试'}
                ],
                tableData: [
                    {
                        givingRules: {
                            common:{
                                cost: '1000',
                                give: '5',
                            },
                            silver:{
                                cost: '1000',
                                give: '5',
                            },
                            gold:{
                                cost: '1000',
                                give: '5',
                            }
                        },
                        consumeRules: {
                            integral: '1000',
                            cost: '5'
                        },
                        validity: '24',
                        createTime: '2018-09-08 12:15:22',
                        isOpened: true,
                        organization: '九江连锁企业'
                    },
                    {
                        givingRules: {
                            common:{
                                cost: '1000',
                                give: '5',
                            },
                            silver:{
                                cost: '1000',
                                give: '5',
                            },
                            gold:{
                                cost: '1000',
                                give: '5',
                            }
                        },
                        consumeRules: {
                            integral: '1000',
                            cost: '5'
                        },
                        validity: '24',
                        createTime: '2018-09-08 12:15:22',
                        isOpened: true,
                        organization: '九江连锁企业'
                    }
                ],
                multipleSelection: []
            }
        },
        computed: {
            isShowTable() {
                const flag = this.$route.fullPath === '/member/integralRules';
                // 数据回显
                if(flag) this.$nextTick(()=>{
                    this.multipleSelection.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                })
                return flag
            }
        },
        mounted(){
          console.log('哈哈哈哈')
        },
        methods:{
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            editColumn(){
                if(this.multipleSelection.length > 1){
                    this.$message({
                        message: '一次只能编辑一条数据',
                        type: 'error'
                    });
                }else if(this.multipleSelection.length === 0){
                    this.$message({
                        message: '请选择你所需要编辑的数据',
                        type: 'warning'
                    });
                }else{
                    this.$router.push({
                        name: 'integralDetail'
                    })
                }
            },
            handleAll(){
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, true);
                });
            },
            handleNone(){
                this.$refs.multipleTable.clearSelection();
            },
            handleInvert(){
                this.tableData.forEach(row => {
                    this.$refs.multipleTable.toggleRowSelection(row, !this.multipleSelection.includes(row));
                })
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/integral/integralRules.scss";

</style>
