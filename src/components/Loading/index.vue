<!--
 * @Description: loading
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-03 13:58:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-03 14:22:02
-->
<template>
  <div class="loading-mask">
    <div class="loading">
      <span />
      <span />
      <span />
      <span />
    </div>
  </div>
</template>
<style lang="scss" scoped>
.loading-mask {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.1);
  z-index: 10000;
}
.loading{
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span{
    display: inline-block;
    width: 12px;
    height: 100%;
    margin: 0 4px;
    border-radius: 1px;
    background: #3333ff;
    animation: load 1s ease infinite;

    &:nth-child(2) {
      animation-delay: 0.25s;
      background: #0066ff;
    }

    &:nth-child(3) {
      animation-delay: 0.5s;
      background: #33cc33;
    }

    &:nth-child(4) {
      animation-delay: 0.75s;
      background: #00cc33;
    }
  }
}

@keyframes load {
  0%,
  100%{
      height: 40px;
  }
  50%{
      height: 70px;
      margin: -15px 4px;
  }
}
</style>
