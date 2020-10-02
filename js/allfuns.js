	var bootom_html = '	<div class="dall-top"><i class="icon anticon icon-up" style="display: inline-block;margin-right: 0;color: #666;"></i></div>'+
	'	<div class="polgt-all" style="display: none;"></div>'+
	'	<div class="login-modu m-login" style="display: none;">'+
	'	  <i class="anticon icon-close"></i>'+
	'	  <img class="user-image" src="https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000" onerror="this.src=\'https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000\'">'+
	'	  <div class="icon-input bind-img">'+
	'	    <i class="iconfont icon-user"></i>'+
	'	    <input type="text" class="username uion-input" placeholder="请输入手机"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="icon anticon icon-lock"></i>'+
	'	    <input type="password" class="password uion-input" placeholder="请输入密码"></div>'+
	'	  <a class="post-btn p-login">登录</a><a class="post-btn p-wechat" style="background: #44b549;">使用微信扫码登录</a>'+
	'		<div class="meun-mod">'+
	'		    <div class="l">'+
	'				<i class="icon anticon icon-closesquareo icon-minussquareo" style="margin-right: 0px;"></i><i class="icon anticon icon-checksquare"></i>7天免登录'+
	'		    </div>'+
	'		    <div class="r">'+
	'		        <a class="reg">注册账号</a> ／ <a class="pass">忘记密码？</a>'+
	'		    </div>'+
	'		</div>'+
	'	</div>'+
	'	<div class="login-modu m-reg" style="display: none;">'+
	'	  <i class="anticon icon-close"></i>'+
	'	  <h1>注册账号</h1>'+
	'	  <div class="icon-input">'+
	'	    <i class="iconfont icon-user"></i>'+
	'	    <input type="text" class="nickname uion-input" placeholder="请输入歌手名称 / 公司名称"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="iconfont icon-phone"></i>'+
	'	    <input type="text" class="username uion-input" placeholder="请输入手机 ( +86 )"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="icon anticon icon-lock"></i>'+
	'	    <input type="password" class="password uion-input" placeholder="请输入密码"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="icon anticon icon-Safety"></i>'+
	'	    <input type="text" class="code uion-input" placeholder="请输入短信验证码">'+
	'	    <span id="TencentCaptcha" class="SendCode">获取验证码</span></div>'+
	'	  <a class="post-btn p-reg">注册</a>'+
	'	  <div class="meun-mod">'+
	'	    <div class="l">'+
	'	      <i class="icon anticon icon-closesquareo icon-minussquareo" style="margin-right: 0px;"></i><i class="icon anticon icon-checksquare"></i>我已阅读《<a target="_blank" href="/Home/help/protocol.html">用户协议</a>》'+
	'	      </div>'+
	'	    <div class="r">'+
	'	      <a class="login">登录账号</a></div>'+
	'	  </div>'+
	'	</div>'+
	'	<div class="login-modu m-pass" style="display: none;">'+
	'	  <i class="anticon icon-close"></i>'+
	'	  <h1>忘记密码</h1>'+
	'	  <div class="icon-input">'+
	'	    <i class="iconfont icon-user"></i>'+
	'	    <input type="text" class="username uion-input" placeholder="请输入手机号码"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="icon anticon icon-lock"></i>'+
	'	    <input type="password" class="password uion-input" placeholder="请输入新的密码"></div>'+
	'	  <div class="icon-input">'+
	'	    <i class="icon anticon icon-Safety"></i>'+
	'	    <input type="text" class="code uion-input" placeholder="请输入短信验证码">'+
	'	    <span id="TencentCaptcha"  class="SendCode">获取验证码</span></div>'+
	'	  <a class="post-btn p-pass">确认修改</a>'+
	'	  <div class="meun-mod">'+
	'	    <div class="r">'+
	'	      <a class="login">登录账号</a> ／'+
	'	      <a class="reg">注册账号</a></div>'+
	'	  </div>'+
	'	</div>';
	var wap_list = '<div class="wap-list">'+
    '<i class="anticon icon-close"></i>'+
'<li><a href="/">首页</a></li>'+
   '<li><a href="/Home/issue.html">数字发行</a></li>'+
    '<li><a href="/Home/make.html">音乐制作</a></li>'+
    '<li><a href="/Home/help.html">帮助中心</a></li>'+
'</div>';
	!function(a,b,c){function d(a){var c="default";a.self_redirect===!0?c="true":a.self_redirect===!1&&(c="false");var d=b.createElement("iframe"),e="https://open.weixin.qq.com/connect/qrconnect?appid="+a.appid+"&scope="+a.scope+"&redirect_uri="+a.redirect_uri+"&state="+a.state+"&login_type=jssdk&self_redirect="+c+'&styletype='+(a.styletype || '')+'&sizetype='+(a.sizetype || '')+'&bgcolor='+(a.bgcolor || '')+'&rst='+(a.rst || '');e+=a.style?"&style="+a.style:"",e+=a.href?"&href="+a.href:"",d.src=e,d.frameBorder="0",d.allowTransparency="true",d.scrolling="no",d.width="300px",d.height="400px";var f=b.getElementById(a.id);f.innerHTML="",f.appendChild(d)}a.WxLogin=d}(window,document);
	var userInfo = null;
	$("body").append(bootom_html);
	$(document).on("click","#TencentCaptcha",function(){
      	var phones = phone;
        if($(".m-reg").is(":hidden")==false){
          phones = $(".m-reg .username").val();
        }
        if($(".m-pass").is(":hidden")==false){
          phones = $(".m-pass .username").val();
        }
        if(phones==''){
          phones = ''
        }
        if(wait!=0){
          TME.warn('请'+wait+'秒后再尝试');
          return;
        }
    	var captcha = new TencentCaptcha('2051214687', function(res) {
          	if(res.ret === 0){
              $.post("/WeApi/code/SendSMS", {
                  t: res.ticket,
                  r: res.randstr,
                  phone: phones
              }, function(r){
                  if(r.code == 0){
                      wait = 60;
                      SendCodeTime();
                      TME.tips(r.msg);
                  }else{
                      TME.warn(r.msg);
                  }
              });
            };
        });
      	captcha.show();
    });
    $(".p-wechat").on("click",function(){
      layui.use(['layer'], function(){
        var layer = layui.layer;
        $(".m-login .icon-close").click();
        layer.open({
          type:1,
          title:' ',
          area: ['365px','500px'],
          content: '<div style="padding:0 30px;padding-bottom:10px;">'+
          '<div id="login_container" style="margin-top: 10px;text-align: center;">'+
          '</div>'+
          '</div>',
          btn:[]
        });
        var WeChat = new WxLogin({
          id: "login_container",
          appid: "wx2438b23b5ed75576",
          scope: "snsapi_login",
          redirect_uri: encodeURIComponent("https://" + window.location.host + "/WeApi/Oauth/wechat_login?href="+window.location.href),
          state: Math.ceil(Math.random()*1000),
          style: "black",
          href: ""
        });
      });
    });
	$("body").append(wap_list);
	$(".wap-list .icon-close").on("click",function(){
    	$(".wap-list").hide();
    });
	$(".fa-navicon").on("click",function(){
    	$(".wap-list").show();
    });
		var popMsg = ['请输入手机号码','请输入登录密码','请输入验证码','验证码获取成功','请输入图形验证码','请输入新的密码','请输入歌手名称或公司名称','请勾选并阅读用户协议']; /* 信息提示 */
		var webHost = ''; 
		var vhost = '';
		var phone;
		function login_stat(){
          $.ajaxSettings.async = false; 
          $.getJSON(vhost+"/WeApi/Singer/logininfo",function(res){
              if(res.code==0){
                if(res.xid>0){
                	var n = 'n';
                  	var nhtml = '<span>'+res.xid+'</span>';
                }else{
                	var n ='';
                  	var nhtml = '';
                }
               	if(res.data.rz==5){
                	var sethtml = '<li><a href="/team/pay.html"><i class="icon anticon icon-creditcard"></i>余额 <b>'+res.data.rmb+'<sm>元</sm></b></a></li>'+
                          	'<li><a href="/team/album.html"><i class="icon anticon icon-appstore-o"></i>专辑管理</a></li>'+
                          	'<li><a href="/team/contract.html"><i class="icon anticon icon-filetext1"></i>合约管理</a></li>'+
                          	'<li><a class="'+n+'" href="/team/news.html"><i class="icon anticon icon-bells"></i>消息通知'+nhtml+'</a></li>';
                }else{
                	var sethtml = '';
                }
                $(".user-info").html('<a class="bell '+n+'" href="/team/news.html">'+
                        '<i class="icon iconfont icon-mail-fill"></i>'+
                      '</a>'+
                      '<a href="/team/index.html"><img src="default.png" onerror="this.src=\'https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000\'"></a>'+
                        '<div class="info">'+
                        '<a href="/team/index.html"><p class="nickname">'+res.data.nickname+' <i class="icon anticon icon-down"></i><i class="icon anticon icon-up"></i></p></a>'+
                      '</div>'+
                        '<div class="list-meun">'+
										sethtml			+
                          	'<li><a href="#" class="outlogin"><i class="icon anticon icon-logout"></i>退出登录</a></li>'+
					     '</div>'            
                    );
                //$(".user-info .info p.nickname").html(res.data.nickname);
                $(".user-info img").attr("src",'//old.lianhe.art'+res.data.image);
                if($(".left .userImg").length>0){
                    $(".left .userImg p").html(res.data.nickname);
                    $(".left .userImg img").attr("src",'//old.lianhe.art'+res.data.image);
                }
                if($(".stat-btn").length==1){
                	if(res.data.rz==0 || res.data.rz==1 || res.data.rz==3){
                    	$(".stat-btn.login").html('提交资料');
                      	$(".stat-btn").after('<a href="/team/index.html" class="stat-btn home">个人中心</a>');
                    }else if(res.data.rz==5){
                    	$(".stat-btn.login").html('个人中心');
                      	$(".stat-btn").after('<a href="/team/music/issue.html" class="stat-btn home">发行专辑</a>');
                    }if(res.data.rz==2){
                    	$(".stat-btn.login").html('合约签署');
                      	$(".stat-btn").after('<a href="/team/index.html" class="stat-btn home">个人中心</a>');
                    }
                  	if(res.data.rz==1 && res.data.musicid==1){
                    	$(".stat-btn.login").html('合约签署');
                    }
                }
                if($(".userImg").length==1){
                	if(res.data.cid==1){
                    	$(".userImg").addClass('com');
                      	$(".icon-dashboard").parents("li").hide();  
                    }
                }
                phone = res.data.phone;
                $(".outlogin").on("click",function(){
                    $.post(vhost+"/WeApi/Login/v3",function(r){
                        if(r.code==0){
                            TME.tips('退出成功');
                            window.location.href='/';
                        }else{
                            TME.warn('网络请求超时');
                        }
                    });
                });
              }
          });
          $.ajaxSettings.async = true; 
        }
		login_stat();
		$(document).keyup(function(event){
		  if(event.keyCode ==13){
		    if($(".m-login .username").is(":focus")==true || $(".m-login .password").is(":focus")==true){
		    	$(".p-login")[0].click();
		    }
		    if($(".m-reg .nickname").is(":focus")==true ||$(".m-reg .username").is(":focus")==true || $(".m-reg .password").is(":focus")==true || $(".m-reg .code").is(":focus")==true){
		    	$(".p-reg")[0].click();
		    }
		    if($(".m-pass .username").is(":focus")==true || $(".m-pass .password").is(":focus")==true){
		    	$(".p-pass")[0].click();
		    }
		  }
		});
		var wait = 0;
		function SendCodeTime(){
			if(wait!=0){
				setTimeout(function(){
					wait--;
					$(".SendCode").html(wait+' 秒后重新获取');
					SendCodeTime();
				},600);
			}else{
				$(".SendCode").html('获取验证码');
			}
		}
		$('.bind-img').bind('input propertychange', function(){
			$.getJSON(vhost+"/WeApi/Json/userImage/n/"+$(".m-login .username").val(),function(e){
				var img = e.image;
					if(img==null){
						$(".user-image").attr("src","https://y.gtimg.cn/mediastyle/global/img/singer_300.png?max_age=31536000");
					}else{
						$(".user-image").attr("src","//old.lianhe.art"+img);
					}
			});
		});
		var checkLogin = 0,
			checkReg = 0;
		$(".m-login .l").click(function(){
			if(checkLogin==0){
				$(".m-login .l").addClass('ok');
				checkLogin=1;
			}else{
				$(".m-login .l").removeClass('ok');
				checkLogin=0;
			}
		});
		$(".m-reg .l").click(function(){
			if(checkReg==0){
				$(".m-reg .l").addClass('ok');
				checkReg=1;
			}else{
				$(".m-reg .l").removeClass('ok');
				checkReg=0;
			}
		});
		$(".p-login").click(function(){
              if($(".m-login .username").val() == ""){
                  TME.warn(popMsg[0]);
                  return;
              }else if($(".m-login .password").val() == ""){
                  TME.warn(popMsg[1]);
                  return;
              }
              var m = $(".m-login .meun-mod .l"), remember = 0;
              if(m.hasClass("ok")){
            	remember = 1;
              }
              $.post(vhost+"/WeApi/Login/v2",{username:$(".m-login .username").val(),password:$(".m-login .password").val(),remember: remember},function(r){
                  if(r.code==0){
                      login_stat();
                      $(".icon-close")[0].click();
                      TME.tips('登录成功');
                  }else{
                      TME.warn(r.msg);
                  }
              });
		});
		$(".p-reg").click(function(){
			if($(".m-reg .nickname").val() == ""){
				TME.warn(popMsg[6]);
				return;
			}else if($(".m-reg .username").val() == ""){
				TME.warn(popMsg[0]);
				return;
			}else if($(".m-reg .password").val() == ""){
				TME.warn(popMsg[1]);
				return;
			}else if($(".m-reg .code").val() == ""){
				TME.warn(popMsg[2]);
				return;
			}else if(checkReg == 0){
				TME.warn(popMsg[7]);
				return;
			}else{
            	$.post(vhost+"/WeApi/Login/v1",{nickName:$(".m-reg .nickname").val(),username:$(".m-reg .username").val(),password:$(".m-reg .password").val(),code:$(".m-reg .code").val()},function(r){
                  if(r.code==0){
                    login_stat();
                    $(".polgt-all").hide();
                    $(".m-reg").hide();
                  	TME.tips('注册成功');
                  }else{
                  	TME.warn(r.msg);
                  }
                })
            }
		});
		$(".p-pass").click(function(){
			if($(".m-pass .username").val() == ""){
				TME.warn(popMsg[0]);
			}else if($(".m-pass .password").val() == ""){
				TME.warn(popMsg[5]);
			}else if($(".m-pass .code").val() == ""){
				TME.warn(popMsg[2]);
			}else{
            	$.post(vhost+"/WeApi/Login/v4",{username:$(".m-pass .username").val(),password:$(".m-pass .password").val(),code:$(".m-pass .code").val()},function(r){
                  if(r.code==0){
                    login_stat();
                    $(".polgt-all").hide();
                    $(".m-pass").hide();
                  	TME.tips('修改成功');
                  }else{
                  	TME.warn(r.msg);
                  }
                })
			}
		});
		$(".login").click(function(){
          	if(phone==undefined){
                checkLogin = 0;
                if($(".m-reg").attr("style")!='display: none;'){
                    $(".m-reg .icon-close")[0].click();
                }
                if($(".m-pass").attr("style")!='display: none;'){
                    $(".m-pass .icon-close")[0].click();
                }
                $(".m-login").toggle();
                $(".polgt-all").toggle();
                $(".m-login .username").val("");
                $(".m-login .password").val("");
            }else{
            	window.location.href='/Page/Settings/index.html';
            }
		});
		$(".m-login .icon-close").click(function(){
			if($(".m-login").attr("style")!='display: none;'){
				$(".m-login").toggle();
				$(".polgt-all").toggle();
			}
		});
		$(".reg").click(function(){
			checkReg = 0;
			if($(".m-pass").attr("style")!='display: none;'){
				$(".m-pass .icon-close")[0].click();
			}
			$(".m-login .icon-close")[0].click();
			$(".m-reg").toggle();
			$(".polgt-all").toggle();
			$(".m-reg .nickname").val("");
			$(".m-reg .code").val("");
			$(".m-reg .username").val("");
			$(".m-reg .password").val("");
		});
		$(".m-reg .icon-close").click(function(){
			$(".m-reg").toggle();
			$(".polgt-all").toggle();
		});
		$(".pass").click(function(){
			if($(".m-login").attr("style")!='display: none;'){
				$(".m-login .icon-close")[0].click();
			}
			$(".m-pass").toggle();
			$(".polgt-all").toggle();
			$(".m-pass.code").val("");
			$(".m-pass .username").val("");
			$(".m-pass .password").val("");
		});
		$(".m-pass .icon-close").click(function(){
			$(".m-pass").toggle();
			$(".polgt-all").toggle();
		});
	    window.onscroll = function() {
          var scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop;
          if (scrollTop < 100) {
            $(".dall-top").hide();
          } else {
            $(".dall-top").show();
          }
        }
        $(".dall-top").click(function(){$('html,body').animate({scrollTop:$('body').offset().top}, 500);});