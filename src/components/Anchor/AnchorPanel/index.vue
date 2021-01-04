<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:27:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-31 18:20:42
-->
<template>
  <div class="panel">
    <p class="panel-title">{{ title }}</p>
    <slot />
  </div>
</template>
<script>
export default {
  name: 'AnchorPanel',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  margin-bottom: 24px;

  .panel-title {
    display: flex;
    align-items: center;
    height: 24px;
    margin-bottom: 12px;
    font-size: 16px;
    line-height: 24px;
    color: #666;

    &::before {
      display: inline-block;
      width: 2px;
      height: 75%;
      margin-right: 8px;
      background-color: chartreuse;
      content: '';
    }
  }
}
</style>
