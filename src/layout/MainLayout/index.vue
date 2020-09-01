<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-01 15:28:47
-->
<template>
  <div :class="classObj" class="app-wrapper">
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
import { mapState } from 'Vuex'
export default {
  name: 'MainLayout',
  components: {
    NavBar,
    SideBar,
    AppMain
  },
  computed: {
    ...mapState({
      sideBar: state => state.app.sideBar
    }),
    classObj() {
      return {
        hideSidebar: !this.sideBar.opened,
        openSidebar: this.sideBar.opened
      }
    }
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
    height: calc(100% - 50px);
  }
}
</style>
