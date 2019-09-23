<template>
  <div class="priceArea">
    <div class="numberBox">
      <el-input-number
        class="number-input"
        :controls="false"
        v-model="min"
      >
      </el-input-number>
      <i class="unit">￥</i>
    </div>
    <span class="split">—</span>
    <div class="numberBox">
      <el-input-number
        class="number-input"
        :controls="false"
        v-model="max"
        @keyup.enter.native="onSuccess"
      >
      </el-input-number>
      <i class="unit">￥</i>
    </div>

  </div>
</template>

<script>
    export default {
        name: "priceArea",
        data() {
            return {
                min: '',
                max: ''
            }
        },
        methods: {
            onSuccess() {
                if (+this.max < +this.min) {
                    return
                } else {
                    console.log('输入正常')
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/variables.scss";

  .priceArea {
    display: flex;
    align-items: center;
    margin-left: 20px;

    .numberBox{
      position: relative;
      .unit{
        position: absolute;
        top: 50%;
        left: 4%;
        font-size: 12px;
        font-style: normal;
        transform: translateY(-50%);
      }
    }

    .number-input {
      width: 80px;
      border: 1px solid $border;
      box-sizing: border-box;
    }
    .split{
      margin: 0 5px;
    }
  }

  @media only screen and (max-width: 1410px){
    .priceArea .number-input{
      height: 30px;
    }
  }

</style>
