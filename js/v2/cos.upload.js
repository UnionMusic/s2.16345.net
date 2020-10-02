var Bucket = 'musician-1254054744';
var Region = 'ap-shanghai';

var cos = new COS({
    getAuthorization: function (options, callback) {
        $.getJSON('/WeApi/token/sts', {
            bucket: options.Bucket,
            region: options.Region,
        }, function (e) {
        	var data = e.data;
            var credentials = data.credentials;
            callback({
                 TmpSecretId: credentials.tmpSecretId,
                 TmpSecretKey: credentials.tmpSecretKey,
                 XCosSecurityToken: credentials.sessionToken,
                 ExpiredTime: data.expiredTime
            });
        });
    }
});

var logger = {
    log: function (text) {
        console.log.apply(console, arguments);
        var args = [].map.call(arguments, function (v) {
            return typeof v === 'object' ? JSON.stringify(v) : v;
        });

        var logStr = args.join(' ');

        if(logStr.length > 1000000) {
            logStr = logStr.slice(0, 1000000) + '...content is too long, the first 1000000 characters are intercepted';
        }

    },
    error: function (text) {
        console.error(text);
    },
};
function audio_cos_upload(data, callback){
	
	var index = data.index,
		file = data.file;
		
	var errorInfo = [
		"上传的音频过大",
		"请勿上传空文件",
		"上传的文件类型不支持"
	];
	
	var config = {
		min_size: 209715200,
		type: [
			'audio/wav'
		]
	};
	
	if (!file) return;
	
	var judge_type = false;
	
	config.type.forEach(function(value,n){
		if(file.type == config.type[n]){
			judge_type = true;
		}
	});
	
	if(!judge_type){
		
		callback({
			code: 402,
			msg: errorInfo[2]
		}, index, file);
		
	}else if(file.size > config.min_size){
		
		callback({
			code: 400,
			msg: errorInfo[0]
		}, index, file);
		
	}else if(file.size == 0){
		
		callback({
			code: 401,
			msg: errorInfo[1]
		}, index, file);
		
	}else{
		//sliceUploadFile
		var day = new Date();
		day.setTime(day.getTime());
		var date = day.getFullYear()+"-" + (day.getMonth()+1) + "-" + day.getDate();
		var filename = md5(day.getTime() + file.name) + '.wav',
			path = 'audio/music/' + date + '/';
		var key = path + filename;
		cos.sliceUploadFile({
			Bucket: Bucket,
        	Region: Region,
        	Key: key,
        	Body: file,
	        onProgress: function (info) {
	            var percent = parseInt(info.percent * 10000) / 100;
	            var speed = parseInt(info.speed / 1024 / 1024 * 100) / 100;
	            data.onProgress(info, percent, speed, index);
	        }
	    }, function (err, data) {
	    	
	        var code = 0;
	        
	        if(err!=null){
	        	code = 502;
	        }else{
	        	data['key'] = key;
	        	data['path'] = path;
	        	data['filename'] = filename;
	        }
	        
	        callback({
				code: code,
				data: err || data
			}, index, file);
			
	    });
	    
	}
}
