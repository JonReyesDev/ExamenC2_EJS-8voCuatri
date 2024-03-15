import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

import router from './router/index.js';

const puerto = 80; 
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({ extended: true }));

app.use(router);

app.listen(puerto, () => {
  console.log(`Servidor corriendo en http://localhost:${puerto}`);
});

