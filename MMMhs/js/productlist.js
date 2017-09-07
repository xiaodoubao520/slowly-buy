    //获取ID数据
    var data = getData(dataStr);
    //三级菜单数据请求和模板渲染
    var threeMenu = $(".threeMenu");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getcategorybyid",
        dataType:"json",
        data:{
            categoryid:data.categoryid
        },
        success:function(data){
            //console.log(data);
            var tpl = template("tplMenu",data);
            threeMenu.append(tpl);
            //console.log(tpl);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
    //产品列表数据请求和模板渲染
    var products = $(".products");
    var page = null;
    var currentPage = 1;
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getproductlist",
        dataType:"json",
        data:{
            categoryid:data.categoryid
        },
        success:function(data){
            //console.log(data);
            var tpl = template("tplProducts",data);
            products.html(tpl);
            var pagesize = data.pagesize;
            var totalCount = data.totalCount;
            page = Math.ceil(totalCount/pagesize);
            // console.log(page);
            var selector = $("#selector");
            //动态获取option并添加到页面;
            for(var i = 1;i <= page;i++){
                var option = document.createElement("option");
                option.value = i;
                option.innerHTML = i + "/" + page;
                selector.append(option);            
            }
            var options = selector.children();
            selector.on("change",function(){
                render($(this).val());
                console.log($(this).val())
                currentPage = $(this).val();
                $("#selector").val(currentPage);
                document.body.scrollTop = 0;
            })

        },
        error:function(){
            console.log("请求失败!");
        }
    })
    //下一页功能
    var next = $(".paging .next");
    next.on("click",function(){
        currentPage++;
        if(currentPage > page){
            currentPage = page;
            return;
        }
        $("#selector").val(currentPage);
        document.body.scrollTop = 0;
    })
    // 上一页功能
    var last = $(".paging .last");
    last.on("click",function(){
        currentPage--;
        if(currentPage < 1){
            currentPage = 1;
            return; 
        }
        $("#selector").val(currentPage);
        document.body.scrollTop = 0;
    })


    //获取当前页的产品数据
    function render(currentPage){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:9090/api/getproductlist",
            dataType:"json",
            data:{
                categoryid:data.categoryid,
                pageid : currentPage || 1
            },
            success:function(data){
                var tpl = template("tplProducts",data);
                products.html(tpl);

            },
            error:function(){
                console.log("请求失败!");
            }
        })
    }
