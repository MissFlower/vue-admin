<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:27:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-11 18:34:01
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
    font-size: 16px;
    color: #666;
    margin-bottom: 12px;
    display: inline-block;
    height: 24px;
    line-height: 24px;
    display: flex;
    align-items: center;

    &::before {
      content: '';
      width: 2px;
      height: 75%;
      background-color: chartreuse;
      display: inline-block;
      margin-right: 8px;
    }
  }
}
</style>
