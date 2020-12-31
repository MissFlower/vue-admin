<!--
 * @Description: loading
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-03 13:58:27
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-12-31 19:14:37
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

.loading {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);

  span {
    display: inline-block;
    width: 12px;
    height: 100%;
    margin: 0 4px;
    border-radius: 1px;
    background: #33f;
    animation: load 1s ease infinite;

    &:nth-child(2) {
      animation-delay: 0.25s;
      background: #06f;
    }

    &:nth-child(3) {
      animation-delay: 0.5s;
      background: #3c3;
    }

    &:nth-child(4) {
      animation-delay: 0.75s;
      background: #0c3;
    }
  }
}

@keyframes load {
  0%,
  100% {
    height: 40px;
  }

  50% {
    height: 70px;
    margin: -15px 4px;
  }
}
</style>
