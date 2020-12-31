<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:28:13
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-31 19:06:41
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

@mixin anchorLinkDotLeft($width) {
  width: $width;
}

@function half($n) {
  @return $n / 2 - 1;
}

.anchor-link {
  margin-bottom: $anchorLinkLine;
  position: relative;
  font-size: 14px;

  &:last-child::before {
    display: none;
  }

  a {
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: $anchorLinkDot;
      height: $anchorLinkDot;
      border-radius: 50%;
      background-color: rgb(0, 255, 136);
      display: inline-block;
      margin-right: 8px;
      transition: 0.3s all ease-in-out;
    }
  }

  &::before {
    content: '';
    width: 1px;
    height: $anchorLinkLine;
    background-color: rgb(255, 123, 0);
    position: absolute;
    top: 24px;
    left: half($anchorLinkDot);
  }
}

.anchor-link-active a::before {
  background-color: rgb(255, 0, 157);
}
</style>
