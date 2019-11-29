<template>
	<view>
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">审核专区</block></cu-custom>
		<!-- end -->
		
		
		<message ref="Message"></message>
		
		<!-- 导航栏 -->
		<view class="tui-mtop navfiex" :style=" 'top:' + nagTop "  >
			<tui-tabs id="navTop" :tabs="tabs2" :height="88" :currentTab="currentTab" :sliderWidth="150" :sliderHeight="60" :bottom="14" color="#888" selectedColor="#11CDFC" :bold="true" sliderBgColor="#E5FAFF" @change="change"></tui-tabs>
		</view>
		<!-- end -->
		
		<!-- 盒子 -->
		<view class="" style="display: flex;height: 6vh;">
			
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
				<view class='contianer-title_image'> <image :src='item.card[0].head_img'></image></view>
				<view class='contianer-name'>{{item.card[0].u_nickname}}</view>
				<view style="font-size: 28upx; padding-left: 250upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.card[0].school_name}}</view>
				</view>
			
				<view class='contianer-content'>
				<text>{{item.card[0].content}}</text>
				</view>
			
				<view class='container-grid'>
				<view @tap='previewImg' :data-index='index' :class=" index == 2 || index == 5 || index == 8  ? '' : iItem.img.length == 4 ?'' : iItem.img.length == 1 ? 'container-grid_image-1':'container-grid_image' "  :style="iItem.img.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(iItem,iIndex) in item.image" :key="iIndex">
				<image :src='iItem.img' :style="iItem.img.length == 1 ? 'width:100%;' :'' " :class="iItem.img.length == 1 ? 'container-grid_img' : 'container-grid__image' " ></image>
				<!-- width:100%; -->
				</view>
				</view>
			
			
				<view class='container-comment'>
					<view style="padding-right: 20upx;">
					<button class="cu-btn bg-red shadow-blur round sm">删除</button>
					</view>
					
					<view><button class="cu-btn bg-green shadow-blur round sm">正常</button></view>
				
				</view>
				
				</view>
				
				</view>
			<!-- end -->
			
		</skeleton>
		
		
		
	</view>
</template>

<script>
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	import tuiTabs from "../../component/tui-tabs/tui-tabs.vue";
	export default {
		components:{tuiTabs,skeleton},
		data() {
			return {
				loading:true,
				data:[],
				nagTop:this.CustomBar,//自定义导航栏高度
				//图片
				  imgArr: [
				    // 'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				  ],
				  // end
				currentTab: 0,
				tabs2: [{
					name: "内容不符"
				}, {
					name: "政治"
				}, {
					name: "暴力"
				}, {
					name: "黄赌",
				},
				{
					name:"其他"
				}
				],
			}
		},
		methods: {
			
			// 导航栏点击事件
			change(e) {
				this.currentTab = e.index
				
				if(e.index == 0){
					this.getData(0);//内容不符
				}else if(e.index == 1){
					this.getData(1);//政治
				}else if(e.index == 2){
					this.getData(2);//暴力
				}else if(e.index == 3){
					this.getData(3);//黄毒
				}else{
					this.getData(4)//其他
				}
				
			},
			
			// 点击图片打开详细
			  previewImg: function (e) {
			    // console.log(e.currentTarget.dataset.index);
			    var index = e.currentTarget.dataset.index;
			    var imgArr = this.imgArr;
			    uni.previewImage({
			      current: imgArr[index],     //当前图片地址
			      urls: imgArr,               //所有要预览的图片的地址集合 数组形式
			      success: function (res) { },
			      fail: function (res) { },
			      complete: function (res) { },
			    })
			  },
			  
			  getData(type){
				  this.loading = true;
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'audit/getAuditCard',
					data:{
						type:type
					},
					header:this.tui.getHeader(),
					success: (res) => {
						if(res.data.code == 1){
							this.data = res.data.data.data;
							this.loading = false;
						}else{
							this.$refs['Message'].info({
								content:'没有找到数据',
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
			this.getData(0);
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
	  justify-content: flex-end;
	}
	/* end */
	
	.navfiex{
		position: fixed;
		width: 100%;
		z-index: 9999;
	}
</style>
