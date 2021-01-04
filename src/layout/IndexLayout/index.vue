<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 12:04:09
-->
<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    <!-- 内容区 -->
    <div class="main">
      <AppMain />
    </div>
  </div>
</template>
<script>
import { AppMain } from 'src/layout/components'
import NavBar from './NavBar'
export default {
  name: 'OpenLayout',
  components: {
    AppMain,
    NavBar
  }
}
</script>

<style lang="scss" scoped>
.main {
  position: relative;
  width: 100%;
  min-width: 1280px;
  height: 100%;
  padding-top: 50px;
  overflow: auto;

  .app-main {
    padding: 0;
  }
}
</style>
