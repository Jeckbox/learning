window.onload = function(){
	checkBox();
	deleteFuc();
};
/*复选框*/
var checkBox = function(){
	/*获取所有的复选框*/
	var checkBoxList = document.getElementsByClassName('jd_check_box');

	var parent;
	var lists;
	/*点击任意复选框，改变其状态*/
	for( var i = 0; i < checkBoxList.length; i++){
		checkBoxList[i].index = i;
		checkBoxList[i].addEventListener('click',function(){
			var checked = this.getAttribute('checked');
			console.log(checked);
			if(checked || checked == ''){
				this.removeAttribute('checked');
				/*如果点击的是商店标题的复选框*/
				var className = this.getAttribute('class');
				var shopName = className.indexOf(" jd_shop_all");
				var allCheck = className.indexOf(" jd_all_check");
				if(shopName != -1){
					parent = this.parentNode.parentNode.parentNode;
					lists = parent.getElementsByClassName('jd_check_box');
					for( var j = 0; j < lists.length; j++){
						lists[j].removeAttribute('checked');
					}
				}else if(allCheck != -1){
					for( var k = 0; k < checkBoxList.length; k++){
						checkBoxList[k].removeAttribute('checked');
					}
				}
				/*if()*/
			}else{
				this.setAttribute('checked',true);
				/*如果点击的是商店标题的复选框*/
				var className = this.getAttribute('class');
				var shopName = className.indexOf(" jd_shop_all");
				var allCheck = className.indexOf(" jd_all_check");
				if(shopName != -1){
					var parent = this.parentNode.parentNode.parentNode;
					var lists = parent.getElementsByClassName('jd_check_box');
					for( var j = 0; j < lists.length; j++){
						lists[j].setAttribute('checked',true);
					}
				}else if(allCheck != -1){
					for( var k = 0; k < checkBoxList.length; k++){
						checkBoxList[k].setAttribute('checked',true);
					};
				};

			};	
		},false);
	};
	/**/
};


/*删除弹出框*/
var deleteFuc = function(){
	var that;
	/*删除按扭集合*/
	var deleteList = document.getElementsByClassName('delete_box');
	/*获取遮罩层*/
	var cover = document.getElementsByClassName('jd_alert')[0];
	/*获取弹出框*/
	var delete_box = cover.getElementsByClassName('jd_alert_box')[0];
	/*删除按钮点击事件*/
	for( var i = 0; i < deleteList.length; i++){
		deleteList[i].addEventListener('click',function(){
			that = this;
			coverShow();
			rubishOpen();
		});
	};
	/*获取确认和取消按钮*/
	var cancel = document.getElementsByClassName('cancel')[0];
	var submit = document.getElementsByClassName('submit')[0];
	/*绑定取消事件*/
	cancel.addEventListener('click',function(){
		coverHidden();
		rubishClose();
	});
	/*绑定确定事件*/
	submit.addEventListener('click',function(){
		coverHidden();
		rubishClose();
	});
	/*遮罩层出现*/
	var coverShow = function(){
		cover.style.display = 'block';
		delete_box.className = 'jd_alert_box clearfix jumpOut';
	};
	/*遮罩层消失*/
	var coverHidden = function(){
		cover.style.display = 'none';
		delete_box.className = 'jd_alert_box clearfix';
	};
	/*删除垃圾筐盖子的开合动画*/
	/*开*/
	var rubishOpen = function(){
		var delete_top = that.getElementsByClassName('delete_top')[0];
		delete_top.style.transition = 'all 1s ease 0s';
		delete_top.style.webkitTransition = 'all 1s ease 0s';
		delete_top.style.transform = 'translateY(-5px) translateX(-2px) rotate(-30deg)';
		delete_top.style.webkitTransform = 'translateY(-5px) translateX(-2px) rotate(-30deg)';
	};
	/*关*/
	var rubishClose = function(){
		var delete_top = that.getElementsByClassName('delete_top')[0];
		delete_top.style.transition = 'all 1s ease 0s';
		delete_top.style.webkitTransition = 'all 1s ease 0s';
		delete_top.style.transform = 'none';
		delete_top.style.webkitTransform = 'none';
	};
};