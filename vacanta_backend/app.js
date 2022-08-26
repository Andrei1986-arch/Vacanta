// importam express
const express = require('express');
const {queryAsync} = require('./database_query.js');
const { procesare } = require('./procesare.js');
const nodemailer = require("nodemailer");
const bcrypt = require('bcryptjs');
const randomString = require('randomstring');
const { response } = require('express');

// instantiem express

const app = express();

// se creaza un router
const router = express.Router();
app.use(express.urlencoded({extended: false}));
app.use(express.json());
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

 router.post("/delete_bagaj" , async(request , response ) => {
    get 

    let query_text = "DELETE FROM bagaje where denumire=$1;"
 })


router.get("/delete_country/:name", async (req, response) => {
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

// Request GET with parameters in query:
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
// plan_trip  endpoint / 
router.get("/plan_trip", async (req, response) => {
    response.set('Access-Control-Allow-Origin', req.headers.origin);
    if (req.query && req.query.destination && req.query.departure && req.query.duration && req.query.nrPeople) {
        let query_text = "SELECT * FROM countries WHERE country_name=$1;";
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
            result = "Location not in the database.";
        }

        response.send(result);
    } else {
        response.send("Check if al fields are filled correctly!");

    }
     
 
});


let transport = {
    port:465,
    host:"smtp.gmail.com",
    auth:{
    user:"panaite.test.21@gmail.com",
    pass:"Thisisfortest_21"
    },
    secure:false
}

let transporter = nodemailer.createTransport(transport);

// register endpoint 
// 
router.post("/register", async (req, response) => {
    response.set('Access-Control-Allow-Origin', req.headers.origin);
    // valorile sunt luate din campurile input
    let username = req.query.username;
    let email = req.query.email;
    let pass = req.query.password;
    
    let query_text = "SELECT username FROM users WHERE username=$1 OR email=$2";
     let result = await queryAsync(query_text , [username, email]);

    if(result.length === 0){
        query_text = "INSERT INTO users (username , email , password , is_activated , user_type)  \
                    values ($1 , $2 , $3 ,$4 ,$5);" ;
        result = await queryAsync(query_text , [username , email , pass , false , 0]);
       
        let confirmation = randomString.generate(64);
        mailData = {
        from: 'panaite.andrei.21@gmail.com',  // sender address
            to: email,   // list of receivers
            subject: 'Confirm your Vacationey account',
            text: 'That was easy!',
            // text si html intra in corpul mail / continut 
            // in interiorul HTML putem scrie orice text si seta chiart si o "pagina web"
            // pot folosi orce tag din html
            html: '<b>Hey there! Your Vacationey account was created!</b>\
                    <br> You only need to activate it by clicking <a href=' + 'http://localhost:6005/confirm/' + confirmation + '>here</a>!<br/>',
        };
        query_text = "INSERT INTO confirmuser (email , confirmation) values ($1 , $2);"
        result = await queryAsync(query_text , [ email , confirmation]);

        console.log('http://localhost:6005/confirm/' + confirmation)

        // transporter.sendMail(mailData , function (err, info) {
        // if(err)
        //     console.log(err)
        // else
        //     console.log(info);
        // } );
        
        response.send("Registerd user successfully!");
    } else {
        response.send("Username or Email already taken.");
    }
    
});

const confirmCode = async (code) => {
    let query_text = "SELECT * FROM confirmuser where confirmation=$1;"
    let res = await queryAsync(query_text , [code]);
    if(res.length === 1){
        let email = res[0].email
        query_text = "UPDATE users set is_activated='t' where email=$1;"
        res = await queryAsync(query_text , [email]);
        query_text = "DELETE from confirmuser where confirmation=$1;"
        res = await queryAsync(query_text , [code]);
        return 0
    }
    console.log(res);
    return -1; 
}

router.get( "/confirm/:confirmation" , async(req , res) => {
    res.set('Access-Control-Allow-Origin', req.headers.origin);

    let data = req.params.confirmation;

    if( await confirmCode(data) === 0){
        res.send("ok")
    } else {
        res.send("error")
    }
    
    
}

)

router.post("/login", async (req, response) => {
    response.set('Access-Control-Allow-Origin', req.headers.origin);
    let userIdentity = req.query.userIdentity;
    let userPassword = req.query.userPassword;

    let query_text = "SELECT username,email,password from users where username=$1 or email=$1;";
    let result = await queryAsync(query_text , [userIdentity]);

    if(result.length > 0){
        let storedPassword = result[0]["password"];
        const passwordsMatch = bcrypt.compareSync(userPassword, storedPassword);
    }else {
        response.send("user do not exist");
    }
});


// ii spunem app sa utilizeze routerul definit de noi

app.use("/" , router);
console.log("Server started....");
app.listen(6005);