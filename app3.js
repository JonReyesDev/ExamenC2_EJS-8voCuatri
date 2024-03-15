import express from 'express';
import http  from 'http';
import { fileURLToPath } from 'url';
import json from 'body-parser';
import path from 'path';
import misrutas from './router/index.js';

const puerto = 80;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Declarar la variable punto de inicio

const main = express();

// Declarar primer ruta por omision
main.set("view engine","ejs")
main.set(express.static(__dirname+'/public'));
main.use(json.urlencoded({extended:true}));
main.use(misrutas.router);

main.listen(puerto, ()=>{
    console.log("Se inicio el servidor por el puerto: " + puerto)
})