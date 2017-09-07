    //获取ID数据
    var data = getData(dataStr);
    //console.log(data);
    //产品展示数据请求和模板渲染
    var showPro = $(".showPro");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getproduct",
        dataType:"json",
        data:{
            productid :data.productid
        },
        success:function(data){
            console.log(data);
            var tpl = template("tplShowPro",data);
            showPro.append(tpl);
            //console.log(tpl);
            //console.log(data.result[0].categoryId);
            //三级菜单数据请求和模板渲染
            var threeMenu = $(".threeMenu");
            var productName = data.result[0].productName;
            productName = productName.split(" ")[0];
            $.ajax({
                type:"GET",
                url:"http://127.0.0.1:9090/api/getcategorybyid",
                dataType:"json",
                data:{
                    categoryid:data.result[0].categoryId
                },
                success:function(data){
                    //console.log(data);
                    var tpl = template("tplMenu",data);
                    threeMenu.append(tpl);
                    //console.log(tpl);
                    var a = document.createElement("a");
                    a.href = "javascript:;";
                    a.innerHTML =  productName + "＞";
                    threeMenu.append(a);
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
    //网友评价数据请求和模板渲染
    var items = $(".appraise .items");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getproductcom",
        dataType:"json",
        data:{
            productid :data.productid
        },
        success:function(data){
            //console.log(data);
            var tpl = template("tplAppraise",data);
            items.append(tpl);
            //console.log(tpl);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
