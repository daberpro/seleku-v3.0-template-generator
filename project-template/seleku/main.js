const esbuildSelekuPlugin = require('./seleku.esbuild.plugin.js');
const nodemon = require('nodemon');
const {build} = require('esbuild');
const express = require('express');
const {WebSocketServer,WebSocket} = require('ws');
const server = express();
const PORT = 3000;

server.use(express.static(__dirname+'/result/'));
const expressServer = server.listen(PORT,'0.0.0.0',()=>{
  console.log(`\n\n server starting on port ${PORT}`)
});

const wss = new WebSocketServer({server: expressServer});

nodemon('-e "js selek css png svg jpg jpeg" --ignore node_modules/ --ignore result -w');
const config = {
  entryPoints: ['app.js'],
  assetNames: 'assets/[name]-[hash]',
  entryNames: '[name]',
  bundle: true,
  outdir: 'result',
  plugins: [esbuildSelekuPlugin],
  format: 'esm',
  loader: {
    '.css': 'css',
    '.png': 'file',
    '.svg': 'file',
    '.jpeg': 'file',
    '.jpg': 'file'
  },
  minify: false,
}

nodemon.on('start', async function () {
  await build(config).then(e => {}).catch(() => process.exit(1));
  wss.clients.forEach(function each(client) {
    if (client.readyState === WebSocket.OPEN) {
      client.send(JSON.stringify({
        type: 0,
        data: {}
      }), { binary: false });
    }
  });
});