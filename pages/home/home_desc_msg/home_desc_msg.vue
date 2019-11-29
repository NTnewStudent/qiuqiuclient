<template>
	<view>
		
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">评论详细</block></cu-custom>
		<!-- end -->
		
		<!-- 头部 -->
		
		<message ref="Message"></message>
		<view class='pg'>
		  <!-- 评论内容 -->
		  <view class='padding shadow-warp  bg-white comment-content' v-for="(item,index) in 1" :key="index">
		    <view class='comment-content-1'>
		      <view class='comment-content-1_image'>
		        <image :src='img'></image>
		      </view>
		      <view class='comment-content-1_2'>
		        <text class='text-black'>{{name}}</text>
		      </view>
		      <view>
		        <text class='cuIcon-appreciate lg text-gray'></text> {{comment_like == null || comment_like == '' || comment_like == undefined ? '0' : comment_like}}</view>
		    </view>
		
		    <view class='comment-content-2'>
		      <view class='comment-content-2_1'>
		        <image class='comment-content-2_1_img' src='../../../static/img/hot_evaluate1.png'></image>
		        <text class='text-black text-df text-weight'> {{content}}</text>
		      </view>
			  
			  <view>
				  <image style="width: 50%;height: 20vh;margin-top: 20upx;"  :src="centent_image"></image>
			  </view>
			  
			  
		      <view class='comment-content-2_2 margin-top-sm'>
		        <text class='text-sm'>{{created_at}}</text>
		      </view>
		    </view>
		  </view>
		  
		  <!-- 评论标题 -->
		  <view class='comment  padding-sm bg-white'>
		    <text>全部评论 * {{comment_count}}</text>
		  </view>
		  <!-- end -->
		  
		  <skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true"></skeleton>
		  <skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true"></skeleton>
		  <skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true"></skeleton>
		  <skeleton :loading="loading" :imgTitle="false" :showTitle="true" :animate="true">
			  
			  <view class="" v-for="(item,index) in data" :key='index' >
			  	
			<!-- 评论内容 -->
			  <view @longtap="send_mag" :data-id="index" class='padding shadow-warp  bg-white comment-content' v-if="item.children == 0 ? false : true" v-for="(citem,cindex) in item.children" :key="index">
			    <view class='comment-content-1'>
			      <view class='comment-content-1_image'>
			        <image :src='citem.img'></image>
			      </view>
			      <view class='comment-content-1_2'>
			        <text class='text-black'>{{citem.name}}</text>
			      </view>
			      <view>
			        <text class='cuIcon-appreciate lg text-gray'></text>{{item.comment_like}}</view>
			    </view>
			
			    <view class='comment-content-2'>
			      <view class='comment-content-2_1'>
			        <text class='text-black text-df text-weight'>{{citem.content}}</text>
			      </view>
							
							<!-- <view class=""> -->
								<image :src="citem.centent_image" style="height: 20vh;width: 50%;margin-top: 20upx;" v-if="citem.centent_image == null || citem.centent_image == '' ? false : true "></image>
							<!-- </view> -->
							
							<!-- 回复显示 -->
							<view class='comment-content-2_1'  style="margin-left: 10upx;margin-top: 20upx;" v-show="true">
							  <text class='text-blue text-df text-weight'>@{{item.name}}:</text>
							  <text style="font-size: 28upx;margin-left: 8upx;">{{item.content}}</text>
							</view>
							<!-- end -->
							
			      <view class='comment-content-2_2 margin-top-sm'>
			        <text class='text-sm'>
						
						{{
							getDateDiff(getDateTimeStamp(citem.created_at))
						}}
						
					</text>
			      </view>
			
			    </view>
			  </view>
			  <!--评论内容 end -->  
			  
			  <!-- -------------------------------------- -->
			  
			  <!-- 评论内容 -->
			    <view @longtap="send_mag" :data-id="index" class='padding shadow-warp  bg-white comment-content'  >
			      <view class='comment-content-1'>
			        <view class='comment-content-1_image'>
			          <image :src='item.img'></image>
			        </view>
			        <view class='comment-content-1_2'>
			          <text class='text-black'>{{item.name}}</text>
			        </view>
			        <view>
			          <text class='cuIcon-appreciate lg text-gray'></text> {{item.comment_like}}</view>
			      </view>
			  
			      <view class='comment-content-2'>
			        <view class='comment-content-2_1'>
			          <text class='text-black text-df text-weight'>{{item.content}}</text>
			        </view>
			  				
			  				<!-- <view class=""> -->
			  					<image :src="item.centent_image" style="height: 20vh;width: 50%;margin-top: 20upx;" v-if="item.centent_image == null || item.centent_image == '' ? false : true "></image>
			  				<!-- </view> -->
			  				
			  				<!-- 回复显示 -->
			  				<view class='comment-content-2_1' style="margin-left: 10upx;" v-show="false">
			  				  <text class='text-blue text-df text-weight'>@Ambition:</text>
			  				  <text style="font-size: 28upx;margin-left: 8upx;">评论内容</text>
			  				</view>
			  				<!-- end -->
			  				
			        <view class='comment-content-2_2 margin-top-sm'>
			          <text class='text-sm'>
						  {{
						  	getDateDiff(getDateTimeStamp(item.created_at))
						  }}
					  </text>
			        </view>
			  
			      </view>
			    </view>
			    <!--评论内容 end -->  
				</view>
				<!-- 最外边view -->
			  
		  </skeleton>
		  
		
			
		  
		  </view>
		  <!-- end -->
		  
		 <!--  -->
		 <view class='lines'></view>
		 <!--  -->
		 
		 <!-- 底部操作卡 -->
		 <view class=' bg-white'>
		 
		   <view class='msg_bottom bg-white'>
			   
			   <view class="">
			   	<image src="../../../static/image.png" style="width: 55upx;height: 55upx;margin-right: 20upx;"></image>
			   </view>
			   
		     <view class='msg_bottom-1'>
		       <input @input='textChange' name='msg' :placeholder='input_placeholder' cursor-spacing="10"></input>
		     </view>
		 
		     <view class='msg_bottom-2'>
		     <button class="cu-btn round  bg-green" role="button" aria-disabled="false" :disabled='sendState' >发送</button>
		     </view>
		       
		   </view>
		   </view>
		   <!-- 底部操作卡end -->
		 
		 

	</view>
</template>

<script>
	import skeleton from "../../../components/J-skeleton/J-skeleton.vue";
	export default {
		components:{skeleton},
		data() {
			return {
				data:'',
				child:'',
				loading:true,
				centent_image:'',
				comment_count:'',
				content:'',
				created_at:'',
				img:'',
				name:'',
				id:'',
				comment_like:'',
					input_placeholder:'觉得不错说两句~~',//input输入框提示值
				   // 发送按钮状态
				    sendState:true,//默认不能点击
			}
		},
		methods: {
			// 转换时间戳
			getDateTimeStamp:function(dateStr){
			 return Date.parse(dateStr.replace(/-/gi,"-"));
			},
			
			// 时间转换
			getDateDiff:function(dateTimeStamp){
				var result = '';
				var minute = 1000 * 60;
				var hour = minute * 60;
				var day = hour * 24;
				var halfamonth = day * 15;
				var month = day * 30;
				var now = new Date().getTime();
				var diffValue = now - dateTimeStamp;
				if(diffValue < 0){return;}
				var monthC =diffValue/month;
				var weekC =diffValue/(7*day);
				var dayC =diffValue/day;
				var hourC =diffValue/hour;
				var minC =diffValue/minute;
				if(monthC>=1){
					result="" + parseInt(monthC) + "月前";
				}
				else if(weekC>=1){
					result="" + parseInt(weekC) + "周前";
				}
				else if(dayC>=1){
					result=""+ parseInt(dayC) +"天前";
				}
				else if(hourC>=1){
					result=""+ parseInt(hourC) +"小时前";
				}
				else if(minC>=1){
					result=""+ parseInt(minC) +"分钟前";
				}else
				result="刚刚";
				return result;
			},
			  // 监听文字改变 发送按钮样式
			  textChange:function(e){
			    var len = e.detail.value;
			    if(len == null || len == '' || len == undefined){
			          this.sendState = true
			    }else{
			        this.sendState = false
			    }
			  },
			  send_mag:function(e){
				  console.log(e);
			  },
			  
			  getCardCommentDescCommentDesc:function(id){
				  uni.request({
				  	url:this.tui.interfaceUrl() + 'comment/CardCommentDescCommentDesc',
					data:{
						cid:id
					},
					success: (res) => {
						this.data = res.data.data.children;
						this.loading = false
						console.log(res)
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络开小差了~',
							duration:2000,
							background:false
						})
					}
				  })
			  }
			  
		},
		onLoad(optians) {
			this.getCardCommentDescCommentDesc(optians.id)
			this.id = optians.id;
			this.centent_image = optians.centent_image;
			this.comment_count = optians.comment_count;
			this.content = optians.content;
			this.created_at = this.tui.getDateDiff(this.tui.getDateTimeStamp(optians.created_at));
			this.img = optians.img;
			this.name = optians.name;
			this.comment_like = optians.comment_like;
			console.log(optians);
			
		}
	}
</script>

<style>
.pg{
  padding:20rpx 20rpx 20rpx 20rpx;
}
.radius-sm{
  border-radius: 20rpx;
}


/* 评论 */
.comment{
  margin-top: 20rpx;
  width: 100%;
  height: 100rpx;
  border-top-left-radius: 20rpx;
  border-top-right-radius: 20rpx;
}
.comment{
  color:black;
  font-size: 32rpx;
  display: flex;
  align-items: center;
  /* justify-content: center; */
}
/* end */


/* 评论内容 */
.comment-content{
  width: 100%;
  height: auto;
  /* margin-top: 20rpx; */

}
.comment-content-2_1_img{
  height: 36rpx;
  width: 65rpx;
  line-height: 40rpx;
}
.comment-content-1{
  display: flex;
  align-items: center;
}
.comment-content-1_image image{
  height: 80rpx;
  width: 80rpx;
  border-radius: 100%;
}
.comment-content-1_2{
  margin-left: 20rpx;
  width: 80%;
}
.comment-content-2{
  margin-left: 10%;
}
/* end */




/* line */
.line{
  width: 100%;
  height: 0.5rpx;
  background: gainsboro;
  margin-top: 20rpx;
}
/* end */


/* 底部选项卡 */
.msg_bottom{
  padding: 20rpx;
  width: 100%;
  height: 100rpx;
  position: fixed;
  bottom: 0;
  z-index: 99;
  display: flex;
  align-items: center;
  line-height: 0upx;
  margin-right: 20rpx;
}
.lines_msg{
  display: flex;
  height: 10rpx;
}
.msg_bottom-1{
  width: 80%;
  background: #f1f1f1;
  border-radius: 40rpx;
  padding: 10rpx 20rpx 10rpx 20rpx;
  display: flex;
  align-items: center;
}
.msg_bottom-1 input{
    width: 100%;
}
.msg_bottom-2{
  width: 20%;
  margin-left: 20rpx;
}
.text-icon{
  font-size: 45rpx;
}
.text-char {
  font-size: 35rpx;
}
/* end */

.lines{
  display: flex;
  height: 150rpx;
}



</style>
