<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="logo-box">
        <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
        <span>IOT管理平台</span>
      </div>
    </div>
    <div class="nav-bar-right">
      <ElLink :underline="false" class="nav-btn">文档</ElLink>
      <ElLink :underline="false" class="nav-btn" @click="goHome">控制台</ElLink>
      <ElLink v-if="isShowLogin && !hasToken" type="success" :underline="false" class="nav-btn animate__animated animate__fadeIn" @click="login">登录</ElLink>
      <ElButton v-if="isShowLogin && !hasToken" type="success" size="mini" class="animate__animated animate__fadeIn" @click="register">注册</ElButton>
    </div>
  </div>
</template>
<script>
import { mapGetters } from 'vuex'
export default {
  name: 'NavBar',
  data() {
    return {
      isShowLogin: true
    }
  },
  computed: {
    ...mapGetters({
      hasToken: 'token'
    })
  },
  watch: {
    '$route.path': {
      handler(newValue) {
        this.isShowLogin = newValue !== '/login'
      },
      immediate: true
    }
  },
  methods: {
    login() {
      this.$router.push({
        path: '/login'
      })
    },
    register() {
      this.$router.push({
        path: '/register'
      })
    },
    goHome() {
      this.$router.push({
        path: '/home'
      })
    }
  }
}
</script>
