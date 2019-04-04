<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>文章发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="分类">
          <el-select v-model="classifyVal" placeholder="请选择">
            <el-option
              v-for="item in classify"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
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
        <el-form-item label="文章摘要">
          <el-input
            placeholder="请输入文章摘要"
            type="textarea"
            :rows="6">
          </el-input>
        </el-form-item>
        <span class="textarea-info">22 / 150</span>
        <el-form-item label="作者">
          <el-input type="text" placeholder="请输入作者"></el-input>
        </el-form-item>
        <el-form-item label="文章属性">
          <el-row>
            <el-radio-group v-model="radio">
              <el-radio label="原创">原创</el-radio>
              <el-radio label="转载">转载</el-radio>
            </el-radio-group>
          </el-row>
        </el-form-item>
        <el-form-item label="文章来源" v-show="radio === '转载'">
          <el-input type="text" placeholder="请输入文章来源"></el-input>
        </el-form-item>
        <el-form-item label="是否定时发送">
          <el-checkbox
            label="定时发送"
            v-model="isTiming">
            定时发送
          </el-checkbox>
        </el-form-item>
        <el-form-item label="定时发送" v-show="isTiming">
          <el-date-picker
            clearable
            format="yyyy-MM-dd HH:mm"
            v-model="time"
            :editable="true"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
        </el-form-item>
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
      classifyVal: '',
      classify: [
        {value: '选项1', label: 'Vue'},
        {value: '选项2', label: 'Js'},
        {value: '选项3', label: 'Css'}
      ],
      radio: '原创',
      time: '',
      isTiming: false,
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
