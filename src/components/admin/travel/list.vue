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
          width="120">
          <template slot-scope="scope">
            {{formatTime(scope.row.time,'yyyy-MM-dd')}}
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
      <el-dialog
        :visible.sync="dialogVisible"
        width="760px"
        class="edit-pop"
        center>
        <h2 class="title">珍藏信息修改</h2>
        <el-form label-width="90px" ref="editForm" label-position="left" class="edit-form" :model="travelInfoForm" :rules="rulesTravelInfo" size="medium">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="travelInfoForm.title"></el-input>
          </el-form-item>
          <el-form-item label="地址" prop="link">
            <el-input placeholder="请输入珍藏地址" v-model="travelInfoForm.link"></el-input>
          </el-form-item>
          <el-form-item label="珍藏摘要" prop="content">
            <el-input
              placeholder="请输入珍藏摘要"
              type="textarea"
              :rows="6"
              v-model="travelInfoForm.content">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-button plain @click="saveEdit">保存</el-button>
          </el-form-item>
        </el-form>
      </el-dialog>
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
      searchVal: '',
      tableData: [],
      // 总珍藏数
      totalTravel: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false,
      // 珍藏修改弹窗
      dialogVisible: false,
      // 珍藏信息
      travelInfoForm: {
        id: '',
        title: '',
        link: '',
        content: ''
      },
      rulesTravelInfo: {
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
        this.dialogVisible = true
        this.travelInfoForm.id = res.data[0]._id
        this.travelInfoForm.title = res.data[0].title
        this.travelInfoForm.link = res.data[0].link
        this.travelInfoForm.content = res.data[0].content
      })
    },
    // 保存
    saveEdit () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          travelEdit(this.travelInfoForm).then((res) => {
            if (res.data.code === 0) {
              // 修改成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 关闭弹窗
              setTimeout(() => {
                this.dialogVisible = false
                this.travelList()
              }, 500)
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
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .edit-pop
    .title
      font-weight: 700
      font-size: $font-title
      text-align: center
      margin-bottom: 40px
    .edit-form
      padding: 0 80px
</style>
