<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>独白发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium" :rules="rules" :model="formParams" ref="publishForm">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入标题" v-model="formParams.title"></el-input>
        </el-form-item>
        <el-form-item label="心情" prop="spirit">
          <el-input placeholder="请输入心情" v-model="formParams.spirit"></el-input>
        </el-form-item>
        <el-form-item label="天气" prop="weather">
          <el-input placeholder="请输入天气" v-model="formParams.weather"></el-input>
        </el-form-item>
        <el-form-item label="正文内容" prop="content">
          <!-- 富文本 -->
          <tinymce
            ref="tinymce"
            :isToken="true"
            :withCredentials="true"
            placeholder="请输入正文内容"
            :projectId="1"
            v-model="formParams.content">
          </tinymce>
        </el-form-item>
        <span class="textarea-info">22 / 150</span>
        <el-form-item>
          <el-button plain @click="publish">发 布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {recordsEdit} from 'api/api'
import tinymce from '@/components/template/tinymce'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  data () {
    return {
      formParams: {
        'title': '',
        'spirit': '',
        'weather': '',
        'content': '',
        'time': new Date()
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        spirit: [
          { required: true, message: '请选择心情', trigger: 'change' }
        ],
        weather: [
          { required: true, message: '请输入天气', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    publish () {
      this.$refs['publishForm'].validate((valid) => {
        if (valid) {
          recordsEdit(this.formParams).then((res) => {
            if (res.data.code === 0) {
              // 发布成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 表单重置
              this.$refs['publishForm'].resetFields()
              // 富文本编辑器清空
              this.$refs['tinymce'].setContent('')
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    }
  },
  components: {
    tinymce
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .textarea-info
    position: relative
    float: right
    margin: -45px 20px 0 0
    font-size: 12px
    color: $home-gray
</style>
