
    //导航栏请求数据
    var nav = $(".nav");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getindexmenu",
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplNav",data);
            //console.log(tplStr);
            nav.html(tplStr);
            var item = $(".item");
            for(var i=8;i<12;i++){
                item.eq(i).toggleClass("hide");
            }
            item.eq(7).on("click",function(){
                for(var i=8;i<12;i++){
                    item.eq(i).toggleClass("hide");
                }
            })
        },
        error:function(){
            console.log("请求失败!");
        }
    });
    //产品列表请求数据
    var products = $(".products");
     $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getmoneyctrl",
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplProducts",data);
            //console.log(tplStr);
            products.html(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
