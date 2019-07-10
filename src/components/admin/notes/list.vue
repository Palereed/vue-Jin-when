<template>
  <div class="panel-wrap">
    <!-- 搜索 -->
    <div class="search-wrap">
      <el-form :inline="true" size="small">
        <el-form-item label="关键字">
          <el-input placeholder="请输入关键字" v-model="searchVal"></el-input>
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
          label="发布时间"
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
          prop="writer"
          label="作者"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="classifyVal"
          label="分类"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="radio"
          label="备注"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="watch"
          label="浏览量"
          align="center"
          width="100">
        </el-table-column>
        <el-table-column
          prop="options"
          label="操作"
          align="center"
          width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="editNote(scope.row._id)">编辑</el-button>
              <el-button size="mini" type="danger" @click="deleteNote(scope.row._id)">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="dialogVisible"
        width="760px"
        class="edit-pop"
        center>
        <h2 class="title">文章信息修改</h2>
        <el-form label-width="90px" ref="editForm" label-position="left" class="edit-form" :model="noteInfoForm" :rules="rulesNoteInfo" size="medium">
          <el-form-item label="标题" prop="title">
            <el-input placeholder="请输入标题" v-model="noteInfoForm.title"></el-input>
          </el-form-item>
          <el-form-item label="分类" prop="classifyVal">
          <el-select v-model="noteInfoForm.classifyVal" placeholder="请选择">
            <el-option
              v-for="item in classifyList"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
          <el-form-item label="正文内容" prop="content">
            <!-- 富文本 -->
            <tinymce
              ref="tinymce"
              :isToken="true"
              :withCredentials="true"
              placeholder="请输入正文内容"
              :projectId="1"
              v-model="noteInfoForm.content">
            </tinymce>
          </el-form-item>
          <el-form-item label="引语" prop="preface">
            <el-input
              placeholder="请输入引语"
              v-model="noteInfoForm.preface">
            </el-input>
          </el-form-item>
          <el-form-item label="文章摘要" prop="abstract">
            <el-input
              placeholder="请输入文章摘要"
              type="textarea"
              :rows="6"
              maxlength="150"
              v-model="noteInfoForm.abstract">
            </el-input>
          </el-form-item>
          <span class="textarea-info">{{noteInfoForm.abstract.length}} / 150</span>
          <el-form-item label="作者" prop="writer">
            <el-input type="text" placeholder="请输入作者" v-model="noteInfoForm.writer"></el-input>
          </el-form-item>
          <el-form-item label="文章属性" prop="radio">
            <el-row>
              <el-radio-group v-model="noteInfoForm.radio">
                <el-radio label="原创">原创</el-radio>
                <el-radio label="转载">转载</el-radio>
              </el-radio-group>
            </el-row>
          </el-form-item>
          <el-form-item label="文章来源" v-show="noteInfoForm.radio === '转载'" prop="link">
            <el-input type="text" placeholder="请输入文章来源" v-model="noteInfoForm.link"></el-input>
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
        :total="totalNote"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminNote, noteSearch, noteDelete, noteEditId, noteEdit, classList} from 'api/api'
import {formatDate} from 'common/js/util'
import tinymce from '@/components/template/tinymce'
window.tinymce.baseURL = '/static/tinymce'
window.tinymce.suffix = '.min'
export default {
  data () {
    return {
      searchVal: '',
      classifyVal: '',
      classify: [
        {label: 'Vue', value: 'Vue'},
        {label: 'Js', value: 'Js'},
        {label: 'Css', value: 'Css'}
      ],
      tableData: [],
      // 总文章数
      totalNote: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false,
      // 文章修改弹窗
      dialogVisible: false,
      // 文章信息
      noteInfoForm: {
        id: '',
        title: '',
        classifyVal: '',
        content: '',
        preface: '',
        abstract: '',
        writer: '',
        radio: '原创',
        link: ''
      },
      classifyList: [],
      rulesNoteInfo: {
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
      }
    }
  },
  created () {
    this.noteList()
    // 获取文章分类
    this.getClassify()
  },
  methods: {
    // 文章列表
    noteList (num) {
      adminNote(num).then((res) => {
        this.tableData = res.data.note
        this.totalNote = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 查询列表
    searchList (num) {
      // 当前正在执行查询操作
      this.searchNow = true
      noteSearch(this.searchVal, this.classifyVal, num).then((res) => {
        if (!this.searchVal && !this.classifyVal) {
          return
        }
        this.tableData = res.data.note
        this.totalNote = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 重置列表
    resetList () {
      this.searchVal = ''
      this.searchNow = false
      this.classifyVal = ''
      this.noteList()
    },
    // 分页，总列表与查询列表要分开
    pageChange (num) {
      // 查询列表
      if (this.searchNow) {
        this.searchList(num)
        return
      }
      // 总列表
      this.noteList(num)
    },
    // 删除文章
    deleteNote (id) {
      this.$confirm('此操作将永久删除该文章, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        noteDelete(id).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
          this.noteList()
        })
      })
    },
    // 文章信息修改
    editNote (id) {
      noteEditId(id).then((res) => {
        this.dialogVisible = true
        this.noteInfoForm.id = res.data[0]._id
        this.noteInfoForm.title = res.data[0].title
        this.noteInfoForm.classifyVal = res.data[0].classifyVal
        this.noteInfoForm.content = res.data[0].content
        this.noteInfoForm.preface = res.data[0].preface
        this.noteInfoForm.abstract = res.data[0].abstract
        this.noteInfoForm.writer = res.data[0].writer
        this.noteInfoForm.radio = res.data[0].radio
        this.noteInfoForm.link = res.data[0].link
      })
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
    // 保存
    saveEdit () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          noteEdit(this.noteInfoForm).then((res) => {
            if (res.data.code === 0) {
              // 修改成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 关闭弹窗
              setTimeout(() => {
                this.dialogVisible = false
                this.noteList()
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
      .textarea-info
        position: relative
        float: right
        margin: -45px 20px 0 0
        font-size: 12px
        color: $home-gray
</style>
