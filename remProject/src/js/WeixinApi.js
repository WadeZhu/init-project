'use strict';
document.write('<script src="http://wxapp.wemediacn.com:9191/share/act.aspx?type=wxjsconfig&token=olay&url='+encodeURIComponent(location.href)+'" type="text/javascript"></script>');
var wxData = {
	imgUrl: 'http://apps.hylinkgz.cn/trial/akong/mask.png',
	link: 'http://www.baidu.com/',
	desc: '分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容分享内容',
	title: "分享标题分享标题分享标题分享标题分享标题分享标题分享标题分享标题分享标题分享标题分享标题",
	share: function() {
		//获取“分享到朋友圈”按钮点击状态及自定义分享内容接口
		wx.onMenuShareTimeline({
			title: wxData.title,
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			success: function() {
				wxData.success();
				wxData.callback();
			},
			cancel: function() {

			}
		});

		//获取“分享给朋友”按钮点击状态及自定义分享内容接口
		wx.onMenuShareAppMessage({
			title: wxData.title,
			desc: wxData.desc,
			link: wxData.link,
			imgUrl: wxData.imgUrl,
			type: '', // 分享类型,music、video或link，不填默认为link
			dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
			success: function() {
				wxData.success();
				wxData.callback();
			},
			cancel: function() {

			}
		});
	},
	success: function() {

	},
	callback: function() {

	}
};


wx.ready(function() {
	wxData.share();
});
wx.error(function(res) {
	alert(JSON.stringify(res));
});