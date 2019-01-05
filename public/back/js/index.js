// 进度条效果
$(document).ajaxStart(function() {
    NProgress.start();
  })
  setTimeout(function() {
    $(document).ajaxStop(function() {
        NProgress.done();
    })
  },500)
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