(function(c,a,n){
 
	var w = c.createElement(a),
	 	s = c.getElementsByTagName(a)[0];
		w.src = n;
		
	s.parentNode.insertBefore(w,s);
 
})(document, 'script', 'https://s2-bulid.lianhe.art/canva/script/html2canvas.min.js');

(function(c,a,n){
 
	var w = c.createElement(a),
	 	s = c.getElementsByTagName(a)[0];
		w.src = n;
		
	s.parentNode.insertBefore(w,s);
 
})(document, 'script', 'https://s2-bulid.lianhe.art/canva/script/Convert_Pinyin.js');

$("head").append('<link rel="stylesheet" href="https://s2-bulid.lianhe.art/canva/style/canva.css?tpl=2020">');

$("head").append('<link rel="stylesheet" href="https://s2-bulid.lianhe.art/canva/style/fonts.css">');

$("head").append('<link rel="stylesheet" href="https://s2-bulid.lianhe.art/canva/style/tpl.css">');

function templateReplace(html, data) {
	
	var exp = /\{\{(\w+)\}\}/,
		tp = html;

	while (result = exp.exec(tp)) {
	   if (result[0]) {
	       tp = tp.replace(result[0], data[result[1]]);
	   }
	}
	
	return tp;
}

var canva = function(r, callback) {
	
	if(!r.elem){
		return;
	}
	
	var cover_tpl = [
        `<div class="ui-capture {{id}}" style="background: url({{cover}}) no-repeat; background-size: cover;">
            <div class="ui-canva-tpl-1">
                <div class="text">
                    <div class="en font-tt0196m">{{en}}</div>
                    <div class="albumname font-HYRuiYiSongJ">{{albumname}}</div>
                </div>
            </div>
        </div>`,
        `<div class="ui-capture {{id}}" style="background: url({{cover}}) no-repeat; background-size: cover;">
            <div class="ui-canva-tpl-2">
                <div class="text">
                    <div class="en font-tt0196m">{{en}}</div>
                    <div class="albumname font-HYHeiFangJ">{{albumname}}</div>
                </div>
            </div>
        </div>`,
        `<div class="ui-capture {{id}}" style="background: url({{cover}}) no-repeat; background-size: cover;">
            <div class="ui-canva-tpl-3">
                <div class="text">
                    <div class="albumname font-HYRuiYiSongJ">{{albumname}}</div>
                    <div class="en font-tt0196m">{{en}}</div>
                </div>
            </div>
        </div>`,
        `<div class="ui-capture {{id}}" style="background: url({{cover}}) no-repeat; background-size: cover;">
            <div class="ui-canva-tpl-4">
                <div class="text">
                    <div class="albumname font-HYRuiYiSongJ">{{albumname}}</div>
                    <div class="en font-tt0196m">{{en}}</div>
                </div>
            </div>
        </div>`,
        `<div class="ui-capture {{id}}" style="background: url({{cover}}) no-repeat; background-size: cover;">
            <div class="ui-canva-tpl-5">
                <div class="text">
                    <div class="albumname font-HYRuiYiSongJ">{{albumname}}</div>
                    <div class="en">{{en}}</div>
                </div>
            </div>
        </div>`
    ];
    
    
    var cover_sign = function(d, c){
    	
    	if(d.albumname!=null && d.singer!=null && d.cover!=null && d.tpl!=null){
    		
    		var tmp = (new Date()).valueOf(),
    			id = 'cover_' + tmp,
    			tpl = cover_tpl[d.tpl];
    		
	        if(d.tpl==4){
	        	
	            d['en'] = pinyin.getCamelChars(d.albumname.substring(0, 4));
	            
	        }else{
	        	
	            d['en'] = pinyin.getFullChars(d.albumname.substring(0, 4));
	        }
    			
    		d['cover_tpl'] = templateReplace(tpl, {
    			id: id,
    			albumname: d.albumname,
    			en: d.en,
    			cover: d.cover
    		});
    		
    		$("body").append(d.cover_tpl);
    		
    		html2canvas(document.querySelector('.' + id), {
    			
                allowTaint: true,
                
                useCORS: true
                
            }).then(canvas => {
            	
            	$("." + id).remove();
            	
            	c({
            		url: canvas.toDataURL(),
            		id: id
            	});
            	
            });
    		
    	}
    	
    }
	
	$(r.elem).on("click", function(){
		
		
		var next = 0, all = 2, albumname = '', singer = '', cover;
		
		var index = layer.open({
			type: 1,
			title: ' ',
			btn: [],
            content: `
            	<div class="canva-cover">
            		<div class="head">
            			<h2><i class="iconfont icon-edit"></i>智能封面</h2>
            		</div>
            		<div class="step-line">
					    <li class="cur">
					        <div class="icon">
					        	<b>1</b>
					        	<i class="iconfont icon-check"></i>
					        </div>
					        <div class="name">填写信息</div>
					    </li>
					    <li>
					        <div class="icon">
					        	<b>2</b>
					        	<i class="iconfont icon-check"></i>
					        </div>
					        <div class="name">上传背景</div>
					    </li>
					    <li>
					        <div class="icon">
					        	<b>3</b>
					        	<i class="iconfont icon-check"></i>
					        </div>
					        <div class="name">智能生成</div>
					    </li>
					</div>
            		<div class="step">
            			<div class="info cur">
            				<div class="form">
				                <h2>输入专辑信息</h2>
				                <div class="layui-form-item">
			                        <label class="layui-form-label">专辑名</label>
			                        <div class="layui-input-block">
			                            <input type="text" value="${albumname}" placeholder="输入专辑名称" class="layui-input albumname">
			                        </div>
			                    </div>
			                    <div class="layui-form-item">
			                        <label class="layui-form-label">歌手</label>
			                        <div class="layui-input-block">
			                            <input type="text" value="${singer}" placeholder="输入演唱歌手" class="layui-input singer">
			                        </div>
			                    </div>
			                    
			                </div>
            			</div>
            			<div class="cover">
            				<div class="form">
								<h2>上传一张喜欢的背景图</h2>
								<div class="upload">
									<i class="iconfont icon-plus"></i>
								</div>
								<p>请上传一张背景图片，可以是您的照片，或挑选免费图库<a target="_blank" href="https://unsplash.com/">Unsplash</a>、<a target="_blank" href="https://pixabay.com/">Pixabay</a>的图片
								</p>
							 </div>
            			</div>
            			<div class="result">
	            			<div class="load-list">
					          <div class="loader">
					            <div class="loader-inner line-scale">
					              <div></div>
					              <div></div>
					              <div></div>
					              <div></div>
					              <div></div>
					              <p>正在生成封面中，过程较久请耐心等待...</p>
					            </div>
					          </div>
					        </div>
							<div class="coverlists" style="display: none;">
							</div>
            			</div>
            		</div>
            		<div class="btn">
            			<a class="ui-btn d-w close">取消</a>
            			<a class="ui-btn next">下一步</a>
            		</div>
            	</div>
            `,
			area: ['800px', '100%'],
			offset: 'r',
			anim: 2,
			isOutAnim: false,
			resize: false
		});
		
		var upload = layui.upload;
		
		r.open();
		
		upload.render({
            elem: '.canva-cover .upload'
            ,url: '/'
            ,auto: false
            ,drag: true
            ,accept: 'image'
            ,choose: function(obj){
                obj.preview(function(index, file, result){
                	
                	cover = result;
                	
                	$(".canva-cover .upload").addClass("cur").attr("style", 'background: url('+result+') no-repeat; background-size: cover;');
                    
                });
            }
		});
		
		$(".canva-cover .close").off().on("click", function(){
			layer.close(index);
		});
		
		$(".canva-cover .next").off().on("click", function(){
			
			if($(this).hasClass("d-n")){
				return;
			}
			
			if(next == all){
				
				var cover_url = $(".canva-cover .coverlists li.cur");
				
				if(cover_url.length==0){
					
					TME.warn("请点击图片选择");
					
				}else{
					
					r.choose({
						url: cover_url.find("img").attr("src")
					});
					
					layer.close(index);
					
				}
				
				return;
				
			}
			
			if(next == 0){
				
				albumname = $.trim($(".canva-cover .albumname").val());
				singer = $.trim($(".canva-cover .singer").val());
				
				if(albumname === '' || singer === ''){
					
					TME.warn('请完善专辑信息');
					return;
					
				}else{
					
					console.log(albumname, singer);
					
				}
				
			}
			
			if(next == 1){
				
				if(cover == null || cover == ''){
					
					TME.warn('请上传一张背景');
					return;
					
				}else{
				
					
				}
				
			}
			
			next = next + 1;
			
			if(next == 1){
				
				
				$(".canva-cover .step-line > li").eq(next).addClass("cur");
				$(".canva-cover .step-line > li").eq(0).addClass("cur-icon");
				
			}
			
			
			$(".canva-cover .step > div").removeClass("cur");
			$(".canva-cover .step > div").eq(next).addClass("cur");
			
			$(".canva-cover .close").text('上一步');
			
			if(next == 2){
				
				$(".canva-cover .step-line > li").eq(next).addClass("cur");
				$(".canva-cover .step-line > li").eq(1).addClass("cur-icon");
				
				$(".canva-cover .coverlists").hide().html("");
				$(".canva-cover .load-list").show();
				
				setTimeout(function() {
				
					var success = 0;
					
					for(var i=0;i<cover_tpl.length;i++){
						
						cover_sign({
					    	albumname: albumname,
					    	singer: singer,
					    	cover: cover,
					    	tpl: i
					    }, function(c){
					    	
					    	if(c.url!=null){
					    		
					    		success++;
					    	
						    	$(".canva-cover .coverlists").append(`
						    		<li>
									    <img src="${c.url}">
									</li>
						    	`);
						    	
						    	
						    	
						    	if(success==cover_tpl.length){
						    		
						    		$(".canva-cover .coverlists").show();
									$(".canva-cover .load-list").hide();
									
									$(".canva-cover .coverlists li").on("click", function(){
										
										$(".canva-cover .coverlists li").removeClass("cur");
										
										$(this).addClass("cur");
										
									});
									
						    	}
						    	
					    	}
					    	
					    });
						
					}
				
				}, 100);
				
			}
			
			$(".canva-cover .close").off().on("click", function(){
				
				var int = parseInt($(".canva-cover .step > div.cur").index()),
					cur = (int - 1);
				
				if(cur<0){
					layer.close(index);
				}
				

				$(".canva-cover .step > div").removeClass("cur");
				$(".canva-cover .step > div").eq(cur).addClass("cur");
				
				next = int;
				
				if(cur==0){
					
					next = 0;
					
					$(".canva-cover .close").text('取消');
					
					$(".canva-cover .step-line > li").eq(0).removeClass("cur-icon");
					$(".canva-cover .step-line > li").eq(1).removeClass("cur-icon");
					$(".canva-cover .step-line > li").eq(1).removeClass("cur");
					
					$(".canva-cover .step-line > li").eq(2).removeClass("cur-icon");
					$(".canva-cover .step-line > li").eq(2).removeClass("cur");
					
				}
				
				if(cur==1){
					
					next = 1;
					
					$(".canva-cover .step-line > li").eq(1).removeClass("cur-icon");
					$(".canva-cover .step-line > li").eq(2).removeClass("cur-icon");
					$(".canva-cover .step-line > li").eq(2).removeClass("cur");
					
				}
				
				if(cur==2){
					
					next = 2;
					
				}
				
				$(".canva-cover .next").text('下一步');
				
			});
			
			if(next == all){
				
				next = 2;
				
				$(".canva-cover .next").text('选择使用');
				
			}
			
		});
	
	});
	
	callback({
		msg: 'cnava cover success'
	});
	
}
