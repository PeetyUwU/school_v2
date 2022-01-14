const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
const nodemailer = require('nodemailer');

function hash(heslo) {
	let hashing = heslo + '§ny.a@OwO=/';
	return crypto.createHash('sha256').update(hashing).digest('hex');
}

function token() {
	return Math.floor(Math.random() * 10000)
		.toString(36)
		.substring(0);
}

function getToken() {
	return Math.floor(Math.random() * 10000000000000)
		.toString(36)
		.substring(0);
}

exports.zpracovaniPozadavku = async function (req, res) {
	let par = url.parse(req.url, true).query;
	const HTML_FILES = fs.readdirSync('./verify');
	const USER_FILE = JSON.parse(fs.readFileSync('./json/users.json'));
	const TEMP_FILE = JSON.parse(fs.readFileSync('./json/tempUsers.json'));
	const ADMIN_FILE = JSON.parse(fs.readFileSync('./json/admins.json'));

	if (req.url.startsWith('/verify')) {
		HTML_FILES.forEach((file) => {
			console.log(file);

			if (req.url.endsWith(file)) {
				res.writeHead(200, {
					'Content-type': 'text/html',
				});
				s = fs.readFileSync(`./verify/${file}`).toString();
				res.end(s);
				return;
			} else if (req.url.endsWith(`${file}/verify`)) {
				let u1 = [];
				let u2 = TEMP_FILE.filter((w) => w.token + '.html' != file);
				let u3 = TEMP_FILE.filter((w) => w.token + '.html' == file);
				let u4 = {};
				let u5 = USER_FILE;
				for (let user of u3) {
					if (user.token + '.html' == file) {
						u4.name = user.name;
						u4.password = user.password;
						u4.email = user.email;
						u4.token =
							getToken() +
							getToken() +
							'-' +
							getToken() +
							getToken() +
							'.' +
							getToken() +
							getToken();
						u4.date = Date.now();
						for (let admin of ADMIN_FILE) {
							if (admin.email == user.email) {
								u4.admin = true;
							} else {
								u4.admin = false;
							}
						}
					}
				}
				u1 = [u4, ...u5];
				fs.writeFileSync(
					'./json/users.json',
					JSON.stringify(u1, null, 2)
				);
				fs.writeFileSync(
					'./json/tempUsers.json',
					JSON.stringify(u2, null, 2)
				);

				fs.unlinkSync(`./verify/${file}`);

				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'ok';
				res.end(JSON.stringify(o));
				return;
			} else {
				res.writeHead(404);
			}
		});
	} else {
		res.writeHead(404);
	}
};
