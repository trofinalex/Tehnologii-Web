const express = require('express');
const LiniiTransport = require('./LiniiTransport');
const app = express()
const port = 3000

app.use(express.urlencoded({extended:true}))
app.use(express.json())

const linieRouter = express.Router()
app.use('/api', linieRouter)

app.get('/', (req, res) => {
    res.send("API");
})

app.listen(port, () => {
    console.log("Functioneaza pe portul " + port)
})

let liniiDeTransport = [new LiniiTransport(1, "Autobuz", "117"), new LiniiTransport(2, "Tramvai", "32"), new LiniiTransport(3, "Metrou", "Berceni")]


linieRouter.route('/LiniiTransporturi')
    .get((req,res) => {
        let filteredLiniiTransport = [];
        if(req.query.nume) {
            filteredLiniiTransport = liniiDeTransport.filter(x=>x.nume == req.query.nume)
        }
        else{
            filteredLiniiTransport = liniiDeTransport
        }
        res.json(filteredLiniiTransport)
    })

    .post((req, res) => {
        let newLinie = new LiniiTransport(req.body.id, req.body.nume, req.body.numar)
        liniiDeTransport.push(newLinie)
        console.log(liniiDeTransport)
        return res.json(newLinie)
    })

linieRouter.route('/LiniiTransporturi/:LiniiTransporturiId')
    .put((req,res) => {
        LinieModificata = liniiDeTransport.find(x=>x == req.params.LiniiTransporturiId)
        LinieModificata.nume = req.body.nume;
        LinieModificata.numar = req.body.numar;
        return res.json(LinieModificata);
    })
