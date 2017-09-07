
    //获取ID数据
    var dataStr = window.location.search;
    var data = getData(dataStr);
    //console.log(data.productid)
    //产品信息数据请求和模板渲染
    var proDisc = $(".proDisc");
    var comments = $(".comments");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getdiscountproduct",
        dataType:"json",
        data:{
            productid:data.productid
        },
        success:function(data){
            console.log(data);
            var tplStr = template("tplProDisc",data);
            //console.log(tplStr);
            proDisc.append(tplStr);
            var ulListStr = data.result[0].productCity;
            proDisc.append(ulListStr);
            var productComment = data.result[0].productComment;
            comments.append(productComment);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
