$(function() {
	//certification-list左右切换
    var
    index = 0;
    Swidth = 960;

    function NextPage() {
    	if(index>1)
			{
				index = 0 ;
			}
        $(".certification-list ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)//animate是动画内置参数
    }
    function PrevPage() {
    	if(index<0)
			{
				index = 1 ;
			}
        $(".certification-list ul").stop(true, false).animate({marginLeft: -index*Swidth+"px"},600)
    }

    $(".certification-left").click(function() {
        index++;
        NextPage();
    });
    $(".certification-right").click(function() {
        index--;
        PrevPage();
    });
})
