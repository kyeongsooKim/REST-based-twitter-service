$(function () {

    $(document).on('click', '#addusersubmit', function (e) {
        e.preventDefault(); //to prevent from refreshing the page

        var newUser = {
            'username': $("#username").val(),
            'email': $("#email").val(),
            'password': $("#password").val()
        }

        
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/adduser',
            dataType: 'JSON',
            success: function (data) {
                $(location).attr('href', '/');
            },
            error: function (data) {
                console.log(data);
            }
        });
        
    })

    $(document).on('click', '#loginsubmit', function (e) {
        e.preventDefault(); //to prevent from refreshing the page

        var newUser = {
            'username': $("#username").val(),
            'password': $("#password").val()
        }

        
        $.ajax({
            type: 'POST',
            data: newUser,
            url: '/login',
            dataType: 'JSON',
            success: function (data) {
                if (data.status == 'error')
                    $(location).attr('href', '/login');
                else
                    $(location).attr('href', '/login');
            },
            error: function (data) {
                $(location).attr('href', '/login');
            }
        });
        
    })

    
})
