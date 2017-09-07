
    //优惠券列表数据获取和模板渲染
    var couponList = $(".discCouponList .coupon ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getcoupon",
        dataType:"json",
        success:function(data){
            console.log(data);
            var tplStr = template("tplDiscCouponList",data);
            //console.log(tplStr);
            couponList.append(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
