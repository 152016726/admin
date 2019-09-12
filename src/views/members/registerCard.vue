<template>
  <div class="registerCard">
    <div class="handle">
      <el-button type="primary" class="save">保存</el-button>
      <el-button type="primary" class="cancel">取消</el-button>
    </div>
    <div class="cardInfo">
      <el-form ref="cardForm" :model="cardForm" :rules="cardRules" label-width="100px">
        <el-form-item prop="machine" label="业务机构">
          <el-input v-model="cardForm.machine" class="noneBorder" disabled type="text" name="machine"></el-input>
        </el-form-item>
        <el-form-item prop="handler" label="办卡操作员">
          <el-input v-model="cardForm.handler" class="noneBorder" disabled type="text" name="handler"></el-input>
        </el-form-item>
        <el-form-item prop="id" label="会员ID">
          <el-input v-model="cardForm.id" disabled class="noneBorder" type="text" name="id"></el-input>
        </el-form-item>
        <el-form-item prop="username" label="姓名" :rules="cardRules.username">
          <el-input v-model="cardForm.username" placeholder="请输入办卡人姓名" type="text" name="username"></el-input>
        </el-form-item>
        <el-form-item prop="phone" label="手机号">
          <el-input v-model="cardForm.phone" placeholder="请输入办卡人手机号" type="text" name="phone"></el-input>
        </el-form-item>
        <el-form-item prop="gender" label="性别">
          <el-radio v-model="cardForm.gender" :label="1" name="gender">男</el-radio>
          <el-radio v-model="cardForm.gender" :label="2" name="gender">女</el-radio>
        </el-form-item>
        <el-form-item prop="idCard" label="身份证号">
          <el-input v-model="cardForm.idCard" type="text" placeholder="请输入办卡人身份证号" name="idCard"></el-input>
        </el-form-item>
        <el-form-item prop="birthDate" label="出生日期">
          <el-date-picker v-model="cardForm.birthDate" type="date" placeholder="选择日期" value-format="yyyy-MM-dd"
                          name="birthDate"></el-date-picker>
        </el-form-item>
        <el-form-item prop="address" label="联系地址">
          <el-input v-model="cardForm.address" type="text" placeholder="请输入办卡人联系地址" name="address"></el-input>
        </el-form-item>

      </el-form>
    </div>
  </div>
</template>

<script>
    import {identityCodeValid} from '@/utils/validate';
    export default {
        name: "registerCard",
        data() {
            const validatePhone = (rule, value, callback) => {
                if (!/^1[34578]\d{9}$/.test(value)) {
                    callback(new Error('请输入正确的手机号码'))
                } else {
                    callback()
                }
            };
            const validateIdCard = (rule, value, callback) => {
                const result = identityCodeValid(value);
                if(result.tip){
                    callback(new Error(result.tip))
                }else{
                    this.cardForm.birthDate = result.more.birthDate;
                }
            }
            return {
                cardForm: {
                    machine: '小黑作坊',
                    handler: '罗小黑',
                    id: '12321',
                    username: '',
                    phone: '',
                    gender: '',
                    idCard: '',
                    birthDate: '',
                    address: ''
                },
                cardRules: {
                    username: [{required: true, trigger: 'blur', message: '请输入姓名'}],
                    phone: [{required: true, trigger: 'blur', validator: validatePhone}],
                    idCard: [{required: false, trigger: 'blur', validator: validateIdCard}],
                },
            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/style/members/registerCard.scss";
</style>
