<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="logo-box">
        <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
      </div>
      <Hamburger id="hamburger-container" :is-active="sideBar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
    </div>
    <div class="nav-bar-right">
      <ElDropdown class="right-menu-item hover-effect" trigger="click">
        <div class="demo-basic--circle">
          <ElAvatar shape="square" :size="50" :src="require('src/assets/images/avatar.gif')" class="nav-bar-avator" />
          <i class="el-icon-caret-bottom" />
        </div>
        <ElDropdownMenu slot="dropdown">
          <!-- <RouterLink to="/profile/index">
            <ElDropdownItem>Profile</ElDropdownItem>
          </RouterLink>
          <RouterLink to="/">
            <ElDropdownItem>Dashboard</ElDropdownItem>
          </RouterLink> -->
          <a target="_blank" href="https://github.com/PanJiaChen/vue-element-admin/">
            <ElDropdownItem>Github</ElDropdownItem>
          </a>
          <a target="_blank" href="https://panjiachen.github.io/vue-element-admin-site/#/">
            <ElDropdownItem>Docs</ElDropdownItem>
          </a>
          <ElDropdownItem divided @click.native="logout">
            <span style="display:block;">Log Out</span>
          </ElDropdownItem>
        </ElDropdownMenu>
      </ElDropdown>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
import Hamburger from 'src/components/Hamburger'
export default {
  name: 'NavBar',
  components: {
    Hamburger
  },
  computed: {
    ...mapGetters([
      'sideBar'
    ])
  },
  methods: {
    toggleSideBar() {
      this.$store.dispatch('app/toggleSideBar')
    },
    logout() {
      // 登出
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  height: 65px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;

  .nav-bar-left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-box {
      width: 200px;
      margin-left: 20px;
      text-align: left;
    }

    .logo {
      width: 180px;
      height: 64px;
    }

    .hamburger-container {
      display: inline-block;
    }
  }

  .nav-bar-right {
    display: flex;
    justify-content: flex-end;
    align-items: center;

    .right-menu-item {
      color: #5a5e66;

      &.hover-effect {
        transition: background .3s;

        &:hover {
          background: rgba(0, 0, 0, .025)
        }
      }
    }

    .demo-basic--circle {
      height: 50px;
      margin-right: 20px;
      outline: none;

      .nav-bar-avator {
        margin-right: 5px;
        cursor: pointer;
      }

      .el-icon-caret-bottom {
        cursor: pointer;
      }
    }
  }
}
</style>
