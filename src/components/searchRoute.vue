<template>
  <div class="searchRoute" :class="{'show':show}">
    <svg-icon class-name="search-icon" icon-class="search" @click.stop="click"/>
    <el-select
      ref="headerSearchSelect"
      v-model="search"
      :remote-method="querySearch"
      placeholder="搜索并导向页面"
      class="header-search-select"
      @change="change"
      filterable
      remote
      default-first-option
    >
      <el-option v-for="item in options" :item="item.path" :key="item.path" :value="item" :label="item.title.join('>')"></el-option>
    </el-select>
  </div>
</template>

<script>
    import Fuse from 'fuse.js'
    import path from 'path'

    export default {
        name: "searchRoute",
        data() {
            return {
                search: '',
                options: [],
                searchPool: [],
                show: false,
                fuse: undefined
            }
        },
        computed: {
            routes() {
                return this.$store.getters.permission_routes
            }
        },
        watch: {
            routes(val) {
                this.searchPool = this.generateRoutes(val)
            },
            searchPool(val) {
                this.initFuse(val)
            },
            show(value) {
                if (value) {
                    document.body.addEventListener('click', this.close)
                } else {
                    document.body.removeEventListener('click', this.close)
                }
            }
        },
        mounted() {
            this.searchPool = this.generateRoutes(this.routes)
        },
        methods: {
            click() {
                this.show = !this.show
                if (this.show) {
                    this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.focus()
                }
            },
            close() {
                this.$refs.headerSearchSelect && this.$refs.headerSearchSelect.blur()
                this.show = false
                this.options = []
            },
            change(val) {
                this.$router.push(val.path)
                this.search = ''
                this.options = []
                this.$nextTick(() => {
                    this.show = false
                })
            },
            initFuse(list) {
                this.fuse = new Fuse(list, {
                    shouldSort: true,
                    threshold: 0.4,
                    location: 0,
                    distance: 100,
                    maxPatternLength: 32,
                    minMatchCharLength: 1,
                    keys: [
                        {
                            name: 'title',
                            weight: 0.7
                        },
                        {
                            name: 'path',
                            weight: 0.3
                        }
                    ]
                })
            },
            generateRoutes(routes, basePath = '/', prefixTitle = []) {
                let res = []

                for (const router of routes) {
                    if (router.hidden) {
                        continue
                    }
                    const data = {
                        path: path.resolve(basePath, router.path),
                        title: [...prefixTitle]
                    }
                    if (router.meta && router.meta.title) {
                        data.title = [...data.title, router.meta.title]
                        if (router.redirect !== 'noRedirect') {
                            res.push(data)
                        }
                    }
                    if (router.children && router.children.length > 0) {
                        const tmp = this.generateRoutes(router.children, data.path, data.title)
                        if (tmp.length >= 1) {
                            res = [...res, ...tmp]
                        }
                    }
                }

                return res

            },
            querySearch(val) {
                if (val !== '') {
                    this.options = this.fuse.search(val)
                } else {
                    this.options = []
                }
            }
        }
    }
</script>

<style lang="scss" scoped>
  .searchRoute {
    font-size: 0 !important;

    .search-icon {
      cursor: pointer;
      font-size: 18px;
      vertical-align: middle;
    }

    .header-search-select {
      font-size: 18px;
      transition: width 0.2s;
      width: 0;
      overflow: hidden;
      background: transparent;
      border-radius: 0;
      display: inline-block;
      vertical-align: middle;

      /deep/ .el-input__inner {
        border-radius: 0;
        border: 0;
        padding-left: 0;
        padding-right: 0;
        box-shadow: none !important;
        border-bottom: 1px solid #d9d9d9;
        vertical-align: middle;
      }
    }

    &.show {
      .header-search-select {
        width: 210px;
        margin-left: 10px;
      }
    }
  }
</style>
