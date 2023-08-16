require("dotenv").config();

const express = require("express");

const app = express();

app.use(express.static("public"));

/** КОД ДО СЛОВА [СТОП] НЕ НУЖЕН ДЛЯ СЕРВЕРА С ФОРМОЙ */
const bodyParser = require('body-parser')
const cors = require("cors");
const db = require("./db/db.js");
app.use(cors({ origin: "*" }));


// создаем парсер для данных application/x-www-form-urlencoded
// app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get("/stat", (req, res) => {

    if(!req.query?.secret) return res.sendStatus(400);

    db.all(
        "SELECT * FROM stat", 
        function(err, rows) {  
            if (err){
                return res.sendStatus(500);
            }
            else {
                res.send(rows);
            }
        });

});

app.post("/stat", (req, res) => {

    if(!req.body) return res.sendStatus(400);

    const data = {
        field1: encodeURIComponent(req.body?.field1),
        field2: encodeURIComponent(req.body?.field2),
    }
    const errors = {}

    // Какая-то валидация
    
    if(data.field1?.length < 8) errors.field1 = 'Длина не меньше 8ми'
    if(String(parseInt(data.field2))!==data.field2) errors.field2 = 'Тут только цифры';
    
    if(Object.values(errors).length) {
        return res.status(403).json({errors})
    }

    // create new item in DB
    db.run(
        `INSERT INTO stat (field1, field2) VALUES (?,?)`, 
        Object.values(data), 
        function (err) {
            if (err){
                console.log(err);
                return res.sendStatus(500);
            }
            else {
                res.send(data);
            }
        }
    );

});

/** КОД ВЫШЕ НЕ НУЖЕН ДЛЯ СЕРВЕРА С ФОРМОЙ */
/** КОД НИЖЕ НУЖЕН ВСЕМ */

// Запускаем сервер
const port = process.env.PORT ?? 3003;

app.listen(port, () => {
	console.log(`http://127.0.0.1:${port}`);
});