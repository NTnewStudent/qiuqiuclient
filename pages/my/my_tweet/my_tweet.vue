<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">吐槽与建议</block></cu-custom>
		<!-- end -->
		
		<!-- 自定义全局提示 -->
		<message ref='Message'></message>
		<!-- end -->
		
		<!-- 内容 -->
		
		<view class="cu-form-group align-start">
			<view class="title">吐槽:</view>
			<textarea maxlength="1000" v-model="content"  placeholder="提出你宝贵的建议或者想实现的功能!"></textarea>
		</view>
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				图片上传
			</view>
			<view class="action">
				{{imgList.length}}/3
			</view>
		</view>
		
		<view class="cu-form-group">
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
		
		<button :disabled="disabled" @click="sumbit" class="cu-btn bt block bg-blue margin-tb-sm lg">
			<text class=" cuIconfont-spin" :class="[loading? 'cuIcon-loading2' : 'cuIcon-loading3']"></text> 
			{{login_txt ? '提交中...' :'提交'}}
			</button>
		
		
		
		<!-- end -->
		
	</view>
</template>

<script>
	export default {
		data() {
			return {
				disabled:false,
				uImg:[],
				imgList: [],
				content:'',//类肉
				// true 上传状态
				loading:false,//加载状态
				addr:false,//选择地址状态
				login_txt:false,
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 3, //默认9
					sizeType: ['original'], //可以指定是原图还是压缩图，默认二者都有
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
					title: '提示',
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
			
			// 提交
			sumbit:function(){
				var content = this.content;
				var imgList = this.imgList;
				
				if(content == '' || content == null){
					this.$refs['Message'].info({
						content:'请输入内容~',
						duration:2000,
						background:false
					})
					return;
				}
				
				this.disabled = true;
				this.loading = true;
				this.login_txt = true;
				
				if(this.imgList.length > 0 ){
					
					
					this.uploadImg(
						{
							length:this.imgList.length,
							imgList:this.imgList,
							url:this.tui.interfaceUrl() +'upload/imageUpload',
						});
					
				}else{
					this.uploadData(this.content);
				}
		
				
			},
			
			// 递归上传图片
					 uploadImg:function(data){
						   var that = this;
							var successUp = 0; //成功
						  var failUp = 0; //失败
						  var length = data.length; //总数
						  var count = 0; //第几张
						 that.uploadOneByOne(data.imgList,successUp,failUp,count,length,data.url);
						},
						/**
						  * 采用递归的方式上传多张
						  */
						 uploadOneByOne:function(imgPaths,successUp, failUp, count, length,url){
						   var that = this;
								that.$refs['Message'].info({
								    content: '正在上传第'+count+'张',
								    duration: 2000,
								    background: false
								})
						   uni.uploadFile({
						     url: url, //仅为示例，非真实的接口地址
						     filePath: imgPaths[count],
						     name: 'file',//
						     success:(e) =>{
								 var json = JSON.parse(e.data);
								 if(json.code == 1){
									 this.uImg[count] = json.data;
									 console.log(count);
									 successUp++;//成功+1
								 }
						     },
						     fail:function(e){
						       failUp++;//失败+1
						     },
						     complete:(e) =>{
						       count++;//下一张
						       if(count == length){
						         //上传完毕，作一下提示
						         console.log('上传成功' + successUp + ',' + '失败' + failUp);
								var image = this.uImg[0] + ',' + this.uImg[1] + ',' + this.uImg[2];
								this.uploadData(this.content,image);
						       }else{
						         //递归调用，上传下一张
						         that.uploadOneByOne(imgPaths, successUp, failUp, count, length,url);
						         console.log('正在上传第' + count + '张');
						       }
						     }
						   })
						   
						 },
						 
						 // 上传到服务器
						uploadData:function(content,image){
							uni.request({
								url:this.tui.interfaceUrl() +'upload/suggest',
								data:{
									image:image,
									content:content
								},
								header:this.tui.getHeader(),
								method:"POST",
								success: (res) => {
									if(res.data.code == 1){
										this.$refs['Message'].success({
											content:'保存成功~',
											duration:2000,
											background:false
										})
										
										this.disabled = false;
										this.loading = false;
										this.login_txt = false;
										
										// 清楚值
										this.content = '';
										this.imgList = [];
									}else{
										this.$refs['Message'].error({
											content:'上传失败了~',
											duration:2000,
											background:false
										})
									}
								},
								fail: (err) => {
									this.disabled = false;
									this.$refs['Message'].error({
										content:'网络开小车了~~~',
										duration:2000,
										background:false
									})
								}
							})
						}
			
		}
	}
</script>

<style>
.bt{
	margin-top: 20%;
	width: 90%;
	margin-left: 5%;
}
</style>
