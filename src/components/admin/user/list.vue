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
          prop="nickname"
          align="center"
          label="昵称"
          width="160">
        </el-table-column>
        <el-table-column
          align="center"
          label="身份"
          width="80">
          <template slot-scope="scope">
            <p v-if="scope.row.isAdmin">管理员</p>
            <p v-else>访客</p>
          </template>
        </el-table-column>
        <el-table-column
          prop="username"
          label="账号"
          align="center">
        </el-table-column>
        <el-table-column
          prop="userpass"
          label="密码"
          align="center">
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
          prop="safepass"
          label="密保"
          align="center"
          width="140">
        </el-table-column>
        <el-table-column
          prop="options"
          label="操作"
          align="center"
          width="180">
            <template slot-scope="scope">
              <el-button size="mini" plain @click="editUser(scope.row._id)">修改</el-button>
              <el-button size="mini" type="danger" @click="deleteUser(scope.row._id)" v-if="!scope.row.isAdmin">删除</el-button>
            </template>
        </el-table-column>
      </el-table>
      <el-dialog
        :visible.sync="dialogVisible"
        width="760px"
        class="edit-pop"
        center>
        <h2 class="title">用户信息修改</h2>
        <el-form label-width="90px" ref="editForm" label-position="left" class="edit-form" :model="userInfoForm" :rules="rulesUserInfo" size="medium">
          <el-form-item label="账号：" prop="username">
            <el-input v-model="userInfoForm.username" :disabled="true"></el-input>
          </el-form-item>
          <el-form-item label="昵称：" prop="nickname">
            <el-input v-model="userInfoForm.nickname"></el-input>
          </el-form-item>
          <el-form-item label="密码：" prop="userpass">
            <el-input v-model="userInfoForm.userpass"></el-input>
          </el-form-item>
          <el-form-item label="头像：">
            <div class="avatarList">
              <img v-for='avatar in avatarList' :src='avatar' :key="avatar.id" @click="chooseAvatar">
            </div>
          </el-form-item>
          <el-form-item label="当前：">
            <div class="avatarRandom" >
              <img :src='userInfoForm.avatar'>
            </div>
          </el-form-item>
          <el-form-item label="密保：" prop="safepass">
            <el-input v-model="userInfoForm.safepass"></el-input>
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
        :total="totalUser"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
  </div>
</template>

<script>
import {adminUser, userSearch, userDelete, userEditId, userEdit} from 'api/api'
const AVATAR_LIST = [
  '/static/images/visit1.jpg',
  '/static/images/visit2.jpg',
  '/static/images/visit3.jpg',
  '/static/images/visit4.jpg',
  '/static/images/visit5.jpg',
  '/static/images/visit6.jpg',
  '/static/images/visit7.jpg',
  '/static/images/visit8.jpg'
]
export default {
  data () {
    let checkUserName = (rule, value, callback) => {
      let reg = new RegExp(/^[0-9a-zA-Z_]{1,}$/)
      if (!value) {
        return callback(new Error('账号不能为空'))
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('账号不能小于6位或大于12位'))
        } else if (!reg.test(value)) {
          callback(new Error('账号不能含除数字，字母，下划线外特殊字符'))
        } else {
          callback()
        }
      }
    }
    let checkUserNick = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('昵称不能为空'))
      } else {
        if (value.length > 12) {
          callback(new Error('昵称不能大于12个字符'))
        } else {
          callback()
        }
      }
    }
    let checkUserPass = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('密码不能为空'))
      } else {
        if (value.length < 6 || value.length > 12) {
          callback(new Error('密码不能小于6位'))
        } else {
          callback()
        }
      }
    }
    let checkUserSafe = (rule, value, callback) => {
      let reg = new RegExp(/^[0-9]*$/)
      if (!value) {
        return callback(new Error('请输入密保'))
      } else {
        if (!reg.test(value)) {
          callback(new Error('密保必须为纯数字'))
        } else if (value.length > 12) {
          callback(new Error('损塞，整这么长能记住么？请小于12位'))
        } else {
          callback()
        }
      }
    }
    return {
      searchVal: '',
      tableData: [],
      // 总用户数
      totalUser: 0,
      // 每页条数
      pageLimit: 0,
      // 是否在进行查询操作
      searchNow: false,
      // 用户信息修改弹窗
      dialogVisible: false,
      // 用户信息
      userInfoForm: {
        username: '',
        nickname: '',
        userpass: '',
        safepass: '',
        avatar: ''
      },
      // 头像列表
      avatarList: AVATAR_LIST,
      rulesUserInfo: {
        username: [
          { validator: checkUserName, trigger: 'blur' }
        ],
        nickname: [
          { validator: checkUserNick, trigger: 'blur' }
        ],
        userpass: [
          { validator: checkUserPass, trigger: 'blur' }
        ],
        safepass: [
          { validator: checkUserSafe, trigger: 'blur' }
        ]
      }
    }
  },
  created () {
    this.userList()
  },
  methods: {
    // 用户列表
    userList (num) {
      adminUser(num).then((res) => {
        this.tableData = res.data.user
        this.totalUser = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 查询列表
    searchList (num) {
      // 当前正在执行查询操作
      this.searchNow = true
      userSearch(this.searchVal, num).then((res) => {
        if (!this.searchVal) {
          return
        }
        this.tableData = res.data.user
        this.totalUser = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 重置列表
    resetList () {
      this.searchVal = ''
      this.searchNow = false
      this.userList()
    },
    // 分页，总列表与查询列表要分开
    pageChange (num) {
      // 查询列表
      if (this.searchNow) {
        this.searchList(num)
        return
      }
      // 总列表
      this.userList(num)
    },
    // 删除用户
    deleteUser (id) {
      this.$confirm('此操作将永久删除该用户, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        // 删除成功
        userDelete(id).then((res) => {
          if (res.data.code === 0) {
            this.$message({
              message: res.data.message,
              type: 'success'
            })
          }
          this.userList()
        })
      })
    },
    // 用户信息修改
    editUser (id) {
      userEditId(id).then((res) => {
        this.dialogVisible = true
        this.userInfoForm.username = res.data[0].username
        this.userInfoForm.nickname = res.data[0].nickname
        this.userInfoForm.userpass = res.data[0].userpass
        this.userInfoForm.avatar = res.data[0].avatar
        this.userInfoForm.safepass = res.data[0].safepass
      })
    },
    // 保存
    saveEdit () {
      this.$refs['editForm'].validate((valid) => {
        if (valid) {
          userEdit(this.userInfoForm).then((res) => {
            if (res.data.code === 0) {
              // 修改成功
              this.$message({
                message: res.data.message,
                type: 'success'
              })
              // 关闭弹窗
              setTimeout(() => {
                this.dialogVisible = false
                this.userList()
              }, 500)
            }
          })
        } else {
          this.$message.error('请填写必填字段')
        }
      })
    },
    chooseAvatar (e) {
      let src = e.target.getAttribute('src')
      this.userInfoForm.avatar = src
    },
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
      .avatarList
        display: flex
        width: 100%
        flex-wrap: wrap
        img
          width: 80px
          height: 80px
          border-radius: 50%
          margin: 0 25px 10px 0
          cursor: pointer
      .avatarRandom
        img
          width: 80px
          height: 80px
          border-radius: 50%
</style>
