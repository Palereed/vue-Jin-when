<template>
  <div class="panel-wrap">
    <!-- 搜索 -->
    <div class="search-wrap">
      <el-form :inline="true" size="small">
        <el-form-item label="关键字">
          <el-input placeholder="请输入关键字" v-model="searchVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">查询</el-button>
          <el-button plain @click="resetSearch">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table-wrap">
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="id"
          align="center"
          label="编号"
          width="220">
        </el-table-column>
        <el-table-column
          prop="time"
          label="留言日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="用户名">
        </el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          label="昵称">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="留言内容">
        </el-table-column>
        <el-table-column
          prop="options"
          label="操作"
          align="center"
          width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="editUser(scope.row.id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      searchVal: '',
      tableData: [{
        id: '222222',
        time: '2019-08-11',
        username: '544989630',
        nickname: '蒹葭',
        content: '关于Js的一些demo关于Js的一些demo关于Js的一些demo'
      }]
    }
  },
  methods: {
    editUser (id) {
      console.log(id)
    },
    deleteUser (id) {
      console.log(id)
    },
    resetSearch () {
      this.searchVal = ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

</style>
