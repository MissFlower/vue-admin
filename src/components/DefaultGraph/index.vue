<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-12-28 16:12:47
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 12:02:18
-->
<template>
  <div class="default-graph">
    <ElImage :src="src" :style="{width: width + 'px', height: height + 'px'}" />
    <span class="tip-text">{{ text }}</span>
  </div>
</template>

<script>
export default {
  name: 'DefaultGraph',
  props: {
    src: {
      type: String,
      required: true
    },
    text: {
      type: String,
      default: '暂无数据'
    },
    width: {
      type: [Number, String],
      default: 100
    },
    height: {
      type: [Number, String],
      default: 100
    }
  },
  data() {
    return {

    }
  }
}
</script>

<style lang="scss" scoped>
.default-graph {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;

  .tip-text {
    height: 36px;
    margin-top: 12px;
    font-size: 14px;
    line-height: 36px;
    color: #555;
  }
}
</style>
