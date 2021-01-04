<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 16:06:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 11:55:55
-->
<template>
  <Anchor scroll-container="section">
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
  </Anchor>
</template>
<script>
import Anchor from 'src/components/Anchor'
import AnchorPanel from 'src/components/Anchor/AnchorPanel'
export default {
  name: 'EditAnchor',
  components: {
    Anchor,
    AnchorPanel
  }
}
</script>
<style lang="scss" scoped>
.base {
  width: 100%;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: chartreuse;
}

.static {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: rgb(255, 0, 76);
}

.alarm {
  width: 100%;
  height: 200px;
  line-height: 200px;
  text-align: center;
  background-color: rgb(68, 0, 255);
}
</style>
