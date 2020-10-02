$(".sext").on("click",function(){
	  $.post("/WeApi/Singer/at",{csid:0},function(res){
        	if(res.code==0){
              	window.location.reload();
            }else{
            	TME.warn(res.msg);
            }
        });
});
$(".nexts").on("click",function(){
        var s = {
            image: $(".albumimage").val(),
            nickName: $(".nicknames").val(),
            type: $(":radio[name=type]:checked").val(),
            style: $(".style").val(),
            language: $(":radio[name=language]:checked").val(),
            memo: $(".memo").val(),
            name: $(".name").val(),
            idCard: $(".idcard").val(),
            qq: $(".qq").val(),
            dizhi: $(".dizhi").val(),
            idCardFImg: $(".idz").attr("data-url"),
            idCardBImg: $(".idb").attr("data-url"),
            idCardImg: $(".idj").attr("data-url"),
            code: $(".code").val(),
            email: $(".email").val(),
            idstyle: $(".idstyle").val()
        }
       if($(".autg[type='checkbox']").is(':checked')==false){
       		TME.warn('请阅读并同意《联合音乐平台协议》');
         	return;
       }
  	   if($(".error").length>0){
       		return TME.warn("身份证号码已被使用，请联系客服处理。");
       }
       if(s['image']==''){
       		TME.warn('请上传头像');
       }else if(s['nickName']==''){
       		TME.warn('请填写歌手名称');
       }else if(s['memo']==''){
       		TME.warn('请填写歌手简介');
       }else if(s['memo']==''){
       		TME.warn('请填写歌手简介');
       }else if(s['name']==''){
       		TME.warn('请输入证件姓名');
       }else if(s['idCard']==''){
       		TME.warn('请输入证件号码');
       }else if(s['dizhi']==''){
       		TME.warn('请输入联系地址');
       }else if(s['email']==''){
       		TME.warn('请输入邮箱');
       }else if(s['qq']==''){
       		TME.warn('请输入QQ');
       }else if(s['code']==''){
       		TME.warn('请输入验证码');
       }else if(s['idCardFImg']==''){
       		TME.warn('请上传证件正面图');
       }else if(s['idCardBImg']==''){
       		TME.warn('请上传证件背面图');
       }else if(s['idCardImg']==''){
       		TME.warn('请上传证件手持照片');
       }else{
         	TMES();
         	$.post("/WeApi/Singer/save?type2=musician",s,function(res){
              	$(".TMES").remove();
            	if(res.code==0){
            		TME.tips("认证成功，即将跳转");
            		setTimeout(function() {
            			 history.go(0);
            		}, 300);
                }else{
                	TME.warn(res.msg);
                }
            });
       }
      });