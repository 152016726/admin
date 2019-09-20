<template>
  <div class="chooseDateType">
    <el-select v-model="val" placeholder="请选择配置">
      <el-option v-for="(item, key) in options" :key="key" :label="item.label" :value="item.value">
      </el-option>
    </el-select>
    <div class="datePrint">
      <i v-for="(v,k) in chooseResult" :key="k">{{k === chooseResult.length-1 ? v.name : v.name+ '、'}}</i>
    </div>
    <div class="dateList">
      <el-checkbox-group v-model="checkList" v-if="!!val">
        <el-checkbox v-for="(item, index) in (val === '1' ? monthList : weekList)" :key="index" :label="item">
          {{item.name}}
        </el-checkbox>
      </el-checkbox-group>
    </div>
  </div>
</template>

<script>
    import {weekList, monthList} from './date.js'

    export default {
        name: "chooseDateType",
        data() {
            return {
                val: '',
                weekList,
                monthList,
                options: [
                    {
                        value: '1',
                        label: '按月配置'
                    },
                    {
                        value: '2',
                        label: '按周配置'
                    }
                ],
                checkList: [],
                chooseResult: []
            }
        },
        watch: {
            val(){
                this.checkList = []
            },
            checkList(newItem){
                if(this.val === '1'){
                    this.chooseResult = this.monthList.filter(item => {
                        return newItem.includes(item)
                    })
                }else if( this.val === '2'){
                    this.chooseResult = this.weekList.filter(item => {
                        return newItem.includes(item)
                    })
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/variables.scss";

  .chooseDateType {
    display: flex;
    flex-wrap: wrap;
    width: 430px;

    /deep/ {
      .el-select {
        width: 120px;
        border: none;
      }
      .el-input{
        display: flex;
      }
    }
    .datePrint {
      margin-left: 10px;
      height: 30px;
      line-height: 30px;
      text-indent: 5px;
      width: 300px;
      overflow: hidden;
      text-overflow:ellipsis;
      white-space: nowrap;
      border: 1px solid $border;
      box-sizing: border-box;
    }
    .dateList{
      width: 100%;
    }
  }
</style>
