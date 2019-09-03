<template>
  <div class="goods-list">
    <div class="title-search">
      <el-input placeholder="请输入商品编码/国际条码/批准文号/商品全称/简称" v-model="keywords"></el-input>
      <el-button type="primary" @click.prevent="search_click" class="btn-search">搜索</el-button>
    </div>
    <p class="search-result">全部结果： <span class="result">"六位地黄丸"</span></p>
    <div class="goods-filter-box">
        <div class="goods-item">
          <div class="goods-item-title"><span>物料类型</span></div>
          <filterCategory class="goods-item-category"/>
        </div>
      <div class="goods-item">
        <div class="goods-item-title"><span>品牌</span></div>
        <filterCategory class="goods-item-category" :category="brands"/>
      </div>
      <div class="goods-item">
        <div class="goods-item-title"><span>剂型</span></div>
        <filterCategory class="goods-item-category lastItem"/>
      </div>
    </div>
  </div>
</template>

<script>
    import filterCategory from "./components/filterCategory";
    export default {
        name: "goodsList",
        data(){
            return{
                keywords: '',
                brands: [
                    {id: '1', value: '同仁堂（TRT）'},
                    {id: '2', value: '汇仁'},
                    {id: '3', value: '九芝堂'},
                    {id: '4', value: '前列康'},
                    {id: '5', value: '济民可信'},
                    {id: '6', value: '仁和'},
                    {id: '7', value: '太极'},
                    {id: '8', value: '仲景'},
                    {id: '9', value: '古汉'},
                    {id: '10', value: '达仁堂'},
                    {id: '11', value: '白云山'},
                    {id: '12', value: '陈李济'},
                    {id: '13', value: '佛慈'},
                    {id: '14', value: '修正'},
                    {id: '15', value: '京果'},
                    {id: '16', value: '仲景（ZJ）'},
                    {id: '16', value: '仲景（ZJ）'},
                    {id: '16', value: '仲景（ZJ）'},
                    {id: '16', value: '仲景（ZJ）'},
                    {id: '16', value: '仲景（ZJ）'}
                ],
                dosage:[
                    {id: '1', value: '片剂'},
                    {id: '2', value: '糖浆剂'},
                    {id: '3', value: '酒剂'},
                    {id: '4', value: '散剂'},
                    {id: '5', value: '煎膏剂'},
                    {id: '6', value: '口服液'},
                    {id: '7', value: '胶囊剂'},
                    {id: '8', value: '颗粒剂'},
                ]
            }
        },
        components: {filterCategory},
        methods:{
            search_click(){

            }
        }
    }
</script>

<style lang="scss" scoped>
@import "~@/style/goods/goodsList.scss";
</style>
