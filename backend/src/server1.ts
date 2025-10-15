// @deno-types="npm:@types/express@4"
import express, { NextFunctions, Request, Response } from "npm:express@4.18.2";
import fs from 'node:fs';
//config logging to your liking... api authored by aj for now 
const log_file: string = '../app.log';
const logStream = fs.createWriteStream('/home/andowens/.bc/backend/app.log', { flags: 'a' });
// server is used to run the server. Listening on the hosts port running on 3k
const app = express()
const port = Number(Deno.env.get("PORT")) || 3000;
let hcItteration: number = 1;
// healthcheck endpoint 
app.get('/hc', (req, res) => {

  res.status(200).send(`bc api living. /hc hit ${hcItteration}x`);
  logStream.write(`${new Date().toISOString()} [LOG]: /hc hit ${hcItteration}x}\n`)
  hcItteration++;

});
// About page serving 
app.get('/about', (req, res) => {
  try {
    // log client ip.. Kyle said alot fo china servers will hit you on deploys so we can see when we open up a port at home
    const ip =
    req.headers['x-forwarded-for']?.toString().split(',')[0].trim() || // use if behind a proxy
    req.socket?.remoteAddress || 
    req.ip; // fallback
    logStream.write(`${new Date().toISOString()} [LOG]: ${ip} hit about page \n`)
    //server file
    res.sendFile(`/home/andowens/.bc/backend/src/public/index.html`);
  } catch (e) {
    logStream.write(`${new Date().toISOString()} [ERROR]: \n${e}\n`)
  }
});

// what does the application need to do
// endpoint to gen private keys 
// before it gets big restructure api so it is easy to scale
// read a smarcontract 
app.post('/getCartFromContract', (req, res) => {
  
  res.send({'cart': 'empty'})
})
app.listen(port, () => {
  console.log(`listening... on ${port}`);
})
