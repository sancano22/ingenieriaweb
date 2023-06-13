"use strict";
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
//mysql
var mysql = require("mysql");
var connection = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    port: 3306,
    database: 'Educacion'
});
connection.connect(function (err) {
    if (err) {
        console.error('Error conectando a la DB ' + err.stack);
        return;
    }
    console.log('Conexión establecida' + connection.threadId);
});
// create application/json parser
var jsonParser = bodyParser.json();
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false });
var configuracion = {
    hostname: "127.0.0.1",
    port: 3000,
};
//CRUD: Create (post), Read (get), Update (put, path), Delete (delete)
app.get('/Usuarios', function (req, res) {
    connection.query("select * from usuarios", function (error, results, fields) {
        res.send(JSON.stringify(results));
    });
    //res.send(JSON.stringify(Usuarios));
});
app.get('/Usuarios/:id', function (req, res) {
    var id = req.params.id;
    connection.query("select * from usuarios where id=?", id, function (error, results, fields) {
        res.send(JSON.stringify(results));
    });
});
app.post('/CrearUsuarios', jsonParser, function (req, res) {
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    var estado = req.body.estado;
    connection.query("insert into usuarios(usuario,clave,estado) values(?,?,?)", [usuario, clave, estado], function (error, results, fields) {
        res.send(JSON.stringify(results.insertId));
    });
});
app.put('/Actualizar/:id', jsonParser, function (req, res) {
    var id = req.params.id;
    var usuario = req.body.usuario;
    var clave = req.body.clave;
    var correo = req.body.correo;
    console.log("Usuario " + usuario + " con la clave " + clave + " y correo " + correo + " y id " + id + " han sido modificados");
    res.send("datos modificados");
});
app.delete('/Eliminar/:id', function (req, res) {
    var id = req.params.id;
    res.status(200).send("se elimino el dato " + id);
});
app.listen(configuracion, function () {
    console.log("Conectando al servidor http://localhost:" + configuracion.port);
});
