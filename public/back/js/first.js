$(function() {
  var currentPage = 1;
  var pageSize = 5;
  rander();
  function rander() {
    $.ajax({
      type: "get",
      url: "/category/queryTopCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      datatype: "json",
      success: function(res) {
        // console.log(res);
        var str = template("tmp", res);
        $("tbody").html(str);
        // 分页插件的使用
        $("#paginator").bootstrapPaginator({
          bootstrapMajorVersion: 3,
          currentPage: currentPage,
          totalPages: Math.ceil(res.total / res.size),
          onPageClicked: function(a, b, c, page) {
            // console.log(page)
            currentPage = page;
            rander();
          }
        });
      }
    });
  }
//   点击添加分类按钮,显示模态框
    $('#addCategory').on('click',function() {
        // alert(1)
        $('#category').modal("show");
    })
    // 点击确定按钮,进行表单验证,添加分类
    $('#form').bootstrapValidator({
        feedbackIcons: {
            valid: 'glyphicon glyphicon-ok',
            invalid: 'glyphicon glyphicon-remove',
            validating: 'glyphicon glyphicon-refresh'
          },
        fields : {
            categoryName : {
                validators : {
                    notEmpty : {
                        message : "分类名不能为空"
                    }
                }
            }
        }
    })
    $("#form").on("success.form.bv",function( e ) {
        e.preventDefault();
        $.ajax({
            type : "post",
            url : "/category/addTopCategory",
            data : $('#form').serialize(),
            dataType : "json",
            success : function( res ) {
                // console.log(res)
                $('#category').modal("hide");
                currentPage = 1;
                rander();
            }
        })
    })
});
