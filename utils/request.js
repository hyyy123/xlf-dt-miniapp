import store from '@/store'
import {
	getToken,
	setToken,
	removeToken
} from '@/utils/auth'
const baseUrl = 'https://main.paikongtong.com';

// request 封装

let request = (data) => {

	let url = data.url;
	var params = data.params;
	let type = data.method;
	let token = store.getters.token; 
	params["product_id"] = 7
	// params.token_wx = store.getters.token
	return new Promise((reslove, reject) => {

		let typeState = 'POST';
		if (type) {
			typeState = type
		}
		uni.request({
			url: baseUrl + url,
			method: typeState,
			data: params,
			dataType: 'json',
			header: {
				"token_pc": token == undefined ? "" : token,
				'Content-Type': "application/x-www-form-urlencoded"
			},
			success: (response) => {
				const res = response.data
				// 接口数据小于0，接口失败
				if (res.msg < 0) {
					//-201:登录状态已失效； -202：学员名额不足；-205：用户无分组；-300：排队人员太多；
					//-508:非法token； -512：其他人登录； -514：token：失效；
					if (res.msg == -508 || res.msg == -512 || res.msg == -514) {
						toast(res.msgbox)
						uni.reLaunch({
							url: '/pages/Login/Login'
						});
						removeToken();
						return false
						// uni.showModal({
						// 	title: '提示',
						// 	content: '您已经退出登录, 是否重新登录？',
						// 	success: function(res) {
						// 		if (res.confirm) {
						// 			//微信小程序
						// 			uni.login({
						// 				provider: 'weixin',
						// 				success: function(loginRes) {
						// 					//获取code,用code换取token
						// 					let code = loginRes.authResult.code;
						// 					store.dispatch('user/login', code);
						// 					console.log(loginRes.authResult);
						// 				}
						// 			});

						// 			console.log('用户点击确定');

						// 		} else if (res.cancel) {
						// 			console.log('用户点击取消');
						// 		}
						// 	}
						// });


					} else if (res.msg === -205) {
						toast('用户无分组')
					} else {

						toast(res.msgbox || 'Error')

					}
					return Promise.reject(new Error(res.msgbox || 'Error'))
				} else {
					//成功
					reslove(res)
				}

			}
		})
	})
}

// 封装弹窗

let toast = (msg) => {
	uni.showToast({
		title: msg,
		icon: 'none',
		position: 'bottom',
		duration: 2000,
		mask: false
	})

}

// 封装页面跳转

let goWindow = (url) => {
	uni.navigateTo({
		url: url
	})
}



// 封装加载框

let loading = () => {
	uni.showLoading({
		title: '加载中...',
		mask: true
	});

}

// 当前时间转换

let retTime = () => {
	var date = new Date();
	var y = date.getFullYear();
	var m = date.getMonth() + 1;
	m = m < 10 ? ('0' + m) : m;
	var d = date.getDate();
	d = d < 10 ? ('0' + d) : d;
	var h = date.getHours();
	h = h < 10 ? ('0' + h) : h;
	var minute = date.getMinutes();
	var second = date.getSeconds();
	minute = minute < 10 ? ('0' + minute) : minute;
	second = second < 10 ? ('0' + second) : second;
	return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
}

// 封装跳转tab页面

let goNavWindow = (url) => {
	uni.switchTab({
		url: url
	})
}

// 封装打电话事件

let goPhone = (phone) => {
	uni.makePhoneCall({
		phoneNumber: phone
	})
}

// 封装打电话事件

let qx = (qx) => {
	for (let i in uni.getStorageSync('qxList')) {
		if (uni.getStorageSync('qxList')[i] == qx) {
			return true;
			break;
		}
		if (i == uni.getStorageSync('qxList').length && uni.getStorageSync('qxList')[i] != qx) {
			return false;
			break;
		}
	}
}

module.exports = request
