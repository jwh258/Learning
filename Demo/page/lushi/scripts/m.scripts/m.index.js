$(document).ready(function () {
	//广告轮播
	$(function () {
		var iShow = 1,
			changeTime = 5000;//自动播放时间
		function showDefault() {
			$(".slide ul li:eq(" + iShow + ")").fadeIn(1000).siblings(".slide ul li").fadeOut(1000);
			$(".slide-btn a:eq(" + iShow + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			iShow = iShow + 1;
			if (iShow == $(".slide-x").length) {
				iShow = 0;
			}
		}

		$(function () {
			for (var i = 0; i < 5; i++) {
				$(".slide-btn a:eq(" + i + ")").attr({num: i, class: "slide-x"});
			}
			$(".slide ul li").hide();
			$(".slide ul li:eq(0)").show();//初始化刷新后的第一张图片
			$(".slide-btn a:eq(0)").addClass("btn-hover");
			var timer = setInterval(showDefault, changeTime);
			$(".slide-btn a").click(function () {
				iShow = parseInt($(this).attr("num"));//转化类型，不然点击后就是字符串了
				$(".slide ul li:eq(" + iShow + ")").fadeIn().siblings(".slide ul li").fadeOut();
				$(".slide-btn a:eq(" + iShow + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			});
		});
		/*广告移动端左右切换*/
		$(".slide").swipe({
			swipeLeft: function () {
				showNext();
			},
			swipeRight: function () {
				showPre();
			}
		});
		/*这样写是考虑到以后要加向前向后的图标可以直接拿来用*/
		function showNext() {
			indexNow = $(".btn-hover").index();
			if (indexNow == $(".slide-x").length - 1) {
				indexNow = -1;
			}
			indexNext = indexNow + 1;
			$(".slide ul li:eq(" + indexNext + ")").fadeIn(1000).siblings(".slide ul li").fadeOut(1000);
			$(".slide-btn a:eq(" + indexNext + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			iShow = indexNext + 1;
			if (iShow == $(".slide-x").length) {
				iShow = 0;
			}
		}

		function showPre() {
			indexNow = $(".btn-hover").index();
			if (indexNow == 0) {
				indexNow == $(".slide-x").length - 1;
			}
			indexPre = indexNow - 1;
			if (indexPre < 0) {
				indexPre == $(".slide-x").length
			}
			$(".slide ul li:eq(" + indexPre + ")").fadeIn(1000).siblings(".slide ul li").fadeOut(1000);
			$(".slide-btn a:eq(" + indexPre + ")").addClass("btn-hover").siblings(".slide-btn a").removeClass("btn-hover");
			iShow = indexPre + 1;
			if (iShow == $(".slide-x").length) {
				iShow = 0;
			}
		}
	});

});

/*news切换*/
mouseenterN(".tab-liN li", ".tab-liN", ".tab-conN", ".tab-itemN", "active");
/*news切换 函数*/
function mouseenterN(li, parents, con, items, addclass) {
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
/*导航栏*/
$(function () {
	$("a.slide-menu").on("click", function () {
		var wh = $("body").height();
		$("div.slide-mask").css("height", wh).show();
		$("aside.slide-wrapper").addClass("moved");
	});
	$("div.slide-mask").on("click", function () {
		$("div.slide-mask").hide();
		$("aside.slide-wrapper").removeClass("moved");
	});
});

/*职业弹出*/
$("a#title-career-currentImg").on("click", function () {
	if ($("div.career-chose").css("display") == 'none') {
		$("div.career-chose").slideDown('fast');
	} else {
		$("div.career-chose").slideUp('fast');
	}
});
/*职业切换*/
$("#myCareer li").click(function () {
	var a = "active";
	if ($(this)[0].className.indexOf(a) >= 0) {
		stop();
	} else {
		var num = $(this).index();
		var titCurrent = $("#title-career-currentImg img:eq(0)");
		var currentSrc = titCurrent.attr("src");
		var newSrc = currentSrc.replace(/[0-9]/, num);
		titCurrent.attr("src", newSrc);
		$(this).addClass(a).siblings().removeClass(a);
		$("#myCareer-Content" + num).css("display", "block").siblings("div:not('.career-title')").css("display", "none");
	}
});

/*新卡、冒险 弹出*/
$("#title-newCard , #title-adventure").on("click", function () {
	var getUL = $("." + $(this).attr("id") + "-current ul");
	if (getUL.css("display") == 'none') {
		getUL.slideDown('fast');
	} else {
		getUL.slideUp('fast');
	}
});

/*新卡选择*/
mouseenterT(".tab-li li", ".title-top", ".tab-con", ".tab-item", "on", "#title-newCard");
/*冒险选择*/
mouseenterT(".tab-li1 li", ".title-top", ".tab-con1", ".tab-item", "on", "#title-adventure");
/*函数主体*/
function mouseenterT(li, parents, con, items, addclass, changeID) {
	$(li).click(function () {
		var a = "on";
		if ($(this)[0].className.indexOf(a) >= 0) {
			stop();
		} else {
			var index = $(this).index();
			$(this).addClass(addclass).siblings().removeClass(addclass);
			// $(this).parents(parents).next(con).find(items).eq(index).show().siblings().hide();
			$(this).parents(parents).next(con).find(items).eq(index).removeClass("none").addClass("db").siblings().removeClass("db").addClass("none");
			$(changeID).text($(this).text());
			$(li).parent().slideUp('fast');
		}
	})
}