<template>
  <div>
    <Anchor>
      <AnchorPanel title="基础用法">
        <div class="base">基础用法</div>
      </AnchorPanel>
      <AnchorPanel title="静态位置">
        <div class="static">静态位置</div>
      </AnchorPanel>
      <AnchorPanel title="报警详情">
        <div class="alarm">报警详情</div>
      </AnchorPanel>
    </Anchor>
  </div>
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
