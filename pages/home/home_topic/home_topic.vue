<template>
	<view>
		
		<!-- 自定义头部 -->
		<view class="fixed" >
			<cu-custom :isBack="true" :bgColor=" navBack"  >
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
		
		<view class="containers">
			
		<!-- top -->
		<view class="header" >
			
			<view class="image">
				<image src="../../../static/logo.png" mode=""></image>
			</view>
			
			<view class="title">
				
				<view class="title—title">
					<text>每日心情</text>
				</view>
				
				<view class="title-desc">
					
					<view class="title-desc-join">
						<text>加入：</text>
						<text>4.6W</text>
					</view>
					
					<view class="title-desc-centent">
						<text>内容：</text>
						<text>4.6W</text>
					</view>
					
				</view>
				
			</view>
			
			<view class="attention">
				<uni-button  class="cu-btn round line-blue sm">关注</uni-button>
			</view>
			
		</view>
		<!-- top end -->
		
		<view class="text-desc" >
			<text>
				kasjlfjasjsk啊可见度分厘卡即使房价爱上了案例会计法律框架sdfsadf 
			</text>
		</view>
		
		</view>
		<!-- containers end -->
		
		<!-- 广告条 -->
		<view class="ad">
			
		<!-- 	<view class="ad-text">
				<text>置顶</text>
			</view>
			<view class="ad-roll">
				12312
			</view> -->
			
			<view class="tui-rolling-news">
				<tui-icon  name="news-fill" :size='28' color='#5677fc'></tui-icon>
				<swiper autoplay circular :interval="3000" class="tui-swiper">
					<swiper-item v-for="(item,index) in newsList" :key="index" class="tui-swiper-item">
						<view class="tui-news-item" @tap='detail(index)'>{{item}}</view>
					</swiper-item>
				</swiper>
			</view>
			
		</view>
		<!-- end -->
		
		<!-- line -->
		<view class="" style="background:#DDDDDD; width: 100%; height: 80upx;"></view>
		<!-- end -->
		
		<!-- 导航栏 -->
		<view class="tui-mtop " :class="navFiex" :style=" 'top:' + navFiexH + 'px;' " >
			<tui-tabs id="navTop" :tabs="tabs2" :height="88" :currentTab="currentTab" :sliderWidth="150" :sliderHeight="60" :bottom="14" color="#888" selectedColor="#11CDFC" :bold="true" sliderBgColor="#E5FAFF" @change="change"></tui-tabs>
		</view>
		<!-- end -->
		
		
		<!-- 内容 -->
		   <view class="margin-right-sm margin-left-sm">
			   
			<view class='contianer shadow-warp bg-white' v-for="(item,index) in 10" :key="index">
			<view class='contianer-title'>
			<view class='contianer-title_image'> <image src='https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg'></image></view>
			<view class='contianer-name'>Amibition</view>
			<view style="font-size: 12upx; padding-left: 320upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">毕节职业技术学院</view>
			</view>
		
			<view class='contianer-content'>
			<text>士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生士大夫撒旦发射点发萨法沙发及时发送附件撒地方撒旦飞洒发生发生发生发生</text>
			</view>
		
			<view class='container-grid'>
			<view @tap='previewImg' :data-index='index' :class=" index == 2 || index == 5 || index == 8  ? '' : imgArr.length == 4 ?'' : imgArr.length == 1 ? 'container-grid_image-1':'container-grid_image' "  :style="imgArr.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(item,index) in imgArr" :key="item">
			<image :src='item' :style="imgArr.length == 1 ? 'width:100%;' :'' " :class="imgArr.length == 1 ? 'container-grid_img' : 'container-grid__image' " ></image>
			<!-- width:100%; -->
			</view>
			</view>
		
			<view class='container-evaluate bg-gray'>
			<view class='container-evaluate-top'>
			<view class='container-evaluate-top_1'> <image src='../../../static/hot_evaluate1.png'></image></view>
			<view>300 <text class='text-sm'>赞</text></view>
			</view>
			<view class='container-evaluate-desc'><text class='text-sm text-weight '>啊手动阀:按实际发生,分解凯撒就打发士大夫萨芬就是垃圾地方就是咖啡碱撒扩大啊手动阀按实际发生分解凯撒就打发士大夫萨芬就是垃圾地方就是咖啡碱撒扩大</text></view>
			</view>
		
			<view class='container-comment '>
			<view><text class='cuIcon-share lg text-black'> 分享</text></view>
			<view @tap='toDiscover_desc'><text class='cuIcon-message lg text-black'> 168</text></view>
			<view><text class='cuIcon-appreciatefill lg text-red'></text><text> 768</text></view>
			</view>
			
			
			</view>
			
			</view>
		<!-- end -->
		
		
		
	</view>
</template>

<script>
	import tuiIcon from "../../component/icon/icon.vue";
	import tuiTabs from "../../component/tui-tabs/tui-tabs.vue";
	export default {
		components:{tuiIcon,tuiTabs},
		data() {
			return {
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
					name: "全部"
				}, {
					name: "最新"
				}, {
					name: "最热"
				}],
				
				newsList: [
					"致力发展负责任的人工智能 中国发布八大治理原则",
					"格兰仕暗示拜访拼多多后遭天猫打压，拼多多高层赞其有勇气",
					"阿里计划将每股普通股拆为8股，增加筹资灵活性"
				],
			}
		},
		methods: {
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
			},
			
			// 详细跳转
			toDiscover_desc:function(e){
							  uni.navigateTo({
							  	url:"/pages/home/home_desc/home_desc"
							  })
			},
			
			
		},
		onLoad:function(options){
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
	.ad{
		display: flex;
		align-items: center;
		align-content: center;
		background: white;
		margin-left: 5%;
		width: 90%;
		padding: 15upx;
		border-radius: 10upx;
		position: absolute;
		top: 28vh;
		
	}
	.ad-roll{
		margin-top: 6upx;
		margin-left: 30upx;
	}
	.containers{
		position: absolute;
		top: 10vh;
		padding: 20upx;
	}
	
.fixed {
		position: fixed;
		z-index: 99;
	}
	.image image{
		width: 100upx;
		height: 100upx;
	}
	.image{
		width: 16%;
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
	.contianer-title_image image{
	  height: 50rpx;
	  width: 50rpx;
	  border-radius: 100%;
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
	  width: 32%;
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
	

	/* end */
	
	.bg-browns{
		background: linear-gradient(45deg, #39b54a, #8dc63f);
	}
</style>
