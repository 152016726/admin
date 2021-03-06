<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container" :class="{hasTagsView: tagsView}">
      <div :class="{'fixed-header':fixedHeader}">
          <navbar />
      </div>
      <div class="tagsView-container" v-if="tagsView">
        <tags-view/>
      </div>
      <div class="breadcrumb-container">
        <div class="breadcrumb-shadow">
          <breadcrumb/>
        </div>
      </div>
      <div class="content-container">
        <app-main />
      </div>
      <el-tooltip placement="top" content="置顶">
        <back-to-top :custom-style="myBackToTopStyle" :visibility-height="300" :back-position="50" transition-name="fade" />
      </el-tooltip>
    </div>
  </div>
</template>

<script>
    import ResizeHandler from "./mixin/ResizeHandler";
    import {Sidebar, AppMain, Navbar, TagsView} from './components'
    import BackToTop from '@/components/BackToTop'
    import Breadcrumb from "@/components/Breadcrumb";
    import { mapState } from 'vuex'

    export default {
        name: "Layout",
        mixins: [ResizeHandler],
        components: {
            Sidebar, AppMain, Navbar, Breadcrumb, TagsView, BackToTop
        },
        data(){
          return {
              myBackToTopStyle: {
                  right: '50px',
                  bottom: '50px',
                  width: '40px',
                  height: '40px',
                  'border-radius': '4px',
                  'line-height': '45px', // 请保持与高度一致以垂直居中 Please keep consistent with height to center vertically
                  background: '#e7eaf1'// 按钮的背景颜色 The background color of the button
              }
          }
        },
        computed: {
            ...mapState({
                device: state => state.app.device,
                fixedHeader: state => state.settings.fixedHeader,
                tagsView: state => state.settings.tagsView
            }),
            sidebar(){
                this.$_isMultiScreen()
                return this.$store.state.app.sidebar
            },
            classObj() {
                return {
                    hideSidebar: !this.sidebar.opened,
                    openSidebar: this.sidebar.opened,
                    withoutAnimation: this.sidebar.withoutAnimation,
                    mobile: this.device === 'mobile'
                }
            }
        },
        methods: {
            handleClickOutside() {
                this.$store.dispatch('app/closeSideBar', {withoutAnimation: false})
            }
        }
    }
</script>

<style lang="scss" scoped>
  @import "~@/commonScss/mixin.scss";
  @import "~@/commonScss/variables.scss";

  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;

    &.mobile.openSidebar {
      position: fixed;
      top: 0;
    }
  }

  .drawer-bg {
    background: #000;
    opacity: 0.3;
    width: 100%;
    top: 0;
    height: 100%;
    position: absolute;
    z-index: 999;
  }

  .fixed-header {
    position: fixed;
    top: 0;
    right: 0;
    z-index: 9;
    width: calc(100% - #{$sideBarWidth});
    transition: width 0.28s;
  }

  .hideSidebar .fixed-header {
    width: calc(100% - 54px)
  }

  .mobile .fixed-header {
    width: 100%;
  }
  .breadcrumb-container{
    padding: 10px 10px 0 10px;
    background-color: #DDDDDD;
  }
  .breadcrumb-shadow{
    height: 50px;
    background-color: #ffffff;
  }
  .content-container{
    padding: 10px 10px;
    background-color: #DDDDDD;
  }
</style>
