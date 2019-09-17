<template>
  <div class="upgradeDetail">
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
        <div class="columnTitle"><span>升级规则</span></div>
        <div class="columnContent">
          <div class="types"><span>银卡</span></div>
          <div class="details">
            <div class="strip">
              <span class="description">最近一年消费金额达到</span>
              <el-input-number v-model="silverCost" :controls="false" placeholder="请输入金额数"></el-input-number>
              <i>元</i>
            </div>
            <div class="strip">
              <span class="description">最近一年消费频次达到</span>
              <el-input-number v-model="silverFre" :controls="false" placeholder="请输入频次"></el-input-number>
              <i>次</i>
            </div>
            <div class="strip">
              <span class="description">最近一年毛利达到</span>
              <el-input-number v-model="silverProf" :controls="false" placeholder="请输入金额数"></el-input-number>
              <i>元</i>
            </div>
          </div>
        </div>
      </div>
      <div class="row">
        <div class="columnTitle"><span></span></div>
        <div class="columnContent">
          <div class="types"><span>金卡</span></div>
          <div class="details">
            <div class="strip">
              <span class="description">最近一年消费金额达到</span>
              <el-input-number v-model="goldCost" :controls="false" placeholder="请输入金额数"></el-input-number>
              <i>元</i>
            </div>
            <div class="strip">
              <span class="description">最近一年消费频次达到</span>
              <el-input-number v-model="goldFre" :controls="false" placeholder="请输入频次"></el-input-number>
              <i>次</i>
            </div>
            <div class="strip">
              <span class="description">最近一年毛利达到</span>
              <el-input-number v-model="goldProf" :controls="false"  placeholder="请输入金额数"></el-input-number>
              <i>元</i>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
    export default {
        name: "upgradeDetail",
        data() {
            return {
                silverCost: null,
                silverFre: null,
                silverProf: null,
                goldCost: null,
                goldFre: null,
                goldProf: null
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/members/upgrade/upgradeDetail.scss";
</style>
