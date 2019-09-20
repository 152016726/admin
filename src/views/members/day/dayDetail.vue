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
              <el-input v-model="activityName" placeholder="请输入活动名称" class="activityName"></el-input>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columnTitle"><span>活动周期</span></div>
        <div class="columnContent">
          <div class="details">
            <div class="strip">
              <chooseDateType/>
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
            <div class="strip direction">
              <cardType/>
              <cardType/>
              <cardType/>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import chooseDateType from "../components/chooseDateType";
  import cardType from "../components/cardType";
    export default {
        name: "dayDetail",
        components: {chooseDateType, cardType},
        data() {
            return {
                activityPeriod: '',
                activityName: ''
            }
        },
        methods: {
            editColumn() {

            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/day/dayDetail.scss";
</style>
