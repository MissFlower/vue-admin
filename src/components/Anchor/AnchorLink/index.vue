<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:28:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 12:01:23
-->
<template>
  <div :class="anchorLinkClasses" class="anchor-link-container">
    <div v-for="(panel, index) in panelInstances" :key="panel.title" :class="['anchor-link', index === current ? 'anchor-link-active' : '']">
      <a
        :class="linkTitleClasses"
        :href="panel.href"
        :data-scroll-offset="panel.offsetTop"
        :data-href="panel.href"
      >
        <span @click.prevent="goAnchor(panel)">{{ panel.title }}</span>
      </a>
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
    goAnchor(panel) {
      this.$emit('jump', panel)
    }
  }

}
</script>
<style lang="scss" scoped>
$anchorLinkLine: 36px;
$anchorLinkDot: 8px;

.anchor-link {
  position: relative;
  margin-bottom: $anchorLinkLine;
  font-size: 14px;

  &:last-child::before {
    display: none;
  }

  a {
    display: flex;
    align-items: center;
    height: 24px;
    line-height: 24px;

    &::before {
      display: inline-block;
      width: $anchorLinkDot;
      height: $anchorLinkDot;
      margin-right: 8px;
      border-radius: 50%;
      background-color: rgb(0, 255, 136);
      transition: .3s all ease-in-out;
      content: '';
    }
  }

  &::before {
    position: absolute;
    top: 24px;
    left: half($anchorLinkDot);
    width: 1px;
    height: $anchorLinkLine;
    background-color: rgb(255, 123, 0);
    content: '';
  }
}

.anchor-link-active a::before {
  background-color: rgb(255, 0, 157);
}

@mixin anchorLinkDotLeft($width) {
  width: $width;
}

@function half($n) {
  @return $n / 2 - 1;
}
</style>
