<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 16:45:15
-->
<template>
  <div :class="classObj" class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    <div class="main">
      <!-- 左侧菜单栏 -->
      <SideBar />
      <!-- 右侧展示区 -->
      <div class="main-container">
        <AppMain />
      </div>
    </div>
  </div>
</template>

<script>
import { NavBar, SideBar, AppMain } from 'src/layout/components'
import { mapState } from 'vuex'
import ResizeMixin from '../mixin/ResizeHandler'
export default {
  name: 'MainLayout',
  components: {
    NavBar,
    SideBar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    ...mapState({
      sideBar: state => state.app.sideBar,
      device: state => state.app.device
    }),
    classObj() {
      return {
        hideSidebar: !this.sideBar.opened,
        openSidebar: this.sideBar.opened,
        withoutAnimation: this.sideBar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
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
    overflow: auto;
  }
}
</style>
