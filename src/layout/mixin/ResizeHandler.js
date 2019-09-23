import store from '@/store';

const {body} = document;

const WIDTH = 992;

const LIQUID = 1310;

const TUBE = 1160;

export default {
  watch: {
    $route(route) {
      if (this.device === 'mobile' && this.sidebar.opened) {
        store.dispatch('app/closeSideBar', {withoutAnimation: false})
      }
    }
  },
  beforeMount() {
    window.addEventListener('resize', this.$_resizeHandler)
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.$_resizeHandler)
  },
  mounted() {
    const isMobile = this.$_isMobile()
    this.$_isMultiScreen()
    if (isMobile) {
      store.dispatch('app/toggleDevice', 'mobile')
      store.dispatch('app/closeSideBar', {withoutAnimation: true})
    }
  },
  methods: {
    $_isMobile() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < WIDTH
    },
    $_isLiquid() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < LIQUID
    },
    $_isTube() {
      const rect = body.getBoundingClientRect()
      return rect.width - 1 < TUBE
    },
    $_isMultiScreen() {
      const isLiquid = this.$_isLiquid()
      const isTube = this.$_isTube()
      if (store.state.app.sidebar.opened && isLiquid || !store.state.app.sidebar.opened && isTube) {
        // 侧边展开屏宽小于1310与侧边闭合屏宽小于1160则会成为3行
        store.dispatch('resize/toggleLiquid', true)
      } else {
        // 侧边闭合屏幕宽度小于1310则会成为3行
        store.dispatch('resize/toggleLiquid', false)
      }
    },
    $_resizeHandler() {
      if (!document.hidden) {
        const isMobile = this.$_isMobile()

        store.dispatch('app/toggleDevice', isMobile ? 'mobile' : 'desktop')

        if (isMobile) {
          store.dispatch('app/closeSideBar', {withoutAnimation: true})
        }

        this.$_isMultiScreen()

      }
    }
  }
}
