<template>
  <div class="memberManage-container">
    <div v-if="isShowTable">
      <div class="searchTitle">
        <el-select placeholder="按业务机构筛选" v-model="offices">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-input placeholder="请输入手机号码/姓名/身份证号码/会员ID查询" v-model="searchNum"></el-input>
        <el-select placeholder="按会员卡级别筛选" v-model="level">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="按会员卡状态筛选" v-model="status">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-date-picker
          v-model="cardDateRange"
          type="daterange"
          align="right"
          unlink-panels
          range-separator="-"
          start-placeholder="办卡开始日期"
          end-placeholder="办卡结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-date-picker
          v-model="consumeDateRange"
          type="daterange"
          range-separator="-"
          start-placeholder="最近消费开始日期"
          end-placeholder="最近消费结束日期"
          :picker-options="pickerOptions"
          value-format="yyyy-MM-dd"
        >
        </el-date-picker>
        <el-select placeholder="按最近一年消费金额范文筛选" v-model="amountRange">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="选择办卡操作员" v-model="handler">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-button type="primary" class="search-btn">搜索</el-button>
      </div>
      <div class="line"></div>
      <div class="goods-form">
        <div class="goods-handle clearfix">
          <el-button type="primary" class="fl" @click="isChangeLevel = true">级别变更</el-button>
          <el-button type="primary" class="fl" @click="isIntegerCount = true">积分加减</el-button>
          <el-button type="primary" class="fl">办理</el-button>
          <el-button type="primary" class="fl">注销</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          highlight-current-row
          @current-change="handleSelectionChange">
          <el-table-column type="index" label="序列" width="50"></el-table-column>
          <el-table-column prop="memberId" label="会员ID" show-overflow-tooltip width="100">
            <template slot-scope="scope">
              <router-link to="/member/memberManagement/memberDetail">
                <span class="activeColor">{{scope.row.memberId}}</span>
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="name" label="会员姓名" width="100"></el-table-column>
          <el-table-column prop="telephone" label="手机号码" width="120"></el-table-column>
          <el-table-column prop="idCard" label="身份证号码" width="180"></el-table-column>
          <el-table-column prop="gender" label="性别" sortable :filters="filterObj['gender']" :filter-method="filterTag"
                           width="90"></el-table-column>
          <el-table-column prop="age" label="年龄" width="50"></el-table-column>
          <el-table-column prop="address" label="详细地址" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="integral" label="剩余积分" width="120"></el-table-column>
          <el-table-column prop="status" label="会员卡状态" sortable :filters="filterObj['status']"
                           :filter-method="filterTag" width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="level" label="会员卡级别" sortable :filters="filterObj['level']" :filter-method="filterTag"
                           width="140" show-overflow-tooltip></el-table-column>
          <el-table-column prop="date" label="办卡日期" width="120"></el-table-column>
          <el-table-column prop="recent" label="最近消费时间" show-overflow-tooltip width="120"></el-table-column>
          <el-table-column prop="cost" label="近一年消费金额" width="120"></el-table-column>
          <el-table-column prop="frequency" label="近一年消费频次" width="120"></el-table-column>
          <el-table-column prop="profit" label="近一年毛利" width="120"></el-table-column>
          <el-table-column prop="handler" label="办卡操作员" sortable :filters="filterObj['handler']"
                           :filter-method="filterTag" width="140"></el-table-column>
          <el-table-column prop="institutions" label="业务机构" sortable :filters="filterObj['institutions']"
                           :filter-method="filterTag" width="120"></el-table-column>
          <el-table-column label="是否黑名单" prop="isBlackList" width="140" sortable :filters="filterObj['isBlackList']"
                           :filter-method="filterTag">
            <template slot-scope="scope">
              <el-switch
                v-model="!scope.row.isBlackList"
                disabled
                active-color="#13ce66"
                inactive-color="#ff4949">
              </el-switch>
            </template>
          </el-table-column>
        </el-table>
      </div>
      <Modal
        class="modal"
        v-model="isChangeLevel"
        title="会员级别变更"
        @on-ok="levelOk"
        @on-cancel="levelCancel">
        <p class="dialog">
          <el-radio v-model="changeLevel" label="1">普通卡</el-radio>
        </p>
        <p class="dialog">
          <el-radio v-model="changeLevel" label="2">银卡</el-radio>
        </p>
        <p class="dialog">
          <el-radio v-model="changeLevel" label="3">金卡</el-radio>
        </p>
      </Modal>
      <Modal
        class="modal"
        v-model="isIntegerCount"
        title="积分加减"
        @on-ok="integerOk"
        @on-cancel="integerCancel">
        <p class="dialog">
          <el-radio v-model="changeInteger" label="1">
            加
            <el-input-number v-model="add" :controls="false" :min="1"></el-input-number>
            积分
          </el-radio>
        </p>
        <p class="dialog">
          <el-radio v-model="changeInteger" label="2">
            扣
            <el-input-number v-model="subtract" :controls="false" :min="1"></el-input-number>
            积分
          </el-radio>
        </p>
        <p class="dialog">
          <span class="note">备注</span>
          <el-input
            class="reason"
            type="textarea"
            placeholder="请输入理由"
            v-model="reason"
            maxlength="30"
            resize="none"
            show-word-limit
          >
          </el-input>
        </p>
      </Modal>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "memberManage",
        data() {
            return {
                pickerOptions: {
                    shortcuts: [{
                        text: '最近一周',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近一个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 30);
                            picker.$emit('pick', [start, end]);
                        }
                    }, {
                        text: '最近三个月',
                        onClick(picker) {
                            const end = new Date();
                            const start = new Date();
                            start.setTime(start.getTime() - 3600 * 1000 * 24 * 90);
                            picker.$emit('pick', [start, end]);
                        }
                    }]
                },
                offices: '',
                searchNum: '',
                level: '',
                status: '',
                cardDateRange: '',
                consumeDateRange: '',
                amountRange: '',
                handler: '',
                tableData: [
                    {
                        memberId: '01010204001',
                        name: '罗小黑',
                        telephone: ' 13838383838',
                        idCard: '12345615647896136',
                        gender: '男',
                        age: '18',
                        address: '广东省清远市后花园村后庭街0号',
                        integral: '23',
                        status: '新卡',
                        level: '金卡',
                        date: '2018-06-12',
                        recent: '2018-09-12 12:12:12',
                        cost: '10',
                        frequency: '2',
                        profit: '5',
                        handler: '曹达华',
                        institutions: '九江制药集团',
                        isBlackList: false
                    },
                    {
                        memberId: '010101',
                        name: '罗小白',
                        telephone: ' 13838383830',
                        idCard: '12345615647896131',
                        gender: '女',
                        age: '21',
                        address: '广东省宜章市喷泉村温泉街0号',
                        integral: '23',
                        status: '活跃',
                        level: '银卡',
                        date: '2018-06-12',
                        recent: '2018-09-12 12:12:12',
                        cost: '10',
                        frequency: '2',
                        profit: '5',
                        handler: '曹达华',
                        institutions: '九江制药集团',
                        isBlackList: true
                    },

                ],
                multipleSelection: [],
                filterObj: {},
                isChangeLevel: false,
                changeLevel: '1',
                isIntegerCount: false,
                add: '',
                subtract: '',
                changeInteger: '1',
                reason: ''
            }
        },
        computed: {
            isShowTable() {
                return this.$route.fullPath === '/member/memberManagement'
            }
        },
        methods: {
            levelOk() {
                console.log(this.changeLevel, '会员等级')
                this.levelCancel()
            },
            levelCancel() {
                // 重置
                this.changeLevel = '1'
            },
            integerOk(){
                console.log(this.changeInteger, '积分')
                if(this.changeInteger === '1'){
                    console.log(this.add, '加分')
                }else{
                    console.log(this.subtract, '减分')
                }
                this.integerCancel()
            },
            integerCancel(){
                this.changeInteger = '1'
                this.reason = ''
            },
            /**
             * 选中项
             * @param val
             */
            handleSelectionChange(val) {
                this.multipleSelection = val
                this.changeLevel = val.level
            },
            /**
             * 筛选去重出可筛选项
             */
            filterDataset() {
                let filterObj = {};
                // 获取各个列项的值
                this.tableData.forEach(item => {
                    for (let key in item) {
                        if (!filterObj[key]) {
                            filterObj[key] = [item[key]]
                        } else {
                            filterObj[key].push(item[key])
                        }
                    }
                });
                // 将列项的值去重转化
                for (let key in filterObj) {
                    let singleArr = Array.from(new Set(filterObj[key]))
                    filterObj[key] = singleArr.map(item => {
                        return {text: item, value: item}
                    })
                }
                this.filterObj = filterObj
            },
            /**
             * 过滤方法
             * @param value
             * @param row
             * @param column
             * @returns {boolean}
             */
            filterTag(value, row, column) {
                const property = column['property']
                return row[property] === value
            }
        },
        mounted() {
            this.filterDataset()
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/management.scss";
</style>
