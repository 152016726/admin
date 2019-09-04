<template>
  <div class="filterCategory">
    <el-radio-group class="singleSelection categories" v-if="!isMultiSelection" v-model="singleSelect">
      <el-radio-button v-for="item in (isShowMore ? category : categoryList)" :key="item.id" class="category" :label="item.id">{{item.value}}
      </el-radio-button>
    </el-radio-group>
    <div class="multipleSelection categories" v-if="isMultiSelection">
      <el-scrollbar>
        <el-checkbox-group v-model="multiSelect">
          <el-checkbox v-for="item in category" :key="item.id" :label="item.id" class="category">{{item.value}}
          </el-checkbox>
        </el-checkbox-group>
      </el-scrollbar>
      <div class="handleSelect">
        <el-button size="mini" type="success" @click="setMultiSelection">确定</el-button>
        <el-button size="mini" type="cancel" @click="cancelMultiSelection">取消</el-button>
      </div>
    </div>
    <div class="handleCategories" v-if="category.length >1">
      <el-button size="mini" class="handle_btn" v-if="category.length > 1 && !isMultiSelection" @click.prevent="selectMore">
        多选
      </el-button>
      <el-button size="mini" class="handle_btn" v-if="category.length > 16 && !isMultiSelection" @click.prevent="chooseMore">
        {{isShowMore ? '收起' : '更多'}}
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
                this.multiSelect = Array.from(
                    new Set(
                        this.multiSelect.concat(this.singleSelect ? [this.singleSelect] : [])
                    )
                )
            },
            chooseMore() {
                this.isShowMore = !this.isShowMore
            },
            setMultiSelection(){
              this.isMultiSelection = false;
              // 多选确定操作
            },
            cancelMultiSelection(){
              this.isMultiSelection = false;
              this.multiSelect = this.singleSelect ? [this.singleSelect] : []
            }
        },
        created() {
            if (this.category.length > 16) {
                this.categoryList = this.category.slice(0, 16)
                this.isMultiSelection = false
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

    .singleSelection{
      max-height: 96px;
      overflow-y: auto;
      overflow-x: hidden;
    }

    .multipleSelection{
      display: flex;
      .handleSelect{
        width: 100%;
        padding: 5px 0;
        display: flex;
        align-items: center;
        justify-content: center;
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

    .el-scrollbar{
      width: 100%;
      flex-wrap: wrap;
      min-height: 29px;
      max-height: 96px;
      .el-checkbox {
        margin-right: 0;
      }
      // 去掉el-scrollbar的横栏
      /deep/{
        .el-scrollbar__wrap{
          overflow-x: hidden;
        }
      }
    }

  }
</style>
