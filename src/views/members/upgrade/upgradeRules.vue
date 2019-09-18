<template>
  <div class="upgradeRules">
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
          <el-table-column label="银卡升级规则" width="600">
            <template slot-scope="scope">
              <span>
                最近一年消费金额达到{{scope.row.silverCard.minAmount}}元，
                最近一年消费频次达到{{scope.row.silverCard.frequency}}次，
                最近一年毛利达到{{scope.row.silverCard.profits}}元
              </span>
            </template>
          </el-table-column>
          <el-table-column label="金卡升级规则" width="600">
            <template slot-scope="scope">
              <span>
                最近一年消费金额达到{{scope.row.goldCard.minAmount}}元，
                最近一年消费频次达到{{scope.row.goldCard.frequency}}次，
                最近一年毛利达到{{scope.row.goldCard.profits}}元
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
        name: "upgradeRules",
        data() {
            return {
                filterOrg: '',
                testSelection: [
                    {label: '测试', value: '测试'},
                    {label: '测试', value: '测试'}
                ],
                tableData: [
                    {
                        silverCard: {
                            minAmount: '1000',
                            frequency: '5',
                            profits: '200'
                        },
                        goldCard: {
                            minAmount: '1000',
                            frequency: '5',
                            profits: '200'
                        },
                        createTime: '2018-09-08 12:15:22',
                        isOpened: true,
                        organization: '九江连锁企业'
                    },
                    {
                        silverCard: {
                            minAmount: '1000',
                            frequency: '5',
                            profits: '200'
                        },
                        goldCard: {
                            minAmount: '1000',
                            frequency: '5',
                            profits: '200'
                        },
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
                const flag = this.$route.fullPath === '/member/upgradeRules';
                // 数据回显
                if(flag) this.$nextTick(()=>{
                    this.multipleSelection.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row, true);
                    });
                })
                return flag
            }
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
                        name: 'upgradeDetail'
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
@import "~@/style/members/upgrade/upgradeRules.scss";
</style>
