$('.reg-btn').on('click', function (e) {
    e.preventDefault(); //При нажатии не отправлять запрос

    var data = {
        login:$('#login-reg').val(),
        password:$('#pas-reg').val(),
        repassword:$('#repas-reg').val()
    };
    // fetch('/register',{
    //      method:'POST',
    //      headers: {
    //          'Content-Type': 'application/json' //Тип передаваемого контента
    //      },
    //      body: JSON.stringify(data),//Тип данных в data дожен соответствовать json
    //  }).then(data => console.log(data));

    $.ajax({
        type: 'POST',
        data: JSON.stringify(data),
        contentType: 'application/json',
        url: '/register'
    }).done(data => console.log(data))
});
