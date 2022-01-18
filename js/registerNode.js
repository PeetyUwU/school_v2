const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
const nodemailer = require('nodemailer');
require('dotenv').config();
function hash(heslo) {
	let hashing =
		'>sdw<wasfx*awts{]}[!?luv' + heslo + '$nya.$/OwO$_OvO--_Denysa|';
	return crypto.createHash('sha256').update(hashing).digest('hex');
}

function random() {
	return Math.floor(Math.random() * 100000).toString(36);
}

setInterval(function () {
	let users = JSON.parse(fs.readFileSync('./json/tempUsers.json'));

	for (let u of users) {
		let token = u.token;
		fs.unlinkSync(`./verify/${token}.html`);
	}
	fs.writeFileSync('./json/tempUsers.json', '[]');
}, 1800000);

exports.zpracovaniPozadavku = async function (req, par, res) {
	if (req.url.startsWith('/register/register')) {
		//*files
		const USER_FILE = './json/users.json';
		const TEMPLATE_FILE = './temp.html';
		const TEMP_FILE = './json/tempUsers.json';
		let template_file = fs.readFileSync(TEMPLATE_FILE);
		let file = JSON.parse(fs.readFileSync(USER_FILE));
		let tempFile = JSON.parse(fs.readFileSync(TEMP_FILE));

		//*parameters
		let name = par.name;
		let email = par.email;
		let password = hash(par.password);

		//*check if email is used
		for (let u of file) {
			if (u.email == email) {
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'err';
				o.chyba = 'Email již je používán';
				res.end(JSON.stringify(o));
				return;
			}
			if (u.name == name) {
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'err';
				o.chyba = 'Jméno je již používáno';
				res.end(JSON.stringify(o));
				return;
			}
		}

		//*create verify page
		for (let u of tempFile) {
			if (u.email == email) {
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'err';
				o.chyba =
					'Prosím zkontrolujte email. Pokud vám email nepřišel zkuste to za půl hodiny.';
				res.end(JSON.stringify(o));
				return;
			} else continue;
		}
		let token = random() + '-' + random();

		let u1 = [];
		let u2 = tempFile;
		let u3 = {};
		u3.name = name;
		u3.email = email;
		u3.password = password;
		u3.token = token;

		u1 = [u3, ...u2];

		let webpage = `http://localhost:8080/verify/${token}`;

		//*email verify send
		const transporter = nodemailer.createTransport({
			service: 'gmail',
			host: 'smtp.gmail.com',
			auth: {
				user: process.env.EMAIL,
				pass: process.env.PASSWORD,
			},
		});
		const options = {
			from: 'petr.kotek@zsceskemladeze.cz',
			to: email,
			subject: 'Ověření emailu',
			html: `</p><p font-family: "sans-serif">Ověření je na jméno: ${name}. Pro ověření stiskněte tlačítko:</p><a href="${webpage}.html" method="POST" style="text-decoration: none; color: white; background-color: #333; padding: 5px 10px; font-family: sans-serif; font-size: 20px;">Ověřit</a>`,
		};
		transporter.sendMail(options, function (err, info) {
			if (err) {
				console.log(err);
				return;
			}
			console.log('Sent: ' + info.response);
			fs.writeFileSync(TEMP_FILE, JSON.stringify(u1, null, 2));
			fs.writeFileSync(`./verify/${token}.html`, template_file);
		});
		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		res.end(JSON.stringify(o));
		return;
	}

	if (req.url.startsWith('/register')) {
		res.writeHead(200, {
			'Content-type': 'text/html',
		});
		res.end();
		return;
	}
};
