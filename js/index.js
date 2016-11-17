window.onload = function(){
	search();
	secondKill();
	scrollPic();
};
/*头部搜索*/
var search = function(){
	/*搜索框对象*/
	var search = document.getElementsByClassName('jd_header_box')[0];
	/*banner对象*/
	var banner = document.getElementsByClassName('jd_ad')[0];
	/*高度*/
	var banHeight = banner.offsetHeight;
	window.onscroll = function(){
		var top = document.body.scrollTop;
		/*当高度大于banner高度的时候，颜色不变*/
		if(top > banHeight){
			search.style.background = "rgba(201,21,35,0.85)";
		}else{
			var op = top/banHeight*0.85;
			search.style.background = "rgba(201,21,35,"+ op +")";
		};
	};
};

/*秒杀倒计时*/
var secondKill = function(){
	/*父盒子*/
	var parentTime = document.getElementsByClassName("sk_time")[0];
	/*秒杀时间*/
	var timeList = parentTime.getElementsByClassName("num");
	var times = 4 * 60 * 60;
	setInterval(function(){
		times--;
		var h = Math.floor(times / (60 * 60)); 
		var m = Math.floor((times/60) % 60);
		var s = times % 60;

		timeList[0].innerHTML = h>10?Math.floor(h/10):0;
		timeList[1].innerHTML = h%10;
		timeList[2].innerHTML = m>10?Math.floor(m/10):0;
		timeList[3].innerHTML = m%10;
		timeList[4].innerHTML = s>10?Math.floor(s/10):0;
		timeList[5].innerHTML = s%10;

	},1000);

};
/*轮播图*/
var scrollPic = function(){
	/*banner*/
	/*banner对象*/
	var banner = document.getElementsByClassName('jd_ad')[0];
	/*图片的宽度*/
	var banWidth = banner.offsetWidth;
	/*装图片的ul*/
	var imgBox = banner.getElementsByClassName('jd_ad_img')[0];
	/*下面的点点ul*/
	var pointBno = document.getElementsByClassName('jd_ad_num')[0];
	/*点点的数组*/
	var pointList = pointBno.getElementsByTagName('li');
	/*图片的索引值*/
	var index = 1;
	/*点点的索引值*/
	var ponIndex = index - 1;
	var timer;
	/*动画间隔时间*/
	var times = 3000;
	/*添加过度*/
	var addTransition = function(){
		imgBox.style.transition = "all 0.5s ease 0s";
		imgBox.style.webkitTransition = "all 0.5s ease 0s";
	};
	/*去除过度*/
	var removeTransition = function(){
		imgBox.style.transition = "none";
		imgBox.style.webkitTransition = "none";
	};
	/*改变位置*/
	var setTransform = function(t){
		imgBox.style.transform = "translateX("+t+"px)";
		imgBox.style.webkitTransform = "translateX("+t+"px)";
	};
	/*改变点点的状态*/
	var pointChange = function(){
		for(var i = 0; i < pointList.length; i++){
			pointList[i].setAttribute("class","circle");
		}
		ponIndex = index - 1;
		if(ponIndex < 0){
			ponIndex = 7;
		}else if(ponIndex > 7){
			ponIndex = 0;
		}
		pointList[ponIndex].setAttribute("class","circle active");
	}
	/*初始图片位置*/
	setTransform(-index*banWidth);
	/*自动轮播*/
	timer = setInterval(function(){
		index++;
		picChange();
	},times);
	var picChange = function(){
		addTransition();
		setTransform(-index*banWidth);
		pointChange();
	}
	/*滑动轮播*/
	var startX;
	var endX;
	imgBox.addEventListener('touchstart',function(e){
		startX = e.targetTouches[0].clientX;
	});
	imgBox.addEventListener('touchmove',function(e){
		endX = e.targetTouches[0].clientX;
	});
	/*手指离开屏幕后*/
	imgBox.addEventListener('touchend',function(e){
		var length = endX - startX;
		if(Math.abs(length) > 50){
			if(endX>startX){
				clearInterval(timer);
				index--;
				picChange();
				timer = setInterval(function(){
					index++;
					picChange();
				},times);
			}else if(endX<startX){
				clearInterval(timer);
				index++;
				picChange();
				timer = setInterval(function(){
					index++;
					picChange();
				},times);
			}
		}
		
	},false);
	
	/*动画结束后，判断位子，实现无缝轮播*/
	imgBox.addEventListener('transitionEnd',function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index= 8;
		}
		removeTransition();
		setTransform(-index*banWidth);
	},false);
	imgBox.addEventListener('webkitTransitionEnd',function(){
		if(index >= 9){
			index = 1;
		}else if(index <= 0){
			index= 8;
		}
		removeTransition();
		setTransform(-index*banWidth);
	},false);
};









