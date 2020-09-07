<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 16:45:06
-->
<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="logo-box">
        <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
      </div>
      <Hamburger id="hamburger-container" :is-active="sideBar.opened" class="hamburger-container" @toggleClick="toggleSideBar" />
      <Breadcrumb id="breadcrumb-container" class="breadcrumb-container" />
    </div>
    <div class="nav-bar-right">
      <ElDropdown class="right-menu-item hover-effect" trigger="click">
        <div class="demo-basic--circle">
          <ElAvatar shape="square" :size="42" :src="require('src/assets/images/avatar.gif')" class="nav-bar-avator" />
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
import Breadcrumb from 'src/components/Breadcrumb'
export default {
  name: 'NavBar',
  components: {
    Hamburger,
    Breadcrumb
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
      this.$store.dispatch('user/logout')
        .then(res => {
          this.$router.push('/login')
        })
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar {
  display: flex;
  justify-content: space-between;
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  border-bottom: 1px solid #ccc;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10001;

  .nav-bar-left {
    display: flex;
    justify-content: space-between;
    align-items: center;

    .logo-box {
      width: 210px;
      padding-left: 20px;
      text-align: left;
    }

    .logo {
      width: 80px;
      height: 48px;
    }

    .hamburger-container {
      display: inline-block;
      margin-left: -15px;
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
      height: 42px;
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
