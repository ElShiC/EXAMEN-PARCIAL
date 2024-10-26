import express from "express";
import { router } from "./main.route.js";
import path from 'node:path'
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


const PUERTO = 3000;
const app = express();

app.use(express.static(path.join(__dirname, 'src', 'public')));
app.use(express.urlencoded({ extended: true }));
app.use(express.json())
app.use('/', router)
app.listen(PUERTO, () => {
    console.log(`Servidor escuchando en http://localhost:${PUERTO}`);
});
