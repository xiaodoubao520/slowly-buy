
    //获取标题
    var category = $(".category");
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getcategorytitle",
        dataType:"json",
        success:function(data){
            //console.log(data);
            var tplStr = template("tplHeader",data);
            category.html(tplStr);
        },
        complete:function(){
            var items = $(".category-title");
            //console.log(items);
            for(var i = 0;i < items.length;i++){
                //console.log(items.eq(i).attr("titleid"));
                //获取分类菜单
                (function (i){
                    $.ajax({
                        type:"GET",
                        url:"http://127.0.0.1:9090/api/getcategory",
                        dataType:"json",
                        data:{
                            titleid:items.eq(i).attr("titleid")
                        },
                        success:function(data){
                            console.log(data);
                            // console.log(i);
                            // console.log(items.eq(i).titleid);
                            var tplStr = template("tplItem",data);
                            //console.log(tplStr);
                            items.eq(i).after(tplStr);
                            
                        },
                        complete:function(){
                            if(i >= items.length - 1){
                                //console.log(1);
                                var itemList = $(".items");
                                items.each(function(i,e){                                    
                                    // console.log(i);
                                    e.index = i;
                                    $(this).on("click",function(){
                                        itemList.eq(this.index).toggleClass("hide");
                                                                              
                                    })
                                })
                            }
                        },
                        error:function(){
                            console.log("请求失败!");
                        }
                    })
                }(i));
            }
        },
        error:function(){
            console.log("请求失败!");
        }
    })
