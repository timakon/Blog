$('#pas-btn').on('click', function (e) {
    e.preventDefault();

    var data ={
        login:$('#login-pas').val(),
        password:$('#pas-pas').val()
    }

    fetch('/entrance', {
        method:'POST',
        headers:{
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
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

})