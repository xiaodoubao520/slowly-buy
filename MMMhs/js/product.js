
    //获取ID数据
    var data = getData(dataStr);
    //console.log(data);
    //产品描述数据获取和模板渲染
    var proDisc = $(".proDisc");
    var comments = $(".comments");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getmoneyctrlproduct",
        data:{
            productid :data.productid
        },
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplProDisc",data);
            //console.log(tplStr);
            proDisc.append(tplStr);
            var ulListStr = data.result[0].productCity;
            proDisc.append(ulListStr);
            var productComment = data.result[0].productComment;
            comments.append(productComment);
        }
    })