<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:31:57
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-11 18:34:54
-->
<template>
  <div class="anchor-page">
    <div class="sidebar-warp">
      <AnchorLink :current="active" :panel-instances="panels" @jump="handleJump" />
    </div>
    <div class="main">
      <slot a="1" />
    </div>
    <div class="foot">
      <slot name="foot" />
    </div>
  </div>
</template>
<script>
import AnchorLink from './AnchorLink'
import scrollTo from './scroll-to'
export default {
  name: 'AnchorPage',
  components: {
    AnchorLink
  },
  props: {
    // 滚动容器
    scrollContainer: {
      type: [String, HTMLElement, HTMLDocument],
      default() {
        return document
      }
    }
  },
  data() {
    return {
      active: 0,
      panels: []
    }
  },
  computed: {
    scrollContainerDOM() {
      if (this.scrollContainer instanceof HTMLElement || this.scrollContainer instanceof HTMLDocument) {
        return this.scrollContainer
      }
      return document.querySelector(this.scrollContainer)
    },
    anchorPageTop() {
      return document.querySelector('.anchor-page').getBoundingClientRect().top
    }
  },
  mounted() {
    this.calcPaneInstances(true)
    this.scrollContainerDOM.addEventListener('scroll', this.scroll, false)
  },
  updated() {
    // this.calcPaneInstances()
  },
  destroyed() {
    this.scrollContainerDOM.removeEventListener('scroll', this.scroll, false)
  },
  methods: {
    handleJump(item) {
      scrollTo(this.scrollContainer, item.offsetTop - this.anchorPageTop, 500, null).then(() => {
        this.active = this.panels.findIndex(panel => panel === item)
      })
    },
    calcPaneInstances(isForceUpdate = false) {
      if (this.$slots.default) {
        // const paneSlots = this.$slots.default.filter(vnode => vnode.tag && vnode.componentOptions && vnode.componentOptions.propsData.title)
        const temp = this.$slots.default.map(vnode => {
          return {
            title: vnode.tag && vnode.componentOptions?.propsData?.title,
            href: vnode.tag && vnode.componentOptions?.propsData?.href ? vnode.componentOptions?.propsData?.href : 'javascript:;',
            offsetTop: vnode.elm.getBoundingClientRect().top
          }
        })
        this.panels = temp
      }
    },
    scroll() {
      const Len = this.panels.length
      const scrollDOMScrollTop = this.scrollContainerDOM.scrollTop + this.anchorPageTop
      for (let i = 0; i < Len; i++) {
        const $elTop = this.panels[i].offsetTop
        if ($elTop <= scrollDOMScrollTop) {
          this.active = i
        }
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.sidebar-warp {
  width: 200px;
  position:sticky;
  top: 0px;
  float: left;
}
.main {
  margin-left: 200px;
}
</style>
