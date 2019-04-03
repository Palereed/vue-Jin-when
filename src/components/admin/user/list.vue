<template>
  <div class="wrap">
    <el-table
      :data="tableData"
      border>
      <el-table-column
        prop="id"
        align="center"
        label="编号"
        width="200">
      </el-table-column>
      <el-table-column
        prop="name"
        align="center"
        label="昵称"
        width="160">
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
        width="160">
        <template slot-scope="scope">
          <img :src="scope.row.avatar" style="width: 40px;height: 40px;border-radius: 50%">
        </template>
      </el-table-column>
      <el-table-column
        prop="safe"
        label="密保"
        align="center">
      </el-table-column>
      <el-table-column
        prop="options"
        label="操作"
        align="center"
        width="180">
          <template slot-scope="scope">
            <el-button size="mini" @click="editUser(scope.row.id)">编辑</el-button>
            <el-button size="mini" type="danger" @click="deleteUser(scope.row.id)">删除</el-button>
          </template>
      </el-table-column>
    </el-table>
    <div class="pagination-wrap">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="tableData.length"
        >
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: [{
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      }, {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      }, {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      }, {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      },
      {
        id: '222222',
        name: '王小虎',
        username: 'zzzz',
        userpass: 'aaaaaa2222',
        avatar: '/static/images/visit1.jpg',
        safe: '123456'
      }]
    }
  },
  methods: {
    editUser (id) {
      console.log(id)
    },
    deleteUser (id) {
      console.log(id)
    }
  }
}
</script>
