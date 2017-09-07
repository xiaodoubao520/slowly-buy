
    var navList = $(".nav .navWrap ul li");
    var shops = $(".nav .shop");
    var shopid = 0;
    var areaid = 0;
    //获取店铺数据并渲染数据
    var shoping = $(".nav .shoping ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getgsshop",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplShoping",data);
            //console.log(tplStr);（）
            shoping.html(tplStr);
            //点击店铺名称,获取对应数据
            var shopingList = $(".shoping li");
            shopingList.each(function(i,v){
                $(v).on("click",function(){
                    shopid = $(this).attr("shopId");
                    render(shopid,areaid);
                    //更新菜单中名字
                    navList.eq(0).children("a").text($(this).children("a").text().slice(0,-1));
                    //排他
                    shopingList.children("a").children("span").addClass("hide");
                    //添加选中标志
                    $(this).children("a").children("span").removeClass("hide");
                   //隐藏菜单
                    $(this).parent("ul").parent(".shop").addClass("hide");
                })
            })
        },
        error:function(){
            console.log("请求失败!");
        }
    })
    //获取区域数据并渲染数据
    var area = $(".nav .area ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getgsshoparea",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplArea",data);
            //console.log(tplStr);
            area.html(tplStr);
            //点击区域名称,获取对应数据
            var areaList = $(".area li");
            areaList.each(function(i,v){
                $(v).on("click",function(){
                    areaid = $(this).attr("areaId");
                    render(shopid,areaid);
                    //更新区域名称
                    navList.eq(1).children("a").text($(this).children("a").text().slice(0,2));                    
                    //排他
                    areaList.children("a").children("span").addClass("hide");
                    //添加选中标志
                    $(this).children("a").children("span").removeClass("hide");
                   //隐藏菜单
                    $(this).parent("ul").parent(".shop").addClass("hide");
                })
            })
        },
        error:function(){
            console.log("请求失败!");
        }
    })
    //获取商品数据并渲染数据
    var products = $(".products ul");
    render();
    //导航点击展示和隐藏功能
    navList.each(function(i,v){
        $(v).on("click",function(){
            var index = $(v).index();
            shops.each(function(i,v){
                //当前显示,其他隐藏
                if(i === index){
                    $(v).toggleClass("hide");
                }else{
                    $(v).addClass("hide");
                }
            })
        })
    })




    //商品信息数据渲染功能
    function render(shopid,areaid){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:9090/api/getgsproduct",
            dataType:"json",
            data:{
                shopid :shopid || 0,
                areaid :areaid || 0
            },
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
    }

