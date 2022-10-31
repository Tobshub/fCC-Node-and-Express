let express = require('express');
let app = express();
let bodyParser = require('body-parser');


const rootLevelMware = (req, res, next) => {
  const {method, path, ip} = req;
  console.log(`${method} ${path} - ${ip}`)
  next();
}

app.use(
  rootLevelMware, 
  bodyParser.urlencoded({extended: false})
)

app.get('/', (req,res) => {
  const absolutePath = `${__dirname}/views/index.html`;
  res.sendFile(absolutePath);
  const staticServe = `${__dirname}/public`
  app.use('/public', express.static(staticServe))
})


app.get('/json', (req, res) => {
  const {MESSAGE_STYLE: style} = process.env;
  
  const mes = 'Hello json';
  const message = {
    'message': style === 'uppercase'? mes.toUpperCase() : mes,
  }
  
  res.json(message)
})

app.get('/now',(req, res, next) => {
  req.time = new Date().toString();
  next()
}, (req, res) => {
  const response = {
    time: req.time
  }
  res.send(response)
})

app.get('/:word/echo',(req, res) => {
  const {word} = req.params;
  res.send({
    echo: word
  })
})

app.route('/name')
.get((req,res) => {
  const {first, last} = req.query;
  const doc = {
    name: `${first} ${last}`
  }
  res.send(doc)
})
.post((req,res) => {
  const {first, last} = req.body;
  const doc = {
    name: `${first} ${last}`
  }
  res.send(doc)
})














module.exports = app;
