"use strict";
var express = require("express");
var mysql = require('mysql');
var jwt = require("jsonwebtoken");
var token = require("./config/config");
var app = express();
var bodyParser = require('body-parser');
var cors = require("cors");
var Configuracion = {
    server: "127.0.0.1",
    port: 3054
};
//configuracion de la conexión
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'tiquete',
    port: 3306,
    password: '1234',
    database: 'Tiquetes'
});
connection.connect(function (error) {
    if (error) {
        console.log("no se logro conectar");
        return;
    }
    console.log('conectado a mysql');
    //aqui debemos colocar lo demás 
});
app.use(bodyParser.urlencoded({ extended: false }));
//app.use(bodyParser.json())
app.use(cors());
//métodos CRUD=Create ==post, Read==get, Update==put, Delete==delete
app.get('/', function (req, res) {
    res.send("hola mundo");
});
//rutasegura
var rutaSegura = express.Router();
rutaSegura.use(function (req, res, next) {
    var tokens = req.headers["access-token"];
    console.log(tokens);
    jwt.verify(tokens, token.token, function (err, decoded) {
        if (err) {
            return res.json("Token invalida");
        }
        else {
            req.decoded = decoded;
            req.authenticated = true;
            next();
        }
    });
});
app.get('/token', function (req, res) {
    jwt.sign({ exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'bar' }, token.token, function (error, token) {
        console.log(token);
        res.json(token);
    });
});
app.get('/login', rutaSegura, function (req, res) {
    var usuario = req.query.usuario;
    var password = req.query.password;
    //let password=req.headers["password"];
    connection.query("SELECT id,correo_electronico FROM usuarios where correo_electronico=? and contrasena=md5(?)", [usuario, password], function (error, resultados, fields) {
        //res.send(resultados);
        if (error) {
            throw (error);
        }
        else {
            res.send(resultados);
        }
    });
});
app.listen(Configuracion, function () {
    console.log("servidor escuchando " + Configuracion.server + ":" + Configuracion.port);
});
