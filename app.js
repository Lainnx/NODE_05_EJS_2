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
// (para indicar donde estan las plantillas y que el render sepa donde tiene que buscar)
app.set("views", path.join(__dirname, "views"))

// Cargar los datos
const jsonData = require("./data/travels.json")
jsonData.forEach(travel => {    /*Ira iterando sobre los objetos del array en el json, travel es cada objeto */
    // Rutas
    app.get(`${travel.ruta}`,(req,res)=>{   /*app.get generara rutas automaticamente con la informacion del json */
        res.render("travels",{  /*le mandamos la informacion para renderizar a la plantilla travels */
            "lugar": `${travel.lugar}`,
            "nombre": `${travel.nombre}`,
            "descripcion": `${travel.descripcion}`,
            "precio": `${travel.precio}`,
            "img": `${travel.img}`,
            "id": `${travel.id}`,
            "travels": jsonData /*si se llama igual clave y valor son iguales, en este caso jsonData, aqui podriamos poner solo jsonData y funcionaría*/
        })
    })
})
// Ruta de administrador
app.get("/admin", (req,res)=>{
    res.render("admin", {jsonData}) /* le mandamos a la plantilla admin el jsonData entero*/
})

app.post("/insert", (req, res) => {
    // console.log(req.body);
    let newTravel = req.body
    if (newTravel.ruta[0] != "/") {
        newTravel.ruta = "/"+newTravel.ruta
    }    
    newTravel.precio = parseFloat(newTravel.precio)
    newTravel.id = crypto.randomUUID()
    jsonData.push(newTravel)
    // console.log(jsonData);
    fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(jsonData, null, 2), "utf-8")
    res.redirect("/admin")

})

app.delete("/delete/:id", (req, res) => {
  const idDelete = req.params.id
  // console.log("El id es", idDelete);
  const newJsonData = jsonData.filter(travel => travel.id != idDelete)
  // jsonData = newJsonData
  // console.log(newJsonData);
 fs.writeFileSync(path.join(__dirname, "data", "travels.json"), JSON.stringify(newJsonData, null, 2), "utf-8")
    jsonData.length = 0
    newJsonData.forEach( travel => {
      jsonData.push(travel)
    })
    res.json({"mensaje": "elemento borrado correctamente"})

  // setTimeout(() => res.json({"mensaje": "elemento borrado correctamente"}), 200)

})

app.listen(PORT,(req,res)=>{ /*ESTO Tiene que ir abajo del todo, así se carga en cada ruta, sino habría que poner esto a.b despues de cada ruta(get) */
    console.log(`Servidor iniciado en: http://localhost:${PORT}`);
})