<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
			 <skeleton
			          :loading="loading"
			          :imgTitle="true"
			        >
			</skeleton>
					
			<skeleton
					 :loading="loading"
					 :imgTitle="true"
				   >
		   </skeleton>
						   
						   
		   <skeleton
					:loading="loading"
					:imgTitle="true"
				  >
		  </skeleton>
		  
		  <skeleton
		  					:loading="loading"
		  					:imgTitle="true"
		  				  >
		  </skeleton>
								  
		  <skeleton 
				   :loading="loading"
				   :imgTitle="true"
				 >
				 
				 <!-- 搜索 -->
				 <view class="cu-bar search bg-white">
				 	<view class="search-form round">
				 		<text class="cuIcon-search"></text>
				 		<input @tap="toSearch" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				 	</view>
				 <view class="action">
				 	<button class="cu-btn bg-green shadow-blur round">搜索</button>
				 </view>
				 </view>
				 <!-- end -->
				 
				 <!-- 没有数据时提示 -->
				 <view class="containers_hide" style="width: 100%;" v-if="state">
					
					<view class="centent_image">
						<image src="../../../static/logo.png" mode=""></image>
					</view>
					
					<view class="" @tap="onclickToCreateShcool">
						<button class="cu-btn bg-green shadow-blur round ">添加发布</button>
					</view>
					
				 </view>
				 <!-- end -->
				 
				 <!-- 大学标题 -->
				 <view  style="padding: 20upx;" v-if="!state">
					
					<view class="bg-white containers  shadow shadow-lg" v-for="(item,index) in datas" :key="index">
						<view class="containers_image">
							<image :src="item.head_img"></image>
						</view>
						
						<view class="containers_text">
							
							<view class="">
								{{item.school_name}}
							</view>
							
							<view class="">
								<text>作品数量：{{item.total_card == null ? 0 : item.total_card }}</text>
							</view>
							
						</view>
						
						<view class="">
							<button @click="selectSchool(item.id,item.school_name)" class="cu-btn bg-green shadow-blur round sm" >选择</button>
						</view>
						
					</view>
				 </view>
				 <!-- end -->
						
				 </skeleton>
		
				
				
				
		
		
		
		
	</view>
</template>

<script>
	import Skeleton  from '../../../components/J-skeleton/J-skeleton.vue';
	export default {
		components:{Skeleton},
		data() {
			return {
				 loading: true,
				      skeleton : {
				        avatarSize: '50px',
				        row: 2,
				        showTitle: true,
						space_between :'space-around',
						avatarShape:"round",
				      },
					  datas:[],//数据
				
				state:false,//false 显示数据 没有数据是 改为true
			}
		},
		methods: {
			// pages/discover/dis_issue_school/dis_issue_school
			
			onclickToCreateShcool:function(){
				uni.navigateTo({
					url:'/pages/discover/dis_issue_school/dis_issue_school'
				})
			},
			
			// http://www.t.com/v1/school/getALLSchool?token=$2y$10$4EwRiYmHQdJsWtcF2Zbb5OKdpYIoKbdCmgfyVQHZL6fGYq//ehYXa&type=1
			//获取所有大学
		
		// 选择学校
			selectSchool:function(id,name){
				uni.setStorage({
					key:'c_school',
					data:{
						id:id,
						school:name
					},
					success() {
						uni.navigateBack({
							delta:1
						})
					}
				})
				
				// 
			}
		},
		onLoad() {
				this.tui.request('school/getALLSchool',{},'GET','',false).then((res,err) => {
					if(res.code == 1){
						this.datas = res.data	
						}
						console.log(this.datas)
					this.loading = false;
					
				});
		},
		onShow(){
			
		}
	}
</script>

<style>
	
	page{
		background: #F1F1F1;
	}
	
	.centent_image image{
		width: 200upx;
		height: 200upx;
	}
	.containers_hide{
		margin-top: 48%;
		display: flex;
		flex-direction: column;
		align-items: center;
	}
	
	
	.containers{
		width: 100%upx;
		padding: 20upx;
		margin-top: 10upx;
		border-radius: 20upx;
		display: flex;
		align-items: center;
		margin-bottom: 20upx;
	}
	.containers_image image{
		width: 100upx;
		height: 100upx;
		border-radius: 100%;
	}
	.containers_image{
		width: 18%;
	}
	
	.containers_text{
		font-size: 25upx;
		width: 70%;
	}
	
	
	
	
</style>
