<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>文章发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium" :rules="rules" :model="formParams" ref="publishForm">
        <el-form-item label="标题" prop="title">
          <el-input placeholder="请输入标题" v-model="formParams.title"></el-input>
        </el-form-item>
        <el-form-item label="分类" prop="classifyVal">
          <el-select v-model="formParams.classifyVal" placeholder="请选择">
            <el-option
              v-for="item in classifyList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
          <el-button type="primary" style="margin-left:10px" @click="showClassDia">新 增</el-button>
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
        <el-form-item label="引语" prop="preface">
          <el-input
            placeholder="请输入引语"
            v-model="formParams.preface">
          </el-input>
        </el-form-item>
        <el-form-item label="文章摘要" prop="abstract">
          <el-input
            placeholder="请输入文章摘要"
            type="textarea"
            :rows="6"
            maxlength="150"
            v-model="formParams.abstract">
          </el-input>
        </el-form-item>
        <span class="textarea-info">{{formParams.abstract.length}} / 150</span>
        <el-form-item label="作者" prop="writer">
          <el-input type="text" placeholder="请输入作者" v-model="formParams.writer"></el-input>
        </el-form-item>
        <el-form-item label="文章属性" prop="radio">
          <el-row>
            <el-radio-group v-model="formParams.radio">
              <el-radio label="原创">原创</el-radio>
              <el-radio label="转载">转载</el-radio>
            </el-radio-group>
          </el-row>
        </el-form-item>
        <el-form-item label="文章来源" v-show="formParams.radio === '转载'" prop="link">
          <el-input type="text" placeholder="请输入文章来源" v-model="formParams.link"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="showDia">预 览</el-button>
          <el-button plain @click="publish">发 布</el-button>
        </el-form-item>
      </el-form>
      <!-- 预览 -->
      <el-dialog
        class="article"
        :visible.sync="dialogVisible"
        center>
        <h2 class="title">{{formParams.title}}</h2>
        <p class="info-wrap">
          <span>标签：{{formParams.classifyVal}}</span>
          <span>时间：{{formatTime(formParams.time, 'yyyy-MM-dd hh:mm')}}</span>
          <span>作者：{{formParams.writer}}</span>
          <span>备注：{{formParams.radio}}</span>
        </p>
        <div v-html="formParams.content"></div>
      </el-dialog>
      <el-dialog
        class="article"
        :visible.sync="classDia"
        center>
        <h2 class="title">添加文章分类</h2>
        <el-form :inline="true">
          <el-form-item label="分类名">
            <el-input placeholder="请输入分类名" v-model="classify"></el-input>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="addClassify">添加</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/template/tinymce'
import {formatDate} from 'common/js/util'
import {notesEdit, classAdd, classList} from 'api/api'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  data () {
    return {
      formParams: {
        'title': '',
        'classifyVal': '',
        'content': '',
        'preface': '',
        'abstract': '',
        'writer': '',
        'radio': '原创',
        'link': '',
        'time': new Date()
      },
      rules: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        classifyVal: [
          { required: true, message: '请选择分类', trigger: 'change' }
        ],
        content: [
          { required: true, message: '请选择内容', trigger: 'change' }
        ],
        preface: [
          { required: true, message: '请输入引语', trigger: 'blur' }
        ],
        abstract: [
          { required: true, message: '请输入摘要', trigger: 'blur' }
        ],
        writer: [
          { required: true, message: '请输入作者', trigger: 'blur' }
        ]
      },
      classify: '',
      classifyList: [],
      hasPublish: false,
      dialogVisible: false,
      classDia: false
    }
  },
  created () {
    // 获取文章分类
    this.getClassify()
  },
  methods: {
    // 预览
    showDia () {
      if (!this.formParams.title) {
        return
      }
      this.dialogVisible = true
    },
    // 添加分类弹窗
    showClassDia () {
      this.classDia = true
    },
    // 分类获取
    getClassify () {
      classList().then((res) => {
        // 无分类
        if (!res.data.length) {
          return
        }
        // 避免添加重复push
        this.classifyList = []
        // 有则将其处理为下拉框可用的格式
        for (let i = 0; i < res.data.length; i++) {
          this.classifyList.push({
            value: res.data[i].name,
            label: res.data[i].name
          })
        }
      })
    },
    // 添加分类
    addClassify () {
      if (!this.classify) {
        this.$message.error('请输入分类名')
      }
      classAdd(this.classify).then((res) => {
        if (res.data.code === 0) {
          // 添加成功
          this.$message({
            message: res.data.message,
            type: 'success'
          })
          this.classify = ''
          // 再次获取分类
          this.getClassify()
        } else {
          // 添加失败
          this.$message.error(res.data.message)
        }
      })
    },
    // 发布
    publish () {
      this.$refs['publishForm'].validate((valid) => {
        if (valid) {
          notesEdit(this.formParams).then((res) => {
            if (res.data.code === 0) {
              // 发布成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 注册表单重置
              this.$refs['publishForm'].resetFields()
              // 富文本编辑器清空
              this.$refs['tinymce'].setContent('')
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    },
    // 时间格式化
    formatTime (time, formate) {
      return formatDate(time, formate)
    }
  },
  components: {
    tinymce
  },
  watch: {
    'formParams.content': {
      handler: (val, oldVal) => {
      },
      // 深度观察
      deep: true
    }
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
  .article
    .title
      font-weight: 700
      font-size: $font-title
      text-align: center
      margin-bottom: 25px
    .info-wrap
      margin-bottom: 25px
      color: $home-gray
      font-size: $font-small
      text-align: center
      span
        margin-right: 20px
</style>
