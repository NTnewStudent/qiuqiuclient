import Vue from 'vue'
import App from './App'
Vue.config.productionTip = false
App.mpType = 'app'

const tui = {
	
	// 转换时间戳
	getDateTimeStamp:function (dateStr){
	 return Date.parse(dateStr.replace(/-/gi,"-"));
	},
	
	// 时间转换
	getDateDiff:function (dateTimeStamp){
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
	
	interfaceUrl:function(){
		return 'http://www.t.com/v1/';
	},
	request: function(url, postData, method, type = false,hideLoading = false) {
		//接口请求
		if (hideLoading) {
			uni.showLoading({
				mask: true,
				title: '请稍候...'
			})
		}
		return new Promise((resolve, reject) => {
			uni.request({
				url: this.interfaceUrl() + url,
				data: postData,
				header: {
					'content-type': type ? 'application/x-www-form-urlencoded' : 'application/json',
					'token': this.getToken(),
					'security': 1
				},
				method: method, //'GET','POST'
				dataType: 'json',
				success: (res) => {
					hideLoading && uni.hideLoading()
					resolve(res.data)
				},
				fail: (res) => {
					if (hideLoading) {
						this.toast("网络不给力，请稍后再试~")
					}
					reject(res)
				}
			})
		})
	},
	getToken() {
		return uni.getStorageSync("token")
	},
	
	getHeader:function(){
		return  {
				"content-type": "application/json",
				'token': uni.getStorageSync('token') ? `${uni.getStorageSync('token')}` : ''
				}
	},
}


// 全局自定义导航栏
import cuCustom from './colorui/components/cu-custom.vue'
Vue.component('cu-custom',cuCustom);

// 全局自定义提示框
import message from './pages/component/bobo-message/bobo-message.vue'
Vue.component('message',message);


Vue.prototype.tui = tui





const app = new Vue({
    ...App
})
app.$mount()
