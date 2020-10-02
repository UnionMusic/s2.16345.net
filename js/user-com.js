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
            comxinyong:$(".comxinyong").val(),
            comdizhi:$(".comdizhi").val()
        }
       if($(".autg[type='checkbox']").is(':checked')==false){
       		TME.warn('请阅读并同意《联合音乐平台协议》');
         	return;
       }
       if(s['image']==''){
       		TME.warn('请上传头像');
       }else if(s['nickName']==''){
       		TME.warn('请填写公司名称');
       }else if(s['comxinyong']==''){
       		TME.warn('请填写信用代码');
       }else if(s['comdizhi']==''){
       		TME.warn('请填写公司地址');
       }else if(s['memo']==''){
       		TME.warn('请填写公司简介');
       }else if(s['name']==''){
       		TME.warn('请输入法人姓名');
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
       		TME.warn('请上传证件手持营业执照');
       }else{
         	TMES();
         	$.post("/WeApi/Singer/save",s,function(res){
              	$(".TMES").remove();
            	if(res.code==0){
                	TME.tips('提交成功');
                    history.go(0);
                }else{
                	TME.warn(res.msg);
                }
            });
       }
      });