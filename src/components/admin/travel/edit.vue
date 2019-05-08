<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>珍藏发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium" :rules="rules" :model="formParams" ref="publishForm">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入标题" v-model="formParams.title"></el-input>
        </el-form-item>
        <el-form-item label="地址" prop="link">
          <el-input placeholder="请输入珍藏地址" v-model="formParams.link"></el-input>
        </el-form-item>
        <el-form-item label="珍藏摘要" prop="content">
          <el-input
            placeholder="请输入珍藏摘要"
            type="textarea"
            :rows="6"
            v-model="formParams.content">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain @click="publish">发 布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
import {travelsEdit} from 'api/api'
export default {
  data () {
    let validateLink = (rule, value, callback) => {
      let reg = /[a-zA-z]+:\/\/[^\s]*/
      if (value === '') {
        callback(new Error('请输入地址'))
      } else if (!reg.test(value)) {
        callback(new Error('请输入正确的域名(必须以http或https打头)'))
      } else {
        callback()
      }
    }
    return {
      formParams: {
        'title': '',
        'link': '',
        'content': '',
        'time': new Date()
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        link: [
          { required: true, validator: validateLink, trigger: 'blur' }
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
          travelsEdit(this.formParams).then((res) => {
            if (res.data.code === 0) {
              // 发布成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 表单重置
              this.$refs['publishForm'].resetFields()
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
</style>
