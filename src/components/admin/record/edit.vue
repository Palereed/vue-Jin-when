<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>独白发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="心情">
          <el-input placeholder="请输入心情"></el-input>
        </el-form-item>
        <el-form-item label="天气">
          <el-input placeholder="请输入天气"></el-input>
        </el-form-item>
        <el-form-item label="正文内容">
          <!-- 富文本 -->
          <tinymce
            ref="tinymce"
            :isToken="true"
            :withCredentials="true"
            placeholder="请输入正文内容"
            :projectId="1"
            v-model="content">
          </tinymce>
        </el-form-item>
        <span class="textarea-info">22 / 150</span>
        <el-form-item>
          <el-button type="primary" @click="showDia">预 览</el-button>
          <el-button plain>发 布</el-button>
        </el-form-item>
      </el-form>
      <!-- 预览 -->
      <el-dialog
        class="article"
        :visible.sync="dialogVisible"
        center>
        <div v-html="content"></div>
      </el-dialog>
    </div>
  </div>
</template>

<script>
import tinymce from '@/components/template/tinymce'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  data () {
    return {
      content: '',
      dialogVisible: false
    }
  },
  methods: {
    showDia () {
      this.dialogVisible = true
    }
  },
  components: {
    tinymce
  },
  watch: {
    content (val) {
      console.log(val)
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
</style>
