!(function(W,D) {
	W.En = W.En || {
		wxShare: false,
		domain:"",
		debug: false,
        windowWidth : 0
	};
	W.En.getUrl = function(item) {
        var svalue = location.search.match(new RegExp("[\?\&]" + item + "=([^\&]*)(\&?)","i"));
        return svalue ? svalue[1] : svalue;
    }
	;(function() {
		En.ua = navigator.userAgent.toLowerCase();
		En.isAndroid = En.ua.match(/android/i) == "android";
		En.isIOS = En.ua.match(/iphone os/i) == "iphone os";
		En.isIpad = En.ua.match(/ipad/i) == "ipad";
		En.isWM = En.ua.match(/windows ce/i) == "windows ce" || En.ua.match(/windows mobile/i) == "windows mobile";
		var isMidp = En.ua.match(/midp/i) == "midp";
		var isUc7 = En.ua.match(/rv:1.2.3.4/i) == "rv:1.2.3.4";
		var isUc = En.ua.match(/ucweb/i) == "ucweb";
		En.isMobile = En.isAndroid || En.isIOS || En.isIpad || En.isWM || isMidp || isUc7 || isUc;
		En.isWeiXin = En.ua.match(/MicroMessenger/i) == "micromessenger";
		En.isWebKit = En.ua.match(/webkit/i) == "webkit";
		En.isChrome = En.ua.match(/Chrome/i) == "chrome";
		if (En.ua.indexOf('ucbrowser') > -1) {
			var control = navigator.control || {};
			if (control.gesture) {
				control.gesture(false);
			}
		}
	})();	
	var config  ={};
	var src = document.getElementsByTagName('script'),
		html = document.documentElement,
		body,
		dataset = src[0].dataset,
		config_width = +dataset.width || 0,
		config_height = +dataset.height || 0,
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
			if (En.ua.isAndroid && En.ua.isUc && !!body) {
				body.style.visibility = 'hidden';
				body.offsetHeight;
				body.style.visibility = 'visible';
			}
		}
	if (!config_height && !config_width) {
		config_width = 640;
	}
	//setSize();
    document.addEventListener('DOMContentLoaded', function() {
        window.addEventListener('resize', function() {
            clearTimeout(delay);
            delay = setTimeout(setSize, 50);
        }, false);
    }, false);


	if(En.debug || En.getUrl('debug')){
		document.write('<script src="lib/debug.js" type="text/javascript" charset="utf-8"><\/script>');
	}
	if(En.isWeiXin && En.wxShare){
		document.write('<script src="http://res.wx.qq.com/open/js/jweixin-1.0.0.js" type="text/javascript" charset="utf-8"><\/script><script src="js/WeixinApi.js" type="text/javascript" charset="utf-8"><\/script>');
	}     
	if(window.Audio){
		Audio.prototype.autoPlay = function(callback){
			var audio = this;
			audio.play();
			if(audio.paused){
				var ev = function() {
					document.removeEventListener('touchstart', ev, true);
					audio.play();
					callback && callback();
				}
				if (/MicroMessenger/i.test(navigator.userAgent)) {
					if (window.WeixinJSBridge) {
						WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
							audio.play();
							callback && callback();
						});
					} else {
						document.addEventListener("WeixinJSBridgeReady", function() {
							WeixinJSBridge.invoke('getNetworkType', {}, function(e) {
								audio.play();
								callback && callback();
							});
						}, false);
					}
				} else {
					document.addEventListener('touchstart', ev, true);
				}
			}else{
				callback && callback();
			}
		}
	}

	En.Swipe = function() {
	
	}
	En.Swipe.prototype = {
		constructor: En.Swipe,
		init: function(obj) {
			var dom = obj.dom,
				startX, startY, moveX, moveY, endX, endY, limit = obj.limit || 40;
			var end = function(e) {
				var touch = e.changedTouches[0],
					distance, radian, direction;
				endX = touch.pageX;
				endY = touch.pageY;
				distance = Math.sqrt(Math.pow(startX - endX, 2) + Math.pow(startY - endY, 2));
				if (distance < limit) {
					return;
				}
				radian = Math.atan2(endY - startY, endX - startX);
				if (radian >= -0.75 * Math.PI && radian < -0.25 * Math.PI) {
					direction = 'up';
				} else if (radian >= -0.25 * Math.PI && radian < 0.25 * Math.PI) {
					direction = 'right';
				} else if (radian >= 0.25 * Math.PI && radian < 0.75 * Math.PI) {
					direction = 'down';
				} else {
					direction = 'left';
				}
				obj.callback && obj.callback.call(this, direction);
			}
			dom.addEventListener('touchstart', function(e) {
				var touch = e.touches[0];
				startX = touch.pageX;
				startY = touch.pageY;
			});
			dom.addEventListener('touchmove', function(e) {
				e.stopPropagation();
				e.preventDefault();
			},true);
			dom.addEventListener('touchend', function(e) {
				end.call(this, e);
			});
			dom.addEventListener('touchcancel', function(e) {
				end.call(this, e);
			});
		}
	}
	En.Loading = function() {
	
	}
	En.Loading.prototype = {
		constructor: En.Loading,
		init: function(obj) {
			var self = this;
			obj.searchImgs = obj.searchImgs !== undefined ? obj.searchImgs : true;
			self.imgs1 = obj.imgs || [];
			self.imgs2 = [];
			self.debug = obj.debug || false;
			self.imgs3 = [];
			self.imgDoms = [];
			self.bgDoms = [];
			self.imgList = [
				[],
				[],
				[]
			];
			self.audioS = obj.audioS||[];
			self.callback = obj.callback;
			self.enterCallback = obj.enterCallback;
			self.count = 0;
			document.body.offsetHeight;
			if (obj.searchImgs) {
				(function() {
					var imgs, type = obj.searchImgs.type || 'src';
					if (obj.searchImgs.dom) {
						imgs = obj.searchImgs.dom.getElementsByTagName('img');
					} else {
						imgs = document.images;
					}
					var i = 0,
						l = imgs.length;
					while (i < l) {
						(function(index) {
							var imgDom = imgs[index],
								src = imgDom.getAttribute('data-' + type);
							if (src) {
								imgDom.removeAttribute('data-' + type);
								self.imgDoms.push(imgDom);
								self.imgs2.push(src);
							}
						})(i);
						i++;
					}
				})();
			}
			if (obj.searchBgs) {
				var bgs, type = obj.searchBgs.type || 'bg';
				if (obj.searchBgs.dom) {
					bgs = obj.searchBgs.dom.getElementsByTagName('*');
				} else {
					bgs = document.getElementsByTagName('*');
				}
				var i = 0,
					l = bgs.length;
				while (i < l) {
					(function(index) {
						var bgDom = bgs[index],
							src = bgDom.getAttribute('data-' + type);
						if (src) {
							bgDom.removeAttribute('data-' + type);
							self.bgDoms.push(bgDom);
							self.imgs3.push(src);
						}
					})(i);
					i++;
				}
			}
			self.length = self.imgs1.length + self.imgs2.length + self.imgs3.length+ self.audioS.length;
			if (self.length > 0) {
				//加载第一种用户自定义的图片
				self.loadImgs(self.imgs1, 0);
				//加载第二种页面的图片
				self.loadImgs(self.imgs2, 1);
				//加载第三种背景图片
				self.loadImgs(self.imgs3, 2);
				//加载音乐
				self.loadAudios(self.audioS);
			} else if (obj.callback) {
				obj.callback();
			}
		},
		loadAudios: function(audios) {
			var self = this,
				i = 0,
				l = audios.length;
			for (; i < l; i++) {
				self.loadAudio(audios[i],i);
			}
		},	
		loadAudio : function(audios,i){
			var self = this;
			var music = new Audio();
			music.addEventListener("canplay",function(e){
				self.enter(music);
				this.removeEventListener("canplay",false);
			},false);
			music.addEventListener("error",function(e){
				self.enter(music);
				this.removeEventListener("error",false)
			},false);
			music.src=audios;
			music.load();
		},
		loadImgs: function(imgs, type) {
			var self = this,
				i = 0,
				l = imgs.length;
			for (; i < l; i++) {
				self.loadImage(imgs[i], type, i);
			}
		},
		loadImage: function(imgSrc, type, index) {
			var self = this,
				img;
			switch (type) {
				case 0:
					img = new Image();
					self.imgList[type].push(img);
					img.src = imgSrc;
					break;
				case 1:
					img = self.imgDoms[index];
					self.imgList[type].push(img);
					img.src = imgSrc;
					break;
				case 2:
					img = new Image();
					img.src = imgSrc;
					self.imgList[type].push(img);
					self.bgDoms[index].style.backgroundImage = 'url(' + imgSrc + ')';
					break;
			}
			img.errorCount = 0;
			if (img.complete) {
				self.enter(img);
			} else {
				img.onload = function() {
					img.onload = null;
					self.enter(img);
				}
				img.onerror = function() {
					img.errorCount++;
					if (img.errorCount > 10) {
						img.onerror = null;
						if(self.debug){
							alert('有图片加载失败,' + imgSrc);
						}
						self.enter(img);
					} else {
						img.src = imgSrc;
						if (type == 2) {
							self.bgDoms[index].style.backgroundImage = 'url(' + imgSrc + ')';
						}
					}
				}
			}
		},
		enter: function(img) {
			var self = this;
			self.count++;
			if (self.enterCallback) {
				self.enterCallback(img);
			}
			if (self.count == self.length && self.callback) {
				document.body.offsetHeight;
				self.callback(img);
			}
		}
	}	
})(window,document);


