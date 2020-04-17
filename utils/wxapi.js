/**
 * ΢��js-sdk
 * �ο��ĵ���https://mp.weixin.qq.com/wiki?t=resource/res_main&id=mp1421141115
 */
import wx from 'weixin-js-sdk'
import Axios from 'axios'
const wxApi = {
    /**
     * [wxRegister ΢��Api��ʼ��]
     * @param  {Function} callback [ready�ص�����]
     */
    wxRegister(data, option) { //data��΢��������Ϣ��option�Ƿ������������
        wx.config({
            debug: false, // ��������ģʽ
            appId: data.appId, // ������ںŵ�Ψһ��ʶ
            timestamp: data.timestamp, // �������ǩ����ʱ���
            nonceStr: data.nonceStr, // �������ǩ���������
            signature: data.signature, // ���ǩ��������¼1
            jsApiList: [
                'hideMenuItems',
                'onMenuShareAppMessage'
            ] // �����Ҫʹ�õ�JS�ӿ��б�����JS�ӿ��б����¼2
        })
        wx.error(function (res) {
            //console.log(res);
        });
        wx.ready(function () {
            wx.onMenuShareAppMessage({
                title: option.title, // �������
                link: option.link, // ��������
                imgUrl: option.imgUrl, // ����ͼ��
                desc: option.desc, // ��������
                success() {
                    // �û��ɹ������ִ�еĻص�����
                    option.success()
                },
                cancel() {
                    // �û�ȡ�������ִ�еĻص�����
                    option.error()
                }
            })
            wx.hideMenuItems({
                menuList: [
                    'menuItem:openWithQQBrowser',
                    'menuItem:openWithSafari',
                    'menuItem:share:qq',
                    'menuItem:share:QZone',
                    'menuItem:copyUrl'    //��������
                ]
            });
        })
    }
}
export default wxApi