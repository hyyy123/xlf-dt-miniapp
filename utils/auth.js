const TokenKey = 'wechat-token'

export function getToken() {
	return new Promise((resolve, reject) => {
		uni.getStorage({
			key: TokenKey,
			success: function(res) {
				resolve(res) 
			},
			fail: function(res) {
				reject(res) 
			},
		});
	})

}

export function setToken(token) {

	uni.setStorage({
		key: TokenKey,
		data: token,
		success: function() {
			console.log('success');
		}
	});
}

export function removeToken() {
	uni.removeStorage({
		key: TokenKey,
		success: function(res) {
			console.log('success');
		}
	});
}
