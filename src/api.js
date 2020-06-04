const express=require('express')
var unirest = require("unirest");
const app=express()
const router=express.Router()

const serverless=require('serverless-http')

app.use('/.netlify/functions/api', router)

module.exports.handler=serverless(app)

const data=[];

app.use('/.netlify/functions/api', router)
var req = unirest("GET", "https://iata-and-icao-codes.p.rapidapi.com/airlines");

req
.headers({
	"x-rapidapi-host": "iata-and-icao-codes.p.rapidapi.com",
	"x-rapidapi-key": "b08f5f8291mshbc3dab549804e9cp149e78jsnc9e23f00383d",
	"useQueryString": true
})



.end(function (res) {
	if (res.error) throw new Error(res.error);

    //console.log(res.body);
    data.push(...res.body)
});

router.get('/', (req,res)=>{
  
    res.send("sdsssssssssss")

})
router.get('/ICAO/:codeIcao', (req,res)=>{
     //console.log(data)
    const aircode = req.params.codeIcao 
  
    const d_Icao = data.filter(item=> item.icao_code===aircode );
    //console.log(d)
        res.send(d_Icao.map(i=> `Compagnie :${i.name} / Code IATA :${i.iata_code}`))
  
})
router.get('/IATA/:codeIata', (req,res)=>{
    //console.log(data)
   const aircode = req.params.codeIata 
 
   const d_Iata = data.filter(item=> item.iata_code===aircode );
   //console.log(d)
       res.send(d_Iata.map(i=> `Compagnie :${i.name} / Code IATA :${i.icao_code}`))
 
})



////////////////////////////////////////
//app.listen(3000, ()=> console.log('Listening on PORT 3000'))