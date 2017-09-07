
    //最新优惠产品请求数据和渲染
    var products = $(".products");
    var currentPage = 1;
    var page = null;
     $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getmoneyctrl",
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplProducts",data);
            //console.log(tplStr);
            products.html(tplStr);
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
                render(this.value);
                currentPage = this.value;
                document.body.scrollTop = 0;
                $("#selector").val(currentPage);
            })
        }
    })
    //下一页功能
    var next = $(".paging .next");
    next.on("click",function(){
        currentPage++;
        console.log(currentPage);
        if(currentPage > page){
            currentPage = page;
            return;
        }
        $("#selector").val(currentPage);
        render(currentPage); 
        document.body.scrollTop = 0;
    })
    // 上一页功能
    var last = $(".paging .last");
    last.on("click",function(){
        currentPage--;
        console.log(currentPage);
        if(currentPage < 1){
            currentPage = 1;
            return; 
        }
        $("#selector").val(currentPage );       
        render(currentPage); 
        document.body.scrollTop = 0;
    })



    //获取当前页的产品数据
    function render(currentPage){
        $.ajax({
            type:"GET",
            url:"http://127.0.0.1:9090/api/getmoneyctrl",
            data:{
                pageid:currentPage || 1
            },
            dataType:"json",
            success:function(data){
                //console.log(data);
                var tplStr = template("tplProducts",data);
                //console.log(tplStr);
                products.html(tplStr);
            }
        })
    }