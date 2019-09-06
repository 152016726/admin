<template>
  <div class="goods-list">
    <div class="goods-header">
      <div class="title-search">
        <el-input placeholder="请输入商品编码/国际条码/批准文号/商品全称/简称" v-model="keywords"></el-input>
        <el-button type="primary" @click.prevent="search_click" class="btn-search">搜索</el-button>
      </div>
      <p class="search-result">全部结果： <span class="result">"六位地黄丸"</span></p>
      <div class="goods-filter-box">
        <div class="goods-item">
          <div class="goods-item-title"><span>物料类型</span></div>
          <filter-category class="goods-item-category"/>
        </div>
        <div class="goods-item">
          <div class="goods-item-title"><span>品牌</span></div>
          <filter-category class="goods-item-category" :category="brands"/>
        </div>
        <div class="goods-item">
          <div class="goods-item-title"><span>剂型</span></div>
          <filter-category class="goods-item-category lastItem" :category="dosage"/>
        </div>
      </div>
      <div class="goods-filter-more">
        <el-button type="primary" class="filter-more">更多<i class="el-icon-arrow-down el-icon--right"></i></el-button>
      </div>
    </div>
    <div class="line"></div>
    <div class="goods-content">
      <div class="goods-order">
        <div class="goods-filter-column">
          <el-dropdown @command="complexCommand">
            <el-button type="primary">{{complex}} <i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="由高至低">由高至低</el-dropdown-item>
              <el-dropdown-item command="由低至高">由低至高</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="salesCommand">
            <el-button type="primary">{{sales}} <i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="由高至低">由高至低</el-dropdown-item>
              <el-dropdown-item command="由低至高">由低至高</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="freshCommand">
            <el-button type="primary">{{fresh}} <i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="由高至低">由高至低</el-dropdown-item>
              <el-dropdown-item command="由低至高">由低至高</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <el-dropdown @command="priceCommand">
            <el-button type="primary">{{price}} <i class="el-icon-arrow-down el-icon--right"></i></el-button>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item command="由高至低">由高至低</el-dropdown-item>
              <el-dropdown-item command="由低至高">由低至高</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
        </div>
        <price-area/>
        <div class="tips-ops">
          <i class="circle"></i>
          <span>仅显示有货</span>
        </div>
      </div>
      <div class="goods-handle">
        <div class="handle">
          <el-button type="primary">新增</el-button>
          <el-button type="primary">删除</el-button>
        </div>
        <el-button type="primary">导出列表</el-button>
      </div>
      <el-checkbox-group ref="goodsTable" class="goods-table" v-model="selectionGroup">
        <el-checkbox-button v-for="(item, index) in goodsList" :key="index" class="units" :label="item">
          <goods-unit
            :group="selectionGroup"
            :item="item"
            :containerWidth="containerWidth"
            :containerOffsetLeft="containerOffsetLeft"
          />
        </el-checkbox-button>
      </el-checkbox-group>
      <div class="convenientHandle">
        <el-button type="primary" class="handle" @click.prevent="handleAll">全选</el-button>
        <el-button type="primary" class="handle" @click.prevent="handleNone">取消全选</el-button>
        <el-button type="primary" class="handle" @click.prevent="handleInvert">反选</el-button>
      </div>
    </div>
  </div>
</template>

<script>
    import filterCategory from "./components/filterCategory"
    import priceArea from "./components/priceArea"
    import goodsUnit from "./components/goodsUnit"

    export default {
        name: "goodsList",
        data() {
            return {
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
                    {id: '17', value: '仲景（ZJ）'},
                    {id: '18', value: '仲景（ZJ）'},
                    {id: '19', value: '仲景（ZJ）'},
                    {id: '20', value: '仲景（ZJ）'}
                ],
                dosage: [
                    {id: '1', value: '片剂'},
                    {id: '2', value: '糖浆剂'},
                    {id: '3', value: '酒剂'},
                    {id: '4', value: '散剂'},
                    {id: '5', value: '煎膏剂'},
                    {id: '6', value: '口服液'},
                    {id: '7', value: '胶囊剂'},
                    {id: '8', value: '颗粒剂'},
                ],
                complex: '综合',
                sales: '销量',
                fresh: '新品',
                price: '价格',
                goodsList: ['1','2','3','4','5','6','7','8','9','10','11'],
                selectionGroup: [],
                containerWidth: '',
                containerOffsetLeft: ''
            }
        },
        components: {filterCategory, priceArea, goodsUnit},
        methods: {
            search_click() {

            },
            complexCommand(complex){
                this.complex = complex
            },
            salesCommand(sales){
                this.sales = sales
            },
            freshCommand(fresh){
                this.fresh = fresh
            },
            priceCommand(price){
                this.price = price
            },
            handleAll(){
                this.selectionGroup = this.goodsList
            },
            handleNone(){
                this.selectionGroup = []
            },
            handleInvert(){
                this.selectionGroup = this.goodsList.filter(item=>{
                    return !this.selectionGroup.includes(item)
                })
            }
        },
        mounted() {
            this.containerWidth = this.$refs.goodsTable.$el.offsetWidth;
            this.containerOffsetLeft = this.$refs.goodsTable.$el.getBoundingClientRect().left;
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/style/goods/goodsList.scss";
</style>
