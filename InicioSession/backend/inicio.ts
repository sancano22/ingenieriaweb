const express=require("express");
const mysql=require('mysql');
const jwt=require("jsonwebtoken");

const token=require("./config/config");

const app=express();
const bodyParser = require('body-parser');
const cors=require("cors");
const Configuracion={
    server:"127.0.0.1",
    port : 3054
};

//configuracion de la conexión
let connection = mysql.createConnection({
   host     : 'localhost',
   user     : 'tiquete',
   port     :  3306,
   password : '1234',
   database : 'Tiquetes'
 });

 connection.connect(function(error:any){
      if(error){
        console.log("no se logro conectar")
        return;
      }
      console.log('conectado a mysql');
      //aqui debemos colocar lo demás 
 });

app.use(bodyParser.urlencoded({ extended: false }))
//app.use(bodyParser.json())
app.use(cors());
 //métodos CRUD=Create ==post, Read==get, Update==put, Delete==delete

app.get('/',(req:any,res:any)=>{
    res.send("hola mundo");
});

//rutasegura
const rutaSegura=express.Router();
rutaSegura.use((req:any,res:any,next:any)=>{

    const tokens=req.headers["access-token"];
    console.log(tokens);

    jwt.verify(tokens, token.token, (err:any, decoded:any)=> {
        if(err){
            return res.json("Token invalida");
        }else{
            req.decoded=decoded;
            req.authenticated=true;
            next();
        }
    });
});

app.get('/token',(req:any,res:any)=>{
    jwt.sign(
        {exp: Math.floor(Date.now() / 1000) + (60 * 60),
        data: 'bar'}, token.token,function(error:any,token:any){
        console.log(token);
        res.json(token);
    });
});

app.get('/login',rutaSegura,(req:any,res:any)=>{
    const usuario=req.query.usuario;
    const password=req.query.password;
    //let password=req.headers["password"];
      connection.query("SELECT id,correo_electronico FROM usuarios where correo_electronico=? and contrasena=md5(?)",[usuario,password],function(error:any,resultados:any,fields:any){
          //res.send(resultados);
          if(error){
              throw(error);
          }else{
              res.send(resultados);
          }
          
      });
      
});



app.listen(Configuracion,()=>{
    console.log(`servidor escuchando ${Configuracion.server}:${Configuracion.port}`);
});


