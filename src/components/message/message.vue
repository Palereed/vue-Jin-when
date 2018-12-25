<template>
  <div class="message-wrap">
    <div class="topdesc">
      <div class="avatar">
        <img src="../../common/images/owner.jpg">
      </div>
      <div class="talk">
        <span>少年锦时</span>
        <p>吾之素年，汝与锦时。与你相见，不甚欣喜。留笔墨一二，互通有无。或有指点，愿闻其详。</p>
      </div>
    </div>
    <!-- 留言 -->
    <div class="message">
      <div class="letter">
        <div class="avatar">
          <img src="../../common/images/visit4.jpg">
        </div>
        <div class="content">
          <span class="name">非酋</span>
          <span class="time">
            留言于<b>2018-08-22 15:16:26</b>
          </span>
          <p>说好的更新，未完待续呢</p>
        </div>
        <div class="answer-number">
          <i class="icon-comment-o"></i>
          <span>0</span>
        </div>
      </div>
      <!-- 留言回复 -->
      <div class="answer">
        <div class="avatar">
          <img src="../../common/images/visit4.jpg">
        </div>
        <div class="content">
          <span class="name">非酋</span>
          <span class="time">
            留言于<b>2018-08-22 15:16:26</b>
          </span>
          <p>说好的更新，未完待续呢</p>
        </div>
        <!-- 留言回复表单 -->
        <div class="answer-form">
          <form>
              <ul class="FormList">
                <input type='hidden' value="5b7d0dcae289e134e58cbf3d" name="messageId">
                <li><span>内容：</span><textarea class="form-control" name="content"></textarea></li>
                <div class="WarningHold">
                  <div>
                    <i></i>
                    <span></span>
                  </div>
                </div>
                <li><button type="button" class="btn btn-default">回复</button></li>
              </ul>
            </form> 
        </div>
      </div>
    </div>
    <!-- 分页部分 -->
    <div class="PageNumber">
        <a href="javascript:;" class="CantUse">前页</a>
          
        <a class="Active">1</a>
          
        <a href="javascript:;" class="CantUse">后页</a>
    </div>
    <!-- 留言表单 -->
    <div class="TopTab">
      <div class="TabName">留言板</div>
      <div class="LandInfo">
          <!-- 管理员登陆 -->
          <span><b id="Landon"><i class="fa fa-sign-in"></i>登录后留言</b></span>
          <div class="OnLand"></div>
      </div>
      <div class="clearfix"></div>
    </div>
    <div class="LeaveContain">
      <div class="VisitLand" id="Land">
          <form>
              <ul class="FormList">
                <li><span>账号：</span><input class="form-control" name="visitname"></li>
                <li><span>密码：</span><input type="password" class="form-control" name="visitpass"></li>
                <div class="LandBtn">
                    <div>
                      <i></i>
                      <span></span>
                    </div>
                </div>
                <li><button type="button" class="btn btn-default">登陆</button>
                    <button type="button" class="btn btn-default">注册</button>
                </li>
              </ul>
          </form>
      </div>
      <div class="VisitRegister" id="Register">
          <form>
          <ul class="FormList">
              <li><span>账号：</span><input class="form-control" name="visitname"></li>
              <li><span>昵称：</span><input class="form-control" name="visitmark"></li>
              <li><span>密码：</span><input type="password" class="form-control" name="visitpass"></li>
              <li><span>头像：</span><img src="/public/images/message/visit4.jpg" id="ShowImg"></li>
              <li id="ImgChoose">
                    <span>选择：</span>
                    <img src="/public/images/message/visit1.jpg">
                    <img src="/public/images/message/visit2.jpg">
                    <img src="/public/images/message/visit3.jpg">
                    <img src="/public/images/message/visit4.jpg">
                    <img src="/public/images/message/visit5.jpg">
                    <img src="/public/images/message/visit6.jpg">
                    <img src="/public/images/message/visit7.jpg">
                    <img src="/public/images/message/visit8.jpg">
              </li>
              <li><span>密保：</span><input class="form-control" name="visitsafe"></li>
              <div class="RegisterBtn">
                <div>
                  <i></i>
                  <span></span>
                </div>
              </div>
              <li><button type="button" class="btn btn-default">注册</button></li>
          </ul>
          </form>
      </div>
      
    </div>
  
  </div>
</template>

<script>
export default {
}
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import '~common/stylus/variable'
  .message-wrap
    .topdesc
      width: 100%
      height: 100px
      display: flex
      align-items: center
      .avatar
        width: 65px
        height: 65px
        flex: 0 0 65px
        img
          width: 100%
          height: 100%
          border-radius: 10px
          border: 2px solid rgba(10,10,10,0.1)
          box-sizing: border-box
      .talk
        display: flex
        flex-direction: column
        flex: 1
        margin-left: 20px
        span
          font-size: $font-normal
          font-weight: 700
          margin-bottom: 10px
    .message
      border-bottom: 1px solid $home-line
      padding: 20px 0
      .letter,.answer
        display: flex
        .avatar
          width: 65px
          height: 65px
          flex: 0 0 65px
          img
            width: 100%
            height: 100%
            border-radius: 10px
            border: 2px solid rgba(10,10,10,0.1)
            box-sizing: border-box
        .content
          flex: 1
          margin-left: 20px
          p
            line-height: $font-middle
          span
            display: block
            &.name
              font-size: $font-normal
              font-weight: 700
            &.time
              color: $home-gray
              font-size: $font-small
              margin: 10px 0
              b
                margin-left: 5px
        .answer-number
          width: 30px
          height: 40px
          font-size: $font-big
          text-align: center
          cursor: pointer
          display: flex
          flex-direction: column
          justify-content: space-between
          span
            font-size: $font-default      
      .answer
        padding: 20px 0 0 85px
        

/* 留言回复 */
.AllAnswer{padding-left:10%;}
.Answerit{display:inline-block;
          padding:6px 12px;
          color: #333;
          border:1px solid #ccc;
          border-radius:4px;
          margin:0 0 20px 0;
          cursor:pointer;}
.AnswerForm  button{margin:0 0 20px 55px !important;}   
.AnswerForm .alert{margin-left:55px;}       

/* 留言板 */ 
.TopTab{border-bottom: 1px solid #e0e0e0;
        height:52px;
        margin:20px 0;
        position:relative;} 
.TabName{position:absolute;bottom:10px;}        
.LandInfo{float:right;position:relative;}        
.LandInfo span{display:inline-block;
                width:200px;
                text-align:right;
                position:absolute;
                bottom:10px;
                right:60px;
                font-size:14px;
                line-height:14px;}
.LandInfo b{font-weight:500;cursor:pointer;} 
.LandInfo a:hover,.LandInfo b:hover{color:red}               
.LandInfo i{margin:0 5px 0 10px;font-size:16px}
.OnLand{width:50px;height:50px;border-radius:25px;background:#eee;border-radius:25px;cursor:pointer;}  
.LandInfo img{width:50px;border-radius:25px;}  
.alert{padding:8px 12px;margin:0 0 20px 60px;width:55%;}
.alert i{margin:0 10px 0 0;}
/* 留言form */
.FormList li{margin:0 0 20px 0;}
.FormList li:last-child{margin:0;}
.FormList li span{display:block;width:7%;line-height:34px;float:left;text-align:left;}
#ShowImg{width:100px;height:100px;border-radius:50px;cursor:pointer;border: 2px solid rgba(10,10,10,0.1);}
#ImgChoose{display:none;}
#ImgChoose img{width:80px;height:80px;border-radius:40px;cursor:pointer;}
textarea.form-control{resize:none;height:100px;width:93%;}
button{margin-left:60px;outline:none !important;}
form button:nth-child(2){margin-left:0px;}
.form-control{width:55%;display:inline-block;}
@media screen and (max-width: 365px){
    .Messagetop p{margin-top:-2px;}
}  
/* 登陆与注册 */     
#Register{display:none;}
</style>
