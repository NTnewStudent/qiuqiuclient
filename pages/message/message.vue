<template>
	<view>
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="false"><block slot="backText">返回</block><block slot="content">聊天</block></cu-custom>
		<!-- end -->
	
		<!-- 头部消息 -->
		<view class='bc' >
		    <text class='txt_1'></text>
		    <view class='kuai'>
		      <view class='interactive' >
		        <image class='imgs' src='http://load1a.nipic.com/file/20190522/Nipic_29136573_20190522231419687462.png?v=20190522111311'></image>
		        <text>互动消息</text>
		      </view>
		      <view class='notice' @tap='notice' >
		        <image class='imgs' src='http://load1a.nipic.com/file/20190522/Nipic_29136573_20190522231359364914.png?v=20190522111250'></image>
		        <text>通知消息</text>
		      </view>
		      <view class='logistics' @tap='toLogistics'>
		        <image class='imgs' src='http://load1a.nipic.com/file/20190522/Nipic_29136573_20190522231334886808.png?v=20190522111225'></image>
		        <text>交易物流</text>
		      </view>
		    </view>
		  </view>
		<!-- 头部消息end -->
		
		
		<!-- 聊天消息 -->
		  <view class="cu-list menu-avatar  card-menu martop" >
		    <view class="cu-item" @tap="toMsgChat">
		      <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big10001.jpg);"></view>
		      <view class="content">
		        <view class="text-grey">凯尔</view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut">
									<text class="cuIcon-infofill text-red  margin-right-xs"></text> 我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。我已天理为凭，踏入这片荒芜，不再受凡人的枷锁遏制。
		          </text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cu-tag round bg-grey sm">5</view>
		      </view>
		    </view>
		    <view class="cu-item">
		      <view class="cu-avatar round lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Taric.png);">
		        <view class="cu-tag badge">99+</view>
		      </view>
		      <view class="content">
		        <view class="text-grey">
		          <text class="text-cut">瓦洛兰之盾-塔里克</text>
		          <view class="cu-tag round bg-orange sm">战士</view>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut">塔里克是保护者星灵，用超乎寻常的力量守护着符文之地的生命、仁爱以及万物之美。塔里克由于渎职而被放逐，离开了祖国德玛西亚，前去攀登巨神峰寻找救赎，但他找到的却是来自星界的更高层的召唤。现在的塔里克与古代巨神族的神力相融合，以瓦洛兰之盾的身份，永不疲倦地警惕着阴险狡诈的虚空腐化之力。</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cuIcon-notice_forbid_fill text-gray"></view>
		      </view>
		    </view>
		
		    <view class="cu-item ">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/img/champion/Morgana.png);"></view>
		      <view class="content">
		        <view class="text-pink">
		          <text class="text-cut">莫甘娜</text>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut">凯尔，你被自己的光芒变的盲目！</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cu-tag round bg-red sm">5</view>
		      </view>
		    </view>
		
		    <view class="cu-item grayscale">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81007.jpg);"></view>
		      <view class="content">
		        <view>
		          <text class="text-cut">伊泽瑞尔</text>
		          <view class="cu-tag round bg-orange sm">断开连接...</view>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut"> 等我回来一个打十个</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cu-tag round bg-red sm">5</view>
		      </view>
		    </view>
		    <view class="cu-item cur">
		      <view class="cu-avatar radius lg" style="background-image:url(https://ossweb-img.qq.com/images/lol/web201310/skin/big81020.jpg);">
		        <view class="cu-tag badge"></view>
		      </view>
		      <view class="content">
		        <view>
		          <text class="text-cut">瓦罗兰大陆-睡衣守护者-新手保护营</text>
		          <view class="cu-tag round bg-orange sm">6人</view>
		        </view>
		        <view class="text-gray text-sm flex">
		          <text class="text-cut"> 伊泽瑞尔：<text class="cuIcon-locationfill text-orange margin-right-xs"></text> 传送中...</text>
		        </view>
		      </view>
		      <view class="action">
		        <view class="text-grey text-xs">22:20</view>
		        <view class="cuIcon-notice_forbid_fill text-gray"></view>
		      </view>
		    </view>
		  </view>
		<!-- 聊天消息end -->
		
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				
			}
		},
		methods: {
			// 跳转到聊天界面
			toMsgChat:function(e){
				uni.navigateTo({
					url:"/pages/message/msg_chat/msg_chat"
				})
			},
			// 通知消息点击
			notice:function(){
				uni.navigateTo({
					url:"/pages/msg/msg_inform/msg_inform"
				})
			},
			// 跳转交易物流详细页面
			toLogistics:function(){
				uni.navigateTo({
					url:"/pages/msg/msg_logistics_all/msg_logistics_all"
				})
			}
		}
	}
</script>

<style>
/* <!-- 头部消息 --> */


.bc {
	margin-top: 0upx;
  width: 100%;
  height: 200rpx;
  background: linear-gradient(10deg, #ffe1ff, #1cbbb4);
}
.txt_1 {
  margin-left: 30rpx;
  color: white;
}
.kuai {
  width: 700rpx;
  height: 200rpx;
  background-color: white;
  margin-top: 50rpx;
  margin-left: 25rpx;
  border-radius: 50rpx;
  box-shadow: 3rpx 3rpx 3rpx 3rpx rgba(128, 128, 128, 0.384);
  display: flex;
  flex-direction: row;
}
.interactive {
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
  color: black;
  width: 130rpx;
  height: 150rpx;
  margin-top: 60rpx;
  margin-left: 100rpx;
}
.imgs {
  margin-left: 10rpx;
  width: 80rpx;
  height: 80rpx;
}
.notice {
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
  color: black;
  width: 130rpx;
  height: 150rpx;
  margin-top: 60rpx;
  margin-left: 100rpx;
}
.logistics {
  display: flex;
  flex-direction: column;
  font-size: 30rpx;
  color: black;
  width: 130rpx;
  height: 150rpx;
  margin-top: 60rpx;
  margin-left: 80rpx;
}
/* <!-- 头部消息end --> */


/* 聊天消息 */
.martop{
  margin-top: 115rpx;
}
/* 聊天消息end */

</style>
