<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-08-20 10:07:37
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-10 17:16:34
-->
<template>
  <div>
    <!-- 内容区域 -->
    <div class="content">
      <div>
        content-0
      </div>
      <div>
        content-1
      </div>
      <div>
        content-2
      </div>
      <div>
        content-3
      </div>
      <div>
        content-4
      </div>
    </div>
    <!-- 导航区域 -->
    <ul class="navs">
      <li :class="{active: active===0}" @click="scrollTo(0)">
        content-0
      </li>
      <li :class="{active: active===1}" @click="scrollTo(1)">
        content-1
      </li>
      <li :class="{active: active===2}" @click="scrollTo(2)">
        content-2
      </li>
      <li :class="{active: active===3}" @click="scrollTo(3)">
        content-3
      </li>
      <li :class="{active: active===4}" @click="scrollTo(4)">
        content-4
      </li>
    </ul>
  </div>
</template>
<script>
export default {
  props: {},
  data() {
    return {
      active: 0, // 当前激活的导航索引
      appMainDOM: null
    }
  },
  mounted() {
    // 监听滚动事件
    // window.addEventListener('scroll', this.onScroll, false)
    this.appMainDOM = this.$parent.$refs.appMain
    this.appMainDOM.addEventListener('scroll', this.onScroll)
  },
  beforeDestroy() {
    // 必须移除监听器，不然当该vue组件被销毁了，监听器还在就会出错
    this.appMainDOM.removeEventListener('scroll', this.onScroll)
    this.appMainDOM = null
  },
  methods: {
    // 滚动监听器
    onScroll() {
      // 获取所有锚点元素
      const navContents = document.querySelectorAll('.content div')
      // 所有锚点元素的 offsetTop
      const offsetTopArr = []
      navContents.forEach(item => {
        offsetTopArr.push(item.offsetTop)
      })
      // 获取当前文档流的 scrollTop
      // const scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      const scrollTop = document.querySelectorAll('.app-main')[0].scrollTop
      // 定义当前点亮的导航下标
      let navIndex = 0
      for (let n = 0; n < offsetTopArr.length; n++) {
        // 如果 scrollTop 大于等于第n个元素的 offsetTop 则说明 n-1 的内容已经完全不可见
        // 那么此时导航索引就应该是n了
        if (scrollTop >= offsetTopArr[n]) {
          navIndex = n
        }
      }
      this.active = navIndex
    },
    // 跳转到指定索引的元素
    scrollTo(index) {
      this.active = index
      // 获取目标的 offsetTop
      // css选择器是从 1 开始计数，我们是从 0 开始，所以要 +1
      const targetOffsetTop = document.querySelector(`.content div:nth-child(${index + 1})`).offsetTop
      // 获取当前 offsetTop
      // let scrollTop = document.documentElement.scrollTop || document.body.scrollTop
      let scrollTop = document.querySelectorAll('.app-main')[0].scrollTop
      // 定义一次跳 50 个像素，数字越大跳得越快，但是会有掉帧得感觉，步子迈大了会扯到蛋
      const STEP = 50
      // 判断是往下滑还是往上滑
      if (scrollTop > targetOffsetTop) {
        // 往上滑
        smoothUp()
      } else {
        // 往下滑
        smoothDown()
      }
      // 定义往下滑函数
      function smoothDown() {
        // 如果当前 scrollTop 小于 targetOffsetTop 说明视口还没滑到指定位置
        if (scrollTop < targetOffsetTop) {
          // 如果和目标相差距离大于等于 STEP 就跳 STEP
          // 否则直接跳到目标点，目标是为了防止跳过了。
          if (targetOffsetTop - scrollTop >= STEP) {
            scrollTop += STEP
          } else {
            scrollTop = targetOffsetTop
          }
          console.log(scrollTop)
          document.querySelectorAll('.app-main')[0].scrollTop = scrollTop
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          // 关于 requestAnimationFrame 可以自己查一下，在这种场景下，相比 setInterval 性价比更高
          requestAnimationFrame(smoothDown)
        }
      }
      // 定义往上滑函数
      function smoothUp() {
        if (scrollTop > targetOffsetTop) {
          if (scrollTop - targetOffsetTop >= STEP) {
            scrollTop -= STEP
          } else {
            scrollTop = targetOffsetTop
          }
          document.querySelectorAll('.app-main')[0].scrollTop = scrollTop
          document.body.scrollTop = scrollTop
          document.documentElement.scrollTop = scrollTop
          requestAnimationFrame(smoothUp)
        }
      }
    }
  }
}
</script>

<style scoped>
  /* 内容区的样式 */
  .content {
  background-color: white;
  width: 500px;
  }
  .content div {
  width: 100%;
  height: 600px;
  font-size: 36px;
  padding: 20px;
  background-color: #7ec384;
  }
  .content div:nth-child(2n) {
  background-color: #847ec3;
  }
  /* 导航栏的样式 */
  .navs {
  position: fixed;
  top: 80px;
  left: 700px;
  background-color: #efefef;
  }
  .navs li {
  padding: 0 20px;
  line-height: 1.6;
  font-size: 24px;
  }
  /* 当导航被点亮后改变颜色 */
  .navs .active{
  color: #847ec3;
  background-color: #e2e2e2;
  }
</style>
