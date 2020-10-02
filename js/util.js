//The following code comes from y.tencentmusic.com;
var WebPostUrl = "/requests/do.php";
function wsingTipBox(t) {
	this.className = t.className || "msgbox", this.animateName = t.animateName, this.tipBox = null, this.tipsWrap = null, this.animateName || (this.animateName = window.requestAnimationFrame ? "show-tips" : "show-tips-fallback")
}
function smwarn(t){
	$("body").append('<div class="sm-warn show-tips"><p>'+t+'</p></div>');
	setTimeout(function(){
		$(".sm-warn").remove();
	},2500);
}
function shref(n){
	var stateObj = { foo: n };
	history.pushState(stateObj, "", "#"+n);
}
function TMES(neir){
    if(neir==undefined){
    	neir = '正在请求数据中...';
    }
	$("body").append('<div class="TMES show-tips" style="text-align:  center;position: fixed;top: 50%;left: 48.9%;width: 270px;height: 25px;margin: -100px 0 0 -135px;background: #fff;box-shadow: 0 0 10px 1px rgba(0,0,0,.2);opacity: 1;z-index: -1;padding: 20px;font-size: 14px;border-radius: 2px;"><i class="layui-icon layui-icon-loading-1 layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="margin-top: -4px;font-size: 30px;color: #333;margin-right: 135px;"></i><span style="font-size: 14px;position: absolute;left: 120px;color: #333;">'+neir+'</span></div>');
}
function TMES_v2(tips){
    if(tips==undefined){
    	tips = '请稍等，正在请求数据中...';
    }
	var html = '<div class="ui-show-box TMES_v2">\
                  	<div class="show-tips">\
              		<i class="layui-icon layui-icon-loading-1 layui-icon layui-anim layui-anim-rotate layui-anim-loop"></i>'+tips+'</div>\
               </div>';
   $("body").append(html);
}
window.TME || (window.TME = {}), Array.prototype.max = function() {
	for (var t = this[0], e = this.length, n = 1; n < e; n++) this[n] > t && (t = this[n]);
	return t
}, TME.check = function() {
	function t(t) {
		var e = /^0?1[3|4|5|8|7][0-9]\d{8}$/;
		return e.test(t)
	}
	function e(t) {
		var e = /[1-9][0-9]{4,}$/;
		return e.test(t)
	}
	function n(t) {
		var e = /^(?![0-9]*$)[a-zA-Z0-9]{6,20}$/;
		return e.test(t)
	}
	function o(t) {
		var e = /[(\/)(\)(')(")(<)(>)]/;
		return e.test(t)
	}
	return {
		isPhoneNum: t,
		isQQNum: e,
		isSavePw: n,
		hasIllegalCode: o
	}
}(), TME.jumpByAuth = function(t) {
	t == -1 ? location.href = "./index.php?g=user&m=user&f=search" : t == -2 ? location.href = "./index.php?g=user&m=user&f=createUpload" : 0 == t ? location.href = "./index.php?g=user&m=user&f=wait" : t == -3 ? location.href = "./index.php?g=user&m=user&f=search" : location.href = "./index.php?g=index&m=index&f=index"
}, wsingTipBox.prototype = function() {
	function t() {
		var t = document.createElement("div");
		return t.className = this.className, t
	}
	function e() {
		window.requestAnimationFrame ? this.tipsWrap.removeChild(this.tipBox) : $(this.tipBox).fadeOut(300, function() {
			$(this).remove()
		})
	}
	function n(e) {
		this.tipsWrap = document.body || document.querySelector("body"), this.tipBox = t.call(this), e.mode && "warn" == e.mode && (this.tipBox.className = this.className + " warn"), this.tipBox.innerHTML = o.replace("{msg}", e.msg), this.tipsWrap.appendChild(this.tipBox), $(this.tipBox).addClass(this.animateName)
	}
	var o = '<div class="hd"><i></i></div><div class="bd"><div class="con">{msg}</div></div>';
	return {
		init: n,
		destory: e
	}
}(), TME.popup = function() {
	function t(t) {
		var e = t && t.time ? config.time : 2800,
			n = new wsingTipBox({});
		n.init(t), setTimeout(function() {
			n.destory(), n = null
		}, e)
	}
	function e(e) {
		if (c = e.type || "alert", "tips" == c) t(e);
		else {
			if (o = $(".global-popup"), !o) return void console.log("没有找到模板");
			a = o.find(".pop-box"), i = o.find(".con"), r = o.find(".cont"), i.html(e.msg || ""), s = e.trueCallback || null, l = e.cancelCallback || null;
			var u = e.btns || [],
				p = "";
			if (0 == u.length && ("alert" == c ? u.push({
				"class": "btn-ok",
				text: "确定"
			}) : "confirm" == c && u.push({
				"class": "btn-cancel",
				text: "取消"
			}, {
				"class": "btn-ok",
				text: "确定"
			})), u.length > 0) for (var g = 0; g < u.length; g++) p += '<a href="javascript:;" class="' + u[g]["class"] + '">' + u[g].text + "</a>";
			r.html(p), o.addClass("fade"), n()
		}
	}
	function n() {
		function t() {
			o.removeClass("fade"), window.isWSingPopShow = 0
		}
		o.off("click"), o.click(function(e) {
			e.stopPropagation(), $(e.target).hasClass("global-popup") && t()
		}), o.on("click", ".btn-ok,.btn-cancel", function(e) {
			e.stopPropagation(), $(this).hasClass("btn-ok") ? (t(), s && s()) : $(this).hasClass("btn-cancel") && (t(), l && l())
		})
	}
	var o = null,
		a = null,
		i = null,
		r = null,
		s = null,
		l = null,
		c = "alert";
	return e
}(), TME.tips = function(t) {
	TME.popup({
		type: "tips",
		msg: t
	})
}, TME.warn = function(t) {
	TME.popup({
		type: "tips",
		msg: t,
		mode: "warn"
	})
}, TME.alert = function(t) {
	TME.popup({
		type: "alert",
		msg: t
	})
}, TME.showTips = function(t, e) {
	var n = new wsingTipBox({
		animateName: e || "show-tips-fallback"
	});
	return n.init({
		msg: t
	}), n
}, TME.renderService = function(t, e) {
	if (t && e) {
		for (var n in e) t = t.replace("{" + n + "}", e[n]);
		return t
	}
}, TME.sessionCache = function(t) {
	function e(e, n) {
		t ? window.sessionStorage.setItem(e, n) : (console.log("sessionStorage is not supported"), TME.alert("您的浏览器似乎相当古老了，建议您使用Chrome等现代浏览器。"))
	}
	function n(e) {
		return t ? window.sessionStorage.getItem(e) : (console.log("sessionStorage is not supported"), void TME.alert("您的浏览器似乎相当古老了，建议您使用Chrome等现代浏览器。"))
	}
	return {
		set: e,
		get: n
	}
}( !! window.sessionStorage), TME.localCache = function(t) {
	function e(e, n) {
		t ? window.localStorage.setItem(e, n) : (console.log("localStorage is not supported"), TME.alert("您的浏览器似乎相当古老了，建议您使用Chrome等现代浏览器。"))
	}
	function n(e) {
		return t ? window.localStorage.getItem(e) : (console.log("localStorage is not supported"), void TME.alert("您的浏览器似乎相当古老了，建议您使用Chrome等现代浏览器。"))
	}
	return {
		set: e,
		get: n
	}
}( !! window.localStorage), TME.getQueryString = function(t) {
	var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
		n = window.location.search.substr(1).match(e);
	return null !== n ? unescape(n[2]) : null
}, TME.getHashString = function(t) {
	var e = new RegExp("(^|&)" + t + "=([^&]*)(&|$)", "i"),
		n = window.location.hash.substr(1).match(e);
	return null !== n ? unescape(n[2]) : null
}, TME.date = function() {
	function t(t) {
		return parseInt(t) < 10 ? "0" + t : t
	}
	function e(e) {
		var n = e.timestamp,
			o = e.rtype;
		if (n && o) {
			10 == n.toString().length && (n = 1e3 * n);
			var a = new Date(n),
				i = "",
				r = a.getFullYear(),
				s = a.getMonth() + 1,
				l = a.getDate(),
				c = a.getHours(),
				u = a.getMinutes(),
				p = a.getSeconds();
			switch (o) {
			case "yyyy-MM-dd hh:mm:ss":
				i = r + "-" + t(s) + "-" + t(l) + " " + t(c) + ":" + t(u) + ":" + t(p);
				break;
			case "yyyy-M-d h:m:s":
				i = r + "-" + s + "-" + l + " " + c + ":" + u + ":" + p;
				break;
			case "yyyy-MM-dd":
				i = r + "-" + t(s) + "-" + t(l);
				break;
			case "yyyy-M-d":
				i = r + "-" + s + "-" + l;
				break;
			case "yyyy-MM":
				i = r + "-" + t(s);
				break;
			case "MM-dd":
				i = t(s) + "-" + t(l);
				break;
			case "M-d":
				i = s + "-" + l;
				break;
			case "hh:mm:ss":
				i = t(c) + ":" + t(u) + ":" + t(p);
				break;
			case "h:m:s":
				i = c + ":" + u + ":" + p
			}
			return i
		}
	}
	function n(t) {
		var e = "";
		return e = t ? new Date(t).getTime() : (new Date).getTime()
	}
	function o(t) {
		var e = t || 7,
			n = i({
				type: "days",
				limit: e
			}),
			o = (new Date).getFullYear();
		return {
			start: o + "-" + n[0],
			end: o + "-" + n[n.length - 1]
		}
	}
	function a(t, n) {
		var o = new Date,
			a = o.getFullYear() + "/" + (o.getMonth() + 1) + "/" + o.getDate(),
			i = [],
			r = 864e5,
			s = new Date(a).getTime() - r,
			l = "MM-dd";
		"months" == t && (r = 30 * r, l = "yyyy-MM");
		for (var c = n - 1; c >= 0; c--) {
			var u = s - r * c;
			i.push(e({
				timestamp: u,
				rtype: l
			}))
		}
		return i
	}
	function i(t) {
		var n = {
			type: "days",
			limit: 7,
			end: new Date((new Date).getTime() - 864e5)
		};
		t || (t = {}), n = $.extend(!0, n, t);
		var o = n.end.getFullYear() + "/" + (n.end.getMonth() + 1) + "/" + n.end.getDate(),
			a = [],
			i = 864e5,
			r = new Date(o).getTime(),
			s = "MM-dd";
		"month" == n.type && (i *= 30, s = "yyyy-MM");
		for (var l = n.limit - 1; l >= 0; l--) {
			var c = r - i * l;
			a.push(e({
				timestamp: c,
				rtype: s
			}))
		}
		return a
	}
	function r(t) {
		var n = (new Date).getTime() - 864e5,
			o = t || 90,
			a = 864e5,
			i = n - (o - 1) * a;
		return e({
			timestamp: i,
			rtype: "yyyy-MM-dd"
		})
	}
	return {
		getLatelyList: a,
		formateTimestamp: e,
		getTimestamp: n,
		getDateList: i,
		getLatelyDateRange: o,
		getStartDate: r
	}
}(), TME.getChartsColors = function(t, e) {
	var n = {},
		o = {
			"-1": "#fe4646",
			0: "#7ab900",
			1: "#00b7e5",
			2: "#f39800",
			3: "#0ac365"
		},
		a = {
			1: "#be7df1",
			2: "#0cc7ce",
			3: "#efd812",
			4: "#f36b88",
			"-1": "#fe4646"
		};
	n = e ? a : o;
	for (var i = [], r = 0; r < t.length; r++) for (var s in n) s == t[r] && i.push(n[s]);
	return i
}, TME.chartLoadingConfig = {
	color: "#fe4646"
}, TME.getChartsDefaultOptions = function(t) {
	var e = {};
	return "line" == t ? e = {
		tooltip: {
			trigger: "axis"
		},
		legend: {
			bottom: 0
		},
		grid: {
			top: "5%",
			left: "5%",
			right: "5%"
		},
		xAxis: {
			type: "category",
			boundaryGap: !1,
			axisLine: {
				lineStyle: {
					color: "#ededed"
				}
			},
			axisTick: {
				show: !1
			}
		},
		yAxis: {
			type: "value",
			axisLine: {
				show: !1
			},
			axisTick: {
				show: !1
			},
			splitArea: {
				show: !1
			}
		},
		series: []
	} : "pie" == t && (e = {
		tooltip: {
			trigger: "item",
			formatter: "{a}<br/>{b}:{c}({d}%)"
		},
		series: [{
			type: "pie",
			radius: ["62%", "86%"],
			center: ["50%", "50%"],
			hoverAnimation: !1,
			itemStyle: {
				emphasis: {
					shadowBlur: 10,
					shadowOffsetX: 0,
					shadowColor: "rgba(0, 0, 0, 0.5)"
				}
			}
		}],
		graphic: [{
			type: "text",
			id: "title",
			left: "center",
			top: 115,
			style: {
				fill: "#999999",
				font: "14px Microsoft YaHei"
			}
		}, {
			type: "text",
			id: "count",
			left: "center",
			top: 88,
			style: {
				fill: "#333333",
				font: "18x Microsoft YaHei"
			}
		}]
	}), e
}, TME.setChartLegendSelected = function(t) {
	var e = {},
		n = t.legendData || [],
		o = t.selected || "";
	if (o.constructor == Array) for (var a = 0; a < n.length; a++) {
		e[n[a]] = !1;
		for (var i = 0; i < o.length; i++) if (o[i] == n[a]) {
			e[n[a]] = !0;
			break
		}
	} else if (o.constructor == String) for (var a = 0; a < n.length; a++) e[n[a]] = !(n[a] != o);
	return e
}, TME.setAxisTextColor = function(t, e) {
	for (var n = [], o = e || "#bcbcbc", a = 0; a < t.length; a++) n.push({
		value: t[a],
		textStyle: {
			color: o
		}
	});
	return n
}, TME.chartLineConfig = {
	type: "line",
	smooth: !1,
	symbolSize: 8,
	connectNulls: !0,
	hoverAnimation: !1,
	showAllSymbol: !0
}, TME.pieChartSeriesConfig = {
	label: {
		normal: {
			show: !1
		},
		emphasis: {
			show: !1
		}
	},
	labelLine: {
		normal: {
			show: !1
		},
		emphasis: {
			show: !1
		}
	}
}, TME.dateRangePickerConfig = {
	language: "cn",
	maxDays: 90,
	minDays: 1,
	startDate: TME.date.getStartDate(),
	endDate: TME.date.formateTimestamp({
		timestamp: (new Date).getTime() - 864e5,
		rtype: "yyyy-MM-dd"
	}),
	rightAmend: 28
}, TME.renderYAxisData = function(t, e) {
	for (var n = t.max(), o = 0, a = "", i = [1e8, 1e4], r = ["亿", "万"], s = 0; s < i.length; s++) if (n >= i[s]) {
		o = i[s], a = r[s];
		break
	}
	o > 0 && (e.yAxis.axisLabel = {
		formatter: function(t, e) {
			return t / o + a
		}
	});
	var l = Math.round(n).toString().length;
	8 == l || l > 11 ? e.grid.left = "6%" : e.grid.left = "5%"
}, TME.getAllPlatform = function(t) {
	var e = TME.sessionCache.get("platform"),
		n = TME.sessionCache.get("incomeType"),
		o = TME.sessionCache.get("platformMap");
	e && n && o ? (e = JSON.parse(e), n = JSON.parse(n), o = JSON.parse(o), "function" == typeof t && t({
		platform: e,
		incomeType: n
	})) : $.get("./requests/do.php?g=services&m=stat&f=getStatConfig", function(a) {
		0 == a.code ? a.data && (e = a.data.platform, n = a.data.incomesType, o = a.data.platformMap, TME.sessionCache.set("platform", JSON.stringify(e)), TME.sessionCache.set("incomeType", JSON.stringify(n)), TME.sessionCache.set("platformMap", JSON.stringify(o)), "function" == typeof t && t({
			platform: e,
			incomeType: n,
			platformMap: o
		})) : TME.warn("获取平台编号失败")
	}, "json")
}, TME.getPlatformId = function(t) {
	var e = TME.sessionCache.get("platformMap");
	return e ? (e = JSON.parse(e), e[t]) : void(window.sessionStorage ? TME.warn("获取平台Id失败，请刷新页面重试一下") : TME.warn("您的浏览器似乎相当古老了"))
}, TME.renderDataOrderByPlatform = function(t) {
	for (var e = [-1, 3, 1, 2, 0], n = [], o = 0; o < e.length; o++) for (var a in t) e[o] == a && n.push({
		id: a,
		num: t[a]
	});
	return n
}, TME.renderLegendOrderByPlatform = function(t, e) {
	for (var n = [-1, 3, 1, 2, 0], o = [], a = 0; a < n.length; a++) for (var i = 0; i < e.length; i++) n[a] == e[i] && o.push(t[e[i]]);
	return o
}, TME.imgReSize = function(t, e, n) {
	if ("http://static.5sing.kugou.com/images/nophoto.jpg" == t || void 0 == t || "http://static.5sing.kugou.com/images/nan.jpg" == t || "http://static.5sing.kugou.com/images/nv.jpg" == t) return t;
	if (t) {
		var o = t.lastIndexOf(".");
		o > 0 && (t.indexOf("5sing.kgimg.com") > -1 && (t = t.substr(0, o) + "_" + e + "_" + n + t.substr(o, t.length - o)), t.indexOf("bssdl.kugou.com") > -1 && (t = t + "_" + e + "x" + n + t.substr(o, t.length - o))), t = t.replace("/force/", "/m/")
	}
	return t
}, TME.getStrLength = function(t) {
	for (var e = 0, n = 0; n < t.length; n++) t.charCodeAt(n) > 255 ? e += 2 : e++;
	return e
}, TME.imgUploadError = function(t) {
	setTimeout(function() {
		$(".view .cover").hide(), "Q_EXCEED_SIZE_LIMIT" == t || "F_EXCEED_SIZE" == t ? TME.warn("图片大小请控制在5MB以内") : "Q_TYPE_DENIED" != t && "F_TYPE_DENIED" != t || TME.warn("只支持.jpg、.jpeg、.png格式的图片")
	}, 300)
}, TME.logCount = function(t, e, n, o) {
	n = "function" == typeof n ? n : "", o = void 0 == typeof o ? "" : o, "function" == typeof newLogCount && newLogCount(t, e, n, o)
}, TME.getLogCountId = function() {
	var t = TME.localCache.get("logCountId");
	return t || (t = window.global_IP, TME.localCache.set("logCountId", t)), t
}, TME.getLogCountPlatform = function() {
	var t = navigator.userAgent,
		e = /xiaomi|blackberry|nokia|sonyericsson|samsung|zte|huawei|coolpad|dopod|philips|lenovo|nec|sharp|palm|panasonic|meizu|alcatel|benq|amoi|tcl|nexus|smartisan|vivo|daxian|telson|haier|cect|dbtel|oppo|konka|changhong|malata|nubia|oneplus/i,
		n = 5;
	return n = /Windows NT/i.test(t) ? 1 : /Macintosh/i.test(t) ? 2 : /iPhone/i.test(t) || /iPad/.test(t) || /iPod/.test(t) ? 4 : /Android/i.test(t) || e.test(t) && /Linux/i.test(t) ? 3 : 5
}, TME.getLogCountData = function(t) {
	var e = $.extend(!0, {
		userId: window.userInfo.isLogin ? userInfo.data.userId : "",
		plat: TME.getLogCountPlatform(),
		sign: TME.getLogCountId(),
		time: TME.date.getTimestamp()
	}, t);
	return e
}, TME.showErrorMsg = function(t, e) {
	var n = "请完整填写所有必填信息",
		o = "上传文件出错，请重新上传",
		a = {
			10001: n,
			10002: n,
			10021: "页面过期，请刷新后重试",
			10005: "请不要频繁提交",
			10104: "文件体积过大，请上传200M以下的MP3或WAV文件",
			10105: "请上传320Kbps以上的MP3或WAV文件",
			10101: o,
			10102: o,
			10103: o,
			10106: o,
			10107: o,
			10108: o,
			10109: o,
			10111: o,
			10115: o
		},
		i = String(t.code),
		r = a.hasOwnProperty(i) ? a[i] : t.message;
	"function" == typeof e ? e(r) : TME.warn(r)
};