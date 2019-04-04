<template>
  <div class="notes-wrap">
    <ul class="topnav">
      <li v-for="(item,index) in navList" :key="item.id" :class="{'active': index === navIndex}">
        <span>{{item}}</span>
        <span>{{item}}</span>
      </li>
    </ul>
    <div class="article-wrap">
      <article>
        <a href="javascript:;" class="title">
          关于跨域数据请求的一些絮叨
        </a>
        <p class="info-wrap">
          <span>标签：Vue</span>
          <span>时间：2018-09-03</span>
          <span>作者：蒹葭</span>
          <span>备注：原创</span>
        </p>
        <div class="watch">
          <i class="icon-eye"></i>
          <span>37</span>
        </div>
        <div class="content">
          <h2>跨域数据请求</h2>
          <p>最近在看huangyi老师的vue音乐播放器视频，其中的跨域数据请求因为视频距现在已经过去1年，qq音乐许多接口已经改变，因此在跨域过程中有许多坑需要解决，这里..</p>
        </div>
        <a href="javascript:;" class="whole-btn">展开全文</a>
        <div class="ArclBttom">
          <a href="" class="ArclShow"></a>
        </div>
      </article>
      <article>
        <a href="javascript:;" class="title">
          关于跨域数据请求的一些絮叨
        </a>
        <p class="info-wrap">
          <span>标签：Vue</span>
          <span>时间：2018-09-03</span>
          <span>作者：蒹葭</span>
          <span>备注：原创</span>
        </p>
        <div class="watch">
          <i class="icon-eye"></i>
          <span>37</span>
        </div>
        <div class="content">
          <h2>跨域数据请求</h2>
          <p>最近在看huangyi老师的vue音乐播放器视频，其中的跨域数据请求因为视频距现在已经过去1年，qq音乐许多接口已经改变，因此在跨域过程中有许多坑需要解决，这里..</p>
        </div>
        <a href="javascript:;" class="whole-btn">展开全文</a>
        <div class="ArclBttom">
          <a href="" class="ArclShow"></a>
        </div>
      </article>
      <article>
        <a href="javascript:;" class="title">
          关于跨域数据请求的一些絮叨
        </a>
        <p class="info-wrap">
          <span>标签：Vue</span>
          <span>时间：2018-09-03</span>
          <span>作者：蒹葭</span>
          <span>备注：原创</span>
        </p>
        <div class="watch">
          <i class="icon-eye"></i>
          <span>37</span>
        </div>
        <div class="content">
          <h2>跨域数据请求</h2>
          <p>最近在看huangyi老师的vue音乐播放器视频，其中的跨域数据请求因为视频距现在已经过去1年，qq音乐许多接口已经改变，因此在跨域过程中有许多坑需要解决，这里..</p>
        </div>
        <a href="javascript:;" class="whole-btn">展开全文</a>
        <div class="ArclBttom">
          <a href="" class="ArclShow"></a>
        </div>
      </article>
    </div>
    <div class="pagination">
      <el-pagination
        background
        layout="prev, pager, next"
        :total="12">
      </el-pagination>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      // 分类索引
      navIndex: 0
    }
  },
  created () {
    this.navList = ['全部', 'Css', 'js', 'vue', 'node', '其他']
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
      article
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
        article
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
