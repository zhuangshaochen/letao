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