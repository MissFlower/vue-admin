<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:28:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 19:04:43
-->
<template>
  <div :class="anchorLinkClasses">
    <div v-for="panel in panelInstances" :key="panel.title">
      <a
        :class="linkTitleClasses"
        :href="panel.href"
        :data-scroll-offset="panel.scrollOffset"
        :data-href="panel.href"
        :title="panel.title"
        @click.prevent="goAnchor"
      >{{ panel.title }}</a>
      <slot />
    </div>
  </div>
</template>
<script>
export default {
  name: 'AnchorLink',
  props: {
    current: {
      type: Number,
      default: 0
    },
    panelInstances: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      prefix: 'ady-anchor-link'
    }
  },
  computed: {
    anchorLinkClasses() {
      return [this.prefix]
    },
    linkTitleClasses() {
      return [`${this.prefix} + 'title'`]
    }
  },
  methods: {
    goAnchor() {

    }
  }

}
</script>
