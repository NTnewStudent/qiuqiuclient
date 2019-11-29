<template>
	<view>
	<!-- 自定义导航栏 -->
	<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">选择话题</block></cu-custom>
	<!-- end -->
	
	<!-- 自定义全局提示 -->
		<message ref='Message'></message>
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
						  
				<view class=""  v-for="(item,index) in topic" :key="index" @tap="click_topic(item.id,item.c_name)">
				
				<view class="containers " >
					
					<view class="image">
						<image :src="item.head_img" style="height: 70upx;width: 70upx;" mode=""></image>
					</view>
					
					<view class="text" >
						<text>{{item.c_name}}</text>
					</view>
					
				</view>
				
				<view class="line" style="height: 3upx;width: 90%;margin-left: 5%;background: #C8C7CC;"></view>
					
				
				</view>		  
						  
		</skeleton>
	
	
	
	
	
	</view>
</template>

<script>
	import message from "../../component/bobo-message/bobo-message.vue";
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	export default {
		components:{message,skeleton},
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
				topic:[
					
					{id:1,text:'最美校园'},
					{id:2,text:'最'},
					{id:3,text:'最校园'},
					{id:4,text:'最园'},
					
				],
			}
		},
		methods: {
			
			// 点击话题
			click_topic:function(id,name){
				uni.setStorage({
					key:'c_topic',
					data:{
						id:id,
						name:name,
					},
					success() {
						uni.navigateBack({
							delta:1
						})
					}
				})
				
			}
			
		},
		onLoad(optian) {
			uni.request({
				url:this.tui.interfaceUrl() + 'topic/getTopicDate',
				method:'GET',
				success: res =>{
					console.log(res);
					this.topic = res.data.data;
					this.loading = false;
				},
				fail: err =>{
					this.$refs['Message'].error({
					    content: '网络不给力，请稍后再试~',
					    duration: 2000,
					    background: false
					})
				}
				
			})
		}
	}
</script>

<style>
	/* C8C7CC */
.containers{
	padding: 20upx;
	display: flex;
	align-items: center;
	
}
.text text{
	font-size: 28upx;
	margin-left: 20upx;
	
}
.text{
	overflow: hidden;
	text-overflow:ellipsis;
	white-space: nowrap;
}
</style>
