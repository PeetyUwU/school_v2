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
function GetToken() {
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
		let admin = false;
		for (let f of file) {
			if (name == f.name && pass == f.password) {
				email = f.email;
				if (f.admin == true) {
					admin = true;
				}
				token = f.token;
			}
		}
		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		o.token = token || 'err';
		o.page = 'start';
		o.admin = admin;
		res.end(JSON.stringify(o));
		return;
	} else if (req.url.startsWith('/login/token')) {
		const file = JSON.parse(fs.readFileSync(USER_FILE));
		const token = par.token;
		let index = 0;
		let admin;

		for (let t of file) {
			if (index == 1) return;
			if (!t.token == token) {
				return;
			} else {
				admin = t.admin;
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'ok';
				o.admin = admin || false;
				res.end(JSON.stringify(o));
				index++;
				return;
			}
		}
		if (index == 0) {
			res.writeHead(401, {
				'Content-type': 'application/json',
			});
			let o = {};
			o.stav = 'err';
			res.end(JSON.stringify(o));
			return;
		}
	}
};
