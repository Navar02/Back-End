// Incluimos los modulos necesarios
const express = require('express');

// Iniciamos express
const app = express();
const fs =require("fs")
const path = require("path")
// Definimos el puerto predefinido
// así puedes cambiar el puerto desde las variables de entorno (si no, le asigna el 3000)
const PORT = process.env.PORT || 3000;


/* MIDDLEWARE */
// Aceptar datos en formato JSON
app.use(express.json());

// Aceptar datos en formato x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// enable json
app.use(express.json());

// Definimos nuestra carpeta publica como estatica
app.use(express.static('public'));


// Redireccionamos a la pagina principal
app.get('/', (req, res) => {
    // J:  sobra el return que tenías
    res.redirect('/form')
})

// Definimos la ruta principal
app.get('/form', (req, res) => {
    res.redirect('/form.html')
})

app.get("/")
// Los datos recibidos están en el body
app.post('/form.html', (req, res) => {
    const input = req.body;
    console.log(req.body)
    let dirName=path.join(__dirname,'/public')
    const rutaDel = path.join(dirName, "sata.txt");
    fs.writeFileSync(rutaDel,JSON.stringify(input))
})

// Iniciamos el servidor
app.listen(PORT, () => {
    console.log('Servidor iniciado en el puerto', PORT);
})
