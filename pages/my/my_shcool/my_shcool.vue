<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
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
			
			<view class="bg-white containers  shadow shadow-lg" v-for="(item,index) in 10" :key="index">
				<view class="containers_image">
					<image src="../../../static/logo.png"></image>
				</view>
				
				<view class="containers_text">
					
					<view class="">
						清华大学
					</view>
					
					<view class="">
						<text>作品数量：999条</text>
					</view>
					
				</view>
				
				<view class="">
					<button class="cu-btn bg-green shadow-blur round sm">绑定</button>
				</view>
				
			</view>
		</view>
		<!-- end -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				state:false,//false 显示数据 没有数据是 改为true
			}
		},
		methods: {
			// pages/discover/dis_issue_school/dis_issue_school
			
			onclickToCreateShcool:function(){
				uni.navigateTo({
					url:'/pages/discover/dis_issue_school/dis_issue_school'
				})
			}
			
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
