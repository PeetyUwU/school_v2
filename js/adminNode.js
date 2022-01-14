const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');
require('dotenv').config();

exports.zpracovaniPozadavku = async function (req, par, res) {
	const ADMIN_FILE = './json/admins.json';
	const admins = JSON.parse(fs.readFileSync(ADMIN_FILE));
	if (req.url.startsWith('/admin/addAdmin')) {
		for (let a of admins) {
			if (par.email == a.email) {
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'err';
				o.chyba = 'uživatel již je administrátorem';
				res.end(JSON.stringify(o));
				return;
			} else {
				let u = {};
				u.email = par.email;

				let u2 = [u, ...admins];
				fs.writeFileSync(ADMIN_FILE, JSON.stringify(u2, null, 2));
			}
		}
	} else if (req.url.startsWith('/admin/loadGrades')) {
		const GRADES = './json/grades.json';
		const grades = JSON.parse(fs.readFileSync(GRADES));

		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		o.grades = grades;
		res.end(JSON.stringify(o));
		return;
	} else if (req.url.startsWith('/admin/getUsers')) {
		const USERS = './json/users.json';
		const users = JSON.parse(fs.readFileSync(USERS));

		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		o.users = users;
		res.end(JSON.stringify(o));
		return;
	}
};
