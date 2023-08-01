const express = require('express')
const cors = require('cors')
const bodyparser = require('body-parser')
var path = require('path')

const app = express()
const port = 4445;

app.use(cors({
    origin: 'http://localhost:4445'
}))

app.use(bodyparser.json())

app.listen(port, () => {
    console.log(`App listening on port ${port}!`);
})

app.get('/',(req,res) =>{
	res.sendFile(path.join(__dirname + '/index.html'));
});

var countries_json =
[
    {
    "id_country": "1",
    "country": "Greece"
    },
    {
    "id_country": "2",
    "country": "France"
    },
    {
    "id_country": "3",
    "country": "Japan"
    }
]


app.post('/countries', (req, res) =>{
    res.send(countries_json)
})

var country_Gr =
{
    "req_body": {
    "id_country": "",
    "country": ""
    },
    "cities": 
    [
    {
    "id_city": "1",
    "city": "Athens"
    },
    {
    "id_city": "2",
    "city": "Piraeus"
    }
    ]
}

var country_Fr =
{
    "req_body": {
    "id_country": "",
    "country": ""
    },
    "cities": 
    [
    {
    "id_city": "3",
    "city": "Paris"
    },
    {
    "id_city": "4",
    "city": "Marseille"
    }
    ]
}

var country_Ja =
{
    "req_body": {
    "id_country": "",
    "country": ""
    },
    "cities": 
    [
    {
    "id_city": "5",
    "city": "Tokyo"
    }
    ]
}

var error_req =
{
"error": "Request body must be json object with 'id_country': and 'country': attributes"
}

var no_city =
{
"error": "No cities found for given country and id"
}

app.post('/cities', (req, res) =>{   
    //res.send(req.body)
    try {
    id_country = req.body.id_country
    country = req.body.country
    if (typeof id_country === 'undefined' || typeof country === 'undefined')
    res.send(error_req)
    else if (country == "Greece"){
    country_Gr.req_body.id_country = id_country
    country_Gr.req_body.country = country
    res.send(country_Gr)
    }
    else if (country == "France"){
    country_Fr.req_body.id_country = id_country
    country_Fr.req_body.country = country
    res.send(country_Fr)
    }
    else if (country == "Japan"){
    country_Ja.req_body.id_country = id_country
    country_Ja.req_body.country = country
    res.send(country_Ja)
    }
    else
    res.send(no_city)
    }
    catch (error) {
        res.send(error_req)
    }   
}
)