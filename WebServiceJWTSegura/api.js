"use strict";
var jwt = require("jsonwebtoken");
var llave = require("./configs/configs");
var express = require("express");
var app = express();
console.log(llave.clave);
function generarClave(palabra) {
    var clave = jwt.sign({ foo: 'bar' }, palabra);
    return clave;
}
console.log(generarClave(llave.clave));
var rutaSegura = express.Router();
rutaSegura.use(function (req, res, next) {
    var token = req.headers["access-token"];
    console.log(token);
    jwt.verify(token, llave.clave, function (err, decoded) {
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
var configuracion = {
    port: 3360,
    hostname: "127.0.0.1"
};
app.get('/', rutaSegura, function (req, res) {
    res.json("Hola Mundo");
});
app.listen(configuracion, function () {
    console.log("empezando servidor " + configuracion.hostname + " en el puerto " + configuracion.port);
});
