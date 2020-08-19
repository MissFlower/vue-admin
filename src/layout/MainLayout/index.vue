<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    <div class="main-container">
      <!-- 左侧菜单栏 -->
      <SideBar />
      <!-- 右侧展示区 -->
      <AppMain />
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from 'src/layout/components'
export default {
  name: 'MainLayout',
  components: {
    NavBar,
    SideBar,
    AppMain
  }
}
</script>
<style lang="scss" scoped>
.app-wrapper {
  width: 100%;
  height: 100%;
  position: relative;

  .main-container {
    display: flex;
    justify-content: space-between;
    height: calc(100% - 65px);
  }
}
</style>
