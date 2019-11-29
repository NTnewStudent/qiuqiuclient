<template>
	<view>
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
		<skeleton :loading="loading" :imgTitle="true" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showAvatar="true" :nameRow="6" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showTitle="true" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showTitle="true" ></skeleton>
		<skeleton :loading="loading" :imgTitle="false" :showTitle="true" >
			
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
			}
		},
		methods: {
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
		onLoad(option) {
			this.getData(1);
		}
	}
</script>

<style>
	.contianer-title_image image{
	  height: 50rpx;
	  width: 50rpx;
	  border-radius: 100%;
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
</style>
