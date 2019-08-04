$('.reg-btn').on('click', function (e) {
    e.preventDefault(); //При нажатии не отправлять запрос

    var data = {
        login:$('#login-reg').val(),
        password:$('#pas-reg').val(),
        repassword:$('#repas-reg').val()
    };
    fetch('/register',{
         method:'POST',
         headers: {
             'Content-Type': 'application/json' //Тип передаваемого контента
         },
         body: JSON.stringify(data),//Тип данных в data дожен соответствовать json
     })
        .then(response => response.json())
        .then(data => {
            console.log(data);
            if(!data.ok){
                alert(data.error)
            } else {
                location.href = '/'
            }
        })
});
