<template>
  <el-card class="goods-unit" shadow="hover" :body-style="{ padding: '0px' }">
    <div class="photo" @mouseenter="openIntro" @mouseleave="closeIntro">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
           class="image" alt="">
      <div class="mask_shadow" v-if="group.includes(item)"></div>
      <div class="introduction" v-show="visible" :style="{left: left+ 'px', top: top+ 'px'}">
        <p>商品编码：01010101010101</p>
        <p>批准文号：国药准字H123214141</p>
        <p>物料类型：药品-西药-非处方药</p>
        <p>生产厂家：汕头市时珍同方保健食品有限公司</p>
        <p>特殊类别：</p>
        <p>保质期/月：24</p>
        <p>品牌：时珍</p>
        <p>业务机构：九章医药有限公司</p>
      </div>
    </div>
    <div class="content">
      <span class="brand">仁和_阿司匹林肠溶片</span>
      <span class="specifications">50mg*25片*3板 /盒</span>
      <i class="price">￥29.90</i>
    </div>
  </el-card>
</template>

<script>
    export default {
        name: "goodsUnit",
        data() {
            return {
                visible: false,
                left: 0,
                top: 0
            }
        },
        props: {
            group: {default: () => []},
            item: {default: ''}
        },
        methods: {
            openIntro(e) {

                const menuMinWidth = 105
                const offsetLeft = this.$el.getBoundingClientRect().left // container margin left
                // const offsetWidth = this.$el.offsetWidth
                // const maxLeft = offsetWidth + menuMinWidth
                const left = e.clientX - offsetLeft + 15

                console.log(left)

                // if (left > maxLeft) {
                //     this.left = maxLeft
                // } else {
                //     this.left = left
                // }
                // this.left = left
                // this.top = e.clientY
                this.visible = true
            },
            closeIntro() {
                this.visible = false
                console.log("移出")
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/variables.scss";

  .goods-unit {
    border: 1px solid $border;
    cursor: pointer;

    &.el-card {
      &:hover {
        box-shadow: 3px 3px 10px #bfcbd9;
      }
    }

    .photo {
      background-color: #ffffff;
      padding: 10px 10px;
      width: 100%;
      height: 200px;
      border-bottom: 1px solid $border;
      box-sizing: border-box;
      position: relative;

      .mask_shadow {
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background-color: rgba(0, 0, 0, 0.3);
      }

      .image {
        width: 100%;
        height: 100%;
        background-size: contain;
      }

      .introduction {
        margin: 0;
        background: #fff;
        z-index: 3000;
        position: absolute;
        width: 100%;
        padding: 10px 10px;
        box-sizing: border-box;
        font-size: 12px;
        border: 1px solid $border;
      }
    }

    .content {
      padding: 10px 10px;
      background-color: rgb(242, 242, 242);
      text-align: left;

      .brand {
        line-height: 25px;
      }

      .specifications, .price {
        font-size: 12px;
        color: gray;
      }

      .brand, .specifications, .price {
        display: block;
        width: 100%;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
      }
    }
  }
</style>
