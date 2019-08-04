const express = require('express');
const router = express.Router();
const bcrypt = require('bcrypt-nodejs')//Шифрует пароли

const models = require('../models')


router.post('/register', (req, res) => {

    //Берем данные из RegisretData.js
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
        models.User.findOne({
            login
        }).then(user => {
            if(!user){
                bcrypt.hash(password, null, null, (err, hash) => {
                    models.User.create({
                        login,
                        password: hash
                    }).then(user => {
                        req.session.userID = user.id;
                        req.session.userLogin = user.login;
                        res.json({
                            ok:true
                        });
                    })
                })
            } else {
                res.json({
                    ok:false,
                    error: 'Имя занято'
                })
            }
        })
    }
});

router.post('/entrance', (req, res) => {
    //Берем из EntranceData.js
    const login = req.body.login
    const password = req.body.password

    if(!login || !password){
        res.json({
            ok:false,
            error:'Все поля должны быть заполнены',
            fields:['login','password']
        })
    } else {
        models.User.findOne({
            login
        })
            .then(user => {
                if(!user){
                    res.json({
                        ok:false,
                        error:"Логин или пароль не верны",
                        fields:['login']
                    })
                } else {
                    bcrypt.compare(password, user.password,(err, result) =>{
                        if(!result){
                            res.json({
                                ok:false,
                                error:"Логин или пароль не верны",
                                fields:['login']
                            })
                        } else{
                            req.session.userID = user.id;
                            req.session.userLogin = user.login;
                            res.json({
                                ok:true
                            })
                        }
                    })
                }
            })
    }
});

router.get('/logout', (req, res) =>{
    if(req.session){
        req.session.destroy(() => {
            res.redirect('/lorem');
        });
    } else {
        res.redirect('/lorem');
    }
});

module.exports = router