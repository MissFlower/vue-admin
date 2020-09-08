<!--
 * @Description: 注册
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-01 14:39:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-08 16:39:31
-->
<template>
  <div class="register-container">
    <div class="register">
      <p class="register-title">注册</p>
      <ElForm ref="registerForm" :model="registerForm" status-icon :rules="rules" class="register-form">

        <ElFormItem label="" prop="username" class="register-form-item">
          <ElInput
            ref="username"
            v-model.trim="registerForm.username"
            placeholder="请输入用户名"
            prefix-icon="el-icon-user"
            autocomplete="on"
            tabindex="1"
          />
        </ElFormItem>

        <ElFormItem label="" prop="password" class="register-form-item">
          <ElInput
            ref="password"
            v-model.trim="registerForm.password"
            placeholder="请输入密码"
            prefix-icon="el-icon-lock"
            show-password
            autocomplete="on"
            tabindex="2"
            @keyup.native.enter.exact="register"
          />
        </ElFormItem>
      </ElForm>
      <div class="register-btn-box">
        <ElButton type="success" class="register-btn" @click.native.prevent="register">立即注册</ElButton>
        <ElLink type="success" :underline="false" class="login-btn" @click.native.prevent="login">已有账号 前往登录</ElLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Register',
  data() {
    const passwordValidate = (value, rule, callback) => {
      if (this.registerForm.password === '') {
        callback(new Error('请输入密码'))
      } else {
        const pwdRegex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z]){6,12}')
        if (!pwdRegex.test(this.registerForm.password)) {
          callback(new Error('您的密码复杂度太低（密码中必须包含大小写字母、数字)！'))
        } else {
          callback()
        }
      }
    }
    return {
      registerForm: {
        username: 'Admin',
        password: 'Love7758258'
      },
      rules: {
        username: [
          { required: true, pattern: /^[\u4e00-\u9fa5a-z0-9A-Z_-]{5,12}$/, message: '请输入中英文数字横杠下划线6-12个字!', trigger: 'blur' }
        ],
        password: [
          { required: true, validator: passwordValidate, trigger: 'blur' }
        ]
      }
    }
  },
  mounted() {
    if (this.registerForm.username === '') {
      this.$refs.username.focus()
    } else if (this.registerForm.password === '') {
      this.$refs.password.focus()
    }
  },
  methods: {
    register() {
      // 注册
      this.$refs.registerForm.validate(valid => {
        if (valid) {
          this.$store.dispatch('user/register', this.registerForm)
            .then(res => {
              this.$router.push({
                path: '/'
              })
            })
            .catch(err => {
              console.log(err)
            })
        }
      })
    },
    login() {
      this.$router.push({
        path: '/login'
      })
    }
  }
}
</script>
<style lang="scss" scoped>
.register-container {
  width: 100%;
  height: 100%;
  background: url('~src/assets/images/login-background.png') no-repeat;
  background-size: cover;
  position: relative;
  overflow: auto;

  .register {
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

