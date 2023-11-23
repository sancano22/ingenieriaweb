const express=require("express");
const app=express();
let Captcha = require('node-captcha-generator');
const bodyParser = require('body-parser');
const cors=require("cors");
//el archivo debe llamarse .env para variables de entorno
require('dotenv').config();

//para encriptar password en la DB
const cripto=require("crypto-js");
var AES = require("crypto-js/aes");


const Configuracion={
    server:process.env.SERVER,
    port : process.env.PORT
};
//para conectar front-end y backend.
app.use(cors());

app.get('',(req:any, res:any) => {
   res.send("prueba");
});

app.get('/captcha', (req:any, res:any) => {
    var c = new Captcha({
        length:5, // Captcha length
        size:{    // output size
            width: 450,
            height: 200
        }
    });

    res.send({"resultado":c.value});
})

//password encriptado
app.post('/registrarse',bodyParser.json(),(req:any, res:any) => {
    let password=req.body.password;
    let hash = cripto.AES.encrypt(JSON.stringify(password), "1234").toString(); 
    //este se guarda a la base de datos 
    //console.log(hash);
     res.send({"password encriptado":hash})
});

//password desencriptado
app.post('/sesion',bodyParser.json(),(req:any, res:any) => {
    let passwordEncriptado=req.body.password;
    let desencriptadoPWD=cripto.AES.decrypt(passwordEncriptado, process.env.SECRET);
    //este se guarda a la base de datos 
     console.log(passwordEncriptado);
     console.log(desencriptadoPWD);
     res.send({"password desencriptado":desencriptadoPWD.toString(cripto.enc.Utf8)})
})

//servidor
app.listen(Configuracion,() => {
    console.log(`Servidor empezando en puerto ${Configuracion.port}`)
})