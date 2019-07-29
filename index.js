const ngrok = require('ngrok');
const express = require('express')
const bodyParser = require('body-parser')
const util = require('util')
const app = express()
const port = 3001
var multer  = require('multer')
var upload = multer()

const infos = [
  () => `[${new Date()}]`,
  (req) => `[${req.method}] ${req.path}`,
  (req) => `[headers] ${util.inspect(req.headers)}`,
  (req) => `[query] ${util.inspect(req.query)}`,
  (req) => `[body] ${util.inspect({...req.body})}`,
  () => ''
]

app.use(upload.none())
app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

app.use('*', (req, res, next) => {
  console.log(infos.map(info => info(req, res)).join("\n"))
  next()
})
app.use('*', (req, res) => {
  res.send({ status: "ok" })
})

app.listen(port, () => console.log(`Sniff-it app listening on port ${port}!`));

// (async function() {
//   const url = await ngrok.connect({
//     addr: port
//   });
//   console.log(`Your sniffer url is ${url}`)
// })();
