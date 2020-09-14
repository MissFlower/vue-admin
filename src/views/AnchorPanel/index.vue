<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-11 18:53:56
-->
<template>
  <div>
    <ElButton type="primary" @click.prevent="goAnchorPage">Anchor</ElButton>
    <AnchorPanel title="基础用法">
      <div class="base">基础用法</div>
    </AnchorPanel>
    <AnchorPanel title="静态位置">
      <div class="static">静态位置</div>
    </AnchorPanel>
    <AnchorPanel title="报警详情">
      <div class="alarm">报警详情</div>
    </AnchorPanel>
    <AnchorPanel title="配置信息">
      <div class="alarm">配置信息</div>
    </AnchorPanel>
    <AnchorPanel title="指标参数">
      <div class="alarm">指标参数</div>
    </AnchorPanel>
    <AnchorPanel title="管理制度">
      <div class="alarm">管理制度</div>
    </AnchorPanel>
    <AnchorPanel title="工单列表">
      <div class="alarm">工单列表</div>
    </AnchorPanel>
  </div>
</template>

<script>
import AnchorPanel from 'src/components/Anchor/AnchorPanel'
export default {
  name: 'About',
  components: {
    AnchorPanel
  },
  methods: {
    goAnchorPage() {
      this.$router.push({
        path: '/edit/anchor'
      })
    }
  }
}
</script>
<style lang="scss" scoped>

.base {
  width: 100%;
  height: 100px;
  background-color: chartreuse;
  text-align: center;
  line-height: 100px;
}
.static {
  width: 100%;
  height: 200px;
  background-color: rgb(255, 0, 76);
  text-align: center;
  line-height: 200px;
}
.alarm {
  width: 100%;
  height: 200px;
  background-color: rgb(68, 0, 255);
  text-align: center;
  line-height: 200px;
}
</style>
