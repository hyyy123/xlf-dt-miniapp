/**
 * 微信js-sdk
 * 参考文档：https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
    /**
     * [wxRegister 微信Api初始化]
     * @param  {Function} callback [ready回调函数]
     */
    wxRegister(data, option) { //data是微信配置信息，option是分享的配置内容
        wx.config({
            debug: false, // 开启调试模式
            appId: data.appId, // 必填，公众号的唯一标识
            timestamp: data.timestamp, // 必填，生成签名的时间戳
            nonceStr: data.nonceStr, // 必填，生成签名的随机串
            signature: data.signature, // 必填，签名，见附录1
            jsApiList: [
                'hideMenuItems',
                'onMenuShareAppMessage'
            ] // 必填，需要使用的JS接口列表，所有JS接口列表见附录2
        })
        wx.error(function (res) {
            //console.log(res);
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: option.title, // 分享标题
                link: option.link, // 分享链接
                imgUrl: option.imgUrl, // 分享图标
                desc: option.desc, // 分享描述
                success() {
                    // 用户成功分享后执行的回调函数
                    option.success()
                },
                cancel() {
                    // 用户取消分享后执行的回调函数
                    option.error()
                }
            })
            wx.hideMenuItems({
                menuList: [
                    'menuItem:openWithQQBrowser',
                    'menuItem:openWithSafari',
                    'menuItem:share:qq',
                    'menuItem:share:QZone',
                    'menuItem:copyUrl'    //复制链接
                ]
            });
        })
    }
}
export default wxApi