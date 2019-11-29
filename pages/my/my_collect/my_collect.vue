<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
		<message ref="Message"></message>
		
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
					
					<view class="" style="width: 100%;color: #007AFF;display: flex;justify-content: center;">
						<text># 校园话题</text>
					</view>
					
				</view>
				<!-- end -->
				
				</view>
				
				</view>
			<!-- end -->
			
		</skeleton>
		
		
		
	</view>
</template>

<script>
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	export default {
		components:{skeleton},
		data() {
			return {
				loading:true,
				data:[],
				
				//图片
				  imgArr: [
				    'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
					// 'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				  ],
				  // end
			}
		},
		methods: {
			// 跳转话题页面
			toTopic:function(){
				uni.navigateTo({
					url:"/pages/home/home_topic/home_topic"
				})
			},
			
			// 详细跳转
			toDiscover_desc:function(e){
				  uni.navigateTo({
					url:"/pages/home/home_desc/home_desc"
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
		onLoad(optins) {
			this.getData(3);
		}
	}
</script>

<style>
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
	
	.topic{
		padding: 10upx;
		width: 100%;
		display: flex;
		align-items: center;
		background:linear-gradient(45deg, #39b54a, #8dc63f);
		border-radius: 10upx;
	}
</style>
