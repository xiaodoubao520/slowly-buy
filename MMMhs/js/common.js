//回到顶部功能
var toTop = $(".footer .toTop");
toTop.on("click",function(){
    document.body.scrollTop = 0;
})
//获取ID数据
var dataStr = window.location.search;
function getData(str){
    var obj = {};
    str = str.slice(1);
    strArr = str.split("&");
    for(var k in strArr){
        var data = strArr[k].split("=");
        obj[data[0]] = data[1];
    }
    return obj;
}

