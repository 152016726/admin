<template>
  <el-menu :default-active="activeIndex" class="el-menu-demo" mode="horizontal" @select="handleSelect">
    <el-menu-item index="dashboard">
      <router-link key="navMenu" to="/dashboard">
        商品清单
      </router-link>
    </el-menu-item>
    <el-menu-item index="useForm">
      <router-link key="navCategory" to="/useForm/table">
        商品类别
      </router-link>
    </el-menu-item>
    <el-menu-item index="1">品牌列表</el-menu-item>
    <el-menu-item index="2">规格列表</el-menu-item>
    <el-menu-item index="3">单位列表</el-menu-item>
    <el-menu-item index="4">厂家清单</el-menu-item>
    <el-menu-item index="5"><a href="https://www.ele.me" target="_blank">特殊类别</a></el-menu-item>
  </el-menu>
</template>

<script>
    export default {
        name: "NavMenu",
        computed: {
            activeIndex() {
                return this.$route.fullPath.split('/')[1]
            }
        },
        methods: {
            handleSelect(key, keyPath) {
                console.log('key:', key, '; keyPath:', keyPath);
            }
        }
    }
</script>

<style lang="scss" scoped>
  .el-menu-demo {
    height: 50px;
    line-height: 46px;
    box-sizing: border-box;
    border: none;

    .el-menu-item {
      height: 50px;
      line-height: 46px;
    }
  }
</style>
