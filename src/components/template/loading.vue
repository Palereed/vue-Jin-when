<template>
  <div class="no-data" v-if="!data.length">
    <i class="el-icon-loading"></i>
  </div>
</template>

<script>
export default {
  props: ['data']
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .no-data
    text-align: center
    font-size: $font-title
    height: calc(100vh - 194px)
    i
      position: relative
      top: 40%
  .mobile
    .no-data
      font-size: $mobileFont-title
      height: calc(100vh - 2.7rem)
</style>
