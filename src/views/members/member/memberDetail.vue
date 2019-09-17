<template>
  <div class="memberDetail">
    <el-form label-width="100px" class="userInfo clearfix">
      <div class="tab fl">
        <el-form-item label="业务机构">
          <span>{{userInfo.machine}}</span>
        </el-form-item>
        <el-form-item label="姓名">
          <span>{{userInfo.username}}</span>
        </el-form-item>
        <el-form-item label="身份证号">
          <span>{{userInfo.idCard}}</span>
        </el-form-item>
      </div>
      <div class="tab fl">
        <el-form-item label="会员ID">
          <span>{{userInfo.id}}</span>
        </el-form-item>
        <el-form-item label="手机号">
          <span>{{userInfo.phone}}</span>
        </el-form-item>
        <el-form-item label="出生日期">
          <span>{{userInfo.birthDate}}</span>
        </el-form-item>
      </div>
      <div class="tab fl">
        <el-form-item label="会员卡级别">
          <span>{{userInfo.level}}</span>
        </el-form-item>
        <el-form-item label="性别">
          <span>{{userInfo.gender}}</span>
        </el-form-item>
        <el-form-item label="联系地址">
          <span>{{userInfo.address}}</span>
        </el-form-item>
      </div>
    </el-form>
    <el-tabs v-model="activeName" type="card" class="goods-card" @tab-click="handleClick">
      <el-tab-pane label="消费明细" name="first">
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 1602px"
          :border="true"
        >
          <el-table-column type="index" label="序列" width="50"></el-table-column>
          <el-table-column prop="time" label="消费时间" width="200"></el-table-column>
          <el-table-column prop="serialNumber" label="流水号" width="100"></el-table-column>
          <el-table-column prop="machine" label="业务机构" width="200"></el-table-column>
          <el-table-column prop="no" label="产品(编码/名称/规格 (剂型)/单位/生产厂家)" width="300"></el-table-column>
          <el-table-column label="零售价" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.salePrice"></price-tag>
            </template>
          </el-table-column>
          <el-table-column label="成交价" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.dealPrice"></price-tag>
            </template>
          </el-table-column>
          <el-table-column prop="mount" label="数量" width="50"></el-table-column>
          <el-table-column prop="approval" label="批号" width="100"></el-table-column>
          <el-table-column label="应收金额" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.receivable"></price-tag>
            </template>
          </el-table-column>
          <el-table-column label="实收金额" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.receipts"></price-tag>
            </template>
          </el-table-column>
          <el-table-column label="成本金额" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.cost"></price-tag>
            </template>
          </el-table-column>
          <el-table-column label="优惠金额" width="100">
            <template slot-scope="scope">
              <price-tag v-model="scope.row.discounts"></price-tag>
            </template>
          </el-table-column>
        </el-table>
      </el-tab-pane>
      <el-tab-pane label="行为日志" name="second">行为日志</el-tab-pane>
      <el-tab-pane label="可用优惠券" name="third">可用优惠券</el-tab-pane>
      <el-tab-pane label="互动记录" name="fourth">互动记录</el-tab-pane>
      <el-tab-pane label="积分明细" name="fifth">积分明细</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    import priceTag from "../components/priceTag";

    export default {
        components: {priceTag},
        name: "memberDetail",
        data() {
            return {
                userInfo: {
                    machine: '小黑作坊',
                    handler: '罗小黑',
                    id: '12321',
                    username: '罗小黑',
                    phone: '18588746666',
                    gender: '男',
                    idCard: '14616498325884',
                    birthDate: '1998-09-11',
                    address: 'xxxxxxxxxxxxxxx',
                    level: '白金'
                },
                activeName: 'first',
                tableData: [
                    {
                        time: '2019-08-10 12:12:12',
                        serialNumber: '213123213',
                        machine: '春田花花幼稚园',
                        no: '12321321321',
                        salePrice: '112',
                        dealPrice: '123',
                        mount: '123',
                        approval: '123213213',
                        receivable: '123',
                        receipts: '123',
                        cost: '12',
                        discounts: '12'
                    }
                ]
            }
        },
        methods: {
            handleClick(tab, event) {
                console.log(tab, event);
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/member/memberDetail.scss";
</style>
