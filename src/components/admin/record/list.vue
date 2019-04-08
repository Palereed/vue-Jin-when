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
          label="日期"
          align="center">
        </el-table-column>
        <el-table-column
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="spirit"
          align="center"
          label="心情">
        </el-table-column>
        <el-table-column
          prop="weather"
          align="center"
          label="天气">
        </el-table-column>
        <el-table-column
          prop="content"
          align="center"
          label="内容">
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
        title: '关于Js的一些demo',
        spirit: '开心',
        weather: '晴',
        content: '关于Js的一些demo关于Js的一些demo关于Js的一些demo'
      }, {
        id: '222222',
        time: '2019-08-11',
        title: '关于Js的一些demo',
        spirit: '开心',
        weather: '晴',
        content: '关于Js的一些demo关于Js的一些demo关于Js的一些demo'
      }, {
        id: '222222',
        time: '2019-08-11',
        title: '关于Js的一些demo',
        spirit: '开心',
        weather: '晴',
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
