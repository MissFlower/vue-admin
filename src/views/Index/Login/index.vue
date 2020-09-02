<!--
 * @Description: 登录
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-09-01 14:39:54
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-02 20:59:36
-->
<template>
  <div class="login-container">
    <div class="login">
      <p class="login-title">登录</p>
      <ElForm ref="ruleForm" :model="ruleForm" status-icon :rules="rules" class="login-form">
        <ElFormItem label="" prop="username" class="login-form-item">
          <ElInput v-model.trim="ruleForm.username" placeholder="请输入用户名" prefix-icon="el-icon-user" />
        </ElFormItem>
        <ElFormItem label="" prop="password" class="login-form-item">
          <ElInput v-model.trim="ruleForm.password" placeholder="请输入密码" prefix-icon="el-icon-lock" show-password />
        </ElFormItem>
      </ElForm>
      <div class="login-btn-box">
        <ElButton type="success" class="login-btn">登录</ElButton>
        <ElLink type="success" :underline="false" class="register-btn">立即注册</ElLink>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Login',
  data() {
    return {
      ruleForm: {
        username: '',
        password: ''
      },
      rules: {
        username: [
          { require: true, pattern: /^[\u4e00-\u9fa5a-zA-Z_-]{6,12}$/, message: '请输入中英文横杠下划线6-12个字!', trigger: 'blur' }
        ],
        password: [
          { require: true, pattern: /^[0-9a-zA-Z_-]{6,12}$/, message: '请输入数字英文横杠下划线6-12个字!', trigger: 'blur' }
        ]
      }
    }
  }
}
</script>
<style lang="scss" scoped>
.login-container {
  width: 100%;
  height: 100%;
  background: url('../../../assets/images/login-background.png') no-repeat;
  background-size: cover;
  position: relative;

  .login {
    width: 400px;
    height: 380px;
    padding: 20px;
    background-color: #FFF;
    position: absolute;
    top: 50%;
    right: 200px;
    margin-top: -190px;

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
