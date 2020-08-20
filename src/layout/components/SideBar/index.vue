<!--
 * @Description: SideBar
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-20 16:47:52
-->
<template>
  <div :class="['side-bar-container', !isCollapse ? 'open-side-bar' : 'hide-side-bar']">
    <ElMenu
      :default-active="activeMenu"
      :collapse="isCollapse"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :unique-opened="true"
      :collapse-transition="false"
      mode="vertical"
      class="el-menu-vertical-demo"
    >
      <SiderbarItem
        v-for="route in permission_routes"
        :key="route.path"
        :item="route"
        :base-path="route.path"
      />
    </ElMenu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
import SiderbarItem from './SiderbarItem'
export default {
  name: 'SideBar',
  components: {
    SiderbarItem
  },
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sideBar',
      'permission_routes'
    ]),
    activeMenu() {
      const route = this.$route
      const { meta, path } = route
      // 如果设置路径，侧栏将突出显示您设置的路径
      if (meta.activeMenu) {
        return meta.activeMenu
      }
      return path
    },
    isCollapse() {
      return !this.sideBar.opened
    },
    variables() {
      return variables
    }
  }
}
</script>
<style lang="scss" scoped>
.side-bar-container {
  transition: width 0.28s;
  ::v-deep .el-menu {
    height: 100%;
    width: 100%;
  }
}

.open-side-bar {
  width: 210px !important;
}
.hide-side-bar {
  width: 54px !important;
}
</style>
