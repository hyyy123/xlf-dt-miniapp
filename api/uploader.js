import request from '@/utils/request'
import qs from 'qs';

//上传文件
export function uploadFild(data) {
    //data = qs.stringify(data);
    return request({
        url: '/tools/upload_ajax.ashx?action=uploadFild',
        method: 'post',
        data
    })
}