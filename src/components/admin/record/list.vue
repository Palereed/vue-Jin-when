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
          label="日期"
          align="center"
          width="120">
          <template slot-scope="scope">
            {{formatTime(scope.row.time,'yyyy-MM-dd')}}
          </template>
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="spirit"
          align="center"
          label="心情"
          width="100">
        </el-table-column>
        <el-table-column
          prop="weather"
          align="center"
          label="天气"
          width="100">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="内容"
          show-overflow-tooltip>
        </el-table-column>
        <el-table-column
          prop="options"
          label="操作"
          align="center"
          width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="editRecord(scope.row._id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteRecord(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="dialogVisible"
        width="760px"
        class="edit-pop"
        center>
        <h2 class="title">独白信息修改</h2>
        <el-form label-width="90px" ref="editForm" label-position="left" class="edit-form" :model="recordInfoForm" :rules="rulesRecordInfo" size="medium">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="recordInfoForm.title"></el-input>
          </el-form-item>
          <el-form-item label="心情" prop="spirit">
            <el-input placeholder="请输入心情" v-model="recordInfoForm.spirit"></el-input>
          </el-form-item>
          <el-form-item label="天气" prop="weather">
            <el-input placeholder="请输入天气" v-model="recordInfoForm.weather"></el-input>
          </el-form-item>
          <el-form-item label="正文内容" prop="content">
            <!-- 富文本 -->
            <tinymce
              ref="tinymce"
              :isToken="true"
              :withCredentials="true"
              placeholder="请输入正文内容"
              :projectId="1"
              v-model="recordInfoForm.content">
            </tinymce>
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
        :total="totalRecord"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminRecord, recordSearch, recordDelete, recordEditId, recordEdit} from 'api/api'
import {formatDate} from 'common/js/util'
import tinymce from '@/components/template/tinymce'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  data () {
    return {
      searchVal: '',
      tableData: [],
      // 总独白数
      totalRecord: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false,
      // 独白修改弹窗
      dialogVisible: false,
      // 独白信息
      recordInfoForm: {
        id: '',
        title: '',
        spirit: '',
        weather: '',
        content: ''
      },
      rulesRecordInfo: {
        title: [
          { required: true, message: '请输入标题', trigger: 'blur' }
        ],
        spirit: [
          { required: true, message: '请输入心情', trigger: 'blur' }
        ],
        weather: [
          { required: true, message: '请输入天气', trigger: 'blur' }
        ],
        content: [
          { required: true, message: '请输入内容', trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.recordList()
  },
  methods: {
    // 独白列表
    recordList (num) {
      adminRecord(num).then((res) => {
        this.tableData = res.data.record
        this.totalRecord = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 查询列表
    searchList (num) {
      // 当前正在执行查询操作
      this.searchNow = true
      recordSearch(this.searchVal, num).then((res) => {
        if (!this.searchVal) {
          return
        }
        this.tableData = res.data.record
        this.totalRecord = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 重置列表
    resetList () {
      this.searchVal = ''
      this.searchNow = false
      this.recordList()
    },
    // 分页，总列表与查询列表要分开
    pageChange (num) {
      // 查询列表
      if (this.searchNow) {
        this.searchList(num)
        return
      }
      // 总列表
      this.recordList(num)
    },
    // 删除独白
    deleteRecord (id) {
      this.$confirm('此操作将永久删除该独白, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        recordDelete(id).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
          this.recordList()
        })
      })
    },
    // 独白信息修改
    editRecord (id) {
      recordEditId(id).then((res) => {
        this.dialogVisible = true
        this.recordInfoForm.id = res.data[0]._id
        this.recordInfoForm.title = res.data[0].title
        this.recordInfoForm.spirit = res.data[0].spirit
        this.recordInfoForm.weather = res.data[0].weather
        this.recordInfoForm.content = res.data[0].content
      })
    },
    // 保存
    saveEdit () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          recordEdit(this.recordInfoForm).then((res) => {
            if (res.data.code === 0) {
              // 修改成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 关闭弹窗
              setTimeout(() => {
                this.dialogVisible = false
                this.recordList()
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
  },
  components: {
    tinymce
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
