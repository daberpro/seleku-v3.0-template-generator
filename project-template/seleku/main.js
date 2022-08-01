const esbuildSelekuPlugin = require('./seleku.config.js');
const nodemon = require('nodemon');
const {Bundle} = require('seleku-v3.0');
const express = require('express');
const server = express();
const PORT = 3000;

server.use(express.static(__dirname+'/result/'));
const expressServer = server.listen(PORT,'0.0.0.0',()=>{
  console.log(`\nserver starting on port ${PORT}\n`)
});

nodemon('-e "js selek css png svg jpg jpeg" --ignore node_modules/ --ignore result -w');

nodemon.on('start', async function () {
  await Bundle({
    entryPoints: ['index.html'],
    outdir: 'result',
    minify: true,
    format: 'esm',
  },{
    copase: false
  });
});