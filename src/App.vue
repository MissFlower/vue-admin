<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-20 14:29:05
-->
<template>
  <div id="app">
    <router-view />
    <Loading v-show="showLoading" />
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import Loading from 'src/components/Loading'
import { removeWatermark, setWaterMark } from 'src/utils/watermark'
export default {
  name: 'App',
  components: {
    Loading
  },
  computed: {
    showLoading() {
      return this.$store.state.common.requestCount > 0
    },
    ...mapGetters({
      username: 'name'
    })
  },
  watch: {
    username: 'createWaterMark'
  },
  destroyed() {
    removeWatermark()
  },
  methods: {
    createWaterMark(name) {
      setWaterMark(name, 5924)
    }
  }
}
</script>
<style lang="scss">
#app {
  height: 100%;

  div,
  section {
    box-sizing: border-box;
  }
}
</style>
