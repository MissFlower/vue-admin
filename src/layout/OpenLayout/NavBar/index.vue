<template>
  <div class="nav-bar">
    <div class="nav-bar-left">
      <div class="logo-box">
        <img :src="require('src/assets/images/logo.png')" alt="logo" class="logo">
        <span>IOT管理平台</span>
      </div>
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
export default {
  name: 'NavBar',
  methods: {
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
    padding: 0 20px;
    height: 100%;
    border-bottom: 1px solid #f1f1ff;

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
