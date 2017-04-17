;(function(){
	var config  ={};
	var config_width = 750,
		config_height = 0,
		html = document.documentElement,
		delay, setSize = function() {
			config.windowWidth = html.clientWidth || window.innerWidth || html.getBoundingClientRect().width;
			config.windowHeight = html.clientHeight || window.innerHeight || html.getBoundingClientRect().height;
			config.aspectRatio = config.windowWidth / config.windowHeight;

			if (!config_width || config.aspectRatio > config_width / config_height) {
				config.windowScale = config_height / config.windowHeight;
				html.style.cssText += 'font-size:' + config.windowHeight * 100 / config_height + 'px!important;';
			} else {
				config.windowScale = config_width / config.windowWidth;
				html.style.cssText += 'font-size:' + config.windowWidth * 100 / config_width + 'px!important;';
			}
			html.offsetWidth;
		}
	if (!config_height && !config_width) {
		config_width = 750;
	}
	setSize();
    document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('resize', function() {
            clearTimeout(delay);
            delay = setTimeout(setSize, 50);
        }, false);
    }, false);   		
})();
;(function(W,D){
	W.App = W.App || {
		wxShare: true,
		domain:"http://campaign.olay.com.cn/supperredemption/",
		debug: false,
		isClick :false,
        windowWidth : 0
	};
	W.App.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }	
	if(App.debug || App.getUrl('debug')){
		document.write('<script src="js/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
    if (App.isWeiXin||App.wxShare) {
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="http://bos.bj.baidubce.com/we-gd/olay/superredemption/js//WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
	}
})(window,document);    	