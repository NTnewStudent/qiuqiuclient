<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true">
			<block slot="backText">返回</block>
			<block slot="content">
			发帖子
			</block>
			
		</cu-custom>
		<!-- end -->
		
		<!-- 自定义全局提示 -->
		<message ref='Message'></message>
		<!-- end -->
		
		<view class="container">
			
			<form @submit="cc" @reset="bb">
				
				<textarea style="width: 100%;height: 20vh;" v-model="textareaBValue" maxlength="1000" @input="textareaBInput" placeholder="多行文本输入框"></textarea>
				
				<view class="line"></view>
					<!-- 地址选择 -->
					<view class="cu-list menu card-menu  shadow-lg radius">
					   <view class="cu-item arrow" style="margin-left: -35upx;">
					     <view class="content" @tap="selectSchool">
							 <text class="cuIcon-cardboard text-blue" style="margin-right: 20upx;margin-top: 2upx;"></text>
					       <text >选择学校</text>
					         <text class='num'>{{school}}</text>
					     </view>
					   </view>
					 </view>
					<!-- end -->
					
							<view class="line"></view>
					
					<!-- 设置详细 -->
					 <view class="cu-list menu card-menu  shadow-lg radius">
					    <view class="cu-item arrow" style="margin-left: -35upx;">
					      <view class="content" @tap="select">
					        <text class="cuIcon-moneybagfill text-red"></text>
					        <text >选择话题</text>
					          <text class='num'>{{placeholder}}</text>
					      </view>
					    </view>
					  </view>
					<!-- 设置详细end -->
					
					<view class="line" ></view>
					
					<!-- 匿名 -->
					<view class="cu-form-group" style="margin-top: 0upx;">
						<view class="title">是否匿名发送</view>
					
						<switch class='red' @change="SwitchB" :class="switchB?'checked':''" :checked="switchB?true:false"></switch>
					</view>
					<!-- end -->
					
					
			<view class="line" style="margin-bottom: 20upx;"></view>
					
					
					<!-- <view class="line" style="margin-top: 20upx;"></view> -->
					
					<view class="cu-form-group" >
						<view class="grid col-3 grid-square flex-sub">
							<view class="bg-img" v-for="(item,index) in imgList" :key="index" @tap="ViewImage" :data-url="imgList[index]">
							 <image :src="imgList[index]" mode="aspectFill"></image>
								<view class="cu-tag bg-red" @tap.stop="DelImg" :data-index="index">
									<text class='cuIcon-close'></text>
								</view>
							</view>
							<view class="solids" @tap="ChooseImage" v-if="imgList.length<1">
								<text class='cuIcon-cameraadd'></text>
							</view>
						</view>
					</view>
				
				<button @tap="send" style="margin-right: 10upx;padding-left: 40upx;padding-right: 40upx;width: 100%;" class="cu-btn round bg-blue " :disabled="disabled" >
				<text class="cuIconfont-spin" :class="loading"></text>{{text}}</button>
				
			</form>
			
		</view>
		
	
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:false,//发送按钮状态
				switchB: false,//是否匿名发送
				placeholder:'选择合适的话题~',//选择话题
				loading:'cuIcon-loading3',//cuIcon-loading2 默认不显示加载
				text:'发布',
				textareaBValue:'',
				imgList: [],//图片
				sid:'',
				cid:'',
				school:'请选择你的学校~',
				
			}
		},
		methods: {
			
			// 递归上传图片
					 uploadImg:function(data){
						   var that = this;
							var successUp = 0; //成功
						  var failUp = 0; //失败
						  var length = data.length; //总数
						  var count = 0; //第几张
						 that.uploadOneByOne(data.imgList,successUp,failUp,count,length,data.url,data);
						},
						/**
						  * 采用递归的方式上传多张
						  */
						 uploadOneByOne:function(imgPaths,successUp, failUp, count, length,url,data){
						   var that = this;
								that.$refs['Message'].info({
								    content: '正在上传第'+count+'张图片',
								    duration: 2000,
								    background: false
								})
						   uni.uploadFile({
						     url: url, //仅为示例，非真实的接口地址
						     filePath: imgPaths[count],
						     name: 'file',//
							 header: {
							     "content-type": "application/json",
							     'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
							 },
							 formData:{
								 card_id:data.card_id,
								 cid:data.cid
							 },
						     success:function(e){
								 var json = JSON.parse(e.data);
								 console.log(json);
								 if(json.code == 1){
									 successUp++;//成功+1
								 }
						     },
						     fail:function(e){
						       failUp++;//失败+1
						     },
						     complete:function(e){
						       count++;//下一张
						       if(count == length){
						         //上传完毕，作一下提示
						         console.log('上传成功' + successUp + ',' + '失败' + failUp);
									that.$refs['Message'].success({
									    content: '上传成功' + successUp,
									    duration: 2000,
									    background: false
									})
									that.loading = 'cuIcon-loading3';
									that.text = '发布';
									that.disabled  = false;
									
									// 清空数据
									that.placeholder = '选择合适的话题~';
									that.school = '请选择你的学校~';
									that.sid = '';
									that.cid = '';
									that.textareaBValue = '';
									that.switchB = false;
									that.imgList = [];
						       }else{
						         //递归调用，上传下一张
						         that.uploadOneByOne(imgPaths, successUp, failUp, count, length,url,data);
						         console.log('正在上传第' + count + '张图片');
						       }
						     }
						   })
						   
						 },
			
			selectSchool:function(){
				uni.navigateTo({
					url:'../dis_my_shcool/dis_my_shcool'
				})
			},
			
			SwitchB(e) {
				this.switchB = e.detail.value
			},
			// 选择话题
			select:function(){
				uni.navigateTo({
					url:'/pages/discover/dis_topic_more/dis_topic_more'
				})
			},
			
			// 发布
			send:function(){
			
				var anonymity = this.switchB;//匿名
				if(anonymity){
					anonymity = 1;
				}else{
					anonymity = 0;
				}
				var sid = this.sid//学校id
				var cid = this.cid//分内id
				var content = this.textareaBValue;//内容
				var topic = this.placeholder;//话题
				var imageList = this.imgList;
				var school = this.school//学校
				
				// 获取我的信息
				var userInfo = uni.getStorageSync('userInfo');
				var nickName = userInfo.nickName;
				var avatarUrl = userInfo.avatarUrl;
				var gender = userInfo.gender;
				
				if(content == '' || content == null || content == undefined){
					this.$refs['Message'].warn({
					    content: '请输入内容',
					    duration: 2000,
					    background: false
					})
					return;
				}
				
				if(school == '请选择你的学校~'){
					this.$refs['Message'].warn({
					    content: '请选择学校！',
					    duration: 2000,
					    background: false
					})
					return;
				}
				
				if(topic == '选择合适的话题~' ){
					this.$refs['Message'].warn({
					    content: '请选择话题！',
					    duration: 2000,
					    background: false
					})
					return;
				}
				
					// 禁止按钮
					this.disabled = true;
					this.loading = "cuIcon-loading2";
					this.text = '发布中...';
					
			
					
					uni.request({
						url:this.tui.interfaceUrl() + 'upload/AddSendPaste',
						data:{
							uNmae:nickName,
							head_img:avatarUrl,
							sid:sid,
							SchoolName:school,
							content:content,
							cName:topic,
							cid:cid,
							sex:gender,
							is_anonymity:anonymity,
						},
						header: {
					        "content-type": "application/json",
					        'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
					    },
						method:'POST',
						success:(res) => {
							console.log(res.data.data)
							if(res.data.code === 1){
								// 上传图片
								if(imageList.length > 0){
									this.uploadImg(
										{
											length:imageList.length,
											imgList:imageList,
											url:this.tui.interfaceUrl() +'upload/AddSendPasteImage',
											cid:cid,
											card_id:res.data.data
										}
									);
									
									
									// 清楚缓存
									uni.removeStorageSync('c_topic');
									uni.removeStorageSync('c_school');
									
								}else{
									
									// 清空数据
									this.placeholder = '选择合适的话题~';
									this.school = '请选择你的学校~';
									this.sid = '';
									this.cid = '';
									this.textareaBValue = '';
									this.switchB = false;
									
									this.loading = 'cuIcon-loading3';
										this.text = '发布';
									// 自定义单个消息的样式
									this.$refs['Message'].success({
									    content: '发布成功',
									    duration: 2000,
									    background: false
									})
									this.disabled = false
									
								}
								
								
							}
						},
						fail: (err) => {
							this.$refs['Message'].error({
							    content: '网络不给力，请稍后再试~',
							    duration: 2000,
							    background: false
							})
						}
					})
					
			},
			
			// 文本输入
			textareaBInput(e) {
				// this.textareaBValue = e.detail.value
			},
			
			// 图片
			ChooseImage() {
				uni.chooseImage({
					count: 9, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						if (this.imgList.length != 0) {
							this.imgList = this.imgList.concat(res.tempFilePaths)
						} else {
							this.imgList = res.tempFilePaths
						}
					}
				});
			},
			ViewImage(e) {
				uni.previewImage({
					urls: this.imgList,
					current: e.currentTarget.dataset.url
				});
			},
			DelImg(e) {
				uni.showModal({
					title: '图片',
					content: '确定要删除吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			
		
			
		},
		onLoad:function(options){
			
		},
		onShow:function() {
			// 读取缓存话题
			var topic = uni.getStorageSync('c_topic');
			var school = uni.getStorageSync('c_school');
			if(school){
				this.sid = school.id;
				this.school = school.school;
			}
			if(topic){
				this.cid = topic.id;
				this.placeholder = topic.name;
			}
			
			
		},
		onHide:function(){
		
		}
	}
</script>
<style>
.container{
	padding: 20upx;
}

.line{
	width: 100%;
	height: 2upx;
	background: #DCDCDC;
}

.num{
  direction: rtl;
  margin-left: 30%;
  font-size: 25rpx;
  }
</style>
