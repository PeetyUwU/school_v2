const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
const USER_FILE = './json/users.json';

function hash(heslo) {
	let hashing = heslo + '§ny.a@OwO=/';
	return crypto.createHash('sha256').update(hashing).digest('hex');
}
function token() {
	return Math.round(Math.random() * 100000)
		.toString(36)
		.substring(0);
}
exports.zpracovaniPozadavku = async function (req, par, res) {
	if (req.url.startsWith('/login/login')) {
		const file = JSON.parse(fs.readFileSync(USER_FILE));
		let name = par.name;
		let password = par.password;

		let pass = hash(password);

		let token;
		for (let f of file) {
			if (name == f.name && pass == f.password) {
				token = token();
			}
		}
		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		o.token = token || 'err';
		o.page = 'start';
		res.end(JSON.stringify(o));
		return;
	}
};
