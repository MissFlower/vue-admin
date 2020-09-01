<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-01 19:16:32
-->
<template>
  <section class="app-main">
    <transition
      mode="out-in"
      :duration="{ enter: 300, leave: 0 }"
      enter-active-class="animate__animated animate__fadeIn"
      leave-active-class="animate__animated animate__fadeOut"
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
