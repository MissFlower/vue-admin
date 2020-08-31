<!--
 * @Description:
 * @Version: 0.1.0
 * @Autor: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-08-20 17:42:09
-->
<template>
  <div>
    我是内容
    <SvgIcon icon-class="table" class-name="aaa" />
  </div>
</template>
<script>
const table = require('src/assets/images/table.svg')
const table1 = require('src/assets/icons/svg/table.svg')
console.log(table1.default.content)
export default {
  name: 'Home',
  data() {
    return {
      table
    }
  }
}
</script>
<style lang="scss" scoped>
.aaa {
  width: 100px;
  height: 5000px;
}
</style>
