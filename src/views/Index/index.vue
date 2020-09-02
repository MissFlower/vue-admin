<!--
 * @Description: 首页
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-01 15:34:42
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-02 19:52:42
-->
<template>
  <div ref="container" class="container">
    <div class="banner">
      <div class="banner-content">
        <p class="banner-title clearfix">
          <span v-for="(item, index) in iot_title" :key="index" class="fl animate__animated animate__zoomInDown" :style="{'animation-delay': 0.1 * index +'s'}">{{ item }}</span>
        </p>
        <div class="banner-text animate__animated animate__fadeInLeft animate__delay-1s">{{ iot_describe }}</div>
      </div>
    </div>
    <div class="main">
      <!-- 产品优势 -->
      <div class="main-title">
        <p class="main-title-cn">产品优势</p>
        <p class="main-title-en">PRODUCT ADVANTAGES</p>
      </div>
      <div class="advantage">
        <div
          v-for="(item, index) in adsList"
          :key="item.title"
          :class="['advantage-list', 'advantage-list-index' + index]"
        >
          <div class="advantage-mask">
            <img :class="['advantage-mask-icon','advantage-mask-icon-index' + index]">
            <p class="advantage-mask-title">{{ item.title }}</p>
            <div class="advantage-mask-describe">{{ item.describe }}</div>
          </div>
        </div>
      </div>
      <!-- 产品功能 -->
      <div class="main-title">
        <p class="main-title-cn">产品功能</p>
        <p class="main-title-en">PRODUCT FEATURES</p>
      </div>
      <div ref="feature" class="feature animate__animated animate__delay_1s">
        <div v-for="(item, index) in featuresList" :key="index" class="feature-list">
          <template v-if="item.isImg">
            <img :class="[item.imageName]">
          </template>
          <template>
            <div v-for="(info, i) in item.informations" :key="i" class="feature-info">
              <p class="feature-info-title">{{ info.title }}</p>
              <div v-for="(des, n) in info.describe" :key="n" class="feature-info-describe">{{ des }}</div>
            </div>
          </template>
        </div>
      </div>
      <!-- 典型场景 -->
      <div class="main-title">
        <p class="main-title-cn">典型场景</p>
        <p class="main-title-en">TYPICAL SCENE</p>
      </div>
      <div ref="scene" class="scene animate__animated animate__delay_1s">
        <div class="scene-header">
          <img :src="require('src/assets/images/battery.png')" alt="">
          <p class="scene-header-title">{{ scene.title }}</p>
        </div>
        <div class="scene-describe">{{ scene.describe }}</div>
        <img :src="scene.backgroundImage" alt="">
      </div>
    </div>
    <div class="footer">© 2009-2020 sulv.com 版权所有</div>
  </div>
</template>
<script>
import { deepFreeze, throttle } from 'src/utils'
export default {
  name: 'Index',
  data() {
    return {
      iot_title: 'IOT管理系统',
      iot_describe: '立足中国，服务全球，致力于高效、便捷地联结生活的每一个角落，支持您的物联网项目快速落地。这里提供设备接入、管理、监控、运维，数据存储、隔离、流转、分析等全场景、一站式解决方案。本平台安全可信、支持高并发，性价比高，助力合作伙伴快速、低成本订制专属的物联网服务。',
      adsList: deepFreeze([
        {
          title: '安全可靠',
          describe: '多种认证方式拒绝非法接入，有效防范数据被窃取、篡改。'
        },
        {
          title: '接入简单 管理方便',
          describe: '提供支持多种协议和网络类型的接入SDK，设备的调试、配置、控制、升级操作均可远程实现。'
        },
        {
          title: '业务规模灵活扩展',
          describe: '存储与计算性能规格可在线上一键提升，快速响应业务的扩展。'
        },
        {
          title: '坚实耐用',
          describe: '采用多单元部署架构，具备自动容灾、负载均衡能力，支持高并发。'
        },
        {
          title: '可视化管理',
          describe: '用户可以将海量设备数据图形可视化，与数据实时交互并个性化管理。'
        },
        {
          title: '全天候运维',
          describe: '基于丰富的服务经验，专业技术团队为您提供7*24小时全天候的运维监控服务。'
        }
      ]),
      featuresList: deepFreeze([
        {
          isImg: false,
          informations: [
            {
              title: '设备接入',
              describe: ['支持多网络、多协议、多开发语言的设备快速接入；', '支持的网络类型包括：以太网、LoRaWAN、WiFi、蜂窝网络，覆盖主流模组的网络通信方式；', '支持的协议包括：MQTT、HTTP等，既能保障设备使用短连接降低功耗，也能保障设备使用长连接保证通信实时性；', '设备端SDK支持的语言包括：C、Android、Node.js等，方便开发者依自身情况选用；']
            }
          ]
        },
        {
          isImg: true,
          imageName: 'feature_bg0'
        },
        {
          isImg: true,
          imageName: 'feature_bg1'
        },
        {
          isImg: false,
          informations: [
            {
              title: '设备接入',
              describe: ['提供设备生命周期管理和数字化建模能力']
            },
            {
              title: '设备认证',
              describe: ['提供一机一密、一型一密等设备认证机制，降低设备被攻破的安全风险；']
            },
            {
              title: '生命周期管理',
              describe: ['提供设备生命周期的管理，可以创建、删除、禁用、启用设备；']
            },
            {
              title: '状态管理',
              describe: ['提供设备上/下线变更通知和主动查询接口，可以实时获取设备最新状态；']
            },
            {
              title: '权限管控',
              describe: ['严格控制设备和用户的权限范围，任何操作都需要做权限校验，防范数据泄露与被篡改风险；']
            }
          ]
        },
        {
          isImg: false,
          informations: [
            {
              title: '监控运维',
              describe: ['提供设备实时监控和远程运维能力']
            },
            {
              title: '实时监控',
              describe: ['支持大盘监控和报警配置，可以实时感知业务异常变化']
            },
            {
              title: '在线调试',
              describe: ['支持远程调试真实设备，模拟指令下发，并可以通过虚拟设备模拟数据上报']
            },
            {
              title: '日志服务',
              describe: ['设备和平台的全链路日志记录，支持通过关键字、时间范围等维度快速检索相关日志']
            },
            {
              title: '固件升级',
              describe: ['支持设备固件远程升级，升级类型可配置整包或差分类型，升级策略可配置动态或静态策略，升级范围配置全部、定向、区域或灰度范围；']
            }
          ]
        },
        {
          isImg: true,
          imageName: 'feature_bg2'
        }
      ]),
      scene: deepFreeze({
        describe: '降低传统硬件智能组网的门槛、支持接入设备快速增加；支持海量通信高并发，降低弹出电池指令的下发延时；实时采集、清洗、分析设备数据，为设备平稳运行保驾护航；机柜显示屏仅在有受众时播放广告，每个机柜推送个性化广告，实现广告屏的精细化运营；',
        title: '共享充电宝',
        backgroundImage: require('src/assets/images/scene_bg.png')
      }),
      $_scrollHandler: null
    }
  },
  mounted() {
    this.$_scrollHandler = throttle(() => {
      this.judgePosition()
    }, 300)
    document.addEventListener('scroll', this.$_scrollHandler, true)
  },
  methods: {
    judgePosition() {
      // 根据滚动条位置 做动画
      // const scrollTop = this.$refs.container.scrollTop
      const featureTop = this.$refs.feature.getBoundingClientRect().top
      const sceneTop = this.$refs.scene.getBoundingClientRect().top
      const clientHeight = document.documentElement.clientHeight
      if (featureTop < clientHeight && !this.$refs.feature.classList.contains('animate__backInDown')) {
        this.$refs.feature.classList.add('animate__backInDown')
      }
      if (sceneTop < clientHeight && !this.$refs.scene.classList.contains('animate__fadeInLeftBig')) {
        this.$refs.scene.classList.add('animate__fadeInLeftBig')
      }
      if (this.$refs.feature.classList.contains('animate__backInDown') && this.$refs.scene.classList.contains('animate__fadeInLeftBig')) {
        document.removeEventListener('scroll', this.$_scrollHandler, true)
      }
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
  margin-bottom: 30px;

  &-content {
    width: 80%;
    min-width: 1280px;
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
.main {
  margin: 0 auto;
  width: 1280px;
  padding: 0 50px;

  &-title {
    margin: 0 auto;
    text-align: center;

    &-cn {
      height: 50px;
      line-height: 50px;
      font-size: 32px;
    }

    &-en {
      margin-top: 10px;
      height: 32px;
      line-height: 32px;
      font-size: 16px;
      color: #999;
    }
  }

  .advantage {
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
    margin: 50px 0;

    &-list {
      width: calc(33.333333% - 10px);
      height: 390px;
      margin-bottom: 15px;
      position: relative;

      &:nth-child(n + 4) {
        margin-bottom: 0;
      }
    }

    @for $i from 0 through 5 {
      &-list-index#{$i} {
        background: url('~src/assets/images/adv_bg#{$i}.png');
        background-size: cover;
        background-repeat: no-repeat;
      }
    }

    &-mask {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      background-color: transparent;
      transition: 0.3s background-color ease-in-out;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      color: #FFF;

      &:hover {
        background-color: rgba(57, 175, 89, 0.5);

        .advantage-mask-icon {
          margin-top: 0;
        }

        .advantage-mask-describe {
          opacity: 1;
        }
      }

      &-icon {
        width: 100px;
        display: block;
        margin-top: 60px;
        transition: 0.5s margin-top ease-in-out;
      }

      @for $i from 0 through 5 {
        &-icon-index#{$i} {
          content: url('~src/assets/images/adv#{$i}.png')
        }
      }

      &-title {
        height: 50px;
        line-height: 50px;
        font-size: 24px;
        margin-top: 20px;
      }

      &-describe {
        width: 300px;
        line-height: 24px;
        font-size: 16px;
        margin-top: 20px;
        opacity: 0;
        transition: 0.5s opacity ease-in-out;
      }
    }
  }

  .feature {
    @extend .advantage;

    &-list {
      width: calc(50% - 30px);
      margin-bottom: 60px;
      display: flex;
      align-items: center;
      flex-wrap: wrap;

      &:nth-child(5) {
        justify-content: space-between;

        .feature-info:nth-child(n + 2) {
          width: calc(50% - 20px);
        }
      }
    }

    @for $i from 0 to 3 {
      &_bg#{$i} {
        content: url('~src/assets/images/feature_bg#{$i}.png')
      }
    }

    &-info {
      width: 420px;

      &-title {
      font-size: 18px;
      font-weight: bold;
      height: 32px;
      line-height: 32px;
      color: #434343;
      margin-bottom: 10px;
    }

    &-describe {
      font-size: 14px;
      line-height: 24px;
      color: #656565;
      margin-bottom: 10px;
    }
    }
  }

  .scene {
    @extend .advantage;
    justify-content: center;

    &-header {
      width: 200px;
      text-align: center;
      border-bottom: 4px solid #39AF59;

      img {
        width: 30px;
        margin-bottom: 24px;
      }

      &-title {
        height: 36px;
        line-height: 36px;
        color: #39AF59;
        font-size: 24px;
        margin-bottom: 16px;
      }
    }

    &-describe {
      margin-top: 42px;
      line-height: 24px;
      font-size: 14px;
      color: #656565;
      margin-bottom: 32px;
    }
  }
}

.footer {
  height: 60px;
  line-height: 60px;
  background-color: #181818;
  color: #73777a;
  letter-spacing: 1px;
  text-align: center;
  font-size: 14px;
}
</style>
