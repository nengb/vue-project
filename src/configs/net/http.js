import $ from "n-zepto"


// let { serverConfig,AesEncrypt,AesDecrypt } = window;


import serverConfig from '../serverConfig';
let { ip, httpAddress, socketAddress, imgAddress, getHrefNew, getQueryString,getQueryStringArgs } = serverConfig;


let ajaxType ={
	'get':true,
	'post':true,
}


function checkDataToken(data){
	// if(data.errcode == 4000){
	// 	console.log('token超时');
	// 	// sessionStorage.token = -1
	// 	delete sessionStorage.code;
	// 	window.location.reload();
		
	// }
}


//加密接口
function cryptoReq(json){
	let { url,post } = json;
	let query = getQueryStringArgs(url);
	post = {...post,...query};
}

//get请求
async function getData(json){
	let msg
	return new Promise((resolve,reject)=>{
		// console.log(json)
		if(!json.post){
			json.post = {}
		}
		if(json.post.apiService == 'lottery'){
			json.url = json.url.replace(httpAddress,`http://${ip}:9020`)
		}
		
		!json.post.account?json.post.account=sessionStorage.account:null;
		
		$.ajax({
			type: !ajaxType[json.type]?'get':json,
			url: json.url,
			data: json.post,
			dataType: "json",
			async: true,
			success: function(data) {
				msg = data;
				checkDataToken(msg)
				resolve(msg)
			},
			error: function(data, status, e) {
				// $toast.show('请求数据失败，请检查网络~', 1000)
				  
				resolve(null)
			},
			timeout:5000
		});
	})
}
//post请求
async function postData(json){
	let msg
	return new Promise((resolve,reject)=>{
		$.ajax({
			type: 'post',
			url: json.url,
			data: json.post,
			dataType: "json",
			async: true,
			success: function(data) {
				msg = data;
				checkDataToken(msg)
				resolve(msg)
			},
			error: function(data, status, e) {
				resolve(null)
			},
			timeout:5000
		});
	})
}
//上传表单数据（可上传文件）
async function postFormData(json){
	return new Promise((resolve,reject)=>{
		var oReq = new XMLHttpRequest();
		oReq.open("POST", json.url);
		oReq.send(json.formData);
		oReq.onreadystatechange = function () {
			if (oReq.readyState == 4) {
				if(oReq.status == 200){
					let data 
					try {
						data = JSON.parse(oReq.response)
					} catch (error) {
					}	
	
					checkDataToken(data)
					resolve(data)
				}else{
					resolve(false)
				}
			}
		}
	})
}

window.getData = getData;
window.postData = postData;
window.postFormData = postFormData;


export default { getData, postData, postFormData}