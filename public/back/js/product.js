// 获取数据渲染页面
$(function() {
  var currentPage = 1;
  var pageSize = 2;
  rander();
  function rander() {
    $.ajax({
      type: "get",
      url: "/product/queryProductDetailList",
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: "json",
      success: function(res) {
        // console.log(res);
        var htmlStr = template("tmp", res);
        $(".all-render").html(htmlStr);
        // 分页插件的分页渲染
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
  //   点击添加分类按钮,显示模态框
  $("#addCategroy").on("click", function() {
    //   alert(11)
    $("#add-cotagroy").modal("show");
    $.ajax({
        type : "get",
        url : "/category/querySecondCategoryPaging",
        data : {
            page : 1,
            pageSize : 100
        },
        dataType : "json",
        success : function( res ) {
            // console.log(res)
            var htmlStr = template('addtmp',res);
            $('.dropdown-menu').html(htmlStr);
        }
    })
  });
  // 给每个二级分类添加点击事件
  $('.dropdown-menu').on('click','.click',function() {
    // alert(1)
    var txt = $(this).text();
    $('.select').text(txt);
    var id = $(this).data('id');
    $('#brandId').val(id);
    $('#form').data('bootstrapValidator').updateStatus('brandId','VALID');
  })

  //   上传图片的本地预览
  var picArr = [];
  $("#file").fileupload({
    datatype: "json",
    done: function(e, data) {
      // console.log(data);
      var path = data.result;
      picArr.unshift(path);
      var src = picArr[0].picAddr;
      // console.log(src)
      if (picArr.length > 3) {
        picArr.pop();
        $("#imgbox img")
          .eq(picArr.length - 1)
          .remove();
        }
        if (picArr.length === 3) {
          $('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');
      }
      $("#imgbox").prepend(
        '<img src=" ' + src + '" alt="" width="80" id="show-img">'
      );
    }
  });

  // 利用表单验证插件,验证表单
  $("#form").bootstrapValidator({
    //1. 指定不校验的类型，默认为[':disabled', ':hidden', ':not(:visible)'],可以不设置
    excluded: [],
    //2. 指定校验时的图标显示，默认是bootstrap风格
    feedbackIcons: {
      valid: "glyphicon glyphicon-ok",
      invalid: "glyphicon glyphicon-remove",
      validating: "glyphicon glyphicon-refresh"
    },
    fields: {
      brandId: {
        validators: {
          notEmpty: {
            message: "请选择二级分类"
          }
        }
      },
      proName: {
        validators: {
          notEmpty: {
            message: "请输入商品名称"
          }
        }
      },
      proDesc: {
        validators: {
          notEmpty: {
            message: "请输入商品描述"
          }
        }
      },
      num: {
        validators: {
          notEmpty: {
            message: "请输入商品库存"
          },
          regexp: {
            regexp: /^[1-9]\d*$/,
            message: "商品库存格式, 必须是非零开头的数字"
          }
        }
      },
      size: {
        validators: {
          notEmpty: {
            message: "请输入商品尺码"
          },
          regexp: {
            regexp: /^\d{2}-\d{2}$/,
            message: "尺码格式, 必须是 xx-xx"
          }
        }
      },
      oldPrice: {
        validators: {
          notEmpty: {
            message: "请输入商品原价"
          }
        }
      },
      price: {
        validators: {
          notEmpty: {
            message: "请输入商品现价"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择三张图片"
          }
        }
      }
    }
  });
  $('#form').on('success.form.bv',function( e ) {
    e.preventDefault();
    var data =  $('#form').serialize();
    data += '&picArr=' + JSON.stringify(picArr); 
    // console.log(data);
    $.ajax({
        type : 'post',
        url : "/product/addProduct",
        data : data,
        dataType : 'json',
        success : function( res ) {
          // console.log(res);
          if (res.success) {
            $('#form').data('bootstrapValidator').resetForm(true);
            $('.select').text('请选择二级分类');
            $('#imgbox img').remove();
            $('#add-cotagroy').modal('hide');
            currentPage = 1;
            rander();

          }
        } 
    })
  })
});


// brandId=16
// &proName=%E9%BB%91%E9%A9%AC
// &proDesc=%E4%B8%8A%E6%B5%B7%E7%94%9F%E4%BA%A7
// &num=123
// &size=30-40
// &oldPrice=25
// 5&price=200&brandLogo=
