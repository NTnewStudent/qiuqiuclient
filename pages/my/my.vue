<template>
	<view>
		<view class="UCenter-bg" catchtap='toMy_detail'>
		    <image @tap="toMyInfo" :src="userInfo.avatarUrl" class="png"></image>
		    <view class="text-xl"> 
		    <!-- <text>Amibition</text>   -->
		    </view>
		    <view class="margin-top-sm">
		      <text>{{userInfo.nickName}}</text>
		    </view>
		    <image src="https://raw.githubusercontent.com/weilanwl/ColorUI/master/demo/images/wave.gif" mode="scaleToFill" class="gif-wave"></image>
		  </view>
		<!-- 用户信息end -->
		<message ref="Message"></message>
		
		  <view class="padding flex text-center text-grey bg-white shadow-warp">
		
		    <view class="flex flex-sub flex-direction solid-right" >
		      <view class="text-xxl text-orange">{{LikeNum == null || LikeNum == '' || LikeNum == undefined ? '0' : LikeNum}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-attentionfill"></text> 超赞</view>
		    </view>
		    <view  class="flex flex-sub flex-direction solid-right" @tap='toAttention(AttentionNum)'>
		      <view class="text-xxl text-blue">{{AttentionNum == null || AttentionNum == '' || AttentionNum ==undefined ? '0' : AttentionNum}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-favorfill"></text>关注数</view>
		    </view>
		    <view class="flex flex-sub flex-direction" @tap='toFans(FansNum )'>
		      <view class="text-xxl text-green">{{FansNum == null || FansNum == '' || FansNum == undefined ? '0' : FansNum}}</view>
		      <view class="margin-top-sm">
		        <text class="cuIcon-fork"></text>粉丝数</view>
		    </view>
		    
		  </view>
		  
		  <!-- 九宫格 -->
		  <view class="cu-list grid margin-top" :class="['col-' + gridCol,gridBorder?'':'no-border']">
		  	<view @tap="toElsePage(index)" class="cu-item" v-for="(item,index) in cuIconList" :key="index" v-if="index<gridCol*2">
		  		<view :class="['cuIcon-' + item.cuIcon,'text-' + item.color]">
		  			<view class="cu-tag badge" v-if="item.badge!=0">
		  				<block v-if="item.badge!=1">{{item.badge>99?'99+':item.badge}}</block>
		  			</view>
		  		</view>
		  		<text>{{item.name}}</text>
		  	</view>
		  </view>
		  <!-- ebd -->
		  
		  <!-- line -->
		  <view style="height: 1upx;width: 100%;background: #DCDCDC;"></view>
		  <!-- end -->
		
		
		<!-- 设置详细 -->
		 <view class="cu-list menu card-menu margin-top-xl margin-bottom-xl shadow-lg radius">
		    <view class="cu-item arrow">
		      <view class="content" @tap="toIssue_page">
		        <text class="cuIcon-moneybagfill text-red"></text>
		        <text class="text-grey">我的大学</text>
		          <text class='num'>毕节职业技术学院</text>
		      </view>
		    </view>
		
		   
		    <view class="cu-item arrow content">
		    <button class='cu-btn content' @click="clearAllStore">
		        <text class="cuIcon-creativefill text-orange"></text>
		        <text class="text-grey">清除缓存</text>
		   </button>
		    </view>
		      <view class="cu-item arrow">
		      <navigator class="content" url='/pages/message/message_chat/message_chat'  hover-class="none">
		        <text class="cuIcon-evaluate_fill text-orange"></text>
		        <text class="text-grey">客服中心</text>
		      </navigator>
		    </view>
		  </view>
		  <view class="cu-tabbar-height"></view>
		<!-- 设置详细end -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				userInfo:'',
				AttentionNum:'',//
				FansNum:'',//
				LikeNum:'',//
				// 九宫格
				cuIconList: [{
					cuIcon: 'cardboardfill',
					color: 'red',
					badge: 120,
					name: '我的发帖'
				}, {
					cuIcon: 'recordfill',
					color: 'orange',
					badge: 1,
					name: '我的评论'
				}, {
					cuIcon: 'picfill',
					color: 'yellow',
					badge: 0,
					name: '我的点赞'
				}, {
					cuIcon: 'appreciatefill',
					color: 'olive',
					badge: 22,
					name: '我的收藏'
				}, {
					cuIcon: 'upstagefill',
					color: 'cyan',
					badge: 0,
					name: '审核专区'
				}, {
					cuIcon: 'clothesfill',
					color: 'blue',
					badge: 0,
					name: '帮助与反馈'
				}, {
					cuIcon: 'discoverfill',
					color: 'purple',
					badge: 0,
					name: '管理员'
				}, {
					cuIcon: 'questionfill',
					color: 'mauve',
					badge: 0,
					name: '软件吐槽'
				}, {
					cuIcon: 'commandfill',
					color: 'purple',
					badge: 0,
					name: '问答'
				}, {
					cuIcon: 'brandfill',
					color: 'mauve',
					badge: 0,
					name: '版权'
				}],
				modalName: null,
				gridCol: 4,
				gridBorder: false,
			}
		},
		methods: {
			
			
			// 跳转简单封装
			toPage:function(url){
				uni.navigateTo({
					url:url
				})
			},
			
			// 跳转粉丝数量页面
			toFans:function(FansNum){
				console.log(FansNum)
				if(FansNum == 0 || FansNum == null || FansNum == undefined){
					this.$refs['Message'].info({
						content:'你暂时还没粉丝哦~',
						duration:2000,
						background:false
					})
				}else{
					this.toPage('/pages/my/my_fans/my_fans');
				}
				
			},
			toAttention:function(num){
				if(num == 0 || num == null || num == undefined){
					this.$refs['Message'].info({
						content:'你还没关注别人哦~',
						duration:2000,
						background:false
					})
				}else{
					this.toPage('/pages/my/my_attention/my_attention');
				}
				
				// this.toPage('/pages/my/my_attention/my_attention');
			},
			
			// 九宫格调转
			toElsePage:function(index){
				if(index == 0){//我的发帖
					this.toPage('/pages/my/my_issue/my_issue');
				}else if(index == 1){//我的评论
					this.toPage('/pages/my/my_comment/my_comment');
				}else if(index == 2){//我的点赞
					this.toPage('/pages/my/my_like/my_like');
				}else if(index == 3){//我的收藏
					this.toPage('/pages/my/my_collect/my_collect');
				}else if(index == 4){//审核专区
					this.toPage('/pages/my/my_audit/my_audit');
				}else if(index == 5){//帮助与反馈
					
				}else if(index == 6){//管理员
					
				}else if(index == 7){//软件吐槽
					this.toPage('/pages/my/my_tweet/my_tweet');
				}
			},
			
			
			
			// 跳转我的详细页面
			toMyInfo:function(){
				var like = this.LikeNum;
				var AttentionNum = this.AttentionNum;
				var FansNum =  this.FansNum;
				var name = this.userInfo.nickName;
				var avatarUrl = this.userInfo.avatarUrl;
				uni.navigateTo({
					url:"/pages/my/my_info/my_info" + '?likeNum=' + like + '&AttentionNum=' + AttentionNum +'&FansNum=' +FansNum + '&name=' + name +'&avatarUrl=' + avatarUrl 
				})
			},
			
			  // 清除全部缓存
			  clearAllStore:function(res){
			      uni.showModal({
			        title: '清除缓存',
			        content: '是否要清除全部缓存!',
			        success:function(res){
			          if (res.confirm){
			                uni.clearStorage({
			                      success: function (res) {
			                        uni.showToast({
			                          title: '清除成功',
			                          duration: 1000
			                        })
			                      },
			                      fail: function (res) {
			                        uni.showToast({
			                          title: '清除失败',
			                          icon: 'none',
			                          duration: 1000
			                        })
			                      }
			                    });
			          }
			       
			        }
			       
			      })
			
			  },
			  
			  // 我的发布跳转
			  toIssue_page:function(){
				  uni.navigateTo({
				  	url:"/pages/my/my_shcool/my_shcool"
				  })
			  },
			  // 得到关注数量
			 getAttentionNum:function(){
				 uni.request({
				 	url:this.tui.interfaceUrl() + 'getFocusNum',
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.code == 1){
							this.AttentionNum = res.data.data;
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络开小差了~关注数量查询失败！',
							duration:2000,
							background:false
						})
					}
				 })
			 },
			 //得到粉丝数量
			 getFansNum:function(){
				uni.request({
					url:this.tui.interfaceUrl() + 'getFansNum',
						header:this.tui.getHeader(),
						success: (res) => {
							if(res.data.code == 1){
								this.FansNum = res.data.data;
							}
						},
						fail: (err) => {
							this.$refs['Message'].error({
								content:'网络开小差了~粉丝数量查询失败！',
								duration:2000,
								background:false
							})	
						}
				}) 
			 },
			 //得到超赞数量
			 getLikeNum:function(){
				uni.request({
					url:this.tui.interfaceUrl() + 'getLikeNum',
						header:this.tui.getHeader(),
						success: (res) => {
							if(res.data.code == 1){
								this.LikeNum = res.data.data;
							}
						},
						fail: (err) => {
							this.$refs['Message'].error({
								content:'网络开小差了~超赞数量查询失败！',
								duration:2000,
								background:false
							})
						}
				}) 
			 },
			 
			 getUserInfo:function(){
				this.userInfo =  uni.getStorageSync('userInfo');
			 }
			 

		},
		onLoad(options) {
			// 得到用户信息
			this.getUserInfo();
			 // 得到关注数量
			 this.getAttentionNum();
			  //得到粉丝数量
			  this.getFansNum();
			  //得到超赞数量
			  this.getLikeNum();
		},
		onShow(){
			
		}
		
	}
</script>

<style>

/* pages/my/my.wxss */
/* 用户信息 */


.UCenter-bg {
  background-image: url(https://image.weilanwl.com/color2.0/index.jpg);
  background-size: cover;
  height: 450rpx;
  display: flex;
  justify-content: center;
  padding-top: 40rpx;
  overflow: hidden;
  position: relative;
  flex-direction: column;
  align-items: center;
  color: #fff;
  font-weight: 300;
  text-shadow: 0 0 3px rgba(0, 0, 0, 0.3);
}

.UCenter-bg text {
  opacity: 0.8;
}

.UCenter-bg image {
  width: 200rpx;
  height: 200rpx;
}

.UCenter-bg .gif-wave{
  position: absolute;
  width: 100%;
  bottom: 0;
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  left: 0;
  z-index: 99;
  mix-blend-mode: screen;  
  height: 100rpx;   
}

map,.mapBox{
  width: 750rpx;
  height: 300rpx;
}
.text-xl image{
  height: 100rpx;
  width: 100rpx;
}
.png{

  border-radius: 100%;
}


.num{
  direction: rtl;
  margin-left: 30%;
  font-size: 25rpx;
  }
</style>
