const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
const zpracovaniUzivatele = require('./js/zpracovaniU.js').zpracovaniPozadavku;
const register = require('./js/registerNode.js').zpracovaniPozadavku;
const verify = require('./js/verify.js').zpracovaniPozadavku;

console.log('Server is ready');

function zpracovaniPozadavku(req, res) {
	console.log(req.url);

	if (req.method === 'GET') {
		if (req.url == '/') {
			res.writeHead(200, {
				'Content-type': 'text/html',
			});
			let s = fs.readFileSync('index.html').toString();
			res.end(s);
		}
		if (req.url == '/register') {
			res.writeHead(200, {
				'Content-type': 'text/html',
			});
			let s = fs.readFileSync('./html/register.html').toString();
			res.end(s);
		}
		if (req.url.startsWith('/verify')) {
			verify(req, res);
		} else if (req.url.endsWith('css')) {
			res.writeHead(200, {
				'Content-type': 'text/css',
			});
			let s = fs.readFileSync('./css' + req.url).toString();
			res.end(s);
		} //*verify
		else if (req.url == '/script.js') {
			res.writeHead(200, {
				'Content-type': 'application/json',
			});
			s = fs.readFileSync('./js/script.js').toString();
			res.end(s);
		} else if (req.url == '/register.js') {
			res.writeHead(200, {
				'Content-type': 'application/json',
			});
			s = fs.readFileSync('./js/register.js').toString();
			res.end(s);
		} else if (req.url == '/background.jpg') {
			res.writeHead(200, {
				'Content-type': 'icon/jpg',
			});
			s = fs.readFileSync('background.jpg');
			res.end(s);
		} else if (req.url == '/another.png') {
			res.writeHead(200, {
				'Content-type': 'icon/jpg',
			});
			s = fs.readFileSync('another_background.png');
			res.end(s);
		} else if (req.url == '/favicon.ico') {
			res.writeHead(200, {
				'Content-type': 'icon/jpg',
			});
			s = fs.readFileSync('background.png');
			res.end(s);
		} else if (req.url == '/background.png') {
			res.writeHead(200, {
				'Content-type': 'icon/jpg',
			});
			s = fs.readFileSync('background.png');
			res.end(s);
		} else {
			res.writeHead(404);
		}
	}
	if (req.method === 'POST') {
		let data = '';
		req.on('data', function (kusDat) {
			data += kusDat;
		});
		req.on('end', function () {
			if (data) {
				let par = JSON.parse(data);
				console.log(par);
				console.log(data);
				if (req.url.startsWith('/login')) {
					zpracovaniUzivatele(req, par, res);
				}
				if (req.url.startsWith('/register')) {
					register(req, par, res);
				} else {
					res.writeHead(404);
				}
			}
		});
	} else {
		res.writeHead(404);
	}
}
let srv = http.createServer(zpracovaniPozadavku);
srv.listen(8080);
