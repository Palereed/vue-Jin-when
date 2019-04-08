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
          prop="title"
          align="center"
          label="标题">
        </el-table-column>
        <el-table-column
          prop="writer"
          label="作者"
          align="center">
        </el-table-column>
        <el-table-column
          prop="classify"
          label="分类"
          align="center">
        </el-table-column>
        <el-table-column
          prop="time"
          label="发布时间"
          align="center">
        </el-table-column>
        <el-table-column
          prop="addInfo"
          label="备注"
          align="center"
          width="80">
        </el-table-column>
        <el-table-column
          prop="copyInfo"
          label="转载信息"
          align="center"
          width="180">
        </el-table-column>
        <el-table-column
          prop="watch"
          label="浏览量"
          align="center">
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
      classifyVal: '',
      classify: [
        {value: '选项1', label: 'Vue'},
        {value: '选项2', label: 'Js'},
        {value: '选项3', label: 'Css'}
      ],
      tableData: [{
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
      }, {
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
      }, {
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
      }, {
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
      },
      {
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
      },
      {
        id: '222222',
        title: '关于Js的一些demo',
        writer: '蒹葭',
        classify: 'Js',
        time: '2019-08-11',
        addInfo: '原创',
        copyInfo: 'www.baidu.com',
        watch: '100'
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
      this.classifyVal = ''
    }
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'

</style>
