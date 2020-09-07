<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-07 16:41:17
-->
<template>
  <section class="app-main">
    <transition
      name="fade-transform"
      mode="out-in"
    >
      <!-- <keep-alive :include="cachedViews">
        <router-view :key="key" />
      </keep-alive> -->
      <router-view :key="key" />
    </transition>
  </section>
</template>

<script>
export default {
  name: 'AppMain',
  computed: {
    key() {
      return this.$route.path
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main {
  min-width: 1170px;
  /* 50= navbar  50  */
  min-height: calc(100vh - 50px);
  overflow: auto;
  height: 100%;
  padding: 24px;
}
</style>
