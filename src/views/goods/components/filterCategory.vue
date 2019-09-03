<template>
  <div class="filterCategory">
    <el-radio-group class="categories" v-if="!isShowMore" v-model="singleSelect">
      <el-radio-button v-for="item in categoryList" :key="item.id" class="category" :label="item.id">{{item.value}}
      </el-radio-button>
    </el-radio-group>
    <el-scrollbar class="category-scroll categories" v-if="isShowMore">
      <el-checkbox-group v-model="multiSelect">
        <el-checkbox v-for="item in category" :key="item.id" :label="item.id" class="category">{{item.value}}
        </el-checkbox>
      </el-checkbox-group>
    </el-scrollbar>
    <div class="handleCategories" v-if="category.length >1">
      <el-button size="mini" class="handle_btn" v-if="category.length > 1 && !isShowMore" @click.prevent="selectMore">
        多选
      </el-button>
      <el-button size="mini" class="handle_btn" v-if="category.length > 16 && !isShowMore" @click.prevent="chooseMore">
        更多
      </el-button>
    </div>
  </div>
</template>

<script>
    export default {
        name: "filterCategory",
        data() {
            return {
                isMultiSelection: false,
                isShowMore: false,
                categoryList: [],
                singleSelect: '',     // 单选
                multiSelect: []       // 多选
            }
        },
        props: {
            category: {
                default: () => [
                    {id: 1, value: 'S'},
                    {id: 2, value: 'M'},
                    {id: 3, value: 'L'},
                    {id: 4, value: 'XL'},
                    {id: 5, value: 'XXL'},
                    {id: 6, value: 'XXXL'}
                ]
            }
        },
        methods: {
            selectMore() {
                this.isMultiSelection = true
            },
            chooseMore() {
                this.isShowMore = !this.isShowMore
            }
        },
        created() {
            if (this.category.length > 16) {
                this.categoryList = this.category.slice(0, 16)
                this.isShowMore = false
            } else {
                this.categoryList = this.category
            }
        }
    }
</script>

<style lang="scss" scoped>
  .filterCategory {
    display: flex;

    .categories {
      flex: 9;
      flex-wrap: wrap;

      .category {
        flex: 1;
        width: 12.5%;
        padding: 5px 10px;
      }
    }

    .handleCategories {
      flex: 1;
      display: flex;
      align-items: center;
      justify-content: flex-end;
      flex-wrap: wrap;
      padding-right: 5px;
      box-sizing: border-box;
    }

    .el-radio-button {
      /deep/ {
        .el-radio-button__inner {
          border: none;
          border-radius: 4px;
        }
      }
    }

    .category-scroll {
      height: 96px;
      overflow: hidden;
      /deep/ {
        .el-scrollbar__wrap {
          bottom: 0px;
          margin-bottom: 0!important;
        }
      }
      .el-checkbox {
        margin-right: 0;
      }
    }
    .scrollbar-wrapper {
      overflow-x: hidden !important;
    }

    .el-scrollbar__bar.is-vertical {
      right: 0px;
    }

    .el-scrollbar {
      height: 100%;
    }

    .handle_btn {

    }
  }
</style>
