<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-10 15:21:11
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-11 10:37:51
-->
<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    <div class="main">
      <AppMain />
    </div>
  </div>
</template>

<script>
import NavBar from './NavBar'
import { AppMain } from 'src/layout/components'
export default {
  name: 'MainLayout',
  components: {
    NavBar,
    AppMain
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  position: relative;
  width: 100%;
  height: 100%;

  .main {
    position: relative;
    width: 100%;
    height: 100%;
    padding-top: 50px;
    overflow-x: hidden;
    overflow-y: auto;
  }
}
</style>
