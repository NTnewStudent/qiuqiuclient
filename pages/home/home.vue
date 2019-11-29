<template>

	<view class="">

		<view v-if="!pageIsTrue" class="centent">

			<view class="button">
				<button open-type="getUserInfo" @getuserinfo="getUser" class="cu-btn bg-green shadow-blur round" style="width: 45%;margin-left: 30%;margin-top: 150%;">进入小程序</button>
			</view>

		</view>


		<view v-if="pageIsTrue" class="container999" @click="conClick" @touchstart="refreshStart" @touchmove="refreshMove"
		 @touchend="refreshEnd">

			<!-- 刷新事件isRefresh需要异步操作返回resolve -->
			<refresh ref="refresh" @isRefresh='isRefresh'></refresh>
			<!-- 点击反馈组件 -->
			<clickCircle ref="clickCircle"></clickCircle>
			<view class='nav'>
				<!-- #ifdef H5 -->
				<!-- <view style="height: 44px;width: 100%;">边距盒子</view> -->
				<!-- #endif -->

				<!-- 自定义导航栏 -->
				<cu-custom bgColor="bg-gradual-blue" :isBack="false">
					<block slot="backText">返回</block>
					<block slot="content">毕节职业技术学院</block>
				</cu-custom>
				<!-- end -->

				<!-- 导航栏 agents导航栏标题 -->
				<navTab style="background: white;" ref="navTab" :tabTitle="tabTitle" @changeTab='changeTab'></navTab>
			</view>
			<!-- 回到顶部悬浮按钮 -->
			<!-- #ifdef H5 -->
			<movable-area style="height: 100vh; width: 100vw;position: absolute;bottom: 0;right: 0;">
				<movable-view class="addBtnBox" style="padding-top:120upx;padding-bottom:120upx;right:0;" @touchmove.stop="" :x="isX"
				 :y="isY" direction="all">
					<view class="addBtn" @click="toTop">发布</view>
				</movable-view>
			</movable-area>
			<!-- #endif -->

			<!-- #ifdef MP-QQ -->
			<movable-area style="height: 100vh; width: 100vw;position: absolute;bottom: 0;right: 0;">
				<movable-view class="addBtnBox" style="padding-top:120upx;padding-bottom:20upx;right: 0;" @touchmove.stop="" :x="isX"
				 :y="isY" direction="all">
					<view class="addBtn" @click="toTop">发布</view>
				</movable-view>
			</movable-area>
			<!-- #endif -->

			<!-- swiper切换 swiper-item表示一页 scroll-view表示滚动视窗 -->
			<swiper style="min-height: 100vh;" :current="currentTab" @change="swiperTab">
				<swiper-item v-for="(listItem,listIndex) in list" :key="listIndex">
					<scroll-view style="height: 100%;" scroll-y="true" @scrolltolower="lower1" scroll-with-animation :scroll-into-view="toView">

						<!-- #ifndef  MP-WEIXIN || H5 -->
						<view :id="'top'+listIndex" style="width: 100%;height: 15vh;"></view>
						<!-- #endif -->

						<!-- #ifdef MP-QQ -->
						<view :id="'top'+listIndex" style="width: 100%;height: 5vh;"></view>
						<!-- #endif -->

						<view class='content'>

							<!-- 轮播图 -->
							<min-swiper></min-swiper>
							<!-- end -->

							<!-- 内容 -->
							<view class="margin-right-sm margin-left-sm">

								<view class='contianer shadow-warp bg-white' v-for="(item,index) in datalist" :key="index">
									<view class='contianer-title'>
										<view class='contianer-title_image'>
											<image v-bind:src="item.head_img"></image>
										</view>
										<view class='contianer-name'>{{item.u_nickname}}</view>
										<view style="font-size: 12upx; padding-left: 320upx; white-space: nowrap; overflow: hidden; text-overflow: ellipsis;">{{item.school_name}}</view>
									</view>

									<view class='contianer-content'>
										<text>{{item.content}}</text>
									</view>

									<view class='container-grid'>
										<view @tap='previewImg' :data-index='index' :class=" index == 2 || index == 5 || index == 8  ? '' : items.length == 4 ?'' : items.length == 1 ? 'container-grid_image-1':'container-grid_image' "
										 :style="items.length == 4 ? 'width:32%;margin-right: 15rpx;' : '' " v-for="(items,indexs) in item.image"
										 :key="indexs">
											<image :src='items.img' :style="items.length == 1 ? 'width:100%;' :'' " :class="items.length == 1 ? 'container-grid_img' : 'container-grid__image' "></image>
											<!-- width:100%; -->
										</view>
									</view>

									<view class='container-evaluate bg-gray' v-if="item.comment[0]>0?true:false">
										<view class='container-evaluate-top'>
											<view class='container-evaluate-top_1'>
												<image src='../../static/hot_evaluate1.png'></image>
											</view>
											<view>{{item.card_like_count}} <text class='text-sm'>赞</text></view>
										</view>
										<view class='container-evaluate-desc'><text class='text-sm text-weight '>
												{{item.comment[0].length>0?item.comment[0].content:''}}
											</text></view>
									</view>

									<view class='container-comment '>
										<view><text class='cuIcon-share lg text-black'>分享</text></view>
										<view @tap='toDiscover_desc'><text class='cuIcon-message lg text-black'> 168</text></view>
										<view><text class='cuIcon-appreciatefill lg text-red'></text><text> 768</text></view>
									</view>

									<!-- 话题分类 -->
									<view class="topic" @tap="toTopic">


										<view class="" style="width: 100%;color: #007AFF;display: flex;justify-content: center;">
											<text># 校园话题</text>
										</view>

									</view>
									<!-- end -->

								</view>

							</view>
							<!-- end -->


						</view>
						<view class='noCard' v-if="listItem.length===0">
							暂无信息
						</view>
					</scroll-view>
				</swiper-item>
			</swiper>
		</view>

	</view>

</template>

<script>
	const util = require('../../util/util.js');
	import refresh from '../component/refresh.vue';
	import navTab from '../component/navTab.vue';
	import clickCircle from '../component/clickCircle.vue';
	import minSwiper from "../component/minSwiper.vue";
	export default {
		components: {
			refresh,
			navTab,
			clickCircle,
			minSwiper
		},
		data() {
			return {

				pageIsTrue: this.PageState, //显示页面状态

				//图片
				imgArr: [
					'http://bpic.588ku.com/element_origin_min_pic/16/10/30/528aa13209e86d5d9839890967a6b9c1.jpg',
				],
				// end
				currentPage: 'other',
				toView: '', //回到顶部id
				isX: 0, //放在store统一管理
				isY: 999, //放在store统一管理
				tabTitle: ['全部', '我的学校', '关注学校', '最热', '最新', '选择四', '选择四'], //导航栏格式 --导航栏组件
				currentTab: 0, //sweiper所在页
				pages: [1, 1, 1, 1, 1], //第几个swiper的第几页
				list: [
					[1, 2, 3, 4, 5, 6],
					['a', 'b', 'c', 'd', 'e', 'f'],
					[],
					['2233', '4234', '13144', '324244'],
					[]
				], //数据格式
				//后台计算的数据
				templist: [
					[],
					[],
					[],
					[],
					[]
				],
				//前台要显示的数据
				datalist: '',
				func: '',
				isloading: false
			};
		},
		onLoad(e) {

		},
		onShow() {
			this.getAllCard()
		},
		onHide() {},
		methods: {

			/**
			 * 用户登陆
			 * @param {Object} e
			 */
			getUser: function(e) {
				// 显示home页面
				if (e.detail.errMsg == "getUserInfo:ok") { //登陆成功

					// 将用户信息添加缓存
					uni.setStorageSync('userInfo', e.detail.userInfo);
					var avatarUrl = e.detail.userInfo.avatarUrl;
					var gender = e.detail.userInfo.gender;
					var nickName = e.detail.userInfo.nickName;

					// 保存用户数据
					uni.request({
						url: this.tui.interfaceUrl() + 'login',
						header: {
							"content-type": "application/json",
							'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
						},
						data: {
							avatarUrl: avatarUrl,
							gender: gender,
							nickName: nickName,
						},
						success: () => {
							//显示home页面
							this.pageIsTrue = true; //需要在APP判断缓存
						},
						fail: () => {
							uni.showToast({
								title: '登陆失败！请稍后再试！',
								icon: 'none',
								duration: 2000
							})
						}
					})


				} else {
					uni.showToast({
						title: "请先授权才查看小姐姐小哥哥动态哦！",
						icon: "none",
						duration: 2000
					})
				}

			},
			getHomeMySchoolDate() {
				var self = this
				uni.showLoading({
					title: '加载资源中...',
					mask: false
				});
				uni.request({
					url: this.tui.interfaceUrl() + 'home/getHomeMySchoolDate',
					method: "GET",
					header: {
						"content-type": "application/json",
						'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
					},
					data: {
						page: this.pages[this.currentTab]
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							self.loadBackGroundData(res.data.data)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						});
					},
					complete() {
						uni.hideLoading()
					}

				})
			},
			getHomeMyFocusSchoolDate() {
				var self = this
				uni.showLoading({
					title: '加载资源中...',
					mask: false
				});
				uni.request({
					url: this.tui.interfaceUrl() + 'home/getHomeMyFocusSchoolDate',
					method: "GET",
					header: {
						"content-type": "application/json",
						'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
					},
					data: {
						page: this.pages[this.currentTab]
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							self.loadBackGroundData(res.data.data)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						});
					},
					complete() {
						uni.hideLoading()
					}

				})
			},
			getHomeNewDate() {
				var self = this
				uni.showLoading({
					title: '加载资源中...',
					mask: false
				});
				uni.request({
					url: this.tui.interfaceUrl() + 'home/getHomeNewDate',
					method: "GET",
					data: {
						page: this.pages[this.currentTab]
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							self.loadBackGroundData(res.data.data)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						});
					},
					complete() {
						uni.hideLoading()
					}

				})
			},
			getHomeHotDate() {
				var self = this
				uni.showLoading({
					title: '加载资源中...',
					mask: false
				});
				uni.request({
					url: this.tui.interfaceUrl() + 'home/getHomeHotDate',
					method: "GET",
					data: {
						page: this.pages[this.currentTab]
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							self.loadBackGroundData(res.data.data)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						});
					},
					complete() {
						uni.hideLoading()
					}

				})
			},
			getAllCard() {
				var self = this
				uni.showLoading({
					title: '加载资源中...',
					mask: false
				});
				uni.request({
					url: this.tui.interfaceUrl() + 'home/getALLHomeDate',
					method: "GET",
					data: {
						page: this.pages[this.currentTab]
					},
					success: (res) => {
						console.log(res)
						if (res.data.code == 1) {
							self.loadBackGroundData(res.data.data)
						}
					},
					fail: (err) => {
						uni.showToast({
							title: '服务器异常',
							icon: 'none'
						});
					},
					complete() {
						uni.hideLoading()
					}

				})
			},
			loadData(index) {
				this.isloading = true
				switch (index) {
					case 0:
						this.getAllCard();
						break;
					case 1:
						this.getHomeMySchoolDate();
						break;
					case 2:
						this.getHomeMyFocusSchoolDate();
						break;
					case 3:
						this.getHomeHotDate();
						break;
					case 4:
						this.getHomeNewDate();
						break;
				}
				this.isloading = false
				this.pages[this.currentTab] += 1
			},
			loadBackGroundData(data) {

				if (data.length == 0) {
					uni.showToast({
						title: '没有更多了',
						duration: 2000
					});
				}
				for (let i = 0; i < data.length; i++) {
					this.templist[this.currentTab].push(data[i])
				}
				this.datalist = ''
				this.datalist = this.templist[this.currentTab]
				console.log(this.templist[this.currentTab])
			},

			// 跳转话题页面
			toTopic: function() {
				uni.navigateTo({
					url: "/pages/home/home_topic/home_topic"
				})
			},

			// 详细跳转
			toDiscover_desc: function(e) {
				uni.navigateTo({
					url: "/pages/home/home_desc/home_desc"
				})
			},

			// 点击图片打开详细
			previewImg: function(e) {
				// console.log(e.currentTarget.dataset.index);
				var index = e.currentTarget.dataset.index;
				var imgArr = this.imgArr;
				uni.previewImage({
					current: imgArr[index], //当前图片地址
					urls: imgArr, //所有要预览的图片的地址集合 数组形式
					success: function(res) {},
					fail: function(res) {},
					complete: function(res) {},
				})
			},

			toTop() {
				// this.toView = ''
				// setTimeout(()=>{
				// 	this.toView = 'top' + this.currentTab
				// },10)
				uni.navigateTo({
					url: '/pages/discover/dis_issue/dis_issue'
				})
			},
			changeTab(index) {
				this.currentTab = index
				this.loadData(this.currentTab)
			},
			// 点击反馈事件
			conClick(e) {
				console.log(e);
				this.$refs.clickCircle.conClick(e);
			},
			// 其他请求事件 当然刷新和其他请求可以写一起 多一层判断。
			isRequest(pages) {
				return new Promise((resolve, reject) => {
					this.pages[this.currentTab]++
					var that = this
					setTimeout(() => {
						uni.hideLoading()
						uni.showToast({
							icon: 'none',
							title: `请求第${that.currentTab + 1 }个导航栏的第${that.pages[that.currentTab]}页数据成功`
						})
						let newData = ['新数据1', '新数据2', '新数据3']
						resolve(newData)
					}, 1000)
				})
			},
			// swiper 滑动
			swiperTab: function(e) {
				var index = e.detail.current //获取索引
				if (this.tabTitle.length <= this.tabTitle) {
					this.$refs.navTab.navClick(index)
				} else {
					this.$refs.navTab.longClick(index)
				}
			},
			// 加载更多 util.throttle为防抖函数
			lower1: util.throttle(function(e) {
				uni.showLoading({
					title: '加载中',
					mask: true
				})

				this.loadData(this.currentTab)

			}, 300),
			// 刷新touch监听
			refreshStart(e) {
				this.$refs.refresh.refreshStart(e);
			},
			refreshMove(e) {
				this.$refs.refresh.refreshMove(e);
			},
			refreshEnd(e) {
				this.$refs.refresh.refreshEnd(e);
			},
			isRefresh() {
				setTimeout(() => {
					uni.showToast({
						icon: 'success',
						title: '刷新成功'
					})
					this.$refs.refresh.endAfter() //刷新结束调用
				}, 1000)
			}
		}
	};
</script>

<style lang="scss">
	.centent {
		width: 100%;
		height: 100vh;
		background-image: url('https://img.zcool.cn/community/01fd6556fe93dc32f875a944400aca.gif');
	}

	.addBtnBox {
		position: fixed;
		z-index: 900;
		width: 140upx;
		align-items: flex-end;
		justify-content: center;
		height: 140upx;
		display: flex;
		right: 0upx;

		.addBtn {
			right: 0upx;
			width: 100upx;
			height: 100upx;
			border-radius: 50%;
			color: white;
			font-size: 10px;
			font-weight: bold;
			background: #444857;
			line-height: 100upx;
			text-align: center;
			box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25), 0 10px 10px rgba(0, 0, 0, 0.22);
		}
	}

	.container999 {
		width: 100vw;
		font-size: 28upx;
		min-height: 100vh;
		overflow: hidden;
		color: #6B8082;
		position: relative;
		background-color: #f6f6f6;
	}

	.content {
		width: 100%;
	}



	.noCard {
		width: 90%;
		height: 200upx;
		margin: auto;
		background-color: white;
		display: flex;
		align-items: center;
		justify-content: center;
		color: #999999;
		box-shadow: 0 0 10upx 0 rgba(0, 0, 0, 0.10);
		border-radius: 10upx;
	}


	.nav {
		position: fixed;
		left: 0;
		top: 0;
		color: white;
		width: 100%;
		display: flex;
		flex-direction: column;
		align-items: flex-start;
		justify-content: flex-start;
		font-size: 24upx;
		background-color: #50B7EA;
		z-index: 996;
	}


	/* 内容 */
	.contianer {
		height: auto;
		width: 100%;
		padding: 20rpx;
		border-radius: 20rpx;
		margin-bottom: 20rpx;
		margin-top: 20rpx;
	}

	.contianer-title {
		display: flex;
		align-items: center;
	}

	.contianer-title_image image {
		height: 50rpx;
		width: 50rpx;
		border-radius: 100%;
	}

	.contianer-name {
		margin-left: 20rpx;
		font-size: 25rpx;
		color: black;
	}

	.contianer-content {
		margin-top: 10rpx;
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 6;
		-webkit-box-orient: vertical;
	}

	.contianer-content text {
		font-size: 30rpx;
		color: black;
	}

	.container-grid {
		display: flex;
		flex-wrap: wrap;
		margin-top: 20rpx;
		width: 100%;
	}

	.container-grid__image {
		height: 210rpx;
		width: 215rpx;
		border-radius: 10rpx;
	}

	.container-grid_img {
		width: 223rpx;
		border-radius: 10rpx;
	}

	.container-grid_image {
		margin-right: 10rpx;
		width: 32%;
	}

	.container-grid_image-1 {
		margin-right: 10rpx;
		width: 100%;
	}

	.container-evaluate {
		margin-top: 20rpx;
		width: 100%;
		height: auto;
		border-radius: 20rpx;
		padding: 20rpx;
	}

	.container-evaluate-top_1 image {
		width: 75rpx;
		height: 40rpx;
	}

	.container-evaluate-top {
		display: flex;
		justify-content: space-between;
		align-items: center;
	}

	.container-evaluate-desc {
		width: 100%;
		display: -webkit-box;
		overflow: hidden;
		-webkit-line-clamp: 2;
		-webkit-box-orient: vertical;

	}

	.container-comment {
		margin-top: 20rpx;
	}

	.container-comment {
		padding: 20rpx;
		display: flex;
		justify-content: space-between;
	}

	/* end */

	.topic {
		padding: 20upx;
		width: 100%;
		display: flex;
		align-items: center;
		background: linear-gradient(45deg, #39b54a, #8dc63f);
		border-radius: 10upx;
	}
</style>
