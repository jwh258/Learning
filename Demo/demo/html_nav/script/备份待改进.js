$(function() {
	//main_tdown切换
    var
    index = 0;
    Swidth = 996;

    function NextPage() {
    	if(index>2)
			{
				index = 0 ;
			}
        $(".main_tdown_c ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
    }
    function PrevPage() {
    	if(index<0)
			{
				index = 2 ;
			}
        $(".main_tdown_c ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
    }
    //下一页
    $(".main_tdown_r").click(function() {
        index++;
        NextPage();
    });
    //上一页
    $(".main_tdown_l").click(function() {
        index--;
        PrevPage();
    });


    //news轮播
    $(".Div1_main div span").mouseover(function(){
		$(this).addClass("Div1_main_span1").siblings("span").removeClass("Div1_main_span1");
	}).mouseout(function(){
		$(this).removeClass("Div1_main_span1").siblings("span");
	});
	

	var 
	page = 0 ;
	pageW = 371 ;
	timer = null ;
	
	function ToPage()
	{	
		if(page>2)
		{
			page = 0 ;
		}
		$(".news_con_list2_btn a:eq(" + page + ")").addClass("btn_a_hov").siblings().removeClass("btn_a_hov");
		$(".news_con_list2_con").stop(true, false).animate({marginLeft: -page*pageW+"px"},600)		
	}
	
	
	//切换至
	$(".news_con_list2_btn a").click(function(){
		 page++ ;
		 ToPage();
	});
	//自动播放
	var timer = setInterval(function(){
			page++ ;
			ToPage();
		},2000);
		
	$(".news_con_list2_btn , .news_con_list2_con").mouseover(function(){
		clearInterval(timer);
	});
	$(".news_con_list2_btn , .news_con_list2_con").mouseleave(function(){
		timer = setInterval(function(){
			page++ ;
			ToPage();
		},2000);	
	});
})



    //news轮播  待完善
/*	var 
	page = 0 ;
	pageW = 371 ;
	timer = null ;
	
	function ToPage()
	{	
		if(page == 3)
		{
			page = 0 ;
		}
		// iShow = $(this).attr("num") - 1;
		// alert(((".news_con_list2_con li").length));
		$(".news_con_list2_btn a:eq(" + page + ")").addClass("btn_a_hov").siblings().removeClass("btn_a_hov");
		$(".news_con_list2_con").stop(true, false).animate({marginLeft: -page*pageW+"px"},600)		
	}
	
	
	//切换至
	$(".news_con_list2_btn a").click(function(){
		 page++ ;
		 ToPage();
	});
	//自动播放
	var timer = setInterval(function(){
			page++ ;
			ToPage();
		},2000);
		
	$(".news_con_list2_btn , .news_con_list2_con").mouseover(function(){
		clearInterval(timer);
	});
	$(".news_con_list2_btn , .news_con_list2_con").mouseleave(function(){
		timer = setInterval(function(){
			page++ ;
			ToPage();
		},2000);	
	});
*/