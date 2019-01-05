$(document).ajaxStart(function() {
  NProgress.start();
  console.log("开始")
})
setTimeout(function() {
  $(document).ajaxStop(function() {
      NProgress.done();
      console.log("结束")
  })
},4000)
// 进行表单的校验
// 1.用户名和密码不能为空
// 2.用户名长度为2-6
// 3.密码长度为6-12

$(function() {
  $("#form").bootstrapValidator({
    feedbackIcons: {
        valid: 'glyphicon glyphicon-ok',
        invalid: 'glyphicon glyphicon-remove',
        validating: 'glyphicon glyphicon-refresh'
      },
    fields: {
      username : {
        validators : {
          notEmpty : {
            message : "用户名不能为空"
          },
          stringLength: {
            min : 2,
            max : 6,
            message : "长度需要在2-6位"
          },
          callback : {
            message : "用户名错误"
          }
        }
      },
      password : {
        validators : {
            notEmpty : {
                message : "密码不能为空"
            },
            stringLength : {
                min : 6,
                max : 12,
                message : "长度需要在6-12位"
            },
            callback : {
                message : "密码错误"
            }
        }
      }

    }
  });

//   判断用户名密码是否正确
  $('#form').on('success.form.bv',function( e ) {
      e.preventDefault();
      $.ajax({
          type : "post",
          url : "/employee/employeeLogin",
          data : $('#form').serialize(),
          datatype : "json",
          success : function ( res ) {
            if (res.success) {
                location.href = "index.html";
            }
            if (res.error === 1000 ) {
                // alert("用户名不存在");
                $('#form').data("bootstrapValidator").updateStatus("username","INVALID","callback");
            }
            if (res.error === 1001) {
                // alert('密码错误');
                $('#form').data("bootstrapValidator").updateStatus("password","INVALID","callback");
            }
          }
      })
  })

//   重置表单
  $("[type='reset']").on('click',function() {
    //   alert(11)
    $("#form").data('bootstrapValidator').resetForm();
  })
});
