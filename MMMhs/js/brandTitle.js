
    //获取热门品牌排行
    var brands = $(".brands ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getbrandtitle",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplBrands",data);
            //console.log(tplStr);
            brands.html(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
