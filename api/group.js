import request from '@/utils/request'
import qs from 'qs';


export function openGroup(data) {
	return request({
		url: '/tools/api_mms.ashx?action=open_group',
		method: 'post',
		params: data
	})
}

export function getGroup(data) {
	var url = "/tools/api_mms.ashx?action=get_group";
	return request({
		url: url,
		method: 'get',
		params: data
	})
}
export function updateGroup(data) {
	var url = "/tools/api_mms.ashx?action=update_group"; 
	return request({
		url: url,  
		method: 'post',
		params: data
	})
}
//获取组列表
export function getGroupList(data) {
    var url = "/tools/api_mms.ashx?action=get_group_list";
    //console.log(url)
    return request({
        url: url,
        method: 'get',
        params: data
    })
}

export function getGroupCount(data) { 
	return request({
		url: '/tools/api_mms.ashx?action=get_group_count',
		method: 'get',
		params:data
	})
}
export function getGroupCountByUser(data) { 
	return request({
		url: '/tools/api_mms.ashx?action=get_group_count_by_user',
		method: 'get',
		params:data
	})
}
