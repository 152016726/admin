<template>
    <div class="integralDetail">
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
          <div class="columnTitle"><span>赠送规则</span></div>
          <div class="columnContent">
            <div class="details">
              <div class="strip">
                <span class="description">对于普通卡，每消费</span>
                <el-input-number v-model="regular" :controls="false" placeholder="请输入金额数"></el-input-number>
                <i>元，赠送1积分</i>
              </div>
              <div class="strip">
                <span class="description">对于银卡，每消费</span>
                <el-input-number v-model="silver" :controls="false" placeholder="请输入金额数"></el-input-number>
                <i>元，赠送1积分</i>
              </div>
              <div class="strip">
                <span class="description">对于金卡，每消费</span>
                <el-input-number v-model="gold" :controls="false" placeholder="请输入金额数"></el-input-number>
                <i>元，赠送1积分</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columnTitle"><span>消费规则</span></div>
          <div class="columnContent">
            <div class="details">
              <div class="strip">
                <span class="description">下单时每</span>
                <el-input-number v-model="transfer" :controls="false" placeholder="请输入积分数"></el-input-number>
                <i>积分，抵消1元</i>
              </div>
            </div>
          </div>
        </div>
        <div class="row">
          <div class="columnTitle"><span>有效期限制</span></div>
          <div class="columnContent">
            <div class="details">
              <div class="strip">
                <el-radio v-model="changeInteger" label="1">
                  每笔积分从赠送日起，有效期为
                  <el-input-number v-model="add" :controls="false" :min="1" placeholder="请输入"></el-input-number>
                  个月
                </el-radio>
              </div>
              <div class="strip">
                <el-radio v-model="changeInteger" label="2">
                  无限期
                </el-radio>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<script>
    export default {
        name: "integralDetail",
        data(){
            return{
                changeInteger: '',
                add: '',
                regular: '',
                silver: '',
                gold: '',
                transfer: ''
            }
        },
        methods:{

        }
    }
</script>

<style lang="scss" scoped>
@import "~@/style/members/integral/integralDetail.scss";
</style>
