$(function() {
  var currentPage = 1;
  var pageSize = 5;
  rander();
  // 渲染页面函数
  function rander() {
    $.ajax({
      type: "get",
      url: "/category/querySecondCategoryPaging",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(res) {
        // console.log(res);
        var str = template("tmp", res);
        $(".all-render").html(str);
        // 分页渲染
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
//   添加分类
  $('#addCategroy').on('click',function() {
    $('#add-cotagroy').modal("show");
    $.ajax({
        type : "get",
        url : "/category/querySecondCategoryPaging",
        data : {
            page : 1,
            pageSize : 100
        },
        dataType : "json",
        success : function( res ) {
            var str = template('addtmp',res);
            $(".dropdown-menu").html(str);
        }
    })
  })
// 选择一级分类,并在button上展示
  $('.dropdown-menu').on('click',".click",function() {
    var text = $(this).text();
    $('.select').text(text);
    var id = $(this).data('id');
    $('#addId').val(id);
    $('#form').data('bootstrapValidator').updateStatus('categoryId','VALID');
  })
//   图片上传,本地展示
  $('#file').fileupload({
      dataType : "json",
      done : function(e,data) {
        var src = data.result.picAddr;
        //   console.log(src)
        $('#show-img').attr('src',src);
        $('#brandLogo').val(src);
        $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
  })

//   验证表单
  $('#form').bootstrapValidator({
      //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok',
      invalid: 'glyphicon glyphicon-remove',
      validating: 'glyphicon glyphicon-refresh'
    },
      fields : {
        categoryId : {
          validators : {
            notEmpty : {
              message : "请选择一级分类"
            }
          }
        },
        brandName : {
          validators : {
            notEmpty : {
              message : "请输入二级分类名称"
            }
          }
        },
        brandLogo : {
          validators : {
            notEmpty : {
              message : "请添加图片"
            }
          }
        }
      }
  })
  // 表单验证成功后,阻止默认提交,使用ajax发送请求
  $('#form').on('success.form.bv',function( e ) {
    e.preventDefault();
    $.ajax({
      type : "post",
      url : "/category/addSecondCategory",
      data : $('#form').serialize(),
      dataType : 'json',
      success : function(res) {
        // console.log(res);
        if(res.success) {
          $('#form').data('bootstrapValidator').resetForm(true);
          $('.select').text("请选择一级分类");
          $('#show-img').attr('src','images/none.png');
          $('#add-cotagroy').modal("hide");
          currentPage = 1;
          rander();
        }
      }
    })
  })
});
