<template>
	<view>
		
		<!-- 自定义头部 -->
		<view class="fixed" >
			<cu-custom :isBack="true" :bgColor=" navBack"  >
				<block slot="backText">返回</block>
				<block slot="content">{{options.name}}</block>
			</cu-custom>
		</view>
		<!-- end -->
		
		<message ref="Message"></message>
		
		<!-- image -->
		<view class="bg-image" style="filter: blur(18rpx);">
			<image :src="options.avatarUrl" style="width: 100%;height: 30vh;" mode=""></image>
		</view>
		<!-- end -->
		
		<view class="containers">
			
		<!-- top -->
		<view class="header" >
			
			<view class="image">
				<image :src="options.avatarUrl" mode=""></image>
			</view>
			
			
			<view class="attention" v-if="options.uid == '' || options.uid == null || options.uid == undefined ? false : true">
				<button @tap='attention(is_focus)' class="cu-btn round " :class="[is_focus ? 'line-red' : 'line-black']" role="button" aria-disabled="false">{{is_focus ? '取消' : '关注'}}</button>
			</view>
			
		</view>
		<!-- top end -->
		
		<view class="text-desc" >
			<text>
				{{options.name}}
			</text>
		</view>
		
		
		<view class="buttonType">
			
			<view class="" style="width: 18%;">
				<text>{{options.likeNum == '' ||options.likeNum == null ||options.likeNum == undefined ? '0' : options.likeNum }} 获赞</text>
			</view>
			
			<view class="" style="height: 20upx;width: 2upx; background: #D2F1F0;margin-right: 10upx;">	</view>
				
			<view class="" style="width: 18%;">
				<text>{{options.AttentionNum == '' || options.AttentionNum == null ||options.AttentionNum == undefined ? '0' : options.AttentionNum  }} 关注</text>
			</view>
			
			<view class="" style="height: 20upx;width: 2upx; background: #D2F1F0;margin-right: 20upx;">	</view>
			<view class="" style="width: 20%;">
				<text>{{options.FansNum == '' || options.FansNum == null || options.FansNum == undefined ? '0' : options.FansNum }} 粉丝</text>
			</view>
			
			
		</view>
		
		
		</view>
		<!-- containers end -->
		
		
		
		<!-- line -->
		<view class="" style="background:#DDDDDD; width: 100%; height: 20upx;"></view>
		<!-- end -->
		
		<!-- 导航栏 -->
		<view class="tui-mtop " :class="navFiex" :style=" 'top:' + navFiexH + 'px;' " >
			<tui-tabs id="navTop" :tabs="tabs2" :height="88" :currentTab="currentTab" :sliderWidth="150" :sliderHeight="60" :bottom="14" color="#888" selectedColor="#11CDFC" :bold="true" sliderBgColor="#E5FAFF" @change="change"></tui-tabs>
		</view>
		<!-- end -->
		
		<skeleton :loading="loading" :imgTitle="true" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showAvatar="true" :nameRow="6" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showTitle="true" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showTitle="true" >
			
			<!-- 内容 -->
			   <view class="margin-right-sm margin-left-sm" v-if="currentTab != 1">
				   
			<!-- 内容 -->
			   <view class="margin-right-sm margin-left-sm" >
				   
				<view class='contianer shadow-warp bg-white' v-for="(item,index) in data" :key="index">
				<view class='contianer-title'>
				<view class='contianer-title_image'> <image :src='item.head_img'></image></view>
				<view class='contianer-name'>{{item.u_nickname}}</view>
				<view style="font-size: 28upx; padding-left: 250upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.school_name}}</view>
				</view>
			
				<view class='contianer-content'>
				<text>{{item.content}}</text>
				</view>
			
				<view class='container-grid'>
				<view @tap='previewImg(item.image,ImageIndex)' :data-index='index' :class=" index == 2 || index == 5 || index == 8  ? '' : item.image.length == 4 ?'' : item.image.length == 1 ? 'container-grid_image-1':'container-grid_image' "  :style="item.image.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(ImageTime,ImageIndex) in item.image" :key="ImageIndex">
				<image :src='ImageTime.img' :style="item.image.length == 1 ? 'width:100%;' :'' " :class="item.image.length == 1 ? 'container-grid_img' : 'container-grid__image' " ></image>
				<!-- width:100%; -->
				</view>
				</view>
			
				<view class='container-evaluate bg-gray' v-if="item.comment[0] == null ? false : true ">
				<view class='container-evaluate-top'>
				<view class='container-evaluate-top_1'> <image src='../../../static/hot_evaluate1.png'></image></view>
				<view>{{item.comment[0].comment_like == null ? '0' : item.comment[0].comment_like}} <text class='text-sm'>赞</text></view>
				</view>
				<view class='container-evaluate-desc'><text class='text-sm text-weight '>{{item.comment[0].content}}</text></view>
				</view>
			
				<view class='container-comment '>
				<view><text class='cuIcon-share lg text-black'> 分享</text></view>
				<view @tap='toDiscover_desc(item.u_nickname,item.head_img,item.content,index)'><text class='cuIcon-message lg text-black'>{{item.comment_count == null ? '' : item.comment_count }}</text></view>
				<view><text class='cuIcon-appreciatefill lg text-red'></text><text> {{item.card_like_count}}</text></view>
				</view>
				
				<!-- 话题分类 -->
				<view class="topic" @tap="toTopic">
					
					
					<view class="" style="width: 40%;color: #007AFF;">
						<text># 校园话题</text>
					</view>
					
					<view class="" style="width: 35%;color:#2E2E2E;">
						9.8W人热议中
					</view>
					
					<view class="" >
						
						  <view class="cu-avatar-group">
						    <view class="cu-avatar img-size round sm"  v-for="(item,index) in 3" :key="index" :style=" 'background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big1000' + [index+1] +'.jpg);' "></view>
						  </view>
								
						
					</view>
					
				</view>
				<!-- end -->
				
				</view>
				
				</view>
			<!-- end -->
				</view>
			<!-- end -->
			
			<view class="" v-if="currentTab==1">
				
				<!-- 内容 -->
				   <view class="margin-right-sm margin-left-sm" v-for="(item,index) in data" :key="index">
					   
					<view class='contianer shadow-warp bg-white' >
					<view class='contianer-title'>
					<view class='contianer-title_image'> <image :src='item.img'></image></view>
					<view class='contianer-name'>{{item.name}}</view>
					<view style="font-size: 28upx; padding-left: 250upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.school[0].school_name}}</view>
					</view>
				
					<view class="centent">
						回复<text style="color: red;">{{item.common[0].name}}</text>: {{item.content}}
					</view>
					
					
					<view class="centent_image" v-if="item.centent_image == '' || item.centent_image == null || item.centent_image == undefined ? false : true">
						<image :src="item.centent_image" mode=""></image>
					</view>
					
					<view class="hitMsg" v-if="item.common[0].centent_image == '' || item.common[0].centent_image == null || item.common[0].centent_image == undefined ? false : true">
						<view class="hitMsg_image">
							<image :src="item.common[0].centent_image" mode=""></image>
						</view>
						
						<view class="hitMsg_text" style="margin-left: 20upx;">
							{{item.common[0].content}}
						</view>
					</view>
				
					</view>
					
					</view>
				<!-- end -->
				
				</view>
			
		</skeleton>
		
	</view>
</template>

<script>
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	import tuiIcon from "../../component/icon/icon.vue";
	import tuiTabs from "../../component/tui-tabs/tui-tabs.vue";
	export default {
		components:{tuiIcon,tuiTabs,skeleton},
		data() {
			return {
				uid:'',
				data:[],
				loading:true,
				head_img:'',
				nick_name:'',
				AttentionNum:'',//
				FansNum:'',//
				LikeNum:'',//
				is_focus:false,
				options:{},//初始化对象
				label:'',//导航栏标题 
				navBack:'',//导航栏背景颜色
				
				navFiexH:0,//导航栏高度
				navFiex:'',//吸附置顶css
				//图片
				  imgArr: [
				    'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				  ],
				  // end
				currentTab: 0,
				tabs2: [{
					name: "帖子"
				}, {
					name: "评论"
				}, {
					name: "点赞"
				}, {
					name: "收藏",
				}
				],
				
				newsList: [
					"致力发展负责任的人工智能 中国发布八大治理原则",
					"格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气",
					"阿里计划将每股普通股拆为8股，增加筹资灵活性"
				],
			}
		},
		methods: {
			
			previewImg:function(img,index){
				var data = [];
				for (var i = 0; i < img.length; i++) {
					data.push(img[i].img);
				}
				uni.previewImage({
					current:index ,
					urls:data,
					loop:true,
					success: () => {
						
					},
					fail: () => {
						
					}
					
				})
			},
			
			// 滚动广告点击
			detail(index) {
				uni.showToast({
					title:`下标${index}`,
					icon:"none",
					duration:2000
				})
			},
			// 导航栏点击事件
			change(e) {
				this.currentTab = e.index
				if(e.index == 0){
					this.loading = true;
					this.getData(e.index);
				}else if(e.index == 1){
					this.loading = true;
					this.getData(e.index);
				}else if(e.index == 2){
					this.loading = true;
					this.getData(e.index);
				}else if(e.index == 3){
					this.loading = true;
					this.getData(e.index);
				}
			},
			
			// 详细跳转
			toDiscover_desc:function(e){
			  uni.navigateTo({
				url:"/pages/home/home_desc/home_desc"
			  })
			},
			
			// 关注按钮点击
			attention:function(is_focus){
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
			
			SaveFocusUser:function(){
			  uni.request({
				url:this.tui.interfaceUrl() +'user/SaveFocusUser',
				data:{
					focus_id:this.options.uid
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
						focus_id:this.options.uid
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
			
			//获取用户关注状态
			getUserIsFocus(uid){
			  uni.request({
				url:this.tui.interfaceUrl() +'user/getIsFocus',
				data:{
					focus_id:uid
				},
				header:this.tui.getHeader(),
				success: (res) => {
					if(res.data.data == 1){//关注
						this.is_focus = true;
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
			
			// 查询用户信息
			getUserinfo:function(uid){
				uni.request({
					url:this.tui.interfaceUrl() +'user/get',
					data:{
						focus_id:uid
					},
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.code == 1){//关注
							var data = res.data.data;
							var head_img = data.head_img;
							var nick_name = data.nick_name;
							var option = {
								avatarUrl:head_img,
								name:nick_name
							}
							this.options = option;
							this.head_img = head_img;
							this.nick_name = nick_name;
						}else{
							this.$refs['Message'].error({
								content:'网络不给力，请稍后再试~',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络不给力，请稍后再试~',
							duration:2000,
							background:false
						})
					}
				})
					
			},
			// 得到关注数量
			getAttentionNum:function(uid){
				 uni.request({
					url:this.tui.interfaceUrl() + 'getFocusNumTo',
					data:{
						uid:uid
					},
					success: (res) => {
						if(res.data.code == 1){
							this.AttentionNum = res.data.data;
								var option = {
									avatarUrl:this.head_img,
									name:this.nick_name,
									AttentionNum:res.data.data,
									FansNum:this.FansNum,
									likeNum:this.LikeNum
								}
								this.options = option;
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
			getFansNum:function(uid){
				uni.request({
					url:this.tui.interfaceUrl() + 'getFansNumTo',
					data:{
						uid:uid
					},
						success: (res) => {
							if(res.data.code == 1){
								this.FansNum = res.data.data;
								var option = {
									avatarUrl:this.head_img,
									name:this.nick_name,
									AttentionNum:this.AttentionNum,
									FansNum:res.data.data,
									likeNum:this.LikeNum
								}
								this.options = option;
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
			getLikeNum:function(uid){
				uni.request({
					url:this.tui.interfaceUrl() + 'getLikeNumTo',
					data:{
						uid:uid
					},
						success: (res) => {
							if(res.data.code == 1){
								this.LikeNum = res.data.data;
								var option = {
									avatarUrl:this.head_img,
									name:this.nick_name,
									AttentionNum:this.AttentionNum,
									FansNum:this.FansNum,
									likeNum:res.data.data
								}
								this.options = option;
								console.log(this.options);
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
			
			getData(type){
				uni.request({
					url:this.tui.interfaceUrl() + 'getMyDescAllOrToDate',
					method:'GET',
					data:{
						uid:this.uid,
						type:type
					},
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data;	
							this.loading = false;
						}else{
							this.$refs['Message'].error({
								content:'网络不给力，请稍后再试~',
								duration:2000,
								background:false
							})
						}
					
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络不给力，请稍后再试~',
							duration:2000,
							background:false
						})
					}
				})
				
			},
			
			
		},
		onLoad:function(options){
			this.uid = options.uid;
			this.getData(0);
			var  is_user = options.uid;
			// 查询自己的
			if(is_user == '' ||is_user ==null || is_user == undefined){
				this.options = options;
				
			}else{//查询别人的
				this.getUserIsFocus(options.uid);
				//获取用户信息
				this.getUserinfo(options.uid);
				// 得到关注数量
				this.getAttentionNum(options.uid);
				 //得到粉丝数量
				 this.getFansNum(options.uid);
				 //得到超赞数量
				 this.getLikeNum(options.uid);
			}
			
			this.navFiexH = this.CustomBar;
		},
		onShow:function(){
			
			
		},
		onReady:function(){
			
		},
		
		onPageScroll:function(e){
			
			// bg-gradual-blue
			
			if(e.scrollTop >= 222){
				this.navFiex = 'navFiex';
				this.navBack = 'bg-gradual-blue';
				this.label = '标签'
			}else{
				this.navFiex = '';
				this.navBack = '';
				this.label = ''
			}
		}
		
		
		
	}
</script>

<style>
	.navFiex{
		position: fixed;
		width: 100%;
		z-index: 9999;
	}
	
	.contianer-title_image image{
	  height: 50rpx;
	  width: 50rpx;
	  border-radius: 100%;
	}
	.topic{
		padding: 10upx;
		width: 100%;
		display: flex;
		align-items: center;
		background:linear-gradient(45deg, #39b54a, #8dc63f);
		border-radius: 10upx;
		
	}
	
	.navFiex{
		position: fixed;
		width: 100%;
		z-index: 9999;
	}
	.tui-rolling-news {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-wrap: nowrap;
	}
	
	.tui-swiper {
		font-size: 28upx;
		height: 50upx;
		flex: 1;
	}
	
	.tui-swiper-item {
		display: flex;
		align-items: center
	}
	
	.tui-news-item {
		line-height: 28upx;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
	
	.containers{
		position: absolute;
		/* #ifdef MP-WEIXIN || H5 */
		top: 6vh;
		/* #endif */
		
		/* #ifdef MP-QQ */
		top: 10vh;
		/* #endif */
		padding: 20upx;
		width: 100%;
	}
	
.fixed {
		position: fixed;
		z-index: 99;
	}
	.image image{
		width: 150upx;
		height: 150upx;
		border-radius: 100%;
	}
	
	.title-desc{
		display: flex;
	}
	.title-desc text{
		font-size: 25upx;
	}
	.header{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 100%;
	}
	.title{
		width: 70%;
		color: white;
	}
	.title-title{
		font-size: 28upx;
	}
	.title-desc-centent{
		margin-left: 20upx;
	}
	.text-desc{
		font-size: 26upx;
		color: white;
		margin-left: 3.6%;
		margin-top: 10upx;
	}
	
	.buttonType{
		margin-top: 10upx;
		width: 100%;
		padding: 20upx;
		color: white;
		font-size: 30upx;
		display: flex;
		/* justify-content: space-between; */
	}
	
	
	/* 内容 */
	.contianer{
	  height: auto;
	  width: 100%;
	  padding: 20rpx;
	  border-radius: 20rpx;
	  margin-bottom: 20rpx;
	  margin-top: 20rpx;
	}
	.contianer-title{
	  display: flex;
	  align-items: center;
	}
	.contianer-name{
	  margin-left: 20rpx;
	  font-size: 25rpx;
	  color: black;
	}
	.contianer-content{
	  margin-top: 10rpx;
	  width: 100%;
	  display: -webkit-box;
	  overflow: hidden;
	  -webkit-line-clamp: 6;
	  -webkit-box-orient: vertical;
	}
	.contianer-content text{
	  font-size: 30rpx;
	  color: black;
	}
	.container-grid{
	  display: flex;
	  flex-wrap: wrap;
	  margin-top: 20rpx;
	  width: 100%;
	}
	.container-grid__image{
	  height: 210rpx;
	  width: 210rpx;
	  border-radius: 10rpx;
	}
	.container-grid_img{
	  width: 223rpx;
	  border-radius: 10rpx; 
	}
	.container-grid_image{
	  margin-right: 10rpx;
	  width: 31%;
	}
	.container-grid_image-1{
	   margin-right: 10rpx;
	  width: 100%;
	}
	.container-evaluate{
	  margin-top: 20rpx;
	  width: 100%;
	  height: auto;
	  border-radius: 20rpx;
	  padding: 20rpx;
	}
	.container-evaluate-top_1 image{
	  width: 75rpx;
	  height: 40rpx;
	}
	.container-evaluate-top{
	  display: flex;
	  justify-content: space-between;
	  align-items: center;
	}
	.container-evaluate-desc{
	  width: 100%;
	  display: -webkit-box;
	  overflow: hidden;
	  -webkit-line-clamp: 2;
	  -webkit-box-orient: vertical;
	
	}
	.container-comment{
	  margin-top: 20rpx;
	}
	.container-comment{
	  padding: 20rpx;
	  display: flex;
	  justify-content: space-between;
	}
	
	.centent{
		padding: 20upx;
	}
	.centent_image image{
		width: 250upx;
		height: 250upx;
	}

	.hitMsg_image image{
		height: 100upx;
		width: 100upx;
	}
	
	.hitMsg{
		display: flex;
		align-items: center;
		background: #EEEEEE;
		margin-top: 20upx;
		padding: 10upx;
	}
	.hitMsg_text{
		overflow: hidden;
		text-overflow: ellipsis;
		white-space: nowrap;
	}
	/* end */
	
	.bg-browns{
		background: linear-gradient(45deg, #39b54a, #8dc63f);
	}
</style>
