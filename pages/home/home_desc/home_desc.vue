<template>
	<view>
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true" >
			<block slot="backText">返回</block>
			<block slot="content">详细</block>
			<block slot="right" ><text class="cuIcon-more" style="padding-right: 30upx;"></text></block>
		
		</cu-custom>
		<!-- end -->
		
		<message ref="Message"></message>
		
		<!-- 头部 -->
		<view class='pg'>
		
		  <view class='user-top  padding-sm bg-white '>
		
		    <view class='user-top-1'>
		      <image :src='head_img'></image>
		    </view>
		    <view class='user-top-2'>
		      <view class='user-top-2_1'>
		        <text class='text-df text-black text-weight'>{{name}}</text>
		      </view>
		      <view>
		        <text class='text-xs text-grey'>1小时前来过</text>
		      </view>
		    </view>
		    <view class='user-top-3'>
		      <button @tap='attention(is_focus)' class="cu-btn round " :class="[is_focus ? 'line-red' : 'line-black']" role="button" aria-disabled="false">{{is_focus ? '取消' : '关注'}}</button>
		    </view>
		  </view>
		
		  <!-- 文字内容 -->
		  <view class='character  padding-sm bg-white'>
		    <text>{{content}}</text>
		  </view>
		  <!-- end -->
		
		  <!-- 九宫图 -->
		  <view class='container-grid padding-sm bg-white'>
		    <view @tap='previewImg' :data-index="index" :class=" index == 2 || index == 5 || index == 8  ? '' : imgArr.length == 4 ?'' : imgArr.length == 1 ? 'container-grid_image-1':'container-grid_image' " :style="imgArr.length == imgArr ? 'width:32%;margin-right: 15rpx;' : '' "
		      v-for = "(item,index) in imgArr" :key="index">
		      <image :src='item' :style=" imgArr.length == 1 ? 'width:100%;' :'' " :class=" imgArr.length == 1 ? 'container-grid_img' : 'container-grid__image' "></image>
		      <!-- style=width:32% container-grid_image-->
		    </view>
		  </view>
		  <!-- end -->
		
		  <!-- 流量数量 -->
		  <view class='browse shadow-warp  padding-sm bg-white'>
					<view class="cu-avatar-group"  v-if="is_focusNumber" >
					  <view class="cu-avatar img-size round lg" v-for="(item,index) in CardLikeUserImage" :key="item" :style=" 'background-image:url('+ item[index] + ');' "></view>
					</view>
					<view class='browse-2' v-if="is_focusNumber">
					  <text>{{CardLikeNum}}人赞过</text>
					</view>
				<view style="width:65%;" v-if="!is_focusNumber">
					
				</view>
					
			<view>
			  <text>{{time}}发布*浏览{{flowNum  > 9999 ? (Math.floor(flowNum/1000)/10) + '万' : flowNum}}</text>
			</view>
		  </view>
		  
		  
		  <!-- 评论标题 -->
		    <view class='comment  padding-sm bg-white'>
		      <text>全部评论 * {{comment_count}}</text>
		    </view>
		    <!-- end -->
			
			<skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true"></skeleton>
			<skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true"></skeleton>
			<skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true" >
				<!-- 评论内容 -->
				  <view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in commentData" :key="index">
				    <view class='comment-content-1'>
				      <view class='comment-content-1_image'>
				        <image :src='item.img'></image>
				      </view>
				      <view class='comment-content-1_2'>
				        <text class='text-black'>{{item.name}}</text>
				      </view>
				      <view>
				        <text class='cuIcon-appreciate lg text-gray'></text> {{item.comment_like == null || item.comment_like == '' ? 0 : item.comment_like}}</view>
				    </view>
				    <view class='comment-content-2'>
				      <view class='comment-content-2_1'>
				        <text class='text-black text-df text-weight' style="margin-bottom: 20upx;">{{item.content}}</text>
				      </view>
					  <image :src="item.centent_image" mode="aspectFill" style="height: 250upx;width: 250upx;margin-top: 20upx;"></image>
				      <view class='comment-content-2_2 margin-top-sm'>
				        <text class='text-sm'>
						{{
							getDateDiff(getDateTimeStamp(item.created_at))
							
						}}</text>
				      </view>
				      <view class='leave' v-if="item.comment == null || item.comment == '' || item.comment == undefined ?false : true">
				        <view class='leave-item' v-for="(ctime,cindex) in item.comment" :key="ctime">
				          <text>{{ctime.name}}：{{ctime.content}}</text>
				        </view>
				        <view class='margin-top-sm' @tap="toDiscover_desc(index)">
				          <text class='text-blue'>查看{{item.comment_count}}条回复 ></text>
				        </view>
				      </view>
				    </view>
				  </view>
				  <!-- end -->
				
			</skeleton>
			
			
			
			<!-- padding30 margin30 end -->
		  </view>
		  
		  <!--  -->
		  <view class='lines'></view>
		  <!--  -->
		  <!-- 底部操作卡 -->
		  <view class=' bg-white'>
		  
		    <view class='msg_bottom bg-white'>
		      <view class='msg_bottom-1'>
		        <input name='msg' placeholder='觉得不错说两句~~' cursor-spacing='10'></input>
		      </view>
		      <view class='msg_bottom-2'>
		        <text class='cuIcon-share text-icon  lg text-black'></text>
		        <text class='text-char'>分享</text>
		      </view>
		      <view class='msg_bottom-3'>
		        <text class='cuIcon-appreciate text-icon lg text-black'></text>
		        <text class='text-char'> 1688</text>
		      </view>
		    </view>
			
		  </view>
		
		  
	</view>
</template>

<script>
		import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
		export default {
		components:{skeleton},
		data() {
			return {
				loading:true,
				commentData:'',//评论数据
				flowNum:'',//浏览数量
				time:'',//发布时间
				comment_count:'',//全部评论数量
				is_focusNumber:'',//是否有点赞数量
				CardLikeUserImage:'',//获取帖子点赞用户头像
				CardLikeNum:'',//用户点赞数量
				cid:'',//这个帖子id
				is_focus:'',//是否关注
				uid:'',//这个页面用户id
				name:'',//用户头像
				content:'',//内容
				head_img:'',//头像
				    //图片
				    imgArr: [
				    
				    ],
				    // end
			}
		},
		methods: {
			// 转换时间戳
			getDateTimeStamp:function(dateStr){
			 return Date.parse(dateStr.replace(/-/gi,"-"));
			},
			
			// 时间转换
			getDateDiff:function(dateTimeStamp){
				var result = '';
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if(diffValue < 0){return;}
				var monthC =diffValue/month;
				var weekC =diffValue/(7*day);
				var dayC =diffValue/day;
				var hourC =diffValue/hour;
				var minC =diffValue/minute;
				if(monthC>=1){
					result="" + parseInt(monthC) + "月前";
				}
				else if(weekC>=1){
					result="" + parseInt(weekC) + "周前";
				}
				else if(dayC>=1){
					result=""+ parseInt(dayC) +"天前";
				}
				else if(hourC>=1){
					result=""+ parseInt(hourC) +"小时前";
				}
				else if(minC>=1){
					result=""+ parseInt(minC) +"分钟前";
				}else
				result="刚刚";
				return result;
			},
			  // 点击图片打开详细
			  previewImg: function (e) {
			    // console.log(e.currentTarget.dataset.index);
			    var index = e.currentTarget.dataset.index;
			    var imgArr = this.data.imgArr;
			    uni.previewImage({
			      current: imgArr[index],     //当前图片地址
			      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
			      success: function (res) { },
			      fail: function (res) { },
			      complete: function (res) { },
			    })
			  },
			  
			  // 跳转回复留言详细
			  toDiscover_desc:function(index){
				  var centent_image = this.commentData[index].centent_image;
				  var comment_count = this.commentData[index].comment_count;
				  var content = this.commentData[index].content;
				  var created_at = this.commentData[index].created_at;
				  var img = this.commentData[index].img;
				  var name = this.commentData[index].name;
				  var id = this.commentData[index].id;
				  var comment_like = this.commentData[index].comment_like;
				  console.log(this.commentData[index]);
				  uni.navigateTo({
				  	url:"/pages/home/home_desc_msg/home_desc_msg" +'?centent_image=' + centent_image +'&comment_count=' +comment_count
					+ '&content=' + content + '&created_at=' +created_at + '&img=' +img +'&name=' +name +'&id=' + id +'&comment_like=' +comment_like
				  })
			  },
			  
			  //获取用户关注状态
			  getUserIsFocus(){
				  uni.request({
				  	url:this.tui.interfaceUrl() +'user/getIsFocus',
					data:{
						focus_id:this.uid
					},
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.data == 1){//关注
							this.is_focus = true;
							console.log('cccccbbb');
							console.log(res);
						}else{
							this.is_focus = false;
						}
					},
					fail: (err) => {
						this.is_focus = false;
						this.$refs['Message'].error({
							content:'网络不给力，请稍后再试~',
							duration:2000,
							background:false
						})
					}
				  })
			  },
			  
			  SaveFocusUser:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() +'user/SaveFocusUser',
					data:{
						focus_id:this.uid
					},
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.data == 1){
							this.$refs['Message'].success({
								content:'关注成功！',
								duration:2000,
								background:false
							})
						}else{
							this.is_focus = false;
							this.$refs['Message'].error({
								content:'网络不给力，请稍后再试~',
								duration:2000,
								background:false
							})	
						}
					},
					fail: (err) => {
						this.is_focus = false;
						this.$refs['Message'].error({
							content:'网络不给力，请稍后再试~',
							duration:2000,
							background:false
						})
					}
				  })
			  },
			  deleteFocusUser:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() +'user/deleteFocusUser',
						data:{
							focus_id:this.uid
						},
						header:this.tui.getHeader(),
						success: (res) => {
							if(res.data.data == 1){
								this.$refs['Message'].success({
									content:'取消成功！',
									duration:2000,
									background:false
								})
							}else{
								this.is_focus = true;
								this.$refs['Message'].error({
									content:'网络不给力，请稍后再试~！',
									duration:2000,
									background:false
								})	
							}
						},
						fail: (err) => {
							this.is_focus = true;
							this.$refs['Message'].error({
								content:'网络不给力，请稍后再试~',
								duration:2000,
								background:false
							})
						}
					  })
			  },
			  
			  // 关注按钮点击
			  attention:function(is_focus){
				  // console.log(is_focus);
				  if(is_focus){//
					  this.is_focus = false;
					  // 修改数据库
					  this.deleteFocusUser();
					  
				  }else{
					  this.is_focus = true;
					  	  // 修改数据库
					this.SaveFocusUser();
				  }
			  },
			  // 获取点赞数量
			  getCardLikeNum:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'user/CardLikeNum',
					data:{
						cid:this.cid
					},
					success: (res) => {
						// console.log(res);
						if(res.data.code == 1){
							this.CardLikeNum = res.data.data;
						}else{
							this.CardLikeNum = 0;
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'点赞数量失败！',
							duration:2000,
							background:false
						})
					}
				  })
			  },
			  // 获取帖子点赞用户头像
			  getCardLikeUserImage:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'user/CardLikeUserImage',
						data:{
							cid:this.cid
						},
						success: (res) => {
							// console.log(res);
							if(res.data.code == 1){
								this.CardLikeUserImage = res.data.data;
								this.is_focusNumber = true;
							}else{
								this.CardLikeUserImage = '';
							}
						},
						fail: (err) => {
							this.is_focusNumber = false;
							this.$refs['Message'].error({
								content:'点赞用户头像获取失败！',
								duration:2000,
								background:false
							})
						}
				  })
			  },
			  // 添加流量记录
			  SaveFlow:function(sid){
				  // console.log(sid);
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'user/SaveFlow',
					data:{
						sid:sid,
						cid:this.cid
					},
					header:this.tui.getHeader(),
					method:"POST",
					success: (res) => {
						// console.log(res);
					}
				  })
			  },
			  // 获取浏览记录
			  getFlow:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'user/getFlow',
						data:{
							cid:this.cid
						},
						method:"GET",
						success: (res) => {
							if(res.data.code == 1){
								this.flowNum = res.data.data;
							}else{
								this.$refs['Message'].error({
									content:'网络开异常浏览数量查询失败~',
									duration:2000.,
									background:false
								})
							}
						},
						fail: (err) => {
							this.$refs['Message'].error({
								content:'网络开异常浏览数量查询失败~',
								duration:2000.,
								background:false
							})
						}
				  })
			  },
			  
			  //获取全部评论信息
			  getCardCommentALLUser:function(){
				  uni.request({
				  	url:this.tui.interfaceUrl() +'comment/CardCommentALLUser',
					data:{
						cid:this.cid
					},
					success: (res) => {
						if(res.data.code == 1){
							this.loading = false;
							this.commentData = res.data.data;
						}else{
							this.$refs['Message'].error({
								content:'网络开异常评论数据查询失败~',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络开异常评论数据查询失败~',
							duration:2000,
							background:false
						})
					}
				  })
			  }
			  
		},
		onLoad(optins) {
			console.log(optins)
			var uid = optins.uid;
			this.uid = uid;
			var cid = optins.id;
			this.cid = cid;
			//获取全部评论信息
			this.getCardCommentALLUser();
			// 保存浏览记录
			this.SaveFlow(optins.sid);
			//获取用户关注状态
			this.getUserIsFocus();
			// 获取点赞数量
			this.getCardLikeNum();
			// 获取帖子点赞用户头像
			this.getCardLikeUserImage();
			// 获取浏览记录
			this.getFlow();
				// var time = this.tui.getDateTimeStamp('2019-11-14 01:00:00');
				// var data =this.tui.getDateDiff(time);
				var name = optins.name;
				var head = optins.head;
				var content = optins.content;
				if(optins.img == null || optins.img == '' || optins.img == undefined){
					this.imgArr = [];
				}else{
					var img = optins.img.split(',');
					this.imgArr = img;
				}
				console.log(optins.img)
				console.log(img);
				var time = optins.time;
				// 日期转时间戳
				var timeStamp = this.tui.getDateTimeStamp(time);
				// 转换为多少天前
				var DateDiff = this.tui.getDateDiff(timeStamp);
				this.time = DateDiff;
				var comment_count = optins.comment_count;
				this.name =name;
				this.head_img = head;
				this.content = content;
				this.comment_count = comment_count;
				
		},
		onShow() {
			
		}
	}
</script>

<style>
.pg{
  padding:5rpx 20rpx 20rpx 20rpx;
}
.radius-sm{
  border-radius: 20rpx;
}
/* 头部 */
.user-top{
  width: 100%;
  height: 100rpx;
  display: flex;
  align-items: center;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
  margin-top: 20rpx;
  
}
.user-top-1 image{
height: 80rpx;
width: 80rpx;
border-radius: 100%;
}
.user-top-2{
  margin-left: 20rpx;
  width: 65%;
}

/* end */

/* 文字 */
.character{
  width: 100%;
  height: auto;
  padding-top: 20rpx;
  display: flex;
}
.character text{
  font-weight: 550;
  font-size: 30rpx;
  width: 100%;
   word-wrap: break-word;
    word-break: normal;
    line-height: 40rpx;
}
/* end */


/* 九宫图 */
.container-grid{
  display: flex;
  flex-wrap: wrap;
  width: 100%;

}
.container-grid__image{
  height: 210rpx;
  width: 220rpx;
  border-radius: 10rpx;
}
.container-grid_img{
  width: 223rpx;
  border-radius: 10rpx;  
}
.container-grid_image{
  margin-right: 10rpx;
  width: 32%;
}
.container-grid_image-1{
   margin-right: 10rpx;
  width: 100%;
}
/* end */

/* 底部浏览量 */
.browse{
  width: 100%;
  height: 100rpx;
  padding-top: 20rpx;
  display: flex;
  align-items: center;
  mask-border: 20rpx;
  border-bottom-left-radius: 20rpx;
  border-bottom-right-radius: 20rpx;
}
.browse text{
  font-size: 25rpx;
}
.img-size{
  height: 80rpx;
  width: 80rpx;
}
.cu-avatar.lg{
  width: 60rpx;
  height: 60rpx;
}
.browse-2{
  width: 46%;
}
/* end */

/* 评论 */
.comment{
  margin-top: 20rpx;
  width: 100%;
  height: 100rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.comment{
  color:black;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
/* end */


/* 评论内容 */
.comment-content{
  width: 100%;
  height: auto;

}
.comment-content-2_1_img{
  height: 36rpx;
  width: 65rpx;
  line-height: 40rpx;
}
.comment-content-1{
  display: flex;
  align-items: center;
}
.comment-content-1_image image{
  height: 80rpx;
  width: 80rpx;
  border-radius: 100%;
}
.comment-content-1_2{
  margin-left: 20rpx;
  width: 80%;
}
.comment-content-2{
  margin-left: 10%;
}
/* end */

/* 评论留言 */
.leave{
  padding: 20rpx;
  height: auto;
  width: 100%;
  background:#f1f1f1;
  margin-top: 20rpx;
  border-radius: 20rpx;
     word-wrap: break-word;
    word-break: normal;
    line-height: 40rpx;
}
.leave-item{
  margin-top: 20rpx;
  color: black;
}
/* end */


/* line */
.line{
  width: 100%;
  height: 0.5rpx;
  background: gainsboro;
  margin-top: 20rpx;
}
/* end */


/* 底部选项卡 */
.msg_bottom{
  padding: 20rpx;
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
}
.lines_msg{
  display: flex;
  height: 10rpx;
}
.msg_bottom-1{
  width: 55%;
  background: #f1f1f1;
  border-radius: 40rpx;
  padding: 10rpx 20rpx 10rpx 20rpx;
  display: flex;
  align-items: center;
}
.msg_bottom-2{
  width: 20%;
  margin-left: 20rpx;
}
.text-icon{
  font-size: 45rpx;
}
.text-char {
  font-size: 35rpx;
}
/* end */

.lines{
  display: flex;
  height: 150rpx;
}



</style>
