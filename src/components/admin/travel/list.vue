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
          prop="time"
          align="center"
          label="日期"
          width="150">
          <template slot-scope="scope">
            {{formatTime(scope.row.time,'yyyy-MM-dd hh:mm')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="标题"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="link"
          label="地址"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="content"
          label="摘要"
          align="center"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="options"
          label="操作"
          align="center"
          width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="editTravel(scope.row._id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteTravel(scope.row._id)">删除</el-button>
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
        :total="totalTravel"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminTravel, travelSearch, travelDelete, travelEditId, travelEdit} from 'api/api'
import {formatDate} from 'common/js/util'
export default {
  data () {
    return {
      searchVal: '',
      tableData: [],
      // 总珍藏数
      totalTravel: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false
    }
  },
  created () {
    this.travelList()
  },
  methods: {
    // 珍藏列表
    travelList (num) {
      adminTravel(num).then((res) => {
        this.tableData = res.data.travel
        this.totalTravel = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 查询列表
    searchList (num) {
      // 当前正在执行查询操作
      this.searchNow = true
      travelSearch(this.searchVal, num).then((res) => {
        if (!this.searchVal) {
          return
        }
        this.tableData = res.data.travel
        this.totalTravel = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 重置列表
    resetList () {
      this.searchVal = ''
      this.searchNow = false
      this.travelList()
    },
    // 分页，总列表与查询列表要分开
    pageChange (num) {
      // 查询列表
      if (this.searchNow) {
        this.searchList(num)
        return
      }
      // 总列表
      this.travelList(num)
    },
    // 删除珍藏
    deleteTravel (id) {
      this.$confirm('此操作将永久删除该珍藏, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        travelDelete(id).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
          this.travelList()
        })
      })
    },
    // 珍藏信息修改
    editTravel (id) {
      travelEditId(id).then((res) => {
        console.log(res.data)
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
