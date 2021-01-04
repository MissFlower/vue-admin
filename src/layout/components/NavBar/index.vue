<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 12:03:49
-->
<template>
  <div class="nav-bar">
    <div class="nav-ham-bre">
      <div class="nav-bar-left">
        <div class="logo-box">
          <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
          <span>IOT管理平台</span>
        </div>
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
            <span style="display: block;">Log Out</span>
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
