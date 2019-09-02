<template>
  <div :class="classObj" class="app-wrapper">
    <div v-if="device === 'mobile' && sidebar.opened" class="drawer-bg" @click="handleClickOutside"></div>
    <sidebar class="sidebar-container"/>
    <div class="main-container">
      <div :class="{'fixed-header':fixedHeader}">
          <navbar />
      </div>
      <div class="tagsView-container">
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
    </div>
  </div>
</template>

<script>
    import ResizeHandler from "./mixin/ResizeHandler";
    import {Sidebar, AppMain, Navbar, TagsView} from './components'
    import Breadcrumb from "@/components/Breadcrumb";

    export default {
        name: "Layout",
        mixins: [ResizeHandler],
        components: {
            Sidebar, AppMain, Navbar, Breadcrumb, TagsView
        },
        computed: {
            sidebar() {
                return this.$store.state.app.sidebar
            },
            device() {
                return this.$store.state.app.device
            },
            fixedHeader() {
                return this.$store.state.settings.fixedHeader
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
