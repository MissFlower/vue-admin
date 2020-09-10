<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 11:27:28
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 18:53:01
-->
<template>
  <div class="panel">
    <div class="panel-header">
      <i class="panel-icon" />
      <span class="panel-title">{{ title }}</span>
    </div>
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
  },
  data() {
    return {

    }
  }
}
</script>
<style lang="scss" scoped>
.panel {
  margin-bottom: 24px;

  .panel-header {
    .panel-icon {

    }
    .panel-title {
      font-size: 16px;
      color: #666;
      margin-bottom: 12px;
      display: inline-block;
      ::before {
        content: '';
        width: 2px;
        height: 100%;
        background-color: chartreuse;
        display: block;
      }
    }
  }
}
</style>
