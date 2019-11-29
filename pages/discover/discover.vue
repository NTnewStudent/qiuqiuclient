<template>
	<view class="" >
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
		<message ref="Message"></message>
		<skeleton :loading="loading" :imgTitle="true" > </skeleton>
		<skeleton :loading="loading" :imgTitle="true" > </skeleton>
		<skeleton :loading="loading" :imgTitle="true" > </skeleton>
		<skeleton :loading="loading" :imgTitle="true" > </skeleton>
		
		<skeleton :loading="loading" :imgTitle="true" >
			
			<!-- 搜索 -->
			<view class="cu-bar search bg-white">
				<view class="search-form round">
					<text class="cuIcon-search"></text>
					<input @tap="toSearch" :adjust-position="false" type="text" placeholder="搜索图片、文章、视频" confirm-type="search"></input>
				</view>
			</view>
			<!-- end -->
			
			<view  style="padding: 20upx;" >
				
				<view @tap="toShcool(item.school_name,item.head_img,item.keep_school.length,item.id)" class="bg-white containers  shadow shadow-lg" v-for="(item,index) in data" :key="index">
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
						<button  @click.stop="keep(item.keep_school.length,item.id,index)" class="cu-btn shadow-blur round sm"  :class="[item.keep_school.length == 0 ? 'bg-green ' : 'bg-red'] ">{{item.keep_school.length == 0   ? '关注' : '取消' }}</button>
					</view>
					
				</view>
			</view>
			
		</skeleton>
		
	
		
	</view>
</template>

<script>
	import message from "../component/bobo-message/bobo-message.vue";
	import skeleton from "../../components/J-skeleton/J-skeleton.vue";
	export default{
		components:{message,skeleton},
		data(){
			return{
				loading: true,
				     skeleton : {
				       avatarSize: '50px',
				       row: 2,
				       showTitle: true,
						space_between :'space-around',
						avatarShape:"round",
				     },
					
				data:[],
			}
		},
		methods:{
			// 跳转详细
			toSearch:function(){
				uni.navigateTo({
					url:'/pages/discover/dis_search/dis_search'
				})
			},
			
			// 调转学校详细
			toShcool:function(name,img,keep,id){
				
				uni.navigateTo({
					url:'/pages/discover/dis_shcool/dis_shcool' +'?name=' + name +'&img=' + img + '&keep=' +keep +'&sid=' +id
				})
			},
			
			// 点击关注
			keep:function(keep,id,index){
			
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
		onLoad:function(optian){
			uni.request({
				url:this.tui.interfaceUrl() + 'school/getALLSchool',
				methods:"GET",
				header: {
				    "content-type": "application/json",
				    'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
				},
				success : res =>{
					this.data = res.data.data;
					console.log(res)
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
		},
		onShow:function(){
			
		}
	}
</script>

<style>
	
	page{
		background: #F1F1F1;
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