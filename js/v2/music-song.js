$(".songs-list-all").on("click",".icon-delete",function(){
	var thim = $(this);
	layer.open({
        type:1,
        title:' ',
        area: ['460px'],
        content: '<div style="padding:0 30px;padding-bottom:10px;">'+
                 '  <h2 style="margin-top:0;">提示</h2>'+
                 '  <p>您是否删除<b style="color: #e00226;">'+$(this).closest(".music").children(".r").children(".songname").html()+'</b>，进行此操作？</p>'+
                 '</div>',
        btn:['确认','删除'],
        yes:function(ix){
        	TMES();
        	$.post("/WeApi/Music/delete", {id: thim.closest(".music").attr("data-id")}, function(r){
        		$(".TMES").remove();
        		if(r.code == 0){
        			thim.closest(".music").remove();
	          		for(var i=0;i<$(".music").length;i++){
		            	var n = i;
		            	$(".music .l").eq(i).text(n+1);
		            }
        		}else{
        			TME.warn(r.msg);
        		}
        	});
            layer.close(ix);
        }
    });
});
layui.use(['upload','form'], function(){
	var upload = layui.upload,
		form = layui.form;
	function delfile(c){
		$(c + ' .ui-del').on("click", function(){
			$(c +" .p2").removeClass("d0").removeClass("d1").removeClass("d2");
			$(c +" .uploadfile").prev().children("b").html("无");
			$(c).attr("data-flac","");
			$(c).attr("data-flac_name","");
			$(c).attr("data-flac_size",0);
		});
	}
	function uploadfile(id, index){
		var t = $(id), d = t.attr("data-id"), c = "#"+index, b = $(c + ' ' + id), filename = '';
		upload.render({
	        elem: c + ' '+ id
			,xhr: xhrOnProgress
	        ,accept: 'file'
	        ,acceptMime: 'application/zip'
	        ,exts: 'zip'
	        ,drag: true
	        ,multiple: false
	        ,size: 209715200
	        ,url: 'https://www.lianhe.art/WeApi/Service/upload?type=flac'
			,before: function(obj){
				obj.preview(function(index, file, result){
					if($(c).attr("data-upflac") == 1){
						TME.warn("请等待当前工程文件上传完<br>再进行替换操作");
						this.auto = false;
						return false;
					}else{
						$(c).attr("data-flac_name", file.name);
						$(c).attr("data-flac_size", file.size);
						$(c +" .p2").removeClass("d0").removeClass("d1").removeClass("d2");
						filename = file.name;
						$(c + " .flac-no").addClass("de");
						b.prev().children("b").html(file.name + ' 正在上传...(0%)');
					}
				});
			}
			,progress: function(index,value){
				b.prev().children("b").html(filename + ' 正在上传...('+value+'%)');
				if(value == 100){
					b.prev().children("b").html(filename + ' 文件检测中, 请耐心等待...');
				}
			}
			,done: function(res, index, result){
				b.prev().children("b").html(filename + '<a class="ui-del">删除</a>');
				$(c + " .flac-no").removeClass("de");
				$(c).attr("data-upflac", 0)
				if(res.code == 0){
					$(c +" .p2").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d1");
		          	$(c).attr("data-flac",res.data.url);
		        }else{
		        	$(c).attr("data-flac_name", "");
		        	$(c).attr("data-flac_size", 0);
		        	$(c +" .p2").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d2");
		        	b.prev().children("b").html(filename + ' ' + res.msg  + '<a class="ui-del">删除</a>');
		        }
		        delfile(c);
			}
    	});
	}
	function up_bd(id, index){
		var t = $(id), d = t.attr("data-id"), c = "#"+index, b = $(c + ' ' + id), filename = '';
		upload.render({
	        elem: c + ' '+ id
			,xhr: xhrOnProgress
	        ,accept: 'audio'
	        ,acceptMime: 'audio/wav'
	        ,exts: 'wav'
	        ,drag: true
	        ,multiple: false
	        ,size: 209715200
	        ,url: 'https://www.lianhe.art/WeApi/Service/upload'
			,before: function(obj){
				obj.preview(function(index, file, result){
					if($(c).attr("data-de") == 0){
						TME.warn("请等待当前音频上传完<br>再进行替换操作");
						this.auto = false;
						return false;
					}else{
						$(c +" .p1").removeClass("d0").removeClass("d1").removeClass("d2");
						$(c + " .de-no").addClass("de");
						filename = file.name;
						$(c).attr("data-de", 0);
						$(c).append('<div class="pro"><div></div></div>');
						b.prev().children("b").html(file.name + ' 正在上传...(0%)');
						$(c).attr("data-audio","");
						$(c).attr("data-size",file.size);
		            	$(c + " .playaudiourl").attr("data-url","");
          				$(c).attr("data-audio_name",file.name);
					}
				});
			}
			,progress: function(index,value){
				$(c + ' .pro div').css("width", value + "%");
				$(c + ' .meun .spend').html('<font style="float: left;margin-right: 5px;color: #999;"><span class="yui-loading">'+value+'%</span></font>');
				b.prev().children("b").html(filename + ' 正在上传...('+value+'%)');
				if(value == 100){
					$(c + ' .pro').remove();
					$(c + ' .meun .spend').html('<font style="color:#999;font-size:14px;margin-right:15px;">音频检测中, 请耐心等待...</font>');
					b.prev().children("b").html(filename + ' 音频检测中, 请耐心等待...');
				}
			}
			,done: function(res, index, result){
				b.prev().children("b").html(filename);
				$(c).attr("data-de", 1);
				$(c + " .de-no").removeClass("de");
				if(res.code == 0){
					$(c).attr("data-json", JSON.stringify(res.data.info));
					$(c +" .p1").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d1");
					$(c + ' .meun .spend').html('<font><i class="iconfont icon-check-circle-fill" style="color: #3583fb;font-size: 19px;margin-right:5px;"></i></font>');
		          	$(c).attr("data-audio",res.data.audio);
		            $(c + " .playaudiourl").attr("data-url",res.data.play);
		        }else{
		        	$(c).attr("data-json", "");
		        	$(c).attr("data-size", 0);
		        	$(c).attr("data-audio_name", "");
		        	$(c +" .p1").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d2");
		        	b.prev().children("b").html(filename + ' ' + res.msg);
		            $(c +" .meun .spend").html('<font style="margin-right:15px;"><i class="icon anticon icon-closecircle" style="color: #ec3434;font-size: 17px;"></i>'+res.msg+'</font>');
		        }
			}
    	});
	}
	
    for(var i=0;i<$(".songs-list-all .music").length;i++){
        var t = $(".songs-list-all .music").eq(i),
            s = t.find(".ycz"),
            w = t.find(".czz"),
            o = t.find(".qzz"),
            e = t.find(".bqz"),
            m = t.find(".hyz");
        t.find(".type").val(t.attr("data-type"));
        $.author({
            elm: s,
            ylv: 'ycz',
            my: _x
        });
        $.author({
            elm: w,
            ylv: 'czz',
            tips: '词作者',
            btn: _b
        });
        $.author({
            elm: o,
            ylv: 'qzz',
            tips: '曲作者',
            btn: _b
        });
        $.author({
            elm: e,
            ylv: 'bqz',
            tips: '编曲者',
            btn: _b
        });
        $.author({
            elm: m,
            ylv: 'hyz',
            tips: '混音者',
            btn: _b
        });
        up_bd(".playaudiourl-up", t.attr("id"));
				
	    uploadfile(".uploadfile", t.attr("id"));
	    
	    delfile('#'+t.attr("id"));
	    
	    public_songname_input();
	    
    };	
    
     form.render();
	
	
	upload.render({
	    elem: '#upload'
		,xhr: xhrOnProgress
	    ,accept: 'audio'
	    ,acceptMime: 'audio/wav'
	    ,exts: 'wav'
	    ,drag: true
	    ,multiple: true
	    ,size: 209715200
	    ,url: 'https://www.lianhe.art/WeApi/Service/upload'
		,before: function(obj){
			obj.preview(function(index, file, result){
			    var n = '<span class="tags"><sm>'+nickname+'</sm><i class="icon anticon icon-close"></i></span>';
			    var nicknames = nickname,
			        number = (Number($(".music").length)+Number(1)),
			        auto_songname = '';
			    if(cid==1){
			      	n = '';
			        nicknames = '';
			    }
			    if(auto==1){
			    	auto_songname = file.name.replace(".wav","").replace(".WAV","");
			    }
				var html = ' <li data-json="" id="'+index+'" draggable="false" data-ids="'+index+'" data-id="" class="music author_dot_'+number+'" data-upflac="0" data-de="0" data-size="'+file.size+'" data-flac_size="" data-name="'+file.name+'" data-audio="" data-flac="" data-audio_name="'+file.name+'" data-flac_name="">'+
				'                  <div class="l">'+number+'</div>'+
				'                  <div class="r">'+
				'                    <div class="songname cur-btn">'+file.name.replace(".wav","").replace(".WAV","")+'</div>'+
				'                    <div class="singer cur-btn">'+nicknames+'</div>'+
				'                    <div class="meun"><span class="cpend" style="margin-right: 5px;display: none;"><i class="icon anticon icon-upcircleo"></i><i class="icon anticon icon-downcircleo"></i></span>'+
				    				  '<span class="spend"><font style="float: left;margin-right: 5px;color: #999;"><span class="yui-loading">0%<span></font></span>'+
				'<span class="cur-btn"><i class="icon anticon icon-up"></i><i class="icon anticon icon-down"></i>'+
				'</span>'+
				'<i class="iconfont icon-delete"></i> '+
				'<i class="iconfont icon-menu handle"></i>'+
				'                    </div>'+
				'                  </div>'+
				'                  <div class="list-music">'+
				'					 <h2 style="margin-top: 0;margin-bottom: 20px;border-bottom: 1px solid #f2f2f2;padding-bottom: 15px;">基础信息</h2>'+
				'                    <div class="from-list">'+
				'                      <div class="layui-form">'+
				'                        <div class="layui-form-item">'+
				'                          <label class="layui-form-label">歌曲名</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" value="'+auto_songname+'" placeholder="30字以内" class="layui-input songname name"></div>'+
				'                        </div>'+
				'                        <div class="layui-form-item">'+
				'                          <label class="layui-form-label">歌手</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" vlaue="'+nicknames+'"  class="layui-input ycz">'+
				'                          </div>'+
				'                        </div>'+
				'                      <div class="layui-form-item">'+
				'                          <label class="layui-form-label">作词</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" vlaue=""  class="layui-input czz">'+
				'                          </div>'+
				'                      </div>'+
				'                      <div class="layui-form-item">'+
				'                          <label class="layui-form-label">作曲</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" vlaue=""  class="layui-input qzz">'+
				'                          </div>'+
				'                      </div>'+
				'                        <div class="layui-form-item">'+
				'                          <label class="layui-form-label">编曲</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" vlaue=""  class="layui-input bqz">'+
				'                          </div>'+
				'                        </div>'+
				'                        <div class="layui-form-item">'+
				'                          <label class="layui-form-label">混音</label>'+
				'                          <div class="layui-input-block">'+
				'                            <input type="text" vlaue=""  class="layui-input hyz">'+
				'                          </div>'+
				'                        </div>'+
				'                      </div>'+
				'                    </div>'+
				'                    <div class="from-list layui-form">'+
				'                        <div class="layui-form-item">'+
				'                          <label class="layui-form-label">版本</label>'+
				'                          <div class="layui-input-block">'+
				'								<select class="type" lay-filter="type" data-index="'+index+'">'+
				'   								<option value="0">完整版</option>'+
				'   								<option value="1">伴奏</option>'+
				'   								<option value="2">Demo</option>'+
				'   								<option value="3">Remix</option>'+
				'   								<option value="4">Live</option>'+
				'               				</select>'+
				'							</div>'+
				'                        </div>'+
				'                      <div class="layui-form-item layui-form-text">'+
				'                        <label class="layui-form-label">歌词</label>'+
				'                        <div class="layui-input-block">'+
				'                          <textarea style="resize:none;height:285px;" placeholder="歌词需自行填写歌曲名与作词、作曲，纯音乐、伴奏类型歌曲无需填写歌词" class="layui-textarea gc"></textarea>'+
				'<a href="/team/mting/lrcmake.html" target="_blank" style="font-size: 12px;color: #999;text-align: right;"><i class="icon iconfont icon-question-circle" style="float: left;margin-right: 5px;"></i>制作LRC歌词</a>'+
				'                        </div>'+
				'                      </div>'+
				'                    </div>'+
				'					 <h2 style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #f2f2f2;padding-bottom: 15px;width: 100%;display: inline-block;">音频文件<span class="p1 ui-icon-style d0"><i class="icon iconfont icon-check-circle-fill"></i><i class="icon iconfont icon-warning-circle-fill"></i></span></h2>'+
				'					 <div class="max-upload">'+
				'						<div class="ref play de-no de">'+
				'							<span class="playaudiourl" data-url=""><i class="icon iconfont icon-play-circle"></i><i class="icon iconfont icon-timeout"></i><b style="font-weight: initial;">'+ file.name +'</b></span> '+
				'							<div class="btn playaudiourl-up" data-id="'+index+'"> '+
				'								<i class="icon iconfont icon-upload"></i>替换音频'+
				'							</div>'+
				'						</div>'+
				'					</div>'+
				'					<p style="font-size: 13px;color: #999;">必须提交原创作品，歌曲包含其它元素不可借用网络他人（仅支持上传200M以内WAV文件）, 音频如正在上传中且无法进行替换操作</p>'+
				'					 <h2 style="margin-top: 20px;margin-bottom: 20px;border-bottom: 1px solid #f2f2f2;padding-bottom: 15px;width: 100%;display: inline-block;">版权文件<span class="p2 ui-icon-style d0"><i class="icon iconfont icon-check-circle-fill"></i><i class="icon iconfont icon-warning-circle-fill"></i></span></h2>'+
				'					<div class="max-upload">'+
				'						<div class="ref flac-no">'+
				'							<span><i class="iconfont icon-file-zip"></i><b style="font-weight: initial;">无</b></span> '+
				'							<div class="btn uploadfile" data-id="'+index+'"> '+
				'								<i class="icon iconfont icon-upload"></i>上传文件'+
				'							</div>'+
				'						</div>'+
				'					</div>'+
				'					<p style="font-size: 13px;color: #999;"><i class="icon iconfont icon-question-circle" style="float: left;margin-right: 5px;"></i>(选填) 建议上传原创作品的工程/分轨/版权证明文件（仅支持上传200M以内的ZIP文件），便于审核人员鉴别原创性，提升通过率</p>'+
				' </div>'+
				' <div class="pro"><div></div></div>'+
				'                  </li>';
				$(".songs-list-all").append(html);
				
				up_bd(".playaudiourl-up", index);
				
				uploadfile(".uploadfile", index);
				
				
          		$("#"+index).attr("data-audio_name", file.name);
          	
				var t = $(".author_dot_"+number),
					s = t.find(".ycz"),
					w = t.find(".czz"),
					o = t.find(".qzz"),
					e = t.find(".bqz"),
					m = t.find(".hyz");
				$.author({
					elm: s,
					ylv: 'ycz',
					auto: auto,
					my: _x,
					tips: '演唱者'
				});
				$.author({
					elm: w,
					ylv: 'czz',
					auto: auto,
					tips: '作词',
					btn: _b
				});
				$.author({
					elm: o,
					ylv: 'qzz',
					auto: auto,
					tips: '作曲',
					btn: _b
				});
				$.author({
					elm: e,
					ylv: 'bqz',
					auto: auto,
					tips: '编曲',
					btn: _b
				});
				$.author({
					elm: m,
					ylv: 'hyz',
					auto: auto,
					tips: '混音',
					btn: _b
				});
				
				public_songname_input();
				
				form.render();
					
					
					
            });
        }
        ,progress:function(index,value){
          $("#"+index+" .meun .spend span").html(value+'%');
          $("#"+index+" .pro div").css("width",value+'%');
          if(value==100){
          	$("#"+index+" .meun .spend").html('<font style="color:#999;font-size:14px;margin-right:15px;">音频检测中, 请耐心等待...</font>');
          	$("#"+index+" .pro").remove();
          }
        }
        ,done: function(res, index, result){
          $(".de-no").removeClass("de");
          $("#"+index).attr("data-de","1");
          if(res.code==0){
          	$("#"+index).attr("data-json", JSON.stringify(res.data.info));
          	$("#"+index+" .p1").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d1");
          	$("#"+index+" .meun .spend").html('<font><i class="iconfont icon-check-circle-fill" style="color: #3583fb;font-size: 19px;margin-right:5px;"></i></font>');
          	$("#"+index).attr("data-id",res.id);
          	$("#"+index).attr("data-audio",res.data.audio);
            $("#"+index+" .playaudiourl").attr("data-url",res.data.play);
          }else{
          	$("#"+index).attr("data-audio_name", "");
          	$("#"+index).attr("data-json", "");
          	$("#"+index+" .p1").removeClass("d0").removeClass("d1").removeClass("d2").addClass("d2");
            $("#"+index+" .meun .spend").html('<font style="margin-right:15px;"><i class="icon anticon icon-closecircle" style="color: #ec3434;font-size: 17px;"></i>'+res.msg+'</font>');
          }
        }
  });
  form.on('select(type)', function(data){
	var t = $(data.elem),
		d = t.attr("data-index"),
		x = "#"+d,
		n = $(x + ' input.songname'),
		tn = $(x + ' .songname.cur-btn'),
		songname = $.trim(tn.text().replace(/\（伴奏\）/g,"").replace(/\(伴奏\)/g,"").replace(/\（Demo\）/g,"").replace(/\(Demo\)/g,"").replace(/\（demo\）/g,"").replace(/\(demo\)/g,"").replace(/\（DEMO\）/g,"").replace(/\(DEMO\)/g,"").replace(/\（Remix\）/g,"").replace(/\(Remix\)/g,"").replace(/\（remix\）/g,"").replace(/\(remix\)/g,"").replace(/\（REMIX\）/g,"").replace(/\(REMIX\)/g,"").replace(/\（Live\）/g,"").replace(/\(Live\)/g,"").replace(/\（live\）/g,"").replace(/\(live\)/g,"").replace(/\（LIVE\）/g,"").replace(/\(LIVE\)/g,""));
	songname = $.trim(songname);
	if(data.value == 1){
		if(tn.text()!=''){
			tn.text(songname + " (伴奏)");
			n.val(songname + " (伴奏)");	
		}
	}else if(data.value == 2){
		if(tn.text()!=''){
			tn.text(songname + " (Demo)");
			n.val(songname + " (Demo)");
		}
	}else if(data.value == 3){
		if(tn.text()!=''){
			tn.text(songname + " (Remix)");
			n.val(songname + " (Remix)");
		}
	}else if(data.value == 4){
		if(tn.text()!=''){
			tn.text(songname + " (Live)");
			n.val(songname + " (Live)");
		}
	}else{
		tn.text(songname);
		n.val(songname);
	}
  });
  $(".click-root-type").on("click", function(){
  	alert();
  	var song = $(".songs-list-all li");
  	for(var i=0;i<song.length;i++){
  		var t = song.eq(i);
  		console.log(t);
  	}
  });
});