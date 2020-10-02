    	var locationHref = window.location.href;
		meunhref = locationHref.match(/meun\/(\S*)/);
		getuser();
		if(meunhref!=null){
			$(".list .meun span").eq(meunhref[1])[0].click();
		}
function getsinger(){
   $(".user-list").hide();
   $(".load-list").hide();
   $(".no-list").show();
}
function getuser(){
   $(".user-list").hide();
   $(".load-list").show();
			$.getJSON(vhost+"/WeApi/Singer/logininfo",function(data){
				$(".memo").val(data.data['memo'])
				for(var o=0;o<$(".list .lhui").length;o++){
					var obj = $(".list .lhui .text input").eq(o);
					var clas = obj.attr("class");
					if(data.data[clas] !=null){
						obj.val(data.data[clas]);
					}
				}
   $(".load-list").hide();		
   $(".user-list").show();
			});
}