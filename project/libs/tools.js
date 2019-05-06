var tools = {
	/* 做cookie的存储修改删除
	 * 只传key就是获取
	 * key和value一起就是存或者删除
	 * option 修改path和expires  expires值为-1代码删除
	 * @param key <string> cookie的属性名
	 * @param value <string> cookie的值
	 * @param option <object> {expires, path}
	 * return <string> 取cookie时就返回当前这条cookie值
	 */
	
	cookie : function (key, value, option){
		if(value === undefined){
			// 获取value值
			var cookie = document.cookie;
			var arr = cookie.split("; ");
			
			var objCookie = arr.reduce(function(obj, item) {
				var substr = item.split("=");
				obj[substr[0]] = decodeURIComponent(substr[1]);
				
				// 把obj返回出去,作为下一次的作为下一次的reduce的obj继续合并;
				return obj;
			},{});
			return objCookie[key];
			
		}else{
			// 操作cookie
			var str = key+"="+encodeURIComponent(value);
			if(option){
				if(option.path) str += ";path="+option.path;
				if(option.expires){
					var date = new Date();
					date.setDate(date.getDate()+option.expires);
					str += ";expires="+date;
				}
			}
			document.cookie = str;
		}
	},
	
	
	/* ajax get 方法
	 * @param url <string> 请求的地址
	 * @param query <object> 请求携带的参数
	 * @param callback <function> 数据成功后的回调函数
	 * @param isjson <boolean> 是否是json格式的数据
	 */ 
	
	ajaxGet: function (url, query, callback, isjson){
		// json没有传递的话默认为false
		 isjson = isjson === undefined? true: isjson;
		 //先创建一个ajax核心对象
		 var ajax = new XMLHttpRequest();
		 // 如果有query就在url后面拼接query
		 if(query){
			 url += "?";
			 for(var key in query){
				 url += key +"="+ query[key] + "&";
			 }
			 url = url.slice(0, -1);
		 }
		 ajax.open("GET", url, true);
		 
		 ajax.send(null);
		 // 监听状态的改变
		 ajax.onreadystatechange = function () {
			 if(ajax.readyState === 4 && ajax.status === 200){
				//根据isjson判断是否使用JSON.parse转换
				var res = isjson? JSON.parse(ajax.responseText): ajax.responseText;
				// 利用逻辑短路
				 callback && callback(res);
			 }
		}
	},
	
	/* ajax方法
	 * @param method <string> "get"或者"post"
	 * @param url <string> 请求的地址
	 * @param query <object> 请求携带的参数
	 * @param callback <function> 数据成功后的回调函数
	 * @param isjson <boolean> 是否是json数据格式
	 */ 
	
	ajax : function (method, url, query, callback, isjson) {
		isjson = isjson === undefined? true: isjson;
		
		if(method.toUpperCase() === "GET"){
			this.ajaxGet(url, query, callback, isjson);
		}else if(method.toUpperCase() === "POST"){
			var ajax = new XMLHttpRequest();
			
			ajax.open("POST", url, true)
			
			ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded");
			
			var str = "";
			if(query){
				for(var key in query){  
					str += key+ "=" +query[key] + "&";
				}
			str = str.slice(0, -1);
			}
			ajax.send(str);
			
			ajax.onreadystatechange = function () {
				if(ajax.readyState === 4 ){
					if(ajax.status === 200){
							callback && callback(isjson? JSON.parse(ajax.responseText): ajax.responseText);
					}else{
							alert("请求失败");
					}
				}
			}
		}	
	},
	
	
	/* 请求json数据
	 * @param url <string> 请求的地址
	 * @param cb <string> 回调函数的函数名
	 * @param query <object> 请求携带的参数
	 */
	
	ajaxJsonp : function (url, cb, query) {
		//创建一个scrpit标签
		var script = document.createElement("script");
		url += "?cb="+ cb;
		if(query){
			for(var key in query){
				url += "&" + key +"="+ query[key];
			}	
		}
		script.src = url;
		document.body.appendChild(script);
		//过河拆桥
		document.body.removeChild(script);
	},
	
	/* ajaxGetPromis 方法
	 * param url <string> 请求的地址
	 * @param query <object> 是否携带参数
	 * @param isJson <boolean> 是否是json格式数据
	 */
	ajaxGetPromise : function (url, query, isJson) {
		isJson = isJson === undefined? true: isJson;
		if(query){
			url += "?";
			for(let key in query){
				url += key+"="+query[key]+"&";
			}
			url = url.slice(0, -1);
		}
		return new Promise ((resolve, reject) => {
			let ajax = new XMLHttpRequest();
			ajax.open("GET", url, true);
			ajax.send(null);
			ajax.onreadystatechange = function (){
				if(ajax.readyState === 4){
					if(ajax.status === 200){
						resolve(isJson ? JSON.parse(ajax.responseText): ajax.responseText);
					}else{
						reject();
					}
				}
			}
		})
	}
}
