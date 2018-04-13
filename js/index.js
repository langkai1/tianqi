 // var weather;
/*$.ajax ({
	url:"https://www.toutiao.com/stream/widget/local_weather/data/?city=太原",
	dataType:"jsonp",
	type:"get",
    success:function(obj){
 
        weather=obj.data.weather;
        console.log(obj.data);
    } 
})*/
var wear;
$.ajax ({
	url:"https://www.toutiao.com/stream/widget/local_weather/city/",
	dataType:"jsonp",
	type:"get",
    success:function(obj){
    	console.log(obj.data);
        wear=obj.data;
        xcity(wear);
    } 
})
function xcity(wear){
      for(var k in wear){
          var pot=document.createElement("li");    
          pot.className="pot";
          var am=document.querySelector(".am");
          am.appendChild(pot);

          var tle=document.createElement("p");
          tle.className="tle";
          tle.innerHTML=k;
          var ar=document.querySelector(".ar");
          ar.appendChild(tle);

          for (var m in wear[k]) {
            var pot=document.createElement("li");
            pot.className="pot";
            pot.innerHTML=m;
            ar.appendChild(pot);
          }
      }  
}

function updata(weather){
     var city_name=document.querySelector(".region");
     city_name.innerHTML=weather.city_name;
     var condition=document.querySelector(".tqi");
     condition.innerHTML=weather.current_condition;
     var temperature=document.querySelector(".temperature");
     temperature.innerHTML=weather.current_temperature+"°";
     var you1=document.querySelector("#tdt");
     you1.innerHTML=weather.dat_high_temperature+"/"+weather.dat_low_temperature+"°";
     var you2=document.querySelector("#tmt");
     you2.innerHTML=weather.tomorrow_high_temperature+"/"+weather.tomorrow_low_temperature+"°";
     var tdc=document.querySelector("#tdc");
     tdc.innerHTML=weather.dat_condition;
     var tmc=document.querySelector("#tmc");
     tmc.innerHTML=weather.tomorrow_condition;
     var taiyang=document.querySelector("#tdp");
     taiyang.style=`background-image:url(img/${weather.dat_weather_icon_id}.png)`;
     var bg=document.querySelector(".bg");
     bg.style=`background-image:url(img/${weather.tomorrow_weather_icon_id}.png)`;


     // for (var i in weather.hourly_forecast) {
     // 	var now =document.createElement("li")
     // 	now.className="now";
     // 	var wrap=document.querySelector(".zhuan");
     // 	wrap.appendChild(now);

     // 	var txttime=document.createElement("p");
     // 	txttime.className="txt-time";
     // 	txttime.innerHTML=weather.hourly_forecast[i].hour+":00";
     // 	now.appendChild(txttime); 

     //    var hours=document.createElement("div");
     //    hours.className="hours";
     //    hours.style=`background-image:url(img/${weather.hourly_forecast[i].weather_icon_id}.png)`;
     //    now.appendChild(hours);

     //    var txtkey=document.createElement("p");
     //    txtkey.className="txt-key";
     //    txtkey.innerHTML=weather.hourly_forecast[i].temperature+"°";
     //    now.appendChild(txtkey);
     // }
    var stra="";
    weather.hourly_forecast.forEach((item,index)=>{
    stra=stra+`
    <li class="now">
         <p class="txt-time">${item.hour}:00</p>
         <div class="hours" style="background-image:url(img/${item.weather_icon_id}.png)"></div>
         <p class="txt-key">${item.temperature}°</p>
    </li>
  `
})
$(".zhuan").html(stra);

var strb="";
    weather.forecast_list.forEach((item,index)=>{
    var dta=item.date.slice(5,7)+"/"+item.date.slice(8,10);
    strb=strb+`
    <li class="future">
            <p class="day"></p>
            <p class="date">${dta}</p>
            <p class="weath">${item.condition}</p>
            <img src="" alt="" class="con" style="background-image:url(img/${item.weather_icon_id}.png)">
            <img src="" alt="" class="con i" style="background-image:url(img/${item.weather_icon_id}.png)">
            <p class="weather"></p>
            <p class="wind">${item.wind_direction}</p>
            <p class="wind">${item.wind_level}级</p> 
          </li>
  `
})
$(".zhuann").html(strb);
      //   for (var j in weather.forecast_list) {
      //   var future=document.createElement("li");
      //   future.className="future";
      //   var qw=document.querySelector(".zhuann");
      //   qw.appendChild(future);
      //  var day=document.createElement("p");
      //  day.className="day";
      //  future.appendChild(day);

      //  var weath=document.createElement("p");
      //  weath.className="weath";
      //  weath.innerHTML=weather.forecast_list[j].condition;
      //  future.appendChild(weath);

      //  var date=document.createElement("p");
      //  date.className="date";
      //  date.innerHTML=weather.forecast_list[j].date.slice(5,7)+"/"+weather.forecast_list[j].date.slice(8,10);
      //  future.appendChild(date);

      //  var con=document.createElement("div");
      //  con.className="con";
      //  future.appendChild(con);

      //  var coni=document.createElement("div");
      //  coni.className="con i";
      //  future.appendChild(coni);

      //  var wind=document.createElement("p");
      //  wind.className="wind";
      //  wind.innerHTML=weather.forecast_list[j].wind_direction;
      //  future.appendChild(wind);

      //  var wind=document.createElement("p");
      //  wind.className="wind";
      //  wind.innerHTML=weather.forecast_list[j].wind_level+"级";
      //  future.appendChild(wind);
      // }   
}
function AJAX(str){
	var url1=`https://www.toutiao.com/stream/widget/local_weather/data/?city=${str}`;
	$.ajax({
		url:url1,
		dataType:"jsonp",
        type:"get",
        success:function(obj){
        	var weather=obj.data.weather;
        	updata(weather);
        	$(".search").css({"display":"none"});
          $(".hide").addClass("block");
        }
	})
		  
}
window.onload=function(){
     // updata();
     xcity(wear);
     $(".pot").on("click",function(){
     	var cityh=this.innerHTML;
     	AJAX(cityh);
     })
      $("input").on("focus",function(){
	  	$(".quxiao").html("搜索");
	  });
	  $(document).ready(function(){
           $(".region").click(function(){
               $(".search").show(1000);
            });
        });  
	 var text=document.querySelector(".quxiao");
	 text.onclick=function(){
	 	var textt=this.innerText;
	 	if (textt=="取消") {
     	  $(".search").css({"display":"none"});
	 	}
	 	else{
	 		var str3=document.querySelector("input").value;
	 		for(var m in wear){
	 			for(var n in wear[m]){
	 				if (str3==n) {
	 					AJAX(str3);
	 					return;
	 				}

	 			}
	 		} 
	 		alert("没有该城市！！！"); 
	 	}
	 }
 }