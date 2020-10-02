$(".songs-list-all").on("click",".icon-delete",function(){
	if($(this).closest(".music").attr("data-de")==0){
    	TME.warn($(this).closest(".music").children(".r").children(".songname").html()+'<br>请等待歌曲上传完再进行操作');
    }else{
      	TMES();
      	var thim = $(this);
      	if($(this).closest(".music").attr("data-id")<1000){
        	thim.closest(".music").remove();
          	$(".TMES").remove();
          	return;
        }
      	$.post("/User/album/song_trash",{id:$(this).closest(".music").attr("data-id")},function(r){   	
          	$(".TMES").remove();	
        	if(r.code==0){
            	TME.tips(r.msg);
              	thim.closest(".music").remove();
                for(var i=0;i<$(".songs-list-all .music").length;i++){
                    $(".music .l").eq(i).html(i+1);
                }
            }else{
            	TME.warn(r.msg);
            }
        });
    }
});
layui.use('upload', function(){
          var upload = layui.upload;
          upload.render({
            elem: '#upload'
			,xhr:xhrOnProgress
            /*,data: {id: albumID,Singer:'',name:function(file){return file.name;},size:function(file){return file.size;}}*/
            ,data:{albumId: albumID,Singer:function(){if(cid==1){return '';}else{return nickname;}}}
            ,accept:'audio'
            ,acceptMime:'audio/wav'
            ,exts:'wav'
            ,drag:false
            ,multiple:true
            ,url: 'https://upload.16345.net/up-album.php'
			,before: function(obj){   
				obj.preview(function(index, file, result){
                  var n = '<span class="tags"><sm>'+nickname+'</sm><i class="icon anticon icon-close"></i></span>';
                  var nicknames = nickname;
                  if(cid==1){
                  	  n = '';
                      nicknames = '';
                  }
var html = ' <div id="'+index+'" class="music" data-id="'+(Number($(".music").length)+Number(1))+'" data-de="0" data-size="'+file.size+'" data-name="'+file.name+'">'+
'                  <div class="l">'+(Number($(".music").length)+Number(1))+'</div>'+
'                  <div class="r">'+
'                    <div class="songname cur-btn">'+file.name.replace(".wav","").replace(".WAV","")+'</div>'+
'                    <div class="singer cur-btn">'+nicknames+'</div>'+
'                    <div class="meun"><span class="cpend" style="margin-right: 5px;display: none;"><i class="icon anticon icon-upcircleo"></i><i class="icon anticon icon-downcircleo"></i></span>'+
    				  '<span class="spend"><font><i class="layui-icon layui-icon-loading layui-icon layui-anim layui-anim-rotate layui-anim-loop" style="margin-right: 10px;"></i><span><span></font></span>'+
'                      <span class="cur-btn">'+
'                        <i class="icon anticon icon-up"></i>'+
'                        <i class="icon anticon icon-down"></i>'+
'                      </span>'+
'                      <i class="icon anticon icon-delete"></i>'+
'                    </div>'+
'                  </div>'+
'                  <div class="list-music">'+
'                    <div class="from-list">'+
'                      <div class="layui-form">'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">歌曲名</label>'+
'                          <div class="layui-input-block">'+
'                            <input type="text" value="" placeholder="30字以内" class="layui-input songname"></div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">歌手</label>'+
'                          <div class="layui-input-block">'+
'                            <div class="singer-list" data-sid="0" style="width:338px;">'+
'                              <div class="s-list ycz">'+n+'</div>'+
'                              <span class="input">'+
'                                <input type="text" placeholder="按回车键完成输入" class="singer"></span>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">版本</label>'+
'                          <div class="layui-input-block">'+
'                            <input class="lx" type="radio" name="lx'+(Number($(".music").length)+Number(1))+'" value="0" title="原创">'+
'                            <input class="lx" type="radio" name="lx'+(Number($(".music").length)+Number(1))+'" value="1" title="伴奏">'+
'                            <input class="lx" type="radio" name="lx'+(Number($(".music").length)+Number(1))+'" value="2" title="Demo">'+
'                            <input class="lx" type="radio" name="lx'+(Number($(".music").length)+Number(1))+'" value="3" title="Remix">'+
'                            <input class="lx" type="radio" name="lx'+(Number($(".music").length)+Number(1))+'" value="4" title="Live"></div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">词作者</label>'+
'                          <div class="layui-input-block">'+
'                            <div class="singer-list" data-sid="1" style="width:338px;">'+
'                              <div class="s-list czz"></div>'+
'                              <span class="input">'+
'                                <input type="text" placeholder="按回车键完成输入" class="singer"></span>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">曲作者</label>'+
'                          <div class="layui-input-block">'+
'                            <div class="singer-list" data-sid="1" style="width:338px;">'+
'                              <div class="s-list qzz"></div>'+
'                              <span class="input">'+
'                                <input type="text" placeholder="按回车键完成输入" class="singer"></span>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">编曲者</label>'+
'                          <div class="layui-input-block">'+
'                            <div class="singer-list" data-sid="1" style="width:338px;">'+
'                              <div class="s-list bqz"></div>'+
'                              <span class="input">'+
'                                <input type="text" placeholder="按回车键完成输入" class="singer"></span>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                        <div class="layui-form-item">'+
'                          <label class="layui-form-label">混音者</label>'+
'                          <div class="layui-input-block">'+
'                            <div class="singer-list" data-sid="1" style="width:338px;">'+
'                              <div class="s-list hyz"></div>'+
'                              <span class="input">'+
'                                <input type="text" placeholder="按回车键完成输入" class="singer"></span>'+
'                            </div>'+
'                          </div>'+
'                        </div>'+
'                      </div>'+
'                    </div>'+
'                    <div class="from-list">'+
'                      <div class="layui-form-item layui-form-text">'+
'                        <label class="layui-form-label">歌词</label>'+
'                        <div class="layui-input-block">'+
'                          <textarea style="resize:none;height:409px;" placeholder="伴奏请不要填写歌词" class="layui-textarea gc"></textarea>'+
'                        </div>'+
'                      </div>'+
'                    </div>'+
'                  </div>';
                  $(".songs-list-all").append(html);
                  
                  public_old_song_info();
                  
                  layui.use('form', function(){
  				  	var form = layui.form;
                  	form.render('radio');
                  });
                });
          	}
            ,progress:function(index,value){
              $("#"+index+" .meun .spend span").html(value+'%');
              if(value==100){
              	$("#"+index+" .meun .spend").html('<font><i class="icon anticon icon-checkcircle" style="color: #0060ff;font-size: 14px;"></i></font>');
              }
            }
            ,done: function(res, index, result){
              $("#"+index).attr("data-de","1");
              if(res.code==0){
              	$("#"+index).attr("data-id",res.id);
                var s = {id:$("#"+index).attr("data-id"),name:$("#"+index).attr("data-name"),size:$("#"+index).attr("data-size")}
                $.post("/User/Album/song_info",s,function(r){});
              }else{
                $("#"+index+" .meun .spend").html('<font><i class="icon anticon icon-closecircle" style="color: #ec3434;font-size: 17px;"></i>'+res.message+'</font>');
              }
            }
          });
        });