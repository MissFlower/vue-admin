<template>
  <div class="webgl-box">
    <canvas ref="webglBall" width="600" height="600" />
  </div>
</template>
<script>
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')
export default {
  name: 'WebglBall',
  data() {
    return {
      scene: null, // 场景对象
      camera: null, // 照相机
      renderer: null // 渲染器
    }
  },
  mounted() {
    this.init()
  },
  methods: {
    init() {
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.webglBall,
        alpha: true // 白色透明
      })
      this.scene = new THREE.Scene()
      const aspect = 1
      this.camera = new THREE.OrthographicCamera(-2 * aspect, 2 * aspect, -2 * aspect, 2 * aspect, 1, 500)
      this.camera.position.set(100, 100, 200)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.scene.add(this.camera)

      // 创建控制组件
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.25 // 阻尼系数
      this.controls.enableZoom = false // 禁止缩放
      this.renderer.domElement.removeAttribute('tabIndex') // 实例化控制组件后 去掉边框

      // 声明一个时钟对象 用于更新轨道控制器
      this.clock = new THREE.Clock()

      this.cube = new THREE.Mesh(new THREE.SphereGeometry(2, 50, 50),
        new THREE.MeshBasicMaterial({
          color: 0xff0000,
          wireframe: true
        })
      )
      this.animate()
    },
    render() {
      // 渲染
      this.scene.add(this.cube)
      this.renderer.render(this.scene, this.camera)
    },
    animate() {
      // 运动
      this.render()
      this.Anima = requestAnimationFrame(this.animate)
      const time = this.clock.getDelta()
      this.cube.rotateY((time * Math.PI) / 8)
      // console.log(time)
      // this.mixer.update(time)
    }
  }
}
</script>
<style lang="scss" scoped>
.webgl-box {
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
