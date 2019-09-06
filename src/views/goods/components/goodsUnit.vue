<template>
  <el-card class="goods-unit" shadow="hover" :body-style="{ padding: '0px' }">
    <div class="photo" @mouseenter="openIntro" @mouseleave="closeIntro">
      <img src="https://shadow.elemecdn.com/app/element/hamburger.9cf7b091-55e9-11e9-a976-7f4d0b07eef6.png"
           class="image" alt="">
      <div class="mask_shadow" v-if="group.includes(item)"></div>
      <div class="introduction" v-show="visible" :style="{left: left+ 'px', top: top+ 'px'}">
        <div class="goods-info">
          <span class="title">商品编码：</span>
          <a class="info" href="#" onclick="return false;" title="01010101010101">01010101010101</a>
        </div>
        <div class="goods-info">
          <span class="title">批准文号：</span>
          <a class="info" href="#" onclick="return false;" title="国药准字H123214141">国药准字H123214141</a>
        </div>
        <div class="goods-info">
          <span class="title">物料类型：</span>
          <a class="info" href="#" onclick="return false;" title="药品-西药-非处方药">药品-西药-非处方药</a>
        </div>
        <div class="goods-info">
          <span class="title">生产厂家：</span>
          <a class="info" href="#" onclick="return false;" title="汕头市时珍同方保健食品有限公司">汕头市时珍同方保健食品有限公司</a>
        </div>
        <div class="goods-info">
          <span class="title">特殊类别：</span>
          <a class="info" href="#" onclick="return false;">
            <i class="drag">毒</i>
            <i class="anesthesia">麻</i>
            <i class="spirit">精</i>
            <i class="radioactive">放</i>
            <i class="common">普</i>
          </a>
        </div>
        <div class="goods-info">
          <span class="title">保质期/月：</span>
          <a class="info" href="#" onclick="return false;">24</a>
        </div>
        <div class="goods-info">
          <span class="title"><span>品</span> <span>牌：</span></span>
          <a class="info" href="#" onclick="return false;">时珍</a>
        </div>
        <div class="goods-info">
          <span class="title">业务机构：</span>
          <a class="info" href="#" onclick="return false;" title="九章医药有限公司">九章医药有限公司</a>
        </div>
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
            item: {default: ''},
            containerWidth: {default: ''},
            containerOffsetLeft: {default: ''}
        },
        methods: {
            openIntro(e) {
                const flag = this.$el.offsetWidth + e.clientX - this.containerOffsetLeft > this.containerWidth
                if (flag) {
                    this.left = -150
                } else {
                    this.left = 50
                }
                this.top = 50
                this.visible = true
            },
            closeIntro() {
                this.visible = false
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
        width: 200px;
        padding: 10px 10px;
        box-sizing: border-box;
        font-size: 12px;
        border: 1px solid $border;

        .goods-info {
          display: flex;
          line-height: 20px;

          .title {
            width: 60px;
            display: flex;
            text-align: right;
            justify-content: space-between;
          }

          .info {
            margin: 0;
            overflow: hidden;
            text-align: left;
            text-overflow: ellipsis;
            white-space: nowrap;

            i {
              display: inline-block;
              width: 18px;
              height: 18px;
              border-radius: 50%;
              font-style: normal;
              font-size: 12px;
              text-align: center;
              vertical-align: middle;
            }

            .drag {
              background-color: red;
              color: #ffffff;
            }

            .anesthesia {
              background-color: yellow;
              color: #000000;
            }

            .spirit {
              background-color: palegreen;
              color: #ffffff;
            }

            .radioactive {
              background-color: #000000;
              color: #ffffff;
            }

            .common {
              background-color: $subMenuActiveText;
              color: $menuText;
            }
          }
        }
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
