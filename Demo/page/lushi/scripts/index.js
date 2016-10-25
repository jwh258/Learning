$(document).ready(function () {
	///*出现分享*/
	//$(".fixed-bg .l7").hover(function () {
	//	$(".fx_cn").show();
	//}, function () {
	//	$(".fx_cn").hide();
	//})
	///*导航二级菜单*/
	//$(".nav li").hover(function () {
	//	$(this).addClass("on").siblings().removeClass("on");
	//	$(".nav2").hide();
	//	$(this).find(".nav2").show();
	//}, function () {
	//	$(this).removeClass("on");
	//	$(this).find(".nav2").hide();
	//});
	//$("#j-site-menu").mouseover(function () {
	//	$("#j-phone-sitemap").css("display", "");
	//	$("#j-site-menu").addClass("phone_menu_cur");
	//}).mouseout(function () {
	//	$("#j-phone-sitemap").css("display", "none");
	//	$("#j-site-menu").removeClass("phone_menu_cur");
	//});
	/*冒险切换*/
	clickT(".tab-li li", ".tab-li", ".tab-con", ".tab-item", "on", ".tab-more");
	/*news切换*/
	mouseenterT(".tab-li1 li", ".tab-li1", ".tab-con1", ".tab-item1", "active");
	//广告轮播
	$(function () {
		var iShow = 1,
			changeTime = 2000;//自动播放时间
		function show() {
			$(".slide ul li:eq(" + iShow + ")").fadeIn(1000).siblings(".slide ul li").fadeOut(1000);
			$(".slide-btn a:eq(" + iShow + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			iShow = iShow + 1;
			if (iShow == $(".slide-x").length) {
				iShow = 0;
			}
			//alert(iShow);
		}
		$(function () {
			for (var i = 0; i < 5; i++) {
				$(".slide-btn a:eq(" + i + ")").attr({num: i, class: "slide-x"});
			}
			$(".slide ul li").hide();
			$(".slide ul li:eq(0)").show();//初始化刷新后的第一张图片
			$(".slide-btn a:eq(0)").addClass("btn-hover");
			var timer = setInterval(show, changeTime);
			$(".slide-btn a").click(function () {
				iShow = parseInt($(this).attr("num"));//转化类型，不然点击后就是字符串了
				$(".slide ul li:eq(" + iShow + ")").fadeIn().siblings(".slide ul li").fadeOut();
				$(".slide-btn a:eq(" + iShow + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			});
			$('.slide').mouseover(function () {clearInterval(timer);})
			.mouseout(function () {timer = setInterval(show, changeTime);});
		});
	});
});
/*冒险切换*/
function clickT(li, parents, con, items, addclass, more) {
	$(li).click(function () {
		var index = $(this).index();
		var url = $(this).data("url");
		$(this).parents(parents).find(more).attr("href", url);
		$(this).addClass(addclass).siblings().removeClass(addclass);
		$(this).parents(parents).next(con).find(items).eq(index).show().siblings().hide();
		$(this).parents(parents).next(con).find(items).eq(index).find('img[lz_src]').attr('src', function () {
			return $(this).attr('lz_src')
		}).removeAttr('lz_src');
		return false;
	})
}
/*news切换*/
function mouseenterT(li, parents, con, items, addclass) {
	$(li).click(function () {
		var index = $(this).index();
		$(this).addClass(addclass).siblings().removeClass(addclass);
		$(this).parents(parents).next(con).find(items).eq(index).show().siblings().hide();
		$(this).parents(parents).next(con).find(items).eq(index).find('img[lz_src]').attr('src', function () {
			return $(this).attr('lz_src')
		}).removeAttr('lz_src');
		return false;
	})
}
/*职业切换*/
function career(thisObj, Num) {
	if (thisObj.className == "active") return;
	var tabObj = thisObj.parentNode.id;
	var tabList = document.getElementById(tabObj).getElementsByTagName("li");
	for (i = 0; i < tabList.length; i++) {
		if (i == Num) {
			thisObj.className = "active";
			document.getElementById(tabObj + "-Content" + i).style.display = "block";
		} else {
			tabList[i].className = "normal";
			document.getElementById(tabObj + "-Content" + i).style.display = "none";
		}
	}
}
/*新卡预览*/
function showcard(kn) {
	$("#newCard-tab li").attr("class", "");
	$("#newCard-tab li").eq(kn).attr("class", "on");
	$(".newCard-list").eq(kn).removeClass("none").addClass("db").siblings().removeClass("db").addClass("none");
	var obj = $(".newCard-ul").eq(kn).find("li:lt(5)");
	replace_lz(obj);
}
function replace_lz(obj) {
	var len = $(obj).length;
	for (var i = 0; i < len; i++) {
		$(obj).eq(i).find("img[lz_src]").attr("src", function () {
			var t = $(this).attr("lz_src");
			$(this).removeAttr("lz_src");
			return t;
		});
	}
}

/*新卡左右切换*/
$(function() {
	var index = 0,//初始页数
		Swidth = 925;//切换的宽度

	function NextPage() {
		Len = Math.ceil(($(".newCard-list.db li").length)/5)-1;//获取共有多少页 算法:向上取整-1;不可以向下取整==>为整数时多了1;JS:ceil上，round中，floor下
		if(index>Len)
		{
			index = 0 ;
		}
		$(".newCard-content .db ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)//animate是动画内置参数
	}
	function PrevPage() {
		Len = Math.ceil(($(".newCard-list.db li").length)/5)-1;//获取共有多少页 算法:向上取整-1;不可以向下取整==>为整数时多了1
		if(index<0)
		{
			index = Len ;
		}
		$(".newCard-content .db ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
	}

	$(".newCard-right").click(function() {
		index++;
		NextPage();
	});
	$(".newCard-left").click(function() {
		index--;
		PrevPage();
	});
})