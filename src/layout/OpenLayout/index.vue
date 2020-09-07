<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 13:21:58
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
  width: 100%;
  height: 100%;
  padding-top: 50px;
  position: relative;
  min-width: 1280px;
  overflow: auto;
}
</style>
