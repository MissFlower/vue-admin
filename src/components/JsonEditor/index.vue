<!--
 * @Description: JsonEditor组件
 * @Version: 0.1.0
 * @Author: AiDongYang
 * @Date: 2020-10-15 17:44:48
 * @LastEditors: AiDongYang
 * @LastEditTime: 2021-01-04 12:02:25
-->
<template>
  <div id="json-editor">
    <textarea ref="textarea" />
  </div>
</template>

<script>
import CodeMirror from 'codemirror'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/lib/codemirror.css'
import 'codemirror/theme/monokai.css'
require('script-loader!jsonlint')
import 'codemirror/mode/javascript/javascript'
import 'codemirror/addon/lint/lint'
import 'codemirror/addon/lint/lint.css'
import 'codemirror/addon/lint/json-lint'
// 光标行背景高亮，配置里面也需要styleActiveLine设置为true
import 'codemirror/addon/selection/active-line'
// 及时自动更新，配置里面也需要设置autoRefresh为true
import 'codemirror/addon/display/autorefresh'
// placeholder
import 'codemirror/addon/display/placeholder'
// 折叠
import 'codemirror/addon/fold/foldgutter.css'
import 'codemirror/addon/fold/foldcode'
import 'codemirror/addon/fold/foldgutter'
import 'codemirror/addon/fold/brace-fold'
import 'codemirror/addon/fold/comment-fold'
// 滚动条
import 'codemirror/addon/scroll/simplescrollbars.css'
import 'codemirror/addon/scroll/simplescrollbars'

export default {
  name: 'JsonEditor',
  /* eslint-disable vue/require-prop-types */
  props: {
    value: {
      type: [String, Number, Array, Object],
      default: ''
    },
    placeholder: {
      type: String,
      default: ''
    }
  },
  data() {
    return {
      jsonEditor: false
    }
  },
  watch: {
    value(value) {
      const editorValue = this.jsonEditor.getValue()
      if (value && value !== editorValue) {
        this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
      }
      this.jsonEditor.setOption('lint', !!value)
    }
  },
  mounted() {
    this.jsonEditor = CodeMirror.fromTextArea(this.$refs.textarea, {
      lineNumbers: true, // 行号
      mode: 'application/json', // 编码类型
      gutters: ['CodeMirror-linenumbers', 'CodeMirror-foldgutter', 'CodeMirror-lint-markers'], // 间距
      theme: 'monokai', // 主题
      lint: false, // jsonlint校验
      styleActiveLine: true, // 当前行高亮
      autoRefresh: true, // 自动更新
      foldGutter: true, // 折行
      lineWrapping: true, // 是否应滚动或换行以排长行
      placeholder: this.placeholder,
      scrollbarStyle: 'simple' // 滚动条样式
    })

    this.value && this.jsonEditor.setValue(JSON.stringify(this.value, null, 2))
    this.jsonEditor.on('change', cm => {
      this.$emit('changed', cm.getValue())
      this.$emit('input', cm.getValue())
    })
  },
  methods: {
    getValue() {
      return this.jsonEditor.getValue()
    }
  }
}
</script>

<style lang="scss" scoped>
#json-editor {
  position: relative;
  line-height: 20px;

  ::v-deep {
    .CodeMirror {
      height: 100%;
      font-family: Monaco, Menlo, "Ubuntu Mono", Consolas, source-code-pro, monospace;
    }

    .CodeMirror-scroll {
      height: 100%;
    }

    .CodeMirror-scroll,
    .CodeMirror-sizer,
    .CodeMirror-gutter,
    .CodeMirror-gutters,
    .CodeMirror-linenumber {
      box-sizing: content-box !important;
    }

    .CodeMirror-placeholder {
      padding: 0 9px;
      font-size: 14px;
      color: #999;
    }

    // .cm-s-monokai.CodeMirror {
    //   background: #FFFFFF;
    // }

    .cm-s-monokai .CodeMirror-linenumber {
      color: #4d4d4c;
    }

    // .cm-s-monokai .CodeMirror-activeline-background {
    //   background: #EFEFEF;
    // }

    // .CodeMirror-activeline-gutter {
    //   background: #dcdcdc;
    // }

    .cm-s-monokai span.cm-string {
      color: #718c00;
    }

    .cm-s-monokai span.cm-property {
      color: #c82829;
    }

    .cm-s-monokai span.cm-number {
      color: #f5871f;
    }
  }
}
</style>
<style lang="scss">
.CodeMirror-lint-tooltip {
  z-index: 11111;
}
</style>
