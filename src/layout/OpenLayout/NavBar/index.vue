<template>
  <div class="nav-bar-container">
    <div class="nav-bar">
      <div class="logo-box">
        <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
        <span>IOT管理平台</span>
      </div>
      <div class="nav-bar-right">
        <ElLink :underline="false" class="nav-btn">文档</ElLink>
        <ElLink :underline="false" class="nav-btn">控制台</ElLink>
        <ElLink v-if="isShowLogin" type="success" :underline="false" class="nav-btn animate__animated animate__fadeIn" @click="login">登录</ElLink>
        <ElButton v-if="isShowLogin" type="success" size="mini" class="animate__animated animate__fadeIn" @click="register">注册</ElButton>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'NavBar',
  data() {
    return {
      isShowLogin: true
    }
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
    }
  }
}
</script>
<style lang="scss" scoped>
.nav-bar-container {
  width: 100%;
  height: 50px;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10001;
  background: #FFF;
}

.nav-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 20px;
  height: 100%;

  .logo-box {
    display: flex;
    align-items: center;
    font-size: 16px;

    .logo {
      height: 30px;
      margin-right: 10px;
    }
  }
}

.nav-bar-right {
  display: flex;
  justify-content: flex-end;
  align-items: center;

  .nav-btn {
    margin: 0 12px;
  }

  a {
    width: inherit !important;
  }
}
</style>
