const express = require('express')
const app = express();
const bodyParser = require('body-parser');

//mysql
const mysql=require("mysql");
const connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : '',
    port:  3306,
    database : 'Educacion'
  });
  connection.connect(function(err:any) {
    if (err) {
      console.error('Error conectando a la DB ' + err.stack);
      return;
    }
   
    console.log('Conexión establecida' + connection.threadId);
  });


// create application/json parser
var jsonParser = bodyParser.json()
 
// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const configuracion={
    hostname: "127.0.0.1",
    port: 3000,
}
//CRUD: Create (post), Read (get), Update (put, path), Delete (delete)

app.get('/Usuarios', (req:any, res:any) => {
    connection.query("select * from usuarios",function(error:any,results:any,fields:any){
        res.send(JSON.stringify(results));
    }); 

    //res.send(JSON.stringify(Usuarios));
})

app.get('/Usuarios/:id', (req:any, res:any) => {
    let id=req.params.id;
    connection.query("select * from usuarios where id=?",id,function(error:any,results:any,fields:any){
        res.send(JSON.stringify(results));
    });
});

app.post('/CrearUsuarios',jsonParser,(req:any,res:any)=>{
    let usuario=req.body.usuario;
    let clave=req.body.clave;
    let estado=req.body.estado;
    connection.query("insert into usuarios(usuario,clave,estado) values(?,?,?)",[usuario,clave,estado],function(error:any,results:any,fields:any){
        res.send(JSON.stringify(results.insertId));
    });
});

app.put('/Actualizar/:id',jsonParser, (req:any, res:any)=>{
    let id=req.params.id;
    let usuario=req.body.usuario;
    let clave=req.body.clave;
    let correo=req.body.correo;

    console.log(`Usuario ${usuario} con la clave ${clave} y correo ${correo} y id ${id} han sido modificados`);
    res.send("datos modificados");

});

app.delete('/Eliminar/:id',(req:any,res:any)=>{
  let id=req.params.id;
  res.status(200).send(`se elimino el dato ${id}`);
});


app.listen(configuracion, () => {
  console.log(`Conectando al servidor http://localhost:${configuracion.port}`)
})