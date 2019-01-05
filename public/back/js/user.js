$(function() {
  var currentPage = 1;
  var pageSize = 5;
  rander();
  // 获取数据渲染页面
  function rander() {
    $.ajax({
      type: "get",
      url: "/user/queryUser",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(res) {
        // console.log(res);
        var str = template("tmp", res);
        $("tbody").html(str);
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function(a, b, c, page) {
            currentPage = page;
            rander();
          }
        });
      }
    });
  }


//   点击按钮改变用户状态
  $('tbody').on('click',"#change-status",function() {
    //   alert(1)
    var id = $(this).parent().data("id");
    var isDelete = $(this).parent().data('isdelete');
    isDelete =  isDelete === 1 ? 0 : 1;
    // console.log(id,isDelete);
    $.ajax({
        type : 'post',
        url : "/user/updateUser",
        data : {
            id : id,
            isDelete : isDelete
        },
        dataType : "json",
        success : function( res ) {
            // console.log(res);
            if (res.success) {
                rander();
            }
        }
    })
  })
});
