/*获取验证码*/
let $phone = $('#resetpage input[name=userphone]')
var isPhone = 1;
function getCode(e){
	checkPhone(); //验证手机号码
	if(isPhone){
		resetCode(); //倒计时
	}else{
		$phone.focus();
	}
	
}
//验证手机号码
function checkPhone(phone){
	var $phone = $('input[name=userphone]').val();
	var pattern = /^1[0-9]{10}$/;
	isPhone = 1;
	if($phone == '') {
		alert('请输入手机号码');
		isPhone = 0;
		return;
	}
	if(!pattern.test($phone)){
		alert('请输入正确的手机号码');
		isPhone = 0;
		return;
	}
}
//倒计时
function resetCode(){
	$('.get-verification-code').hide();
	$('.second').html('60s');
	$('.reset-verification-code').show();
	var second = 60;
	var timer = null;
	timer = setInterval(function(){
		second -= 1;
		if(second >0 ){
			$('.second').html(second+'s');
      $('.second').css('color','#e0e0e0');
		}else{
			clearInterval(timer);
			$('.get-verification-code').show();
			$('.reset-verification-code').hide();
		}
	},1000);
}