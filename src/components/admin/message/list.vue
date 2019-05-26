<template>
  <div class="panel-wrap">
    <!-- 搜索 -->
    <div class="search-wrap">
      <el-form :inline="true" size="small">
        <el-form-item label="关键字">
          <el-input placeholder="请输入关键字" v-model="searchVal"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="searchList">查询</el-button>
          <el-button plain @click="resetList">重置</el-button>
        </el-form-item>
      </el-form>
    </div>
    <!-- 表格 -->
    <div class="table-wrap">
      <el-table
        :data="tableData"
        border>
        <el-table-column
          prop="_id"
          align="center"
          label="编号"
          width="220">
        </el-table-column>
        <el-table-column
          prop="leavetime"
          label="留言日期"
          align="center"
          width="150">
          <template slot-scope="scope">
            {{formatTime(scope.row.leavetime,'yyyy-MM-dd hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          align="center"
          label="用户名"
          width="120">
        </el-table-column>
        <el-table-column
          prop="nickname"
          align="center"
          label="昵称"
          width="120">
        </el-table-column>
        <el-table-column
          prop="avatar"
          label="头像"
          align="center"
          width="100">
          <template slot-scope="scope">
            <img :src="scope.row.avatar" style="width: 40px;height: 40px;border-radius: 50%">
          </template>
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
          width="120">
            <template slot-scope="scope">
              <el-button size="mini" type="danger" @click="deleteMessage(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
    </div>
    <!-- 分页 -->
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageLimit"
        :total="totalMessage"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminMessage, messageSearch, messageDelete} from 'api/api'
import {formatDate} from 'common/js/util'
export default {
  data () {
    return {
      searchVal: '',
      tableData: [],
      // 总留言数
      totalMessage: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false
    }
  },
  created () {
    this.messageList()
  },
  methods: {
    // 留言列表
    messageList (num) {
      adminMessage(num).then((res) => {
        this.tableData = res.data.message
        this.totalMessage = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 查询列表
    searchList (num) {
      // 当前正在执行查询操作
      this.searchNow = true
      messageSearch(this.searchVal, num).then((res) => {
        if (!this.searchVal) {
          return
        }
        this.tableData = res.data.message
        this.totalMessage = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 重置列表
    resetList () {
      this.searchVal = ''
      this.searchNow = false
      this.messageList()
    },
    // 分页，总列表与查询列表要分开
    pageChange (num) {
      // 查询列表
      if (this.searchNow) {
        this.searchList(num)
        return
      }
      // 总列表
      this.messageList(num)
    },
    // 删除留言
    deleteMessage (id) {
      this.$confirm('此操作将永久删除该留言, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        messageDelete(id).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
          this.messageList()
        })
      })
    },
    // 时间格式化
    formatTime (time, formate) {
      return formatDate(time, formate)
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

</style>
