<template>
  <div class="priceTag">
    <el-input-number
      :style="diyStyle"
      :controls="false"
      v-model="val"
      :disabled="isDisabled"
    >
    </el-input-number>
    <i class="unit">￥</i>
  </div>
</template>

<script>
    export default {
        name: "priceTag",
        data() {
            return {
                val: this.value
            }
        },
        props: {
            value: {default: ''},
            isDisabled: {default: true},
            customStyle: {
                default: () => {
                    return {}
                }
            }
        },
        watch: {
            val(str) {
                this.$emit('input', str)
            },
            value(item) {
                this.val = item;
            }
        },
        computed: {
            diyStyle() {
                return Object.assign({
                    width: '80px',
                    'box-sizing': 'border-box'
                }, this.customStyle)
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/variables.scss";

  .priceTag {
    position: relative;

    /deep/ {
      .el-input.is-disabled .el-input__inner {
        color: #606266;
        cursor: default;
        text-align: left;
      }
      .el-input-number .el-input {
        display: flex;
      }
    }

    .unit {
      position: absolute;
      top: 50%;
      left: 4%;
      font-size: 12px;
      font-style: normal;
      transform: translateY(-50%);
    }
  }

  @media only screen and (max-width: 1410px) {
    .priceTag .el-input-number {
      height: 30px;
    }
  }


</style>
