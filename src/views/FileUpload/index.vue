<!--
 * @Description:
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2021-02-03 10:10:15
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-02-09 11:28:41
-->
<template>
  <div>
    <input type="file" @change="handleFileChange">
    <el-button
      type="primary"
      :disabled="status !== Status.wait"
      @click="handleUpload"
    >上传</el-button>
    <el-button
      v-if="status === Status.pause"
      @click="handleResume"
    >恢复</el-button>
    <el-button
      v-else
      :disabled="status !== Status.uploading || !container.hash"
      @click="handlePause"
    >暂停</el-button>

    <div>
      <div>计算文件 hash</div>
      <el-progress :percentage="hashPercentage" />
      <div>总进度</div>
      <el-progress :percentage="fakeUploadPercentage" />
    </div>
    <el-table :data="data">
      <el-table-column
        prop="hash"
        label="切片hash"
        align="center"
      />
      <el-table-column label="大小(KB)" align="center" width="120">
        <template v-slot="{ row }">
          {{ row.size | transformByte }}
        </template>
      </el-table-column>
      <el-table-column label="进度" align="center">
        <template v-slot="{ row }">
          <el-progress
            :percentage="row.percentage"
            color="#909399"
          />
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
import axios from 'axios'
import { upload, mergeFiles, verifyUpload } from 'src/api/upload'
const SIZE = 1024 * 1024 // 切片大小

const Status = {
  wait: 'wait',
  pause: 'pause',
  uploading: 'uploading'
}
export default {
  name: 'UploadFile',
  filters: {
    transformByte(val) {
      return Number((val / 1024).toFixed(0))
    }
  },
  data() {
    return {
      Status,
      container: {
        file: null,
        hash: '',
        worker: null
      },
      requestList: [],
      data: [],
      hashPercentage: 0,
      fakeUploadPercentage: 0,
      status: Status.wait,
      cancelSources: []
    }
  },
  computed: {
    uploadDisabled() {
      return (
        !this.container.file ||
        [Status.pause, Status.uploading].includes(this.status)
      )
    },
    uploadPercentage() {
      if (!this.container.file || !this.data.length) {
        return 0
      }
      const loaded = this.data.map(item => item.size * item.percentage).reduce((acc, cur) => acc + cur)
      return parseInt((loaded / this.container.file.size).toFixed(2))
    }
  },
  watch: {
    uploadPercentage(now) {
      if (now > this.fakeUploadPercentage) {
        this.fakeUploadPercentage = now
      }
    }
  },
  methods: {
    handlePause() {
      this.status = Status.pause
      this.resetData()
    },
    resetData() {
      this.cancelSources.forEach(source => {
        source.cancel('取消切片上传')
      })

      // console.log(this.data)
      // this.requestList.forEach(xhr => xhr?.abort())
      this.requestList = []
      if (this.container.worker) {
        this.container.worker.onmessage = null
      }
    },
    async handleResume() {
      this.status = Status.uploading
      const { uploadedList } = await this.verifyUpload(
        this.container.file.name,
        this.container.hash
      )
      await this.uploadChunks(uploadedList)
    },
    handleFileChange(e) {
      const [file] = e.target.files
      if (!file) return
      this.resetData()
      Object.assign(this.$data, this.$options.data())
      this.container.file = file
    },
    async handleUpload() {
      if (!this.container.file) {
        return
      }
      this.status = Status.uploading
      const fileChunkList = this.createFileChunk(this.container.file)
      this.container.hash = await this.calculateHash(fileChunkList)

      // 校验文件是否已上传
      const { shouldUpload, uploadedList } = await this.verifyUpload(this.container.file.name, this.container.hash)
      if (!shouldUpload) {
        this.fakeUploadPercentage = 100
        this.$message({
          type: 'success',
          message: '秒传：上传成功!'
        })
        this.status = Status.wait
        return
      }
      this.data = fileChunkList.map(({ file }, index) => ({
        chunk: file,
        index,
        fileHash: this.container.hash,
        hash: this.container.hash + '-' + index, // 文件名+数组下标 作为hash值
        size: file.size,
        percentage: uploadedList.includes(index) ? 100 : 0
      }))

      await this.uploadChunks(uploadedList)
    },
    createFileChunk(file, size = SIZE) {
      // 生成文件切片
      const fileChunkList = []
      let cur = 0
      while (cur < file.size) {
        fileChunkList.push({
          file: file.slice(cur, cur + size)
        })
        cur += size
      }
      return fileChunkList
    },
    async uploadChunks(uploadedList) {
      // 上传切片
      this.cancelSources = []
      const filename = this.container.file.name
      const requestList = this.data
        .filter(({ hash }) => !uploadedList.includes(hash))
        .map(({ chunk, hash, index }) => {
          const formData = new FormData()
          formData.append('chunk', chunk)
          formData.append('hash', hash)
          formData.append('fileHash', this.container.hash)
          formData.append('filename', filename)
          return {
            formData,
            index
          }
        }).map(async({ formData, index }) => {
          const cancelToken = axios.CancelToken
          const source = cancelToken.source()
          this.cancelSources.push(source)
          // console.log(source.token)
          return upload({
            data: formData,
            cancelToken: source.token,
            onUploadProgress: this.createProgressHandler(this.data[index]),
            requestList: this.requestList
          })
        })
      try {
        await Promise.all(requestList)
      } catch (error) {
        console.log(error)
        return
      }

      // // 合并切片
      // 之前上传的切片数量 + 本次上传的切片数量 = 所有切片数量时
      // 合并切片
      if (uploadedList.length + requestList.length === this.data.length) {
        await this.mergeRequest()
      }
    },
    async mergeRequest() {
      // 合并切片
      console.log('合并切片')
      await mergeFiles({
        filename: this.container.file.name,
        fileHash: this.container.hash,
        size: SIZE
      })
      this.$message.success('上传成功')
      this.status = Status.wait
    },
    // 生成文件 hash（web-worker）
    calculateHash(fileChunkList) {
      return new Promise(resolve => {
        this.container.worker = new Worker('/hash.js')
        this.container.worker.postMessage({ fileChunkList })
        this.container.worker.onmessage = e => {
          const { percentage, hash } = e.data
          this.hashPercentage = percentage
          if (hash) {
            resolve(hash)
          }
        }
      })
    },
    // 创建进度条
    createProgressHandler(item) {
      return e => {
        item.percentage = parseInt(String((e.loaded / e.total) * 100))
      }
    },
    async verifyUpload(filename, fileHash) {
      const data = await verifyUpload({
        filename,
        fileHash
      })
      return data
    }
  }
}
</script>

<style lang="scss" scoped>

</style>
