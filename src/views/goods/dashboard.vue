<template>
  <div class="dashboard-container">
    <div v-if="isShowTable">
      <div class="searchTitle">
        <el-input placeholder="请输入商品编码" v-model="code"></el-input>
        <el-select placeholder="请选择物料类别" v-model="category">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="请选择商品状态" v-model="state">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="请选择品牌" v-model="brand">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="请选择生产厂家" v-model="factory">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="请选择产地" v-model="area">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-select placeholder="输入保质期数" v-model="days">
          <el-option
            :label="'测试'"
            :value="'测试'">
          </el-option>
        </el-select>
        <el-button type="primary" class="search-btn">搜索</el-button>
      </div>
      <div class="line"></div>
      <div class="goods-form">
        <div class="goods-handle clearfix">
          <el-button type="primary" class="fl">添加</el-button>
          <el-button type="primary" class="fr" @click="handle_print">打印</el-button>
          <el-button type="primary" class="fr" @click="handle_export">导出</el-button>
        </div>
        <el-table
          ref="multipleTable"
          :data="tableData"
          tooltip-effect="dark"
          style="width: 100%"
          @selection-change="handleSelectionChange">
          <el-table-column
            type="selection"
            width="55">
          </el-table-column>
          <el-table-column
            prop="goodsCode"
            sortable
            :filters="filterObj['goodsCode']"
            :filter-method="filterTag"
            label="商品编码"
            width="120">
          </el-table-column>
          <el-table-column
            prop="nationCode"
            label="国际条码"
            sortable
            :filters="filterObj['nationCode']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="approval"
            label="批准文号"
            sortable
            :filters="filterObj['approval']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="categoryName"
            label="品名全称"
            sortable
            :filters="filterObj['categoryName']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="materialCategory"
            label="物料类型"
            sortable
            :filters="filterObj['materialCategory']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="brand"
            label="品牌"
            sortable
            :filters="filterObj['brand']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="size"
            label="主规格"
            sortable
            :filters="filterObj['size']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="unit"
            label="主单位"
            sortable
            :filters="filterObj['unit']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="price"
            label="零售价"
            sortable
            :filters="filterObj['price']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="factory"
            label="生产厂家"
            sortable
            :filters="filterObj['factory']"
            :filter-method="filterTag"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="area"
            label="产地"
            sortable
            :filters="filterObj['area']"
            :filter-method="filterTag"
            width="120"
            show-overflow-tooltip>
          </el-table-column>
          <el-table-column
            prop="time"
            label="保质期"
            sortable
            :filters="filterObj['time']"
            :filter-method="filterTag"
            width="120">
          </el-table-column>
          <el-table-column
            prop="specialCategory"
            label="特殊类别"
            fixed="right"
            sortable
            :filters="filterObj['specialCategory']"
            :filter-method="filterTag"
            width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="danger">{{scope.row.specialCategory}}</el-button>
            </template>
          </el-table-column>
          <el-table-column
            prop="goodsState"
            label="商品状态"
            sortable
            :filters="filterObj['goodsState']"
            :filter-method="filterTag"
            fixed="right"
            width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="primary">{{scope.row.goodsState}}</el-button>
            </template>
          </el-table-column>
          <el-table-column label="操作" fixed="right" width="160">
            <template slot-scope="scope">
              <el-button
                size="mini"
                @click.prevent.stop="handleEdit(scope.$index, scope.row)">编辑</el-button>
              <el-button
                size="mini"
                type="danger"
                @click="handleDelete(scope.$index, scope.row)">删除</el-button>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
    export default {
        name: "Dashboard",
        data() {
            return {
                code: '',
                category: '',
                state: '',
                brand: '',
                factory: '',
                area: '',
                days: '',
                tableData: [
                    {
                    goodsCode: '01010204001',
                    nationCode: 'A12A020301',
                    approval: ' 国药准字H14022744',
                    categoryName: '阿司匹林肠溶片',
                    materialCategory: '药品-西药-非处方药',
                    brand: '仁和',
                    size: '50mg*25片*3板',
                    unit: '盒',
                    price: '¥ 29.90',
                    factory: ' 大同市利群药业有限公司',
                    area: '山西省大同市湖东经济开发区',
                    time: '24月',
                    specialCategory: '麻醉药品',
                    goodsState: '有效'
                }, {
                    goodsCode: '01010204001',
                    nationCode: 'A12A020301',
                    approval: ' 国药准字H14022744',
                    categoryName: '阿司匹林肠溶片',
                    materialCategory: '药品-西药-非处方药',
                    brand: '仁和',
                    size: '50mg*25片*3板',
                    unit: '盒',
                    price: '¥ 29.90',
                    factory: ' 大同市利群药业有限公司',
                    area: '山西省大同市湖东经济开发区',
                    time: '24月',
                    specialCategory: '精神药品',
                    goodsState: '已冻结'
                }, {
                    goodsCode: '01010204001',
                    nationCode: 'A12A020301',
                    approval: ' 国药准字H14022744',
                    categoryName: '阿司匹林肠溶片',
                    materialCategory: '药品-西药-非处方药',
                    brand: '仁和',
                    size: '50mg*25片*3板',
                    unit: '盒',
                    price: '¥ 29.90',
                    factory: ' 大同市利群药业有限公司',
                    area: '山西省大同市湖东经济开发区',
                    time: '24月',
                    specialCategory: '毒性药品',
                    goodsState: '停止销售'
                }, {
                    goodsCode: '01010204001',
                    nationCode: 'A12A020301',
                    approval: ' 国药准字H14022744',
                    categoryName: '阿司匹林肠溶片',
                    materialCategory: '药品-西药-非处方药',
                    brand: '仁和',
                    size: '50mg*25片*3板',
                    unit: '盒',
                    price: '¥ 29.90',
                    factory: ' 大同市利群药业有限公司',
                    area: '山西省大同市湖东经济开发区',
                    time: '24月',
                    specialCategory: '放射药品',
                    goodsState: '停止采购'
                }],
                multipleSelection: [],
                filterObj: {}
            }
        },
        computed:{
            isShowTable(){
                return this.$route.fullPath === '/dashboard'
            }
        },
        methods: {
            /**
             * 选中项
             * @param val
             */
            handleSelectionChange(val) {
                this.multipleSelection = val;
            },
            /**
             * 打印
             */
            handle_print(){
                window.print();
            },
            /**
             * 导出
             */
            handle_export(){
                console.log('导出')
            },
            /**
             * 筛选去重出可筛选项
             */
            filterDataset(){
                let filterObj = {};
                // 获取各个列项的值
                this.tableData.forEach(item=>{
                    for(let key in item){
                        if(!filterObj[key]){
                            filterObj[key] = [item[key]];
                        }else{
                            filterObj[key].push(item[key])
                        }
                    }
                });
                // 将列项的值去重转化
                for(let key in filterObj){
                    let singleArr =Array.from(new Set(filterObj[key]))
                    filterObj[key] = singleArr.map(item=>{
                        return {text: item, value: item}
                    })
                }
                this.filterObj = filterObj;
                console.log(filterObj, 'filterObj');
            },
            /**
             * 过滤方法
             * @param value
             * @param row
             * @param column
             * @returns {boolean}
             */
            filterTag(value, row, column) {
                const property = column['property'];
                return row[property] === value;
            },
            /**
             * 编辑
             * @param index
             * @param row
             */
            handleEdit(index, row) {
                this.$router.push({name: 'goodsDetail'})
            },
            /**
             * 删除
             * @param index
             * @param row
             */
            handleDelete(index, row) {
                this.tableData.splice(index, 1)
            }
        },
        mounted() {
            this.filterDataset()
        }
    }
</script>

<style lang="scss" scoped>
@import "../../style/goods/dashboard";
</style>
