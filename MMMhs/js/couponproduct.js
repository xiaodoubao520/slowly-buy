
    //获取ID数据
    var data = getData(dataStr);
    //获取商品数据并渲染模板
    var couponList = $(".couponList ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getcouponproduct",
        dataType:"json",
        data:{
            couponid:data.couponid
        },
        success:function(data){
            console.log(data);
            var tplStr = template("tplCouponList",data);
            //console.log(tplStr);
            couponList.html(tplStr);
            //点击优惠券,弹出遮罩层
            var coupons = $(".couponList ul li");
            var wrap = $(".wrap");
            var imgList = $(".couponList ul li .pic img");
            coupons.each(function(i,v){
                $(v).on("click",function(){
                    $(v).children(".wrap").toggleClass("hide");
                })
            })
            var left = $(".leftArrow");
            var right = $(".rightArrow");
            //当前页面的最大ID和最小ID,用来确定按钮的边界值;
            var maxId = left.parent(".wrap:last").attr("couponProductId");
            var minId = right.parent(".wrap:first").attr("couponProductId");
            var currentWrap = null;
            //上一张按钮逻辑
            left.each(function(i,v){
                $(v).on("click",function(e){
                    e.stopPropagation();
                    couponProductId = $(this).parent(".wrap").attr("couponProductId");
                    couponProductId--;
                    if(couponProductId < minId){     
                        couponProductId = minId;
                        return;
                    }
                    var currentWrap = $("div[couponProductId="+couponProductId+"]");
                    wrap.addClass("hide");
                    currentWrap.removeClass("hide");
                    //console.log(couponProductId);
                })
            })
            //下一张按钮逻辑
            right.each(function(i,v){
                $(v).on("click",function(e){
                    e.stopPropagation();
                    couponProductId = $(this).parent(".wrap").attr("couponProductId");
                    couponProductId++;
                    if(couponProductId > maxId){
                        couponProductId = maxId;
                        return;
                    }
                    var currentWrap = $("div[couponProductId="+couponProductId+"]");
                    wrap.addClass("hide");
                    currentWrap.removeClass("hide");
                })
            })
            
        },
        error:function(){
            console.log("请求失败!");
        }
    })
