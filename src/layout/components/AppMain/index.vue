<template>
  <section class="app-main">
    <transition name="fade-transform" mode="out-in">
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
