export function goWindow(url) {
	uni.navigateTo({
		url: url
	})
}

export function trigger(e) {
	var item = e.item;
	var index = e.index;
	if (item.active) {
		return false
	} else { 
		if (index == 0) {
			uni.reLaunch({
				url: '/pages/Home/Home'
			});
		} else if (index == 1) {
			uni.reLaunch({
				url: '/pages/system/system'
			});
		} else if (index == 2) {
			uni.reLaunch({
				url: '/pages/school/school'
			});
		} else if (index == 3) {
			uni.reLaunch({
				url: '/pages/personal/index'
			});
		} else if (index == 4) {
			uni.reLaunch({
				url: '/pages/statistics/statistics'
			});
		}
	}
}
