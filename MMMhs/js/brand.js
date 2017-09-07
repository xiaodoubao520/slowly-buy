//获取brandtitleid
var data = getData(dataStr);
//获取排行榜数据和渲染数据
var rankingList = $(".rankingList ul");
$.ajax({
    type:"GET",
    url:"http://127.0.0.1:9090/api/getbrand",
    dataType:"json",
    data:{
        brandtitleid:data.brandtitleid
    },
    success:function(data){
        //console.log(data);
        var tplStr = template("tplRankingList",data);
        //console.log(tplStr);
        rankingList.html(tplStr);
        var numWrap = $(".rankingList ul li a span");
        numWrap.each(function(i,v){
            $(v).text(i+1);
        })
        numWrap.eq(0).css("background","#f10e0e");
        numWrap.eq(1).css("background","#ff9314");
        numWrap.eq(2).css("background","#8adf5b");
    },
    error:function(){
        console.log("请求失败!");
    }
})
//获取销量排行产品信息数据和模板渲染
var products = $(".products")
$.ajax({
    type:"GET",
    url:"http://127.0.0.1:9090/api/getbrandproductlist",
    dataType:"json",
    data:{
        brandtitleid:data.brandtitleid,
        pagesize :4
    },
    success:function(data){
        //console.log(data);
        var tplStr = template("tplProducts",data);
        //console.log(tplStr);
        products.html(tplStr);
        var productId = data.result[0].productId;
        var img = data.result[0].productImg;
        var title = data.result[0].productName;
        //最新评论数据获取和渲染
        var comments = $(".comments");
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:9090/api/getproductcom",
            dataType:"json",
            data:{
                productid :productId 
            },
            success:function(data){
                //console.log(data);
                var tplStr = template("tplComments",data);
                //console.log(tplStr);
                comments.html(tplStr);
                $(".comments .comment .info .pic").append(img);
                $(".comments .comment .info .title").text(title);
            },
            error:function(){
                console.log("请求失败!");
            }
        })
    },
    error:function(){
        console.log("请求失败!");
    }
})
