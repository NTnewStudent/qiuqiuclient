<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		<message ref="Message"></message>
		<!-- 搜索 -->
		<view class="cu-bar search bg-white">
			<view class="search-form round">
				<text class="cuIcon-search"></text>
				<input  :adjust-position="false" :focus="true" type="text" v-model="textValue" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
			</view>
		<view class="action">
			<button @tap="toSearch" class="cu-btn bg-green shadow-blur round">搜索</button>
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
			
			<view class="bg-white containers  shadow shadow-lg" v-for="(item,index) in data" :key="index">
				<view class="containers_image">
					<image :src="item.head_img"></image>
				</view>
				
				<view class="containers_text">
					
					<view class="">
						{{item.school_name}}
					</view>
					
					<view class="">
						<text>作品数量：{{item.total_card>0 ? item.total_card : '0'}}条</text>
					</view>
					
				</view>
				
					
				<view class="">
					<button  @tap="click_focus(item.keep_school.length,item.id,index)" class="cu-btn  shadow-blur round sm" :class="[item.keep_school.length == 0 ? 'bg-green' : 'bg-red'] ">{{item.keep_school.length == 0   ? '关注' : '取消' }}</button>
				</view>
				
			</view>
		</view>
		<!-- end -->
		
		
	</view>
</template>

<script>
	import message from "../../component/bobo-message/bobo-message.vue";
	export default {
		components:{message},
		data() {
			return {
				data:'',
				textValue:'',//搜索值
				state:true,//false 显示数据 没有数据是 改为true
			}
		},
		methods: {
			// pages/discover/dis_issue_school/dis_issue_school
			
			onclickToCreateShcool:function(){
				uni.navigateTo({
					url:'/pages/discover/dis_issue_school/dis_issue_school'
				})
			},
			
			toSearch:function(){
				var val = this.textValue;
				
				if(val == '' || val == null){
					this.$refs['Message'].error({
						content:'请输入想要查询的学校~',
						duration:2000,
						background:false
					})
					return;
				}
				uni.showLoading({
					title: '加载中...',
					mask: false,
				});
				this.state = false;
				// 发送请求获取数据
				uni.request({
					url:this.tui.interfaceUrl() + 'search/searchSchool',
					method:"GET",
					data:{
						schoolName:val
					},
					header: this.tui.getHeader(),
					success: (res) => {
						uni.hideLoading();
						if(res.data.code == 1 && res.data.data.length >0){
							this.data =res.data.data
						}else{
							this.state = true;
							this.$refs['Message'].info({
							    content: '未找到相关学校~',
							    duration: 2000,
							    background: false
							})
						}
					},
					fail: (err) => {
						this.state = true;
						this.$refs['Message'].error({
						    content: '网络不给力，请稍后再试~',
						    duration: 2000,
						    background: false
						})
					}
				})
				
			},
			
			// 点击关注
			click_focus:function(keep,id,index){
			
				if(keep == 0 ){//关注
					this.data[index].keep_school = {ids:1} ;//红
					this.SaveFocusSchool(id);
					
					
				}else {
					//未关注
					this.data[index].keep_school = '';//得到当先点击数组
					this.DeletedFocusSchool(id);
				}
			},
			
			// 点击关注
			SaveFocusSchool:function(id){
					uni.request({
						url:this.tui.interfaceUrl() +'school/SaveFocusSchool',
							data:{
								sid:id
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
									this.data[index].keep_school = '';
									this.$refs['Message'].error({
										content:'关注失败',
										duration:2000,
										background:false
									})
								}
							},
							fail: (err) => {
								this.data[index].keep_school = '';
								this.$refs['Message'].error({
									content:'关注失败！',
									duration:2000,
									background:false
								})
							}
						})
				},
			
			// 取消关注这个学校
			DeletedFocusSchool:function(id){
				uni.request({
					url:this.tui.interfaceUrl() +'school/DeletedFocusSchool',
					data:{
						sid:id 
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
							this.data[index].keep_school = {id:1} ;
							this.$refs['Message'].error({
								content:'取消关注失败',
								duration:2000,
								background:false
							})
						}
					},
					fail: (err) => {
						this.data[index].keep_school = {id:1} ;
						this.$refs['Message'].error({
							content:'取消关注失败！',
							duration:2000,
							background:false
						})
					}
				})
				
			},
			
		},
		
		
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
