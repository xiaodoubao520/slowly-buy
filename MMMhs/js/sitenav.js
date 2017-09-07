
    //获取商城信息并渲染数据
    var shoppingMall = $(".shoppingMall ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getsitenav",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplShoppingMall",data);
            //console.log(tplStr);
            shoppingMall.html(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
