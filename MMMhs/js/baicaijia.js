//导航栏滑动功能(isScroll插件实现)
var myScroll;
function loaded() {
    myScroll = new IScroll("#wrapper",{ eventPassthrough: true, scrollX: true, scrollY: false, preventDefault: false });
}
var width = 0;

//获取产品数据和渲染模板
var products = $(".products");
render(0);

//获取导航栏的数据并渲染模板
var navUl = $(".nav ul");
$.ajax({
    type:"GET",
    url:"http://127.0.0.1:9090/api/getbaicaijiatitle",
    dataType:"json",
    success:function(data){
        //console.log(data);
        var tplStr = template("tplNav",data);
        //console.log(tplStr);
        navUl.html(tplStr);
        //动态获取ul的宽
        var ulList = $(".nav ul li");
        ulList.eq(0).children("a").addClass("current")
        var ulWidth = 0;
        ulList.each(function(i,v){
            ulWidth += $(v).width() + 40;
            $(v).click(function(){
                $(this).children("a").addClass("current");
                $(this).siblings("li").children("a").removeClass("current");
                var titleid = $(this).children("a").attr("titleid");
                render(titleid);
            })
        });
        //给ul赋值宽
        navUl.width(Math.ceil(ulWidth));
        loaded();
    },
    error:function(){
        //console.log("请求失败!");
    }
})
//获取数据和渲染模板功能函数
function render(id){
    $.ajax({
        type:"GET",
        url:"http://127.0.0.1:9090/api/getbaicaijiaproduct",
        dataType:"json",
        data:{
            titleid:id || 0
        },
        success:function(data){
            //console.log(data);
            var tplStr = template("tplProducts",data);
            //console.log(tplStr);
            products.html(tplStr);
        },
        error:function(){
            console.log("请求失败!");
        }
    })
}
