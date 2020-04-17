import request from '@/utils/request'
import qs from 'qs';

//获取系统信息 
export function login(data) { 
	// data = qs.stringify(data);
	return request({
		url: '/tools/api_user.ashx?action=pc_login',
		method: 'post',
		params:data
	})
}

export function logout(data) { 
	return request({
		url: '/tools/api_user.ashx?action=pc_logout',
		method: 'post',
		params:data
	})
}

export function getInfo(data) { 
	return request({
		url: '/tools/api_user.ashx?action=get_user',
		method: 'get',
		params:data
	})
}
