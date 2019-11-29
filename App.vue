<script>
	import Vue from 'vue'
	export default {
		onLaunch: function() {
			
			// 查询获取用户信息
			uni.getStorage({
				key:"userInfo",
				success:function()  {
					Vue.prototype.PageState = true//有用户信息
				},
				fail:function() {
					Vue.prototype.PageState = false//没有用户信息
				}
			})
			
			// 检查是否token过期
				uni.getStorage({
					key:"token",
					success: (res) => {
						
					},
					fail:function(error){
						// 重新获取token
						uni.login({
							success: (res) => {
								let code = res.code;
								
								// 发送请求获取token
								uni.request({
									url:'http://www.t.com/v1/getToken',
									data:{
										code:code
									},
									success:function(res){
										console.log(res.data);
										if(res.data.code == 1){
											uni.setStorageSync('token',res.data.data,604800);
										}
									}
									
								})
								
							}
							
						})
					}
				})
			
			// 获取手机导航栏高度
			uni.getSystemInfo({
				success: function(e) {
					// #ifndef MP
					Vue.prototype.StatusBar = e.statusBarHeight;
					if (e.platform == 'android') {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 45;
					};
					// #endif
			
					// #ifdef MP-WEIXIN || MP-QQ
					Vue.prototype.StatusBar = e.statusBarHeight;
					let capsule = uni.getMenuButtonBoundingClientRect();
					if (capsule) {
						Vue.prototype.Custom = capsule;
						// Vue.prototype.capsuleSafe = uni.upx2px(750) - capsule.left + uni.upx2px(750) - capsule.right;
						
						// #ifdef MP-WEIXIN 
						Vue.prototype.CustomBar = capsule.bottom + capsule.top - e.statusBarHeight;
						// #endif
						
						// QQ
						Vue.prototype.CustomBar = 80;
						
					} else {
						Vue.prototype.CustomBar = e.statusBarHeight + 50;
					}
					// #endif		
				
			
					// #ifdef MP-ALIPAY
					Vue.prototype.StatusBar = e.statusBarHeight;
					Vue.prototype.CustomBar = e.statusBarHeight + e.titleBarHeight;
					// #endif
				}
			})
			
			
	
			
		
		},
		onShow: function() {
		},
		onHide: function() {
		},
		onReady:function(){
		},
		onResize:function(){
		},
		onUnload:function(){
		}
		
		
	}
</script>

<style>
	/*每个页面公共css */
	/* colorUI */
	@import "colorui/main.css";
	@import "colorui/icon.css";
	@import "colorui/animation.css";
	
	/* ThorUI */
	@import "./common/app.css";
</style>
