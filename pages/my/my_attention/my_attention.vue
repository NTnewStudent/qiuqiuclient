<template>
	<view class="">
		
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
	</view>
	<message ref="Message"></message>
	
	<skeleton :loading="loading" :imgTitle="true" > </skeleton>
	<skeleton :loading="loading" :imgTitle="true" > </skeleton>
	<skeleton :loading="loading" :imgTitle="true" > </skeleton>
	<skeleton :loading="loading" :imgTitle="true" > </skeleton>
	<skeleton :loading="loading" :imgTitle="true" > 
	
	<view v-for="(item,index) in data" :key="index">
		<view class="containers bg-white padding shadow-warp"  v-for="(uitem,uindex) in item.user" :key="uindex">
			
			<view class="image">
				<image :src="uitem.head_img" mode=""></image>
			</view>
			
			<view class="text">
				<text>{{uitem.nick_name}}</text>
				<text class=" br badge " :class="uitem.sex == 1 ? 'cuIcon-male bg-blue' : 'cuIcon-female bg-pink' " ></text>
			</view>
			
			<view class="">
			<button @click="fans(item.id,uitem.id,index)" class="cu-btn  shadow-blur round " :class="item.id > 0 ? 'bg-red' : 'bg-green' ">{{item.id > 0 ? '取消' : '关注'}}</button>	
			</view>
			
		</view>
		
	</view>
	
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
				data:'',
			}
		},
		methods: {
			
			SaveFocusUser:function(id){
			  uni.request({
				url:this.tui.interfaceUrl() +'user/SaveFocusUser',
				data:{
					focus_id:id
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
			deleteFocusUser:function(id){
			  uni.request({
				url:this.tui.interfaceUrl() +'user/deleteFocusUser',
					data:{
						focus_id:id
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
			
			fans:function(is_focus,ids,index){
				if(is_focus > 0){//
				  this.data[index].id = -1;
				  // 修改数据库
				  this.deleteFocusUser(ids);
									  
				}else{
				  this.data[index].id = 1;
					  // 修改数据库
				 this.SaveFocusUser(ids);
				}
			},
			
			//得到数据
			getAttentionData:function(){
				uni.request({
					url:this.tui.interfaceUrl() + 'getFocusNumDesc',
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data;
							this.loading = false;
						}else{
							this.$refs['Message'].error({
								content:'请求超时~~~',
								duration:2000,
								background:false
							})
						}
						console.log(res)
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络开小差了~~~',
							duration:2000,
							background:false
						})
					}
				})
			}
			
		},
		onLoad:function(){
			this.getAttentionData();
		}
	}
</script>

<style>
	
	page{
		background: #EDEDED;
	}
	
	.containers{
		display: flex;
		align-items: center;
		justify-content: space-between;
		width: 90%;
		margin-left: 5%;
		border-radius: 20px;
		margin-top: 20upx;
	}
	
.image image{
	height: 100upx;
	width: 100upx;
	border-radius: 100%;
}

.br{
	border-radius:100% ;
	padding: 3upx;
}
</style>
