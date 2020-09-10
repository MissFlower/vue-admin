<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 14:46:19
-->
<template>
  <section ref="appMain" :class="isIndex ? 'index-main' : 'app-main'">
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
    },
    isIndex() {
      return this.$route.path === '/index'
    }
  }
}
</script>

<style lang="scss" scoped>
.app-main,
.index-main {
  overflow: auto;
  height: 100%;
}
.app-main {
  min-width: 1170px;
  padding: 24px;
}
</style>
