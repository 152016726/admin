<template>
  <div class="memberActivity">
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
          <el-table-column label="活动编号" width="120" prop="activityNo"></el-table-column>
          <el-table-column label="活动名称" width="120" prop="activityName"></el-table-column>
          <el-table-column label="活动日期" width="600">
            <template slot-scope="scope">
              <div>
                <span>{{scope.row.effectiveBegin}}</span>
                <i>~</i>
                <span>{{scope.row.effectiveEnd}}</span>
              </div>
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
        name: "memberActivity",
        data() {
            return {
                filterOrg: '',
                testSelection: [
                    {label: '测试', value: '测试'},
                    {label: '测试', value: '测试'}
                ],
                tableData: [
                    {
                        activityNo: '20190802001',
                        activityName: '1周年庆',
                        effectiveBegin: '2018-09-08 12:15:22',
                        effectiveEnd: '2019-09-08 12:15:22',
                        createTime: '2018-09-08 12:15:22',
                        isOpened: true,
                        organization: '九江连锁企业'
                    },
                    {
                        activityNo: '20190802001',
                        activityName: '1周年庆',
                        effectiveBegin: '2018-09-08 12:15:22',
                        effectiveEnd: '2019-09-08 12:15:22',
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
                return this.$route.fullPath === '/member/memberActivity'
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
                    // this.$router.push({
                    //     name: 'upgradeDetail'
                    // })
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
  @import "~@/style/members/activity/memberActivity.scss";
</style>
