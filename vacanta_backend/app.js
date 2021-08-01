// importam express
const express = require('express');
// instantiem express
const app = express();
// se creaza un router
const router = express.Router();
// definim o ruta --> ii dam o functie in catre ii spunem ce sa faca 
// in request vom avea toate info primite prin get
// prin response trimitem inapoi info...
router.get("/home" , (request , response) => {
    response.send("hy me");
});
// ii spun em app sa utilizeze routerul definit de noi
app.use("/" , router);
console.log("server started");
app.listen(6000);

