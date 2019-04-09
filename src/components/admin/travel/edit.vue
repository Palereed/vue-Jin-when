<template>
  <div class="panel-wrap">
    <!-- 频道名 -->
    <div class="panel-name">
      <span>珍藏发布</span>
    </div>
    <!-- 表单 -->
    <div class="form-wrap">
      <el-form label-width="100px" size="medium">
        <el-form-item label="标题">
          <el-input placeholder="请输入标题"></el-input>
        </el-form-item>
        <el-form-item label="地址">
          <el-input placeholder="请输入珍藏地址"></el-input>
        </el-form-item>
        <el-form-item label="珍藏摘要">
          <el-input
            placeholder="请输入珍藏摘要"
            type="textarea"
            :rows="6">
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button plain>发 布</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
    }
  },
  methods: {
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
</style>
