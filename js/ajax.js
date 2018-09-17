(function(){
	var myAjax = window.myAjax = {};
	myAjax.queryJsonToQueryString = function(json) {
		var arr = [];
		for (var k in json) {
			arr.push(k + '=' + encodeURIComponent(json[k]));
		}
		return arr.join('&')
	};

	myAjax.get = function (url, queryJson, callback) {
		if(window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		} else {
			var xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.onreadystatechange = function () {
			// console.log(xhr.DONE);
			if(xhr.readyState === xhr.DONE) {
				if(xhr.status >= 200 && xhr.status <300 || xhr.status ===304) {
					callback &&  callback(null, xhr.responseText);
				} else {
					callback && callback (new Error("没有找到文件"), undefined);
				}
			}
		};
		var queryString = myAjax.queryJsonToQueryString (queryJson);
		console.log('GET 请求:' + url + '?' + queryString)

		xhr.open('GET', url + '?' + queryString, true);
		xhr.send(null)
	};

	myAjax.post = function (url, queryJson, callback, async) {
		if (window.XMLHttpRequest) {
			var xhr = new XMLHttpRequest();
		} else {
			var xhr = new ActiveXObject('Microsoft.XMLHTTP');
		}
		xhr.onreadystatechange = function () {
			if (xhr.readyState === xhr.DONE) {
				if (xhr.status >= 200 && xhr.status < 300 || xhr.status === 304) {
					// console.log(xhr.responseText)
					callback && callback(null, xhr.responseText);
				} else {
					callback && callback({errorCode: xhr.status, msg: "post 请求失败"})
				}
			}
		};
		if (async == undefined) {
			async = true
		}
		// console.log(async)
		// console.log(url)
		xhr.open('POST', url, async);
		var queryString = myAjax.queryJsonToQueryString(queryJson);
		console.log('Post请求body:' + queryString)
		xhr.setRequestHeader('Content-Type', "application/x-www-form-urlencoded");
		xhr.send(queryString)
	};
})();