<template>
	<view>
		
		<!-- 自定义头部 -->
		<view class="fixed" >
			<cu-custom :isBack="true" :bgColor="navBack" >
				<block slot="backText">返回</block>
				<block slot="content">{{label}}</block>
			</cu-custom>
		</view>
		<!-- end -->
		
		<!-- image -->
		<view class="bg-image" style="filter: blur(18rpx);">
			<image src="../../../static/2.jpg" style="width: 100%;height: 30vh;" mode=""></image>
		</view>
		<!-- end -->
		<message ref="Message"></message>
		
		<view class="containers">
			
		<!-- top -->
		<view class="header" >
			
			<view class="image">
				<image :src="img" mode=""></image>
			</view>
			
			
			<view class="attention">
				<uni-button @tap="but_click(is_keep)"  class="cu-btn round  " :class="[is_keep ? 'line-red' : 'line-blue']" >{{is_keep ? '取消' : '关注'}}</uni-button>
			</view>
		</view>
		<!-- top end -->
		
		<view class="text-desc" >
			<text>
				Ambition
			</text>
		</view>
		
		
		<view class="buttonType">
			
			<view class="buttonType_one animated wobble " style="width: 18%;">
				<view class="text-num">
					<text>{{SchoolPostMsg == 0 ? '0' : SchoolPostMsg}}</text>
				</view>
				<view class="text-title">
					发帖数
				</view>
			</view>
			
			
			<view class="buttonType_one  animated wobble" style="width: 18%;">
				<view class="text-num">
					<text>{{SchoolFocusNum == 0 ? '0' : SchoolFocusNum}}</text>
				</view>
				<view class="text-title">
					关注数
				</view>
			</view>
			
			<view class="buttonType_one  animated wobble" style="width: 18%;">
				<view class="text-num">
					<text>{{SchoolCommentNum == 0 ? '0' : SchoolCommentNum}}</text>
				</view>
				<view class="text-title">
					评论数
				</view>
			</view>
			
			<view class="buttonType_one  animated wobble" style="width: 18%;">
				<view class="text-num">
					<text>{{ShoolFlowNum == 0 ? '0' : ShoolFlowNum}}</text>
				</view>
				<view class="text-title">
					访问数
				</view>
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
					<view @tap='previewImg(item.image,ImageIndex)' :data-index='index' :class=" index == 2 || index == 5 || index == 8  ? '' : imgArr.length == 4 ?'' : imgArr.length == 1 ? 'container-grid_image-1':'container-grid_image' "  :style="imgArr.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(ImageTime,ImageIndex) in item.image" :key="ImageIndex">
					<image :src='ImageTime.img' :style="imgArr.length == 1 ? 'width:100%;' :'' " :class="imgArr.length == 1 ? 'container-grid_img' : 'container-grid__image' " ></image>
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
				
			</skeleton>
		
		
		
			
		</view>
		
		
		
	</view>
</template>

<script>
	import tuiIcon from "../../component/icon/icon.vue";
	import tuiTabs from "../../component/tui-tabs/tui-tabs.vue";
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	export default {
		components:{tuiIcon,tuiTabs,skeleton},
		data() {
			return {
				sid:'',//学校id
				data:[],//数据
				loading:true,
				SchoolPostMsg:'',//发帖数
				SchoolFocusNum:'',//关注数量
				SchoolCommentNum:'',//评论数量
				ShoolFlowNum:'',//访问数量
				label:'清华大学',//导航栏标题 
				img:'',//大学头像，
				is_keep:'',//关注状态
				navBack:'',//导航栏背景颜色
				navFiexH:0,//导航栏高度
				navFiex:'',//吸附置顶css
				//图片
				  imgArr: [
				    'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
					'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
					'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				  ],
				  // end
				currentTab: 0,
				tabs2: [{
					name: "全部"
				}, {
					name: "最新"
				}, {
					name: "最热"
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
			
			// 点击关注/取消
			but_click:function(bool){
				if(bool){//关注
					//取消关注
					this.is_keep = false;
					this.DeletedFocusSchool();
					
				}else{//未关注
					this.is_keep = true;
					this.SaveFocusSchool();
				}
			},
			
			// 点击关注
			SaveFocusSchool:function(){
					uni.request({
						url:this.tui.interfaceUrl() +'school/SaveFocusSchool',
							data:{
								sid:this.sid
							},
							header: {
							    "content-type": "application/json",
							    'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
							},
							method:"GET",
							success: (res) => {
								if(res.data.code == 1){
									this.$refs['Message'].success({
										content:'关注成功',
										duration:2000,
										background:false
									})
								}else{
									this.is_keep = false;
									this.$refs['Message'].error({
										content:'关注失败',
										duration:2000,
										background:false
									})
								}
							},
							fail: (err) => {
								this.is_keep = true;
								this.$refs['Message'].error({
									content:'关注失败！',
									duration:2000,
									background:false
								})
							}
						})
				},
			
			// 取消关注这个学校
			DeletedFocusSchool:function(){
				uni.request({
					url:this.tui.interfaceUrl() +'school/DeletedFocusSchool',
					data:{
						sid:this.sid
					},
					header: {
					    "content-type": "application/json",
					    'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
					},
					method:"GET",
					success: (res) => {
						if(res.data.code == 1){
							this.$refs['Message'].success({
								content:'取消关注成功',
								duration:2000,
								background:false
							})
						}else{
							this.$refs['Message'].error({
								content:'取消关注失败',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.is_keep = true;
						this.$refs['Message'].error({
							content:'取消关注失败！',
							duration:2000,
							background:false
						})
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
				if(e.index == 0){
					this.getSchoolDescALL();
				}else if(e.index == 1){
					this.getschoolDescNew();
				}else if(e.index == 2){
					this.getSchoolDescHot();
				}
				console.log(e);
				this.currentTab = e.index
			},
			
			// 详细跳转
			toDiscover_desc:function(name,head,content,index){
				var img = this.data[index].image;
				console.log(img);
				var uid = this.data[index].uid;
				var id = this.data[index].id;
				var time = this.data[index].created_at;
				var comment_count = this.data[index].comment_count; 
				var imgData = [];
				var sid = this.data[index].sid;
				// console.log(this.data[index]);
				for (var i = 0; i < img.length; i++) {
						imgData.push(img[i].img)
				}
			  uni.navigateTo({
				url:'/pages/home/home_desc/home_desc' + '?name=' +name +'&head=' + head + '&content=' + content +'&img='+imgData +'&uid='+uid +'&id=' +id +'&time=' +time +'&comment_count=' + comment_count + '&sid=' + sid
			  })
			},
			
			// 跳转话题页面
			toTopic:function(){
				uni.navigateTo({
					url:"/pages/home/home_topic/home_topic"
				})
			},
			// 获取发帖数
			getSchoolPostMsg:function(sid){
				uni.request({
					url:this.tui.interfaceUrl() +'school/schoolPostMsg',
					data:{
						sid:sid
					},
					method:"GET",
					success: (res) => {
						if(res.data.code == 1){
							this.SchoolPostMsg = res.data.data.count;
							console.log(this.SchoolPostMsg);
							console.log(res.data.data.count);
						}else{
							this.$refs['Message'].error({
								content:'发帖数获取失败~请稍后再试',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'发帖数获取失败~请稍后再试',
							duration:2000,
							background:false
						})
					}
				})
			},
			// 获取关注数
			getSchoolFocusNum:function(sid){
				uni.request({
					url:this.tui.interfaceUrl() +'school/schoolFocusNum',
					data:{
						sid:sid
					},
					method:"GET",
					success: (res) => {
						if(res.data.code == 1){
							this.SchoolFocusNum = res.data.data.count;
						}else{
							this.$refs['Message'].error({
								content:'发帖数获取失败~请稍后再试',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'发帖数获取失败~请稍后再试',
							duration:2000,
							background:false
						})
					}
				})
			},
			// 获取评论数
			getSchoolCommentNum:function(sid){
				uni.request({
					url:this.tui.interfaceUrl() +'school/schoolFocusNum',
					data:{
						sid:sid
					},
					method:"GET",
					success: (res) => {
						if(res.data.code == 1){
							this.SchoolCommentNum = res.data.data.count;
						}else{
							this.$refs['Message'].error({
								content:'发帖数获取失败~请稍后再试',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'发帖数获取失败~请稍后再试',
							duration:2000,
							background:false
						})
					}
				})
			},
			// 获取访问数
			getsShoolFlowNum:function(sid){
				uni.request({
					url:this.tui.interfaceUrl() +'school/schoolFocusNum',
					data:{
						sid:sid
					},
					method:"GET",
					success: (res) => {
						if(res.data.code == 1){
							this.ShoolFlowNum = res.data.data.count;
						}else{
							this.$refs['Message'].error({
								content:'发帖数获取失败~请稍后再试',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'发帖数获取失败~请稍后再试',
							duration:2000,
							background:false
						})
					}
				})
			},
			
			//获取这个学校相关帖子
			getSchoolDescALL:function(sid){
				this.loading = true;
				uni.request({
					url:this.tui.interfaceUrl() + 'school/schoolDescALL',
					method:'GET',
					data:{
						sid:this.sid
					},
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data;	
							console.log('mmmmm');
							console.log(res.data.data)
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
			
			// 获取这个学校相关帖子最新数据
			getschoolDescNew(){
				this.loading = true;
				uni.request({
					url:this.tui.interfaceUrl() + 'school/schoolDescNew',
					method:'GET',
					data:{
						sid:this.sid
					},
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data;	
							// console.log(res.data.data)
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
			getSchoolDescHot:function(){
				this.loading = true;
				uni.request({
					url:this.tui.interfaceUrl() + 'school/schoolDescHot',
					method:'GET',
					data:{
						sid:this.sid
					},
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data;	
							console.log(res.data.data)
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
			}
			
			
		},
		onLoad:function(options){
			this.sid = options.sid;
			//获取这个学校相关帖子
			this.getSchoolDescALL(options.sid);
			// 获取发帖数
			this.getSchoolPostMsg(options.sid);
			// 获取关注数
			this.getSchoolFocusNum(options.sid);
			// 获取评论数
			this.getSchoolCommentNum(options.sid);
			// 获取访问数
			this.getsShoolFlowNum(options.sid);
			var name = options.name;
			var img = options.img;
			var keep = options.keep;//
			if(keep > 0){
				this.is_keep = true;
			}else{
				this.is_keep = false;
			}
			this.label = name;
			this.img = img;
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
				// this.label = 'bb';
			}else{
				this.navFiex = '';
				this.navBack = '';
				// this.label = 'cc'
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
		/* #ifdef H5 || MP-WEIXIN */
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
		
		display: flex;
		justify-content: space-between;
		margin-top: 20upx;
		
	}
	
	.buttonType_one{
		display: flex;
		align-items: center;
		flex-direction: column;
	}
	
	.text-num{
		font-size: 32upx;
	}
	.text-title{
		font-size: 26upx;
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
	  width: 215rpx;
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
