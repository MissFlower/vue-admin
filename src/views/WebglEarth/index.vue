<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-09-15 15:45:14
 * @LastEditors: AiDongYang
 * @LastEditTime: 2020-09-16 19:04:48
-->
<template>
  <div class="webgl-box">
    <canvas ref="webglEarth" width="600" height="600" />
  </div>
</template>
<script>
const THREE = require('three')
const OrbitControls = require('three-orbitcontrols')
export default {
  name: 'WebglEarth',
  data() {
    return {
      scene: null, // 场景对象
      camera: null, // 照相机
      light: null, // 灯光
      renderer: null, // 渲染器
      radius: 300, // 半径
      start: [116, 39], // 开始位置
      destination: [
        [68, 41]
      ],
      posTracks: []
    }
  },
  mounted() {
    this.initThree()
  },
  methods: {
    initThree() {
      // 创建渲染器
      this.renderer = new THREE.WebGLRenderer({
        canvas: this.$refs.webglEarth,
        alpha: true // 白色透明
      })

      // 创建场景
      this.scene = new THREE.Scene()

      // 创建照相机
      this.camera = new THREE.PerspectiveCamera(45, 600 / 600, 1, 1500)
      this.camera.position.set(100, 100, 1000)
      this.camera.lookAt(new THREE.Vector3(0, 0, 0))
      this.scene.add(this.camera)

      // 创建控制组件
      this.controls = new OrbitControls(this.camera, this.renderer.domElement)
      this.controls.enableDamping = true
      this.controls.dampingFactor = 0.25 // 阻尼系数
      this.controls.enableZoom = false // 禁止缩放
      this.renderer.domElement.removeAttribute('tabIndex') // 实例化控制组件后 去掉边框

      // 创建灯光
      this.light = new THREE.HemisphereLight(0xffffff, 0xffffff, 1)
      this.light.position.set(0, 0, 200)
      this.scene.add(this.light)

      // 创建编组 使得组中对象在语法上的结构更加清晰
      this.group = new THREE.Group()
      this.groupBall = new THREE.Group()

      // 声明一个时钟对象 用于更新轨道控制器
      this.clock = new THREE.Clock()

      this.x = new THREE.Vector3(1, 0, 0)
      this.y = new THREE.Vector3(0, 1, 0)
      this.z = new THREE.Vector3(0, 0, 1)

      this.drawEarth()

      // 用于简单模拟3个坐标轴的对象
      const axisHelper = new THREE.AxesHelper(250)
      this.scene.add(axisHelper)

      // 画点
      this.drawPoint(
        this.getPosition(this.start[0], this.start[1], this.radius + 3)
      )

      this.destination.forEach((ele, index) => {
        const pos = this.getPosition(ele[0], ele[1], this.radius + 3)
        this.drawPoint(pos)
        this.drawLine(this.start[0], this.start[1], ele[0], ele[1], index)
      })
    },
    drawEarth() {
      // 绘制地球
      const geometry = new THREE.SphereGeometry(this.radius, 100, 100) // 球体
      const textureLoader = new THREE.TextureLoader() // 纹理贴图loader
      // 加载一个资源
      textureLoader.load(
        // 资源URL
        require('@/assets/images/earth-bg.jpg'),
        // onLoad回调
        texture => {
          // Lambert网格材质(MeshLambertMaterial) 一种非光泽表面的材质，没有镜面高光
          const material = new THREE.MeshLambertMaterial({
            map: texture // 颜色贴图
          })
          // 网格(Mesh) 基于以三角形为polygon mesh的物体的类 geometry(几何体) material(材料)
          const mesh = new THREE.Mesh(geometry, material)
          this.group.add(mesh)
          this.animate()
        },
        // 目前暂不支持onProgress的回调
        undefined,
        // onError回调
        error => {
          console.log(error)
        }
      )
    },
    drawPoint(pos) {
      // 绘制点
      // 创建一个组 存放点
      const groupPoint = new THREE.Group()
      const r = 20

      // Geometry 利用 Vector3 或 Color 存储了几何体的相关 attributes(如顶点位置，面信息，颜色等)
      const geometryLine = new THREE.Geometry()
      // 创建弧线(ArcCurve)
      // aX – 椭圆的中心的X坐标，默认值为0。
      // aY – 椭圆的中心的Y坐标，默认值为0。
      // xRadius – X轴向上椭圆的半径，默认值为1。
      // yRadius – Y轴向上椭圆的半径，默认值为1。
      // aStartAngle – 以弧度来表示，从正X轴算起曲线开始的角度，默认值为0。
      // aEndAngle – 以弧度来表示，从正X轴算起曲线终止的角度，默认值为2 x Math.PI。
      // aClockwise – 椭圆是否按照顺时针方向来绘制，默认值为false。
      // aRotation – 以弧度表示，椭圆从X轴正方向逆时针的旋转角度（可选），默认值为0。
      const arc = new THREE.ArcCurve(0, 0, r, 0, 0, 2 * Math.PI)
      // 将曲线分割成的段数。默认值为5
      const points = arc.getPoints(40)
      // 通过点队列设置一个 Geometry 中的顶点
      geometryLine.setFromPoints(points)

      // 基础线条材质(LineBasicMaterial)
      const LineMateri = new THREE.LineBasicMaterial({ color: 0x20b2aa, linewidth: 1 })

      // 线(Line)
      const line = new THREE.Line(geometryLine, LineMateri)

      // 形状(Shape) 使用路径以及可选的孔洞来定义一个二维形状平面
      const shapePoint = new THREE.Shape()
      // x, y -- 弧线的绝对中心。
      // radius -- 弧线的半径。
      // startAngle -- 起始角，以弧度来表示。
      // endAngle -- 终止角，以弧度来表示。
      // clockwise -- 以顺时针方向创建（扫过）弧线。默认值为false。
      shapePoint.absarc(0, 0, r - 14, 0, 2 * Math.PI, false)

      // 形状几何体(ShapeGeometry) 参数: 1. shapes — 一个单独的shape，或者一个包含形状的Array 2. curveSegments - Integer - 每一个形状的分段数，默认值为12
      const arcGeometry = new THREE.ShapeGeometry(shapePoint)
      // 基础网格材质(MeshBasicMaterial) 一个以简单着色（平面或线框）方式来绘制几何体的材质。这种材质不受光照的影响
      const arcMaterial = new THREE.MeshBasicMaterial({ color: 0x008080 })
      const point = new THREE.Mesh(arcGeometry, arcMaterial)

      groupPoint.add(line)
      groupPoint.add(point)

      // 创建球坐标(Spherical)
      const spherical = new THREE.Spherical()
      // 从笛卡尔坐标系中设置球坐标
      spherical.setFromCartesianCoords(pos.x, pos.y, pos.z)
      // console.log(spherical.theta / Math.PI)

      // spherical.phi 和x轴夹角 x轴正方向到负方向
      // spherical.theta 和y轴夹角 y周正方向到负方向
      console.log(spherical.phi)
      groupPoint.rotateX(spherical.phi - Math.PI / 2)
      groupPoint.rotateY(spherical.theta)
      groupPoint.position.set(pos.x, pos.y, pos.z)

      // 将配置好的点 线组 放到 全局定义的组里
      this.group.add(groupPoint)
    },
    drawLine(startLongitude, startLatitude, endLongitude, endLatitude, index) {
      // 绘制球面曲线
      const geometry = new THREE.Geometry() // 声明一个几何体对象Geometry

      // v0 v3 代表曲线的开始点和结束点
      const v0 = this.getPosition(startLongitude, startLatitude, this.radius)
      const v3 = this.getPosition(endLongitude, endLatitude, this.radius)

      // 获取贝塞尔控制点
      const { v1, v2 } = this.getBezierPoint(v0, v3)

      // console.log(v0, v1, v2, v3);
      // 三维二次贝赛尔曲线
      const curve = new THREE.CubicBezierCurve3(v0, v1, v2, v3)

      const curvePoints = curve.getPoints(100)

      geometry.setFromPoints(curvePoints)

      const material = new THREE.LineBasicMaterial({
        color: 0x00ced1
      })

      const line = new THREE.Line(geometry, material)

      this.group.add(line)

      this.sport(curvePoints, index)
    },
    // 绘制运动的点
    drawSportPoint(position, name) {
      const box = new THREE.SphereGeometry(6, 6, 6)
      const material = new THREE.MeshLambertMaterial({
        color: 0x00bfff
      })
      // 材质对象
      const mesh = new THREE.Mesh(box, material)

      mesh.name = name
      mesh.position.set(position.x, position.y, position.z)
      this.groupBall.add(mesh)
      this.group.add(this.groupBall)
      return mesh
    },
    sport(curvePoints, index) {
      // 绘制运动点的路径
      this.drawSportPoint(curvePoints[0], `Ball${index}`)
      const arr = Array.from(Array(101), (v, k) => k)
      // 生成一个时间序列
      const times = new Float32Array(arr)

      const posArr = []
      curvePoints.forEach(elem => {
        posArr.push(elem.x, elem.y, elem.z)
      })
      // 创建一个和时间序列相对应的位置坐标系列
      const values = new Float32Array(posArr)
      // 创建一个帧动画的关键帧数据，曲线上的位置序列对应一个时间序列
      const posTrack = new THREE.KeyframeTrack(
        `Ball${index}.position`,
        times,
        values
      )
      this.posTracks.push(posTrack)
      if (index === this.destination.length - 1) {
        this.inputAnimate()
      }
    },
    getPosition(longitude, latitude, radius = this.radius) {
      // 经纬度转化为坐标
      // 先将经纬度转化为弧度
      const lg = THREE.Math.degToRad(longitude)
      const lt = THREE.Math.degToRad(latitude)
      // 弧度转为角度 获取x，y，z坐标
      const temp = radius * Math.cos(lt)
      const x = temp * Math.sin(lg)
      const y = radius * Math.sin(lt)
      const z = temp * Math.cos(lg)
      // 返回一个三维坐标点
      return new THREE.Vector3(x, y, z)
    },
    getBezierPoint(v0, v3) {
      // 获取贝塞尔控制点
      // 计算向量夹角 .angleTo以弧度返回该向量与向量v之间的角度
      const angle = (v0.angleTo(v3) * 180) / Math.PI // 0 ~ Math.PI
      // console.log(angle)

      const aLen = angle * 2.5
      const hLen = angle * angle * 50

      const p0 = new THREE.Vector3(0, 0, 0)
      // 法线向量 射线(Ray)
      const rayLine = new THREE.Ray(p0, this.getVCenter(v0.clone(), v3.clone()))
      // 顶点坐标
      // .at获得这一Ray上给定距离处的Vector3
      const vtop = rayLine.at(hLen / rayLine.at(1, vtop).distanceTo(p0), vtop) // 几倍位置
      // console.log(vtop)
      // 控制点坐标
      const v1 = this.getLenVcetor(v0.clone(), vtop, aLen)
      const v2 = this.getLenVcetor(v3.clone(), vtop, aLen)

      return {
        v1: v1,
        v2: v2
      }
    },
    getVCenter(v1, v2) {
      //  求的中点
      // 将v1 v2向量相加
      const v = v1.add(v2)
      // 将该向量除以标量s 这里中点 除以 2
      return v.divideScalar(2)
    },
    getLenVcetor(v1, v2, len) {
      // 计算V1，V2向量固定长度的点
      const v1v2Len = v1.distanceTo(v2)
      // .lerp( v : Vector3, alpha : Float ) 在该向量与传入的向量v之间的线性插值，alpha是沿着线的距离长度。
      // —— alpha = 0 时表示的是当前向量，alpha = 1 时表示的是所传入的向量v
      return v1.lerp(v2, len / v1v2Len)
    },
    inputAnimate() {
      // 插入帧动画
      const duration = 101
      const clip = new THREE.AnimationClip('default', duration, this.posTracks)
      this.mixer = new THREE.AnimationMixer(this.groupBall)
      const AnimationAction = this.mixer.clipAction(clip)
      AnimationAction.timeScale = 30
      AnimationAction.play()
    },
    render() {
      // 渲染
      this.scene.add(this.group)
      this.renderer.render(this.scene, this.camera)
    },
    animate() {
      // 运动
      this.render()
      this.Anima = requestAnimationFrame(this.animate)
      const time = this.clock.getDelta()
      this.group.rotateY((time * Math.PI) / 8)
      // console.log(time)
      this.mixer.update(time)
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
// .webgl-global {
//   width: 100%;
//   height: 100%;
// }
</style>
