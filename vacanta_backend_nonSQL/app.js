// importam express
const express = require('express');
const {queryAsync} = require('./database_query.js');
const bodyParser = require('body-parser');
const { procesare } = require('./procesare.js');

// instantiem express
const app = express();
// se creaza un router
const router = express.Router();
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
// definim o ruta --> ii dam o functie in catre ii spunem ce sa faca 
// in request vom avea toate info primite prin get
// prin response trimitem inapoi info...
router.get("/home" , (req , response) => {
    response.send("hy me");
});

router.get("/countries", async (req, response) => {
    let query_text = "SELECT * FROM countries;";
    let result = await queryAsync(query_text, []);
    response.send(result);
});
// request -->  este informatia pe care o primesti din frontEnd
router.post("/add_country", async(req, response) => {
   let query_text = "INSERT INTO countries(country_name , country_temp , country_humidity , country_type) VALUES($1,$2,$3,$4);";
   let country_name = req.query.country_name;
   let country_temp = req.query.country_temp;
   let country_humidity = req.query.country_humidity;
   let country_type = req.query.country_type;
    
   let added = false;
    try {
        let result = await queryAsync(query_text, [country_name, country_temp, country_humidity, country_type]);
        added = true;
    } catch(err) {
        added = false;
        console.log(err);
    }

    if (added) {
        response.send("OK"); 
    } else {
        response.send("Error");
    }
});
// se introduce in exact aceeasi ordine ca in BD si cu exact acelasi nume ca in BD
router.post("/add_bagaj", async(req, response) => {
    let query_text = "INSERT INTO bagaje(denumire , tip_bagaj , volum , nr_buc_necesare , durata_folosire) VALUES($1,$2,$3,$4,$5);";
    let tip_bagaj = req.query.tip_bagaj;
    let denumire = req.query.denumire;
    let volum = req.query.volum; 
    let nr_buc_necesare = req.query.nr_buc_necesare;
    let durata_folosire = req.query.durata_folosire;
     
    let added = false;
     try {
         let result = await queryAsync(query_text, [ denumire, tip_bagaj , volum, nr_buc_necesare , durata_folosire]);
         added = true;
     } catch(err) {
         added = false;
         console.log(err);
     }
 
     if (added) {
         response.send("OK"); 
     } else {
         response.send("Error");
     }
 });

// req = datele primite de la postman/frontend, sub forma de json
// req NU ESTE o functie. este un json.
// req.params este campul "params" din json-ul req.
// req.params.name este campul "name" din "params".
// :name din /detele_country/:name este un PARAMETRU
router.get("/delete_country/:name", async (req, response) => {
    // Textul pe care il vei trimite catre baza de date.
    // $1, $2, etc. reprezinta parametri
    // In structura $<numar> , numarul reprezinta al catelea parametru din vectorul de parametri dat
    // va fi pus in locul structurii.
    // Ex: params = ["abc", "def", "ghi"]. $1 = "abc", $2 = "def", $3 = "ghi".
    // queryAsync = functie de trimis date catre baza de date.
    let query_text =  "DELETE FROM countries where country_name=$1;";

    if (req.params.name) {
        let result = await queryAsync(query_text , [req.params.name]);
        //                                           ^ vector de parametri cu un singur parametru => $1
        console.log(req.params.name);
    }  
    response.send(req.params.name);
});

// Request GET cu parametrii dati in query:
// GET -> /delete_country?temp=28
router.get("/delete_country", async (req, response) => {
    let query_text = "DELETE FROM countries where country_temp=$1;";
    let medTemp = req.query.temp;

    if (req.params.name) {
        let result = await queryAsync(query_text , [medTemp]);
        //                                           ^ vector de parametri cu un singur parametru => $1
        console.log(req.params.name);
    }  
    response.send(req.params.name);
});

//*********************
// termin get 
//

router.get("/plan_trip", async (req, response) => {
    response.set('Access-Control-Allow-Origin', 'http://localhost:3000');
    if (req.query && req.query.destination && req.query.departure && req.query.duration && req.query.nrPeople) {
        let query_text = "SELECT * FROM countries where country_name=$1;";
        //http://localhost/6000/plan_trip?dest=rom&date=2021-08-22&duration=5&nrPersons=3
        let destination = req.query.destination;
        let tripDepDay = req.query.departure;
        let tripDuration = req.query.duration;
        let nrPeople = req.query.nrPeople;
        let result = "";
        
        destination =  destination.toLowerCase();
        destination = destination.charAt(0).toUpperCase() + destination.slice(1);
        console.log(req.query);
        // ex: query_text + parametri (in cazul meu este unul singur "destination")
        //  este ceea ce trimit catre baza de date IAR baza de date face procesarea (adica imi Verifica
        // daca tara se afla in DB )
        result = await queryAsync(query_text , [destination]);
        //                                         ^ vector de parametri cu un singur parametru => $1
        if(result.length > 0){
            let country_type = result[0].country_type;
            query_text = "SELECT * FROM bagaje where tip_bagaj=$1;"
            result = await queryAsync(query_text , [country_type]);
            result = procesare(result , tripDuration , nrPeople)
        } else {
            result = "Nu se afla tara in baza de date";
        }

        response.send(result);
    } else {
        response.send("Verifica daca ai completat corect campurile");
    }
     
 
});



// ii spunem app sa utilizeze routerul definit de noi

app.use("/" , router);
console.log("server started");
app.listen(6003);