function searchWeather() {
    var city = $('#city').val();
    city = city.replace(/\d?/g, '');//为什么汉字不属于\w啊啊啊啊啊啊？？？？\W把汉字也干掉了啊！！！
    // console.log(city);
    $.ajax({
        type: 'GET',
        // url: 'weather.json',
        url: 'http://v.juhe.cn/weather/index?cityname=' + encodeURI(city) + '&type=&format=&key=e6af7702dfd859ffaa362a154f8ea7b1',
        dataType: 'jsonp', /*json*/
        success: function (res) {
            console.log(res);
            if (res.resultcode != '200') {
                $('.result').html('<p>' + res.reason + '</p>')
            } else {
                var weather = '';
                var result = res.result;
                var future = result.future;
                var todayW = '';
                var futureDay = [];//里面存满了以后天数的对象名
                for (var i in res.result.future) {
                    futureDay.push(i);
                }
                console.log(futureDay);
                // console.log(future[futureDay[0]]);
                /*今天天气*/
                weather += '<div class="today"><p><span>' + result.today.city + '</span>&nbsp;&nbsp;<span>' + result.today.week + '</span>&nbsp;&nbsp;<span>' + result.today.date_y + '</span></p>';
                weather += '<p><span>今日天气：' + result.today.wind + '&nbsp;&nbsp;' + result.today.weather + '</span></p>';
                weather += '<p><span>气温：' + result.today.temperature + '</span></p>';
                weather += '<p><span>出行：' + result.today.travel_index + '</span></p>';
                weather += '<p><span>运动：' + result.today.exercise_index + '</span></p>';
                weather += '<p><span>穿衣建议：' + result.today.dressing_advice + '</span></p></div>';
                /*以后的天气*/
                weather += '<div class="future"><h4>未来6天天气状况</h4>';
                for (var i = 1; i < futureDay.length; i++) {
                    var theDay = future[futureDay[i]];
                    var theDate = futureDay[i].substr(4, 4) + '年' + futureDay[i].substr(8, 2) + '月' + futureDay[i].substr(-2, 2) + '日';
                    weather += '<div><p>' + theDate + '</p>';
                    weather += '<p><span>' + theDay.wind + '&nbsp;' + theDay.weather + '</span></p>';
                    weather += '<p><span>气温：' + theDay.temperature + '</span></p></div>';
                }
                $('.result').empty().html(weather);
            }
        }
    })
}
$(document).ready(function () {
    $('#search').on('click', searchWeather);
    $('#city').bind('keypress', function (e) {
        if (e.keyCode == "13") {
            searchWeather();
        }
    });
});