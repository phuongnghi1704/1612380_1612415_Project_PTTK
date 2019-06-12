$("input[id='username']").on('blur', () => {
    const inputUsername = $('input[id="username"]').val();
    const body = $('#registerBody');
    if (inputUsername == '')
    {
        return;
    }
    $.ajax({
        url:'/register/checkUsername',
        type:'POST',
        data: {
            'username' : inputUsername
        },
        success: (res) => {
            if (res.isAvailable == false) {
                body.find('#message').css('visibility', 'visible');
                body.find('#messageText').text('Tên tài khoản đã tồn tại.');
            }
            else
            {
                body.find('#message').css('visibility', 'hidden');
            }
        }
    })
});

function checkPassword()
{
    var inputPassword = document.forms["registerForm"]["inputPassword"].value;
    var confirmPassword = document.forms["registerForm"]["confirmPassword"].value;
    if(inputPassword != '' && confirmPassword != '') {
        if (inputPassword != confirmPassword) {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-danger";
            document.getElementById('messageText').innerText = 'Mật khẩu nhập lại không trùng khớp';
            document.getElementById('commitRegister').disabled = true;
        } else {
            document.getElementById('message').style.visibility = "visible";
            document.getElementById('message').className = "alert alert-success";
            document.getElementById('messageText').innerText = 'Mật khẩu hợp lệ';
            document.getElementById('commitRegister').disabled = false;
        }
    }
}

$.fn.exists = function () {
    return this.length !== 0;
};
