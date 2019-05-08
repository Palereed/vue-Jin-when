<template>
  <div class="notes-wrap">
    <ul class="topnav">
      <li v-for="(item,index) in navList" :key="item.id" :class="{'active': index === navIndex}" @click="switchClassify(1, item, index)">
        <span>{{item}}</span>
        <span>{{item}}</span>
      </li>
    </ul>
    <div class="article-wrap">
      <!-- 文章加载 -->
      <loading :data="notesList"></loading>
      <!-- 文章列表 -->
      <ul class="notes-list">
        <li v-for="note in notesList" :key="note.id">
          <a href="javascript:;" class="title" @click="linkDetail(note._id)">{{note.title}}</a>
          <p class="info-wrap">
            <span>标签：{{note.classifyVal}}</span>
            <span>时间：{{formatTime(note.time,'yyyy-MM-dd')}}</span>
            <span>作者：{{note.writer}}</span>
            <span>备注：{{note.radio}}</span>
          </p>
          <div class="watch">
            <i class="icon-eye"></i>
            <span>{{note.watch}}</span>
          </div>
          <div class="content">
            <h2>{{note.preface}}</h2>
            <p>{{note.abstract}}</p>
          </div>
          <a href="javascript:;" class="whole-btn">展开全文</a>
          <div class="ArclBttom">
            <a href="" class="ArclShow"></a>
          </div>
        </li>
      </ul>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :page-size="pageLimit"
        :total="totalNotes"
        :current-page.sync="resetPage"
        @current-change="pageChange"
        @prev-click="pageChange"
        @next-click="pageChange">
      </el-pagination>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
import {classList, notesList, notesSwitch} from 'api/api'
import {formatDate} from 'common/js/util'
import Loading from 'components/template/loading'
export default {
  data () {
    return {
      // 分类列表
      navList: [],
      // 文章列表
      notesList: [],
      // 总文章数
      totalNotes: 0,
      // 每页文章数
      pageLimit: 0,
      // 分类索引
      navIndex: 0,
      // 当前选择分类
      classify: '',
      // 页码重置
      resetPage: 0
    }
  },
  created () {
    this.getClassify()
    this.getNotes()
  },
  methods: {
    // 文章分类
    getClassify () {
      classList().then((res) => {
        this.navList.push('全部')
        // 无分类
        if (!res.data.length) {
          return
        }
        for (let i = 0; i < res.data.length; i++) {
          this.navList.push(res.data[i].name)
        }
      })
    },
    // 文章列表
    getNotes (num) {
      this.resetPage = num
      // 保证no-data出现
      this.notesList = []
      notesList(num).then((res) => {
        this.notesList = res.data.note
        this.totalNotes = res.data.total
        this.pageLimit = res.data.limit
      })
    },
    // 翻页
    pageChange (num) {
      if (this.classify && this.classify !== '全部') {
        this.switchClassify(num, this.classify, this.navIndex)
      } else {
        this.getNotes(num)
      }
    },
    // 分类筛选
    switchClassify (num, classify, index) {
      this.resetPage = num
      this.notesList = []
      this.navIndex = index
      this.classify = classify
      if (this.classify !== '全部') {
        notesSwitch(num, this.classify).then((res) => {
          this.notesList = res.data.note
          this.totalNotes = res.data.total
          this.pageLimit = res.data.limit
        })
      } else {
        this.getNotes()
      }
    },
    // 文章页
    linkDetail (id) {
      this.$router.push({
        name: 'detail',
        params: {
          id: id
        }
      })
    },
    // 时间格式化
    formatTime (time, formate) {
      return formatDate(time, formate)
    }
  },
  components: {
    Loading
  }
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .notes-wrap
    .topnav
      display: flex
      width: $main-width
      height: 100px
      background: #fff
      flex-wrap: wrap
      align-content: space-evenly
      align-items: center
      li
        width: 14%
        margin-right: 3.2%
        text-align: center
        height: 32px
        line-height: 32px
        cursor: pointer
        overflow: hidden
        position: relative
        border-radius: 3px
        font-size: $font-normal
        &:nth-child(6)
          margin-right: 0
        &.active,&:hover
          span
            &:nth-child(2)
              transform: translate3d(100%, 0, 0)
        span
          width: 100%
          height: 32px
          position: absolute
          top: 0
          left: 0
          transition: transform .3s
          &:nth-child(1)
            background: $home-navbg
            color: #fff
          &:nth-child(2)
            background: $home-thingray
    .article-wrap
      margin-top: 30px
      min-height: calc(100vh - 272px)
      .notes-list
        li
          padding-bottom: 30px
          border-bottom: 1px solid $home-line
          margin-bottom: 30px
          position: relative
          .title
            font-weight: 700
            font-size: $font-title
            position: relative
            display: inline-block
            &:before
              position: absolute
              width: 0
              content: ""
              height: 2px
              bottom: -5px
              left: 0
              background: $home-font
              transition: width 0.6s
            &:hover
              &:before
                width: 100%
          .info-wrap
            padding: 15px 0 5px 0
            color: $home-gray
            font-size: $font-small
            span
              margin-right: 20px
          .watch
            position: absolute
            top: 60px
            right: 0
            display: flex
            flex-direction: column
            width: 30px
            align-items: center
            i
              font-size: $font-middle
            span
              margin-top: 5px
              font-size: $font-default
          .content
            border-left: 3px solid $home-thingray
            padding-left: 30px
            margin: 10px 0 20px 0
            line-height: 1.8
            text-align: justify
            letter-spacing: 1.5px
            h2
              font-size: $font-middle
              font-weight: 700
              margin: 10px 0
          .whole-btn
            padding: 10px 0 10px 33px
            text-decoration: underline
    .pagination
      margin-bottom: 20px
      font-size: $font-normal
      display: flex
      justify-content: center
  .mobile
    .notes-wrap
      .topnav
        width: 7.1rem
        height: 1.6rem
        align-content: center
        li
          width: 22%
          margin-right: 4%
          height: .52rem
          line-height: .52rem
          font-size: $mobileFont-small
          &:nth-child(4),&:nth-child(8)
            margin-right: 0
          &:nth-child(n+5)
            margin-top: .15rem
          &.active,&:hover
            span
              &:nth-child(2)
                transform: translate3d(100%, 0, 0)
          span
            height: .52rem
      .article-wrap
        margin-top: .4rem
        min-height: calc(100vh - 3.94rem)
        .notes-list
          li
            padding-bottom: .3rem
            margin-bottom: .3rem
            .title
              font-size: $mobileFont-middle
              &:before
                display: none
            .info-wrap
              padding: .25rem 0 .15rem 0
              span
                font-size: $mobileFont-small
                margin-right: .2rem
            .watch
              top: 1rem
              width: .3rem
              i
                font-size: $mobileFont-just
              span
                margin-top: .05rem
                font-size: $mobileFont-small
            .content
              border-left: .06rem solid $home-thingray
              padding-left: .3rem
              margin: .1rem 0 .2rem 0
              line-height: $mobileFont-title
              font-size: $mobileFont-normal
              letter-spacing: .015rem
              h2
                font-size: $mobileFont-just
                margin: .1rem 0 .1rem 0
            .whole-btn
              font-size: $mobileFont-normal
              padding: .1rem 0 .1rem .36rem
      .pagination
        margin-bottom: .2rem
        font-size: $mobileFont-normal
        span
          padding: .1rem .15rem
          line-height: .3rem
          margin: 0 .1rem
</style>
