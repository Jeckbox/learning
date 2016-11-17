window.onload = function(){
	listBoxMove();
};

/*获取dom对象*/
var bindDom = function(){
	
};
/*左边的盒子的托动及点击事件*/
var listBoxMove = function(){
	/*左边的ul列表所在的盒子*/
	var listBox = document.getElementsByClassName('jd_category_lbox')[0];
	/*盒子的高度*/
	var listLength = listBox.offsetHeight;
	/*左边的可视窗口*/
	var wrapBox = document.getElementsByClassName('jd_category_left')[0];
	/*可视窗口高度*/
	var wrapLength = wrapBox.offsetHeight;
	/*头部*/
	var headerBox = document.getElementsByClassName('jd_topbar')[0];
	/*头部高度*/
	var headerLength = headerBox.offsetHeight;
	/*盒子拉到最下边的时候打translateY值*/
	var maxLength = wrapLength - listLength - headerLength;
	/*盒子里的li*/
	var lists = listBox.getElementsByTagName("li");
	/*获取每个li的高度*/
	var listHeight = lists[0].offsetHeight;
	/*当前分类的索引值*/
	var mark = 0;
	/*添加过度*/
	
	var addTransition = function(){
		listBox.style.transition = "all 0.5s ease 0s";
		listBox.style.webkitTransition = "all 0.5s ease 0s";
	};
	/*删除过度*/
	var removeTransition = function(){
		listBox.style.transition = "none";
		listBox.style.webkitTransition = "none";
	};
	/*改变位置*/
	var setTransform = function(t){
		listBox.style.transform = "translateY("+t+"px)";
		listBox.style.webkitTransform = "translateY("+t+"px)";
	}
	/*拖动列表框*/
	var startY;
	var endY;
	var length = 0;
	var target = 0;
	listBox.addEventListener('touchstart',function(e){
		startY = e.targetTouches[0].clientY;
	},false);
	listBox.addEventListener('touchmove',function(e){
		endY = e.targetTouches[0].clientY;
		length = endY - startY;
		startY = endY;
		target += length;
		/*上下的间距不大于150px*/
		if(target > 150){
			target = 150; 
		}else if( target < maxLength - 150){
			target =  maxLength - 150;
		}
		setTransform(target);
	},false);
	listBox.addEventListener('touchend',function(){
		if(target > 0){
			addTransition();
			setTransform(0);
			target = 0;
		}else if( target < maxLength){
			addTransition();
			setTransform(maxLength);
			target = maxLength;
		}
	},false);
	/*循环添加事件*/
	for(var i = 0 ; i < lists.length; i++){
		lists[i].index = i;
		lists[i].addEventListener('click',function(){
			lists[mark].setAttribute('class','');
			this.setAttribute('class','now');
			mark = this.index;
			listBoxChange();
		});
	};
	/*根据选中的li移动盒子*/
	var listBoxChange = function(){
		addTransition();
		/*让选中的li处于屏幕相对中间的位置*/
		target = mark * listHeight * -1 + Math.floor(wrapLength/2 -headerLength);
		if(target < maxLength){
			target = maxLength;
		}else if(target > 0){
			target = 0;
		};
		setTransform(target);
	};
	/*过度结束，清除过度效果*/
	listBox.addEventListener('transitionEnd',function(){
		removeTransition();
	},false);
	listBox.addEventListener('webkitTransitionEnd',function(){
		removeTransition();
	},false);
};




