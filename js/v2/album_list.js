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
				sid = '<span class="p4">待提交</span>';
			}else if(data.audit==1){
				sid = '<span>审核中</span>';
			}else if(data.audit==2){
				sid = '<span class="p2">已通过</span>';
			}else if(data.audit==3){
				sid = '<span class="p3">被驳回</span>';
			}
          	if(data.upc==''){
            	upc = '暂无UPC';
            }else{
            	upc = data.upc;
            }
			$(".json-list").append('<li data-id="'+data.id+'" data-name="'+data.name+'">'+
				        '<div class="albumImg">'+
				          '<a href="/Team/Music/issue?albumid='+data.id+'" target="_blank">'+
				            '<img src="https://pi-cdn.lianhe.art/'+data.cover+'_180"></a>'+
				        '</div>'+
				        '<div class="albumName">'+data.name+sid+'</div>'+
				        '<div class="albumSinger">'+
				          '<i class="icon iconfont icon-team"></i>'+data.singer.replace(/\+/g, '／')+'</div>'+
				        '<div class="albumTime" style="float:right;">'+
				          '<i class="icon iconfont icon-time-circle"></i>'+data.time+'</div>'+
                        '<div class="albumUpc">'+
				          '<i class="icon iconfont icon-copyright"></i>'+upc+'</div>'+
				        '<div class="meun">'+
				          '<a class="edit" href="/Team/Music/issue?albumid='+data.id+'">'+
				            '<i class="icon anticon icon-edit"></i>编辑</a>'+
				          '<a class="dels">'+
				            '<i class="icon anticon icon-delete"></i>删除</a>'+
				        '</div>'+
				      '</li>');
			i++;
			$(".no-list").hide();
		});
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