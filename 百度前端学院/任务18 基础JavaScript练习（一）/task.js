/**
 *  IE 8 及更早 IE 版本，Opera 7.0及其更早版本不支持 addEventListener() 和 removeEventListener() 方法。
 *  但是，对于这类浏览器版本可以使用 detachEvent() 方法来移除事件句柄:
 *  element.attachEvent(event, function);
 *  element.detachEvent(event, function);
 * */

//没有考虑IE8之前addEvent的兼容性问题  可以参考以下代码加入之后兼容IE

// function addEvent(element, event, listener) {
// 	if (element.addEventListener) {
// 		element.addEventListener(event, listener, false);
// 	}
// 	else if (element.attachEvent) {
// 		element.attachEvent("on" + event, listener);
// 	}
// 	else {
// 		element["on" + event] = listener;
// 	}
// }



var $ = function (id) {
	return document.getElementById(id);
};
numText = $("num-text");
result = $("result");

//git上网速不好 图片经常出不来 onload太慢了!
/*window.onload = function () {
	var buttons = document.getElementsByTagName("button");
	//给按钮增加事件
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', clickButton)
	}
	//给DIV增加事件
};*/

//我要让他快一点运行
function addButtonClick() {
	var buttons = document.getElementsByTagName("button");
	//给按钮增加事件
	for (var i = 0; i < buttons.length; i++) {
		buttons[i].addEventListener('click', clickButton)
	}
	//给DIV增加事件
}
addButtonClick();




var divNum = 1;//每次新建DIV给予一个编号方便识别
function addListener() {//这个函数必须放在addDivDelEvent()的外边 不然会捆绑多次
	console.log("删除了:" + this);//为什么这个this返回的是类型
	console.log(this);
	result.removeChild(this);
}
function addDivDelEvent() {
	for (var j = 0; j < result.childNodes.length; j++) {
		result.childNodes[j].addEventListener('click', addListener);
	}
}
function clickButton() {
	var num = numText.value.replace(/(^\s*)|(\s*$)/g, '');//去除前后空格  ==  trim()
	var buttonId = this.id;
	switch (buttonId) {
		case "left-in":
			if (!isNaN(num) && num.length != 0) {
				var newDiv = document.createElement('div');
				newDiv.innerHTML = num + " 第" + divNum + "号";
				divNum++;
				result.insertBefore(newDiv, result.children[0]);
				addDivDelEvent();
			} else {
				alert("请输入一个数字!")
			}
			break;
		case "right-in":
			if (!isNaN(num) && num.length != 0) {
				var newDiv = document.createElement('div');
				newDiv.innerHTML = num + " 第" + divNum + "号";
				divNum++;
				result.insertBefore(newDiv, result.childNodes[0]);
				result.appendChild(newDiv);
				addDivDelEvent();
			} else {
				alert("请输入一个数字!")
			}
			break;
		case "left-out":
			var firstC = result.children[0];
			console.log("删除了:" + firstC.innerHTML);
			alert(firstC.innerHTML.replace(/\s第\d号/g, ''));
			result.removeChild(firstC);
			break;
		case "right-out":
			var lastC = result.children[result.childNodes.length - 1];
			console.log("删除了:" + lastC.innerHTML);
			alert(lastC.innerHTML.replace(/\s第\d号/g, ''));
			result.removeChild(lastC);
			break;
	}
}