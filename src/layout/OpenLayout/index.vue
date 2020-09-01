<template>
  <div class="app-wrapper">
    <!-- 导航栏 -->
    <NavBar />
    <!-- 内容区 -->
    <AppMain />
  </div>
</template>
<script>
import { AppMain } from 'src/layout/components'
import NavBar from './NavBar'
export default {
  name: 'OpenLayout',
  components: {
    AppMain,
    NavBar
  }
}
</script>
