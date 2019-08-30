<template>
  <div class="goods-detail">
    <div class="handleBtns">
      <el-button type="primary">保存</el-button>
      <el-button type="primary" class="cancel">取消</el-button>
    </div>
    <div class="goods-info">
      <el-card shadow="hover">
        <el-avatar
          src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
          :size="150"
          fit="contain"
          shape="square"
        >
        </el-avatar>
      </el-card>

      <div class="goods-base">
        <h1>商品名称</h1>
        <div class="tags">
          <div class="tag-left">
            <p>商品编码</p>
            <p>国际条码</p>
            <p>拼音码</p>
          </div>
          <div class="tag-info">

          </div>
          <div class="tag-right">
            <p>品牌</p>
            <p>生产厂家</p>
            <p>产地</p>
          </div>
          <div class="tag-info">

          </div>
        </div>
      </div>
    </div>
    <el-tabs v-model="activeName" type="card" class="goods-card" @tab-click="handleClick">
      <el-tab-pane label="用户管理" name="first">
        <el-form ref="goodsForm" label-position="left" class="card-content" :model="goodsForm">
          <h2>商品分类</h2>
          <el-row class="card-content-categories" :gutter="20">
            <el-col :span="8">
              <el-form-item prop="categories" label="物料类型" label-width="120px">
                <el-select v-model="categories" placeholder="点击下拉选择"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="categories" label="物料类型" label-width="120px">
                <el-select v-model="categories" placeholder="点击下拉选择"></el-select>
              </el-form-item>
            </el-col>
            <el-col :span="8">
              <el-form-item prop="categories" label="物料类型" label-width="120px">
                <el-select v-model="categories" placeholder="点击下拉选择"></el-select>
              </el-form-item>
            </el-col>

          </el-row>
        </el-form>
      </el-tab-pane>
      <el-tab-pane label="配置管理" name="second">配置管理</el-tab-pane>
      <el-tab-pane label="角色管理" name="third">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿" name="fourth">定时任务补偿</el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
    export default {
        name: "goodsDetail",
        data() {
            return {
                activeName: 'first',
                goodsForm: {
                    categories: ''
                },
                categories: '',
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
  @import "../../style/goods/goodsDetail.scss";
</style>
