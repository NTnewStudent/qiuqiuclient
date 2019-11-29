<template>
	<view>
		<!-- 自定义导航栏 -->
		<cu-custom bgColor="bg-gradual-blue" :isBack="true"><block slot="backText">返回</block><block slot="content">毕节职业技术学院</block></cu-custom>
		<!-- end -->
		
		<message ref='Message'></message>
		
		<view class="" style="padding: 20upx;">
			
			<view class="" style="font-size: 28upx;">
				<text>学校名字</text>
			</view>
			
			<view class="input" >
				<input type="text" v-model="shoolName" placeholder="请输入学校的名字吧~~" />
			</view>
			
		</view>
		
		<view class="" style="height: 20upx;width: 100%;background: #F1F1F1;"></view>
		
		
		<view class="cu-bar bg-white margin-top">
			<view class="action">
				学校校徽
			</view>
			<view class="action">
				{{imgList.length}}/1
			</view>
		</view>
		
		<view class="cu-form-group">
			<view class="grid col-4 grid-square flex-sub">
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
		
		
		<view class="" style="height: 20upx;width: 100%;background: #F1F1F1;"></view>
		
	
		
		<view class="prick" @tap="select_prick">
			
			<view class="selects">
				<text>选择地区</text>
			</view>
			
			<view class="select_prick"  >
				<view class="" v-if="addr">
					<text>{{defaultVal[0]}}</text>,
					<text>{{defaultVal[1]}}</text>,
					<text>{{defaultVal[2]}}</text>
				</view>
			</view>
			
			<view class="">
				<text class="cuIcon-right"></text>
			</view>
			
		</view>
		
		<view class="" style="height: 20upx;width: 100%;background: #F1F1F1;"></view>
		
		
		<button @click="sumbit" :disabled="disabled" class="cu-btn bt block bg-blue margin-tb-sm lg">
			<text class=" cuIconfont-spin" :class="[loading? 'cuIcon-loading2' : 'cuIcon-loading3']"></text> 
			{{login_txt ? '发布中...' :'发布'}}
			</button>
			
			<w-picker 
			    mode="region"
			    :defaultVal="defaultVal"
			    :hideArea="false"
			    @confirm="onConfirm" 
			    ref="region" 
			    themeColor="#f00">
			</w-picker>
		
	</view>
</template>

<script>
	import message from "../../component/bobo-message/bobo-message.vue";
	import wPicker from "../../../components/w-picker/w-picker.vue";
	export default {
		components:{wPicker,message},
		data() {
			return {
				disabled:false,
				// true 上传状态
				loading:false,//加载状态
				addr:false,//选择地址状态
				login_txt:false,
				// end
				defaultVal:[],
				
				// 表单值
				shoolName:'',
				//图片
				imgList: [],
				// end
			}
		},
		methods: {
			ChooseImage() {
				uni.chooseImage({
					count: 1, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						console.log(res);
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
					content: '确定要删除这个照片吗？',
					cancelText: '再看看',
					confirmText: '删除',
					success: res => {
						if (res.confirm) {
							this.imgList.splice(e.currentTarget.dataset.index, 1)
						}
					}
				})
			},
			
			
			// 省级选择
			// 显示
			select_prick:function(){
				this.$refs.region.show()
			},
			
			onConfirm:function(e){
				this.addr = true;//显示
				this.defaultVal = e.checkArr;//设计值
			},
			// 提交
			sumbit:function(){
				// 获取数据
				var schoolName = this.shoolName;
				var imgList = this.imgList;
				var defaultVal = this.defaultVal;
				var addr = defaultVal[0]+','+defaultVal[1]+','+defaultVal[2];
				
				if(schoolName == '' || schoolName == []){
					this.$refs['Message'].error({
						content:'请输入学校名称！',
						duration:2000,
						background:false
					});
					return;
				}
				
				if(imgList == '' || imgList == []){
					this.$refs['Message'].error({
						content:'请上传学校图片！',
						duration:2000,
						background:false
					});
					return;
				}
				
				if(defaultVal == '' || defaultVal == []){
					this.$refs['Message'].error({
						content:'请选择学校所在地址！',
						duration:2000,
						background:false
					});
					return;
				}
				
				
				this.disabled = true;
				this.loading = true;
				this.login_txt = true;
				
				// setTimeout(() => {
				// 	this.loading = false;
				// 	this.login_txt = false;
				// 	this.disabled = false;
					
				// 	// 提示信息
				// 	// 自定义单个消息的样式
				// 	this.$refs['Message'].success({
				// 	    content: '发布成功',
				// 	    duration: 2000,
				// 	    background: false
				// 	})
					
				// 	// 清楚值
				// 	this.shoolName = '';
				// 	this.imgList = '';
				// 	this.defaultVal = '';
				// 	this.addr = false;
					
				// },2000);
				//上传图片
				this.$refs['Message'].info({
					content:'图片上传中...',
					duration:2000,
					background:false
				});
				uni.uploadFile({
					url:this.tui.interfaceUrl()+'upload/imageUpload',
					filePath:imgList[0],
					name:'file',
					success:res =>{
						console.log(res);
						var data = JSON.parse(res.data);
						if(data.code == 1){
							this.$refs['Message'].success({
								content:'图片上传成功~',
								duration:2000,
								background:false
							});
							
							// 保存数据
							this.uploadDatabase(data.data,schoolName,addr);
							
							
						}else{
							this.$refs['Message'].error({
								content:'图片上传失败,请稍后在试！',
								duration:2000,
								background:false
							});
						}
					},
					fail:err =>{
						this.$refs['Message'].error({
							content:'图片上传失败,重新上传一张试试~',
							duration:2000,
							background:false
						});
					}
				})
				
				
				
				
			},
			
			uploadDatabase:function(image,schoolName,addr){
				this.$refs['Message'].info({
					content:'保存数据中...',
					duration:2000,
					background:false
				});
				// 上传数据库
				uni.request({
					url:this.tui.interfaceUrl() + 'upload/AddSchool',
					data:{
						name:schoolName,
						image:image,
						address:addr
					},
					header:this.tui.getHeader(),
					method:"POST",
					success: (res) => {
						if(res.data.code == 1){
							this.$refs['Message'].success({
								content:'上传成功！',
								duration:2000,
								background:false
							});
							
							// 改变按钮上传状态
								this.loading = false;
								this.login_txt = false;
								this.disabled = false;
									// 清楚值
									this.shoolName = '';
									this.imgList = '';
									this.defaultVal = '';
									this.addr = false;
						}else{
							console.log(res.data);
							this.$refs['Message'].error({
								content:'网络开小差了,请稍后在试~！',
								duration:2000,
								background:false
							});
						}
					},
					fail: (err) => {
						this.$refs['Message'].error({
							content:'网络开小差了,请稍后在试~！',
							duration:2000,
							background:false
						});
					}
				})
			}
			
			
		},
		onLoad:function(options){
			
		}
	}
</script>

<style>
.input{
	width: 100%;
	margin-top: 20upx;
}

.prick{
	/* padding: 20upx; */
	padding-left: 20upx;
	padding-right: 20upx;
	padding-bottom: 20upx;
	margin-top: 20upx;
	display: flex;
}
.selects{
	width: 65%;
}
.select_prick{
	font-size: 28upx;
	width: 70%;
}
.bt{
	margin-top: 30%;
	width: 90%;
	margin-left: 5%;
}
</style>
