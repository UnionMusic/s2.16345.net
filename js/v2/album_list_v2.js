var tabs_list = [];
layui.use(['form'], function(){
	var form = layui.form;
	function dedupe(array){
    	return Array.from(new Set(array));
    }
	function delValInArr(value,array){
        var pos = $.inArray(value,array);
        array.splice(pos,1);
    }
    function update_tabs(data){
    	data = dedupe(data);
    	if(data.length>0){
    		$(".ui-tabs-lists-num").show();
    		$(".ui-tabs-ok b").text(data.length);
    	}else{
    		$(".ui-tabs-lists-num").hide();
    		$("[name=tabs]").prop("checked", false);
    	}
    	var d = $("[name=tabs][value!=all]"),
    		t = $("[name=tabs][value!=all]:checked");
    	if(d.length==t.length && $(".json-list li").length != 0){
    		$("[name=tabs][value=all]").prop("checked", true);
    	}else{
    		$("[name=tabs][value=all]").prop("checked", false);
    	}
    	form.render();
    }
    $(".ui-tabs-no").on("click", function(){
    	$(".ui-tabs-lists-num").hide();
    	tabs_list = [];
    	update_tabs(tabs_list);
    });
	form.on('checkbox(tabs)', function(data){
		var m = data.elem.checked,
			v = data.value,
			d = $("[name=tabs][value!=all]");
		if(v!='all'){
			if(m){
				tabs_list.push(v);
			}else{
				delValInArr(v, tabs_list);
			}
			update_tabs(tabs_list);
			console.log(tabs_list);
		}else{
			if(m){
				console.log(true);
				for(var i=0;i<d.length;i++){
					var th = d.eq(i);
					if(th.prop("checked") == false){
						tabs_list.push(th.val());
					}
				}
				d.prop("checked", true);
			}else{
				console.log(false);
				for(var i=0;i<d.length;i++){
					var th = d.eq(i);
					if(th.prop("checked")){
						delValInArr(th.val(), tabs_list);
					}
				}
				d.prop("checked", false);
			}
			update_tabs(tabs_list);
		}
	  
	});
	function json(s,p,l){
	      $.getJSON(vhost+"/WeApi/Music",{type: 'all',key: key},function(res){
	          $("span.n1 sm").html(res.data.all);
	          $("span.n2 sm").html(res.data._0);
	          $("span.n3 sm").html(res.data._1);
	          $("span.n4 sm").html(res.data._2);
	          $("span.n5 sm").html(res.data._3);
	      });
		  $.getJSON(vhost+"/WeApi/Music",{
	      	sid: s,
	        page:p,
	        limit:l,
	        key: key,
	        tmp:timestamp()
	      },function(res) {
			$(".json-list").html("");
			$(".no-list").show();
			$.each(res.data,function (i, data){
				var sid = '<span></span>',upc;
				if(data.audit==0){
					sid = '<span class="p4"><i class="icon iconfont icon-minus-circle"></i>待提交</span>';
				}else if(data.audit==1){
					sid = '<span><i class="icon iconfont icon-time-circle"></i>审核中</span>';
				}else if(data.audit==2){
					sid = '<span class="p2"><i class="icon iconfont icon-check-circle"></i>已通过</span>';
				}else if(data.audit==3){
					sid = '<span class="p3"><i class="icon iconfont icon-warning-circle"></i>被驳回</span>';
				}
	          	if(data.upc==''){
	            	upc = '-';
	            }else{
	            	upc = data.upc;
	            }
				$(".json-list").append('<li data-id="'+data.id+'" data-name="'+data.name+'">'+
							'<div class="tabs"><input type="checkbox" value="'+data.id+'" name="tabs" lay-skin="primary" lay-filter="tabs"></div>'+
					        '<div class="albumName">'+
						        '<div class="albumImg">'+
						          '<a href="/team/music/issue?albumid='+data.id+'">'+
						            '<img src="https://pi-cdn.lianhe.art/'+data.cover+'_180"></a>'+
						        '</div>'+
					        	'<div>'+data.name+'</div><em>'+sid+'</em>'+ 
					        '</div>'+
					        '<div class="albumSinger">'+data.singer.replace(/\+/g, '、')+'</div>'+
					        '<div class="albumUser">'+data.userinfo.nickname+'</div>'+
					        '<div class="albumUpc">'+upc+'</div>'+
					        '<div class="albumTime" style="float:right;">'+data.addtime+'</div>'+
					        '<div class="meun">'+
					          '<a class="edit" href="/team/music/issue?albumid='+data.id+'">'+
					            '<i class="icon anticon icon-edit"></i>编辑</a>'+
					          '<a class="dels">'+
					            '<i class="icon anticon icon-delete"></i>删除</a>'+
					        '</div>'+
					      '</li>');
				i++;
				$(".no-list").hide();
			});
			for(var i=0;i<tabs_list.length;i++){
				var v = tabs_list[i];
				$("[value="+v+"]").prop("checked",true);
			}
			update_tabs(tabs_list);
			form.render();
			$(".load-list").hide();
			$(".json-list").show();
		});
	}
	function jsonstas(s){
		$(".json-list").hide();
		$(".load-list").show();
		var meun = $(".list .meun span.cur").index();
	
		var page = $(".page-list ul li.cur").html();
		if($(".page-list ul li.cur").length<1){
			page = 1;
		}
		if(s==1){
			shref('/meun/' + $(".list .meun span.cur").index()+ '/page/1');
		}else{
			shref('/meun/' + $(".list .meun span.cur").index() + '/page/' + page);
		}
		json(meun, page, p);
	}
	
			var locationHref = window.location.href;
			var t,p=10;
			function star(s){
				var meun = $(".list .meun span.cur").index();
				
				$(".json-list").hide();
				$(".load-list").show();
				$.getJSON(vhost+'/WeApi/music/index/sid/'+meun+'/type/count',function(res){
					c = res.count;
					t = res.page;
					pagehref = locationHref.match(/page\/(\S*)/);
					pageContall(t,p);
					if(pagehref!=null && s!=1){
						jumppage(pagehref[1]);
					}
					function jumppage(n){
						var length = $(".page-list ul li").length;
						if(n>p){
							var x = n-p;
							$(".page-list ul li").eq(p-1)[0].click();
							for(var i=0;i<x;i++){
								$(".page-x")[0].click();
							}
						}
						for(var i=0;i<length;i++){
							var now = $(".page-list ul li").eq(i).html();
							//var int = $(".page-list ul li").eq(i).index();
							if(now==n){
								$(".page-list ul li").eq(i)[0].click();
								return;
							}
						}
					}
					jsonstas(s);
					function pageContall(t,p){
						var pagetallnum = t;
						var pagenum = p;
						if(pagetallnum<pagenum){
							pagenum = pagetallnum;
						}
						$(".page-list ul").html("");
						if(pagetallnum>1){
							$(".page-list ul").append('<span class="page-s"><i class="icon anticon icon-left"></i></span>');
							for(var i=0;i<pagenum;i++){
								if(i==0)
									$(".page-list ul").append('<li class="cur">'+(i+1)+'</li>');
								else
									$(".page-list ul").append('<li>'+(i+1)+'</li>');
							}
							$(".page-list ul").append('<span class="page-x"><i class="icon anticon icon-right"></i></span>');
						}
						$(".page-list ul li").click(function(){
							var length = $(this).parents("ul").children($("li")).length;
							for(var i=0;i<length;i++){
								$(this).parents("ul").children($("li").eq(i)).removeClass("cur");
							}
							$(this).addClass("cur");
							jsonstas();
						});
						$(".page-s").click(function(){
							var page = $(".page-list ul li.cur").index();
							var pageMum = $(".page-list ul li").eq(0).html(); 
							if (pagetallnum != pagenum & pageMum != 1) {
							    var length = $(".page-list ul li").length;
							    for (var i = 0; i < length; i++) {
							        var val = Number($(".page-list ul li").eq(i).text());
							        $(".page-list ul li").eq(i).text(val - 1);
							    }
								jsonstas();
							    return;
							}
							if(page > 1){
								var length = $(".page-list ul li").length;
								for(var i=0;i<length;i++){
									$(".page-list ul li").eq(i).removeClass("cur");
								}
								$(".page-list ul li").eq(page-2).addClass("cur");
								jsonstas();
							}else{
								smwarn('已经是第一页了');
							}
						});
						$(".page-x").click(function(){
							var page = $(".page-list ul li.cur").index();
							if(page < pagenum){
								var length = $(".page-list ul li").length;
								for(var i=0;i<length;i++){
									$(".page-list ul li").eq(i).removeClass("cur");
								}
								$(".page-list ul li").eq(page).addClass("cur");
								jsonstas(s);
							}else{
								var pageMum = $(".page-list ul li.cur").html();
								if(pagetallnum!=pagenum & pageMum < t){
									var length = $(".page-list ul li").length;
									for(var i=0;i<length;i++){
										var val = Number($(".page-list ul li").eq(i).text());
										$(".page-list ul li").eq(i).text(val+1);
									}
									jsonstas();
								}else{
									smwarn('已经是最后一页了');
								}
							}
						});
					}
				});
			}
			$(".list .meun span").click(function(){
				var length = $(this).parents(".meun").children($("span")).length;
				for(var i=0;i<length;i++){
					$(this).parents(".meun").children($("span")[i]).removeClass("cur");
				}
				$(this).addClass("cur");
				if(meunhref!=null){
					if(meunhref[1]!=$(".list .meun span.cur").index()){
						star(1);
						return;
					}
				}
				star();
			});
			meunhref = locationHref.match(/meun\/(\S*)\/page/);
			if(meunhref!=null){
				$(".list .meun span").eq(meunhref[1])[0].click();
			}else{
				star();
			}
	$(document).on('click', '.dels',function(){
	  	var id = $(this).closest("li").attr("data-id");
	    layer.open({
	      type: 1,
	      skin: 'ui-layer',
	      title: ' ',
	      resize: false,
	      area: '500px',
	      content: '<div class="ui-content">\
	                    <h2>提示</h2>\
	                    <div class="content">\
							<p class="ui-red ui-p10 ui-icon-left"><span class="icon iconfont icon-warning-circle"></span>删除专辑《'+$(this).closest("li").attr("data-name")+'》, 此操作将不可挽回请仔细确认后进行操作。</p>\
	                    </div>\
	                </div>',
	      btn: ['确认','取消'],
	      yes: function(index){
	      	$.post("/WeApi/music/delete_album",{id:id},function(d){
	          if(d.code==0){
	              TME.tips('删除成功');
	              layer.close(index);
	              history.go(0);
	          }else{
	              TME.warn(d.msg);
	          }
	        });
	      }
	    });
	});
});