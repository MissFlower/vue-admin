<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-09-01 15:34:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-01 18:55:51
-->
<template>
  <div class="container">
    <div class="banner">
      <div class="banner-content">
        <p class="banner-title animate__animated animate__fadeInDown">IOT管理系统</p>
        <div class="banner-text animate__animated animate__fadeInLeft">{{ iot_describe }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'Index',
  data() {
    return {
      iot_describe: '立足中国，服务全球，致力于高效、便捷地联结生活的每一个角落，支持您的物联网项目快速落地。这里提供设备接入、管理、监控、运维，数据存储、隔离、流转、分析等全场景、一站式解决方案。本平台安全可信、支持高并发，性价比高，助力合作伙伴快速、低成本订制专属的物联网服务。'
    }
  }
}
</script>
<style lang="scss" scoped>
.banner {
  background-image: url('~src/assets/images/banner.png');
  background-size: cover;
  background-repeat: no-repeat;
  height: 500px;
  position: relative;
  color: #FFF;

  &-content {
    width: 80%;
    min-width: 1200px;
    padding: 0 50px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }

  &-title {
    width: 500px;
    font-size: 48px;
    line-height: 50px;
    margin-bottom: 30px;
  }

  &-text {
    width: 500px;
    font-size: 14px;
    line-height: 24px;
  }
}
</style>
