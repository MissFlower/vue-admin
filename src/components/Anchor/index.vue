<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:31:57
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 19:10:24
-->
<template>
  <div class="anchor-page">
    <div class="sidebar-warp">
      <AnchorLink :current="active" :panel-instances="panels" @jump="handleJump" />
    </div>
    <div class="main">
      <slot />
    </div>
    <div class="foot">
      <slot name="foot" />
    </div>
  </div>
</template>
<script>
import AnchorLink from './AnchorLink'
export default {
  name: 'AnchorPage',
  components: {
    AnchorLink
  },
  props: {
    // 滚动的对象
    scrollBox: {
      type: [String, HTMLElement, HTMLDocument],
      default() {
        return document
      }
    },
    offset: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      active: 0,
      panels: []
    }
  },
  mounted() {
    this.calcPaneInstances(true)
    // this.scrollBoxDOM.addEventListener('scroll', this.scroll, false)
  },
  updated() {
    console.log(1)
    // this.calcPaneInstances()
  },
  methods: {
    handleJump() {

    },
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        console.log(this.$slots.default[0])
        // const paneSlots = this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.propsData.title)
        this.panels = this.$slots.default.map(vnode => {
          return {
            title: vnode.tag && vnode.componentOptions?.propsData?.title,
            href: vnode.tag && vnode.componentOptions?.propsData?.href ? vnode.componentOptions?.propsData?.href : '#',
            offsetTop: vnode.elm.offsetTop
          }
        })
        console.log(this.panels)
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-warp {
  width: 200px;
  position: fixed;
  top: 0;
  left: 20px;
}
.main {
  margin-left: 200px;
}
</style>
