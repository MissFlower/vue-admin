<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 16:06:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 17:54:17
-->
<template>
  <div class="anchor-page">
    <div class="sidebar-warp">
      <!-- <AnchorLink :current="active" :pane-instances="panes" @jump="handleJump" /> -->
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
// import AnchorLink from './anchor-link'
// import scroll from './scroll'
export default {
  name: 'AnchorContainer',
  // components: { AnchorLink },
  props: {
    // 滚动的对象
    scrollBox: {
      type: [String, HTMLElement, HTMLDocument],
      default() { return document }
    },
    offset: { type: Number, default: 100 }
  },
  data() {
    return { panes: [], active: 0 }
  },
  computed: {
    scrollBoxDOM() {
      if (this.scrollBox instanceof HTMLElement || this.scrollBox instanceof HTMLDocument) {
        return this.scrollBox
      }
      return document.querySelector(this.scrollBox)
    }
  },
  mounted() {
    this.calcPaneInstances(true)
    this.scrollBoxDOM.addEventListener('scroll', this.scroll, false)
  },
  updated() {
    this.calcPaneInstances()
  },
  methods: {
    handleJump(item) {
      scroll.scrollToElem(item.$el, 200, this.offset).then(() => { this.active = this.panes.findIndex(pane => pane === item) })
    },
    getElemOffsetClientTop(target, scrollDOM) {
      return target.offsetTop - scrollDOM.documentElement.scrollTop - this.offset
    },
    // 滚动事件处理函数
    scroll(e) {
      // 判断是否已经滚动到该楼层，使用offset获得更好的交互体验
      for (let i = 0; i < this.panes.length; i++) {
        const offsetTop = this.getElemOffsetClientTop(this.panes[i].$el, this.scrollBoxDOM)
        if (offsetTop <= this.offset) { this.active = i }
      }
    },
    getOffsetTop(element) {
      let top
      const doc = document.documentElement
      const body = document.body
      if (typeof element.getBoundingClientRect !== 'undefined') {
        top = element.getBoundingClientRect().top
      } else {
        top = 0
      }
      const clientTop = doc.clientTop || body.clientTop || 0
      const scrollTop = window.pageYOffset || doc.scrollTop
      return top + scrollTop - clientTop
    },
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        console.log(this.$slots)
        const paneSlots = this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions && (['AnchorCollapsePane', 'AnchorPane']))
        console.log(paneSlots)
      }
    }
  }
}
</script>

