const jwt=require("jsonwebtoken");
const llave=require("./configs/configs");
const express=require("express");

const app=express();
console.log(llave.clave);

function generarClave(palabra:string){
    const clave=jwt.sign({foo:'bar'},palabra);
    return clave;
}

console.log(generarClave(llave.clave));

const rutaSegura=express.Router();
rutaSegura.use((req:any,res:any,next:any)=>{
    const token=req.headers["access-token"];
    
    console.log(token);

    jwt.verify(token, llave.clave, (err:any, decoded:any)=> {
        if(err){
            return res.json("Token invalida");
        }else{
            req.decoded=decoded;
            req.authenticated=true;
            next();
        }
    });



});

const configuracion={
    port:3360,
    hostname:"127.0.0.1"
}

app.get('/',rutaSegura,(req:any, res:any)=>{
     res.json("Hola Mundo");
});

app.listen(configuracion,()=>{
      console.log(`empezando servidor ${configuracion.hostname} en el puerto ${configuracion.port}`)
});