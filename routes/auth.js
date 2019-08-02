const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')//Шифрует пароли

const models = require('../models')


router.post('/register', (req, res) => {

    //Берем данные из authData.js
    const login = req.body.login;
    const password = req.body.password;
    const repassword = req.body.repassword;

    //Проверяем пол регистрации
    if(!login || !password || !repassword){ //Какое-либо поле пустое
        res.json ({
            ok:false,
            error: 'Все поля должны быть заполнены',
            fields:['login','password','repassword']
        });
    } else if(password !== repassword){ //Пароли не совпадают
        res.json({
            ok:false,
            error:'Пароли не совпадают',
            fields:['password', 'repassword']
        })
    } else {
        bcrypt.hash(password, null, null, (err, hash) => {
            models.User.create({
                login,
                password: hash
            }).then(user => {
                console.log(user);
                res.json({
                    ok:true
                })
            })
        })
    }

});

module.exports = router