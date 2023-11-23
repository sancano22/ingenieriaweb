"use strict";
var express = require("express");
var app = express();
var Captcha = require('node-captcha-generator');
var bodyParser = require('body-parser');
var cors = require("cors");
//el archivo debe llamarse .env para variables de entorno
require('dotenv').config();
//para encriptar password en la DB
var cripto = require("crypto-js");
var AES = require("crypto-js/aes");
var Configuracion = {
    server: process.env.SERVER,
    port: process.env.PORT
};
//para conectar front-end y backend.
app.use(cors());
app.get('', function (req, res) {
    res.send("prueba");
});
app.get('/captcha', function (req, res) {
    var c = new Captcha({
        length: 5,
        size: {
            width: 450,
            height: 200
        }
    });
    res.send({ "resultado": c.value });
});
//password encriptado
app.post('/registrarse', bodyParser.json(), function (req, res) {
    var password = req.body.password;
    var hash = cripto.AES.encrypt(JSON.stringify(password), "1234").toString();
    //este se guarda a la base de datos 
    //console.log(hash);
    res.send({ "password encriptado": hash });
});
//password desencriptado
app.post('/sesion', bodyParser.json(), function (req, res) {
    var passwordEncriptado = req.body.password;
    var desencriptadoPWD = cripto.AES.decrypt(passwordEncriptado, process.env.SECRET);
    //este se guarda a la base de datos 
    console.log(passwordEncriptado);
    console.log(desencriptadoPWD);
    res.send({ "password desencriptado": desencriptadoPWD.toString(cripto.enc.Utf8) });
});
//servidor
app.listen(Configuracion, function () {
    console.log("Servidor empezando en puerto " + Configuracion.port);
});
