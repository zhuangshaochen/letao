
// 进度条效果
$(document).ajaxStart(function() {
    NProgress.start();
    console.log("开始")
  })

$(document).ajaxStop(function() {
    NProgress.done();
    console.log("结束")
});

// 判断是否登录
$.ajax({
    type:"get",
    url:"/employee/checkRootLogin",
    dataType:"json",
    success: function( res ) {
        // console.log(res)
        if (res.error === 400) {
            location.href = "login.html";
        }
    }
})
$(function() {
    // 点击出现下拉菜单
    $('.select').on('click',function() {
       
        $('.list').stop().slideToggle(500);
    })
    // 点击使侧边栏隐藏
    $('.hidden-aside').on('click',function() {
        $('.aside-left').toggleClass('current');
        $('.content').toggleClass('current');
        $('.content-header').toggleClass('current');
    })
    // 退出功能
    $('.page-out').on('click',function() {
        $("#myModal").modal('show');
    })
    $('.page-end').on('click',function() {
        // alert(111)
        $.ajax({
            type:"get",
            url:"/employee/employeeLogout",
            dataType:"json",
            success : function( res ) {
                // console.log(res);
                if (res.success) {
                    location.href = "login.html";
                }
            }
        })
    })   
})
