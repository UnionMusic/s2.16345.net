var albumIMG;
function go_image() {
    $("#imageInput")[0].click();
}
$(".ps-image .icon-close").on("click",
function() {
    $(".ps-image").hide();
    $(".zp").hide();
});
window.onload = function() {
    window.workArea = document.querySelector('#workArea');
    window.avatorImg = document.querySelector('#avatorImg');
    window.imageShow = document.querySelector('#imageShow');
    window.mouseStartX = 0;
    window.mouseStartY = 0;
    window.initLength = {
        width: 0,
        height: 0
    };
    window.primitiveLength = {
        width: 0,
        height: 0
    };
    window.resizeValue = 0;
    window.showSide = document.querySelector('#overlayInner').clientWidth;
    window.croppedImageType = 'image/jpge';
    $(".ps-image").hide();
    $(".ps-image").attr("style", "display: none;transition: 0.5s cubic-bezier(0.68, -0.55, 0.27, 1.55);");
}
function crop() {
    TMES('正在加载请求...');
    if (!avatorImg.src) return;
    let _cropCanvas = document.createElement('canvas');
    let _side = (showSide / avatorImg.offsetWidth) * primitiveLength.width;
    _cropCanvas.width = _side;
    _cropCanvas.height = _side;
    let _sy = (100 - avatorImg.offsetTop) / avatorImg.offsetHeight * primitiveLength.height;
    let _sx = (100 - avatorImg.offsetLeft) / avatorImg.offsetWidth * primitiveLength.width;
    _cropCanvas.getContext('2d').drawImage(avatorImg, _sx, _sy, _side, _side, 0, 0, _side, _side);
    let _lastImageData = _cropCanvas.toDataURL(croppedImageType);
    albumIMG = _lastImageData;
    $.post("/WeApi/Service/upload?type=base64_image", {
        base64: _lastImageData
    },
    function(r) {
        $(".TMES").remove();
        if (r.code == 0) {
            $(".up-btn").attr("style", "opacity: 0;");
            $(".ps-image").hide();
            $(".zp").hide();
            $(".imageShow").attr("style", "background: url(https://pi.lianhe.art/" + r.url + ");background-size: 100%;");
            $(".albumimage").val(r.url);
            TME.tips('上传成功');
        } else {
            TME.warn(r.msg);
        }
    });
}
function ImageInputChanged(e) {
    var file = e.target.files[0];
    var reader = new FileReader();
    reader.onload = function(event) {
        avatorImg.src = event.target.result;
        avatorImg.style.width = 'auto';
        avatorImg.style.height = 'auto';
        avatorImg.style.top = 'auto';
        avatorImg.style.left = 'auto';
    }
    reader.readAsDataURL(file);
    if (file != null) {
        $(".ps-image").show();
        $(".zp").show();
        file = null;
    }
}
function avatorImgChanged() {
    if (avatorImg.offsetWidth >= avatorImg.offsetHeight) {
        avatorImg.style.top = '100px';
        initLength.width = showSide * avatorImg.offsetWidth / avatorImg.offsetHeight;
        initLength.height = showSide;
    } else {
        avatorImg.style.left = '100px';
        initLength.height = showSide * avatorImg.offsetHeight / avatorImg.offsetWidth;
        initLength.width = showSide;
    }
    primitiveLength = {
        width: avatorImg.offsetWidth,
        height: avatorImg.offsetHeight
    };
    avatorImg.style.width = initLength.width + 'px';
    avatorImg.style.height = initLength.height + 'px';
}
function startDrag(e) {
    e.preventDefault();
    if (avatorImg.src) {
        window.mouseStartX = e.clientX;
        window.mouseStartY = e.clientY;
        workArea.addEventListener('mousemove', window.dragging, false);
        workArea.addEventListener('mouseup', window.clearDragEvent, false);
    }
}
function dragging(e) {
    if (!avatorImg.src) return;
    let _moveX = avatorImg.offsetLeft + e.clientX - mouseStartX;
    if (_moveX >= 100) {
        avatorImg.style.left = '100px';
        mouseStartX = e.clientX;
        return;
    } else if (_moveX <= 400 - avatorImg.offsetWidth) {
        _moveX = 400 - avatorImg.offsetWidth;
    }
    avatorImg.style.left = _moveX + 'px';
    mouseStartX = e.clientX;
    let _moveY = avatorImg.offsetTop + e.clientY - mouseStartY;
    if (_moveY >= 100) {
        avatorImg.style.top = '100px';
        mouseStartY = e.clientY;
        return;
    } else if (_moveY <= 400 - avatorImg.offsetHeight) {
        _moveY = 400 - avatorImg.offsetHeight;
    }
    avatorImg.style.top = _moveY + 'px';
    mouseStartY = e.clientY;
}
function resizeUp() {
    resizeValue += 10;
    resize();
}
function resizeDown() {
    resizeValue -= 10;
    resize();
}
function resize() {
    avatorImg.style.width = (resizeValue + 100) / 100 * initLength.width + 'px';
    avatorImg.style.height = (resizeValue + 100) / 100 * initLength.height + 'px';
}
function clearDragEvent() {
    workArea.removeEventListener('mousemove', window.dragging, false);
    workArea.removeEventListener('mouseup', window.clearDragEvent, false);
}
function checkName(val){ 
    var regEn = /[`",.\/;'\\]/im;
    return regEn.test(val);
}
function changeURLArg(url,arg,arg_val){
    var pattern=arg+'=([^&]*)';
    var replaceText=arg+'='+arg_val; 
    if(url.match(pattern)){
        var tmp='/('+ arg+'=)([^&]*)/gi';
        tmp=url.replace(eval(tmp),replaceText);
        return tmp;
    }else{ 
        if(url.match('[\?]')){ 
            return url+'&'+replaceText; 
        }else{ 
            return url+'?'+replaceText; 
        } 
    }
}
$(".save").on("click",
function() {
    var singer = $(".singer").attr("data-vlaue");
    var s = {
        singer: singer,
        cover: $(".albumimage").val(),
        type: $(".type").val(),
        language: $(".language").val(),
        style: $(".style").val(),
        //style: $("input[name=style]:checked").val(),
        name: $.trim($(".albumname").val()),
        meno: $.trim($(".meno").val()),
        id: albumID,
        channel: auto_channel
    }
    if(notsign == 1){
    	s['channel'] = $.trim($(".channel").val());
    }
    var d = $(".songs-list-all li"),
    	t = d.length;

    if (s.name == "") {
        TME.warn('请填写专辑名');
        return;
    } else if (s.singer == "") {
        TME.warn('请输入歌手');
        return;
    } else if (checkName(s.name)) {
    	TME.warn('专辑名不能存在特殊符号');
        return;
    } else if (s.cover == "") {
        TME.warn('请上传封面');
        return;
    } else if (s.meno == "") {
        TME.warn('请填写简介');
        return;
    } else {
    	$("body").append('<div id="ui_fixed" style="position: fixed;width: 100%;height: 100%;z-index: 9000;background: rgba(255, 255, 255, 0.43);top: 0;left: 0;"></div>');
        TMES('正在加载请求...');
        $.post("/WeApi/music/issue", s,
        function(data) {
            if (data.code == 0 && data.data.id != ''){
            	albumID = data.data.id;
            	history.pushState(200,'','?albumid='+albumID)
			    if(t>0){
			    	$.ajaxSettings.async = false;
			    	var songnamelist = [], json_list = [];
			    	for(var i=0;i<t;i++){
			    		var m = d.eq(i),
			    			json = {
			    				json: m.attr("data-json"),
			    				albumid: data.data.id,
			    				audio_u: m.attr("data-de"),
			    				flac_u: m.attr("data-upflac"),
			    				size: m.attr("data-size"),
			    				flac_size: m.attr("data-flac_size"),
			    				id: m.attr("data-id"),
			    				num: i,
			    				audio: m.attr("data-audio"),
				    			audio_name: m.attr("data-audio_name"),
				    			flac: m.attr("data-flac"),
				    			flac_name: m.attr("data-flac_name"),
				    			name: $.trim(m.find(".name").val()),
				    			type: $.trim(m.find(".type").val()),
				    			singer: $.trim(m.find(".ycz").attr("data-vlaue")),
				    			word: $.trim(m.find(".czz").attr("data-vlaue")),
				    			song: $.trim(m.find(".qzz").attr("data-vlaue")),
				    			edit: $.trim(m.find(".bqz").attr("data-vlaue")),
				    			mix: $.trim(m.find(".hyz").attr("data-vlaue")),
				    			lrc: $.trim(m.find(".gc").val()),
				    			channel: auto_channel
			    			},
			    			n = "序号" + (json.num + 1) + "<br>";
			    		songnamelist.push(json.name);
			    		json_list.push(json);
			    		if(json.audio_u == 0){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "音频正在上传中，请稍等");
			    		}else if(json.audio_u == 1 && json.audio == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请等待音频检测完毕或重新上传后再试");
			    		}else if(json.flac_u == 1){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "工程文件正在上传中，请稍等");
			    		}else if(json.name == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入歌曲名");
			    		}else if(json.singer == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入歌手");
			    		}else if(json.word == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入作词");
			    		}else if(json.song == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入作曲");
			    		}else if(json.edit == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入编曲");
			    		}else if(json.mix == ''){
			    			$(".TMES").remove();
            				$("#ui_fixed").remove();
			    			return TME.warn(n + "请输入混音");
			    		}else{
			    			/*$.post("/WeApi/Music/save", json, function(r){
			    				if(r.code != 0){
			    					return TME.warn(r.msg);
			    				}else{
			    					m.attr("data-id", r.data.id);
			    				}
			    			});*/
			    		}
			    	}
					//var s = songnamelist.join(",")+",";
					// for(let i=0;i<songnamelist.length;i++) {
					//     if(s.replace(songnamelist[i]+",","").indexOf(songnamelist[i]+",")>-1) {
					//     	$(".TMES").remove();
    				//		$("#ui_fixed").remove();
					//     	TME.warn("出现歌曲名重复<br>" + songnamelist[i]);
					//         return;
					//     }
					// }
					for(var i=0;i<json_list.length;i++){
						var m = d.eq(i);
						$.post("/WeApi/Music/save", json_list[i], function(r){
		    				if(r.code != 0){
		    					return TME.warn(r.msg);
		    				}else{
		    					m.attr("data-id", r.data.id);
		    				}
		    			});
					}
			    	$.ajaxSettings.async = true;
			    	if(_M==0){
			    		TME.tips("保存成功");
			    	}else{
			    		window.location.href = '/team/music/sign?albumid=' + albumID;
			    	}
			    }else{
			    	if(_M==0){
			    		TME.tips("保存成功");
			    	}else{
			    		TME.warn("请先上传歌曲");
			    	}
			    }
            }else{
                TME.warn(data.msg);
            }
            _M = 0;
            $(".TMES").remove();
            $("#ui_fixed").remove();
        });
    }
});