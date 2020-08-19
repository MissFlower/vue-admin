<template>
  <div :class="['side-bar-container', isCollapse ? 'open-side-bar' : 'hide-side-bar']">
    <ElMenu
      default-active="1-2"
      class="el-menu-vertical-demo"
      :background-color="variables.menuBg"
      :text-color="variables.menuText"
      :active-text-color="variables.menuActiveText"
      :collapse="!isCollapse"
      :unique-opened="true"
      :collapse-transition="false"
    >
      <el-submenu index="1">
        <template slot="title">
          <div>
            <i class="el-icon-location" />
            <span slot="title">导航一</span>
          </div>
        </template>
        <el-menu-item index="1-1">选项1</el-menu-item>
        <el-menu-item index="1-2">选项2</el-menu-item>
        <el-menu-item index="1-3">选项3</el-menu-item>
        <el-menu-item index="1-4">选项4</el-menu-item>
      </el-submenu>
      <el-submenu index="2">
        <i class="el-icon-menu" />
        <span slot="title">导航二</span>
      </el-submenu>
      <el-menu-item index="3" disabled>
        <i class="el-icon-document" />
        <span slot="title">导航三</span>
      </el-menu-item>
      <el-menu-item index="4">
        <i class="el-icon-setting" />
        <span slot="title">导航四</span>
      </el-menu-item>
    </ElMenu>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import variables from '@/styles/variables.scss'
export default {
  name: 'SideBar',
  data() {
    return {
    }
  },
  computed: {
    ...mapGetters([
      'sideBar'
    ]),
    isCollapse() {
      return this.sideBar.opened
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
