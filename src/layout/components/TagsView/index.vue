<template>

</template>

<script>
    import ScrollPane from "./ScrollPane";
    import path from 'path'
    export default {
        data(){
            return{

            }
        },
        components: {ScrollPane},
        computed: {
            routes(){
                return this.$store.state.permission.routes
            },
            visitedViews(){
                return this.$store.state.tagsView.visitedViews
            }
        },
        methods: {
          isActive(route){
              return route.path === this.$route.path
          },
          filterAffixTags(routes, basePath = '/'){
              let tags = []
              routes.forEach( route => {
                  if(route.meta && route.meta.affix){
                      const tagPath = path.resovle(basePath, route.path)
                      tags.push({
                          fullPath: tagPath,
                          path: tagPath,
                          name: route.name,
                          meta: {...route.meta}
                      })
                  }
                  if(route.children){
                    const tempTags = this.filterAffixTags(route.children, route.path)
                    if(tempTags.length >= 1){
                        tags = [...tags, ...tempTags]
                    }
                  }
              })
              return tags
          },
          initTags(){
              const affixTags = this.affixTags = this.filterAffixTags(this.routes)
              for(const tag of affixTags){
                if(tag.name){
                    this.$store.dispatch('tagsView/addVisitedView', tag)
                }
              }
          },
          addTags(){
              const {name} = this.$route
              if(name){
                  this.$store.dispatch('tagsView/addView', this.$route)
              }
              return false
          },
          moveToCurrentTag(){
              const tags = this.$refs.tag
          }
        }
    }
</script>

<style scoped>

</style>
