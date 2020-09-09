<!--
 * @Description: 登录
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-01 14:39:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-09 15:46:45
-->
<template>
  <div class="login-container">
    <div class="login">
      <p class="login-title">登录</p>
      <ElForm ref="loginForm" :model="loginForm" status-icon :rules="rules" class="login-form">

        <ElFormItem label="" prop="username" class="login-form-item">
          <ElInput
            ref="username"
            v-model.trim="loginForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            autocomplete="on"
            tabindex="1"
          />
        </ElFormItem>

        <ElFormItem label="" prop="password" class="login-form-item">
          <ElInput
            ref="password"
            v-model.trim="loginForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            autocomplete="on"
            tabindex="2"
            @keyup.native.enter.exact="login"
          />
        </ElFormItem>
      </ElForm>
      <div class="login-btn-box">
        <ElButton type="success" class="login-btn" @click.native.prevent="login">登录</ElButton>
        <ElLink type="success" :underline="false" class="register-btn" @click.native.prevent="register">立即注册</ElLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      loginForm: {
        username: 'Admin',
        password: 'Love7758258'
      },
      rules: {
        username: [
          { required: true, message: '请输入用户名!', trigger: 'blur' }
        ],
        password: [
          { required: true, message: '请输入密码!', trigger: 'blur' }
        ]
      },
      redirect: undefined,
      otherQuery: {}
    }
  },
  watch: {
    $route: {
      handler(route) {
        const query = route.query
        if (query) {
          this.redirect = query.redirect
          this.otherQuery = this.getOtherQuery(query)
        }
      },
      immediate: true
    }
  },
  mounted() {
    if (this.loginForm.username === '') {
      this.$refs.username.focus()
    } else if (this.loginForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    login() {
      // 登录
      this.$refs.loginForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/login', this.loginForm)
            .then(res => {
              this.$router.push({
                path: this.redirect || '/',
                query: this.otherQuery
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    getOtherQuery(query) {
      return Object.keys(query).reduce((acc, cur) => {
        if (cur !== 'redirect') {
          acc[cur] = query[cur]
        }
        return acc
      }, {})
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
.login-container {
  width: 100%;
  height: 100%;
  background: url('~src/assets/images/login-background.png') no-repeat;
  background-size: cover;
  position: relative;
  overflow: auto;

  .login {
    width: 400px;
    height: 380px;
    padding: 20px;
    background-color: #FFF;
    position: absolute;
    top: 50%;
    right: 200px;
    margin-top: -190px;
    border-radius: 2px;

    &-title {
      height: 32px;
      line-height: 32px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      letter-spacing: 2px;
      padding-left: 1px;
      margin: 20px 0;
    }

    &-form {
      margin: 50px 0;

      &-item {
        margin-bottom: 42px;
      }
    }

    &-btn-box {
      text-align: center;
    }

    &-btn {
      width: 100%;
      letter-spacing: 2px;
      padding-left: 21px;
    }

    .register-btn {
      margin-top: 8px;
    }
  }
}
</style>
