//Dependencias del proyecto
//npm i express ejs
// IMPORTANTE .gitignore
const fs = require("node:fs")
const path = require("node:path")
const express = require("express") // <-sintaxis commonjs
const app = express()

//Puerto de conexion
process.loadEnvFile();// PARA CARGAR EL .ENV
const PORT = process.env.PORT || 8888;

// MIDDLEWARE 
// 1(le decimos donde esta la carpeta public, la carpeta de recursos publicos)
app.use(express.static(path.join(__dirname, "public")))
// 2(para indicar cual es el motor de las plantillas)
app.set("view engine", "EJS")
// (para indicar donde estan las plantillas)
app.set("views", path.join(__dirname, "views"))

// Rutas
app.get("/",(req,res)=>{
    res.render("travels")
})



app.listen(PORT,(req,res)=>{ /*ESTO Tiene que ir abajo del todo, así se carga en cada ruta, sino habría que poner esto a.b despues de cada ruta(get) */
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
})