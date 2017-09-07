
    //产品信息数据请求和模板渲染
    var productsUl = $(".products ul");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getinlanddiscount",
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplProducts",data);
            //console.log(tplStr);
            productsUl.append(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
