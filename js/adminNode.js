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
				o.chyba = 'Uživatel již je administrátorem';
				res.end(JSON.stringify(o));
				return;
			} else {
				let u = {};
				u.email = par.email;

				let u2 = [u, ...admins];
				fs.writeFileSync(ADMIN_FILE, JSON.stringify(u2, null, 2));

				const USERS = './json/users.json';
				const users = JSON.parse(fs.readFileSync(USERS));

				let a1;
				let a2 = {};

				for (let a of users) {
					if (a.email == par.email) {
						a1 = users.filter((w) => w.email != a.email);
						a2.name = a.name;
						a2.password = a.password;
						a2.email = a.email;
						a2.token = a.token;
						a2.date = a.date;
						a2.admin = true;
						break;
					}
				}

				let a3 = [...a1, a2];
				fs.writeFileSync(USERS, JSON.stringify(a3, null, 2));
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
	} else if (req.url.startsWith('/admin/removeAdmin')) {
		let email = par.email;

		const ADMINS = './json/admins.json';
		const USERS = './json/users.json';
		const users = JSON.parse(fs.readFileSync(USERS));
		const admin = JSON.parse(fs.readFileSync(ADMINS));

		let filter = admin.filter((a) => a.email == email);
		let filter2 = admin.filter((a) => a.email != email);

		if (filter.length == 0) {
			res.writeHead(200, {
				'Content-type': 'application/json',
			});
			let o = {};
			o.stav = 'err';
			o.chyba = 'Admin nenalezen';
			res.end(JSON.stringify(o));
			return;
		}

		let a1;
		let a2 = {};

		for (let a of users) {
			if (a.email == email) {
				a1 = users.filter((w) => w.email != a.email);
				a2.name = a.name;
				a2.password = a.password;
				a2.email = a.email;
				a2.token = a.token;
				a2.date = a.date;
				a2.admin = false;
				break;
			}
		}

		let a3 = [...a1, a2];
		fs.writeFileSync(USERS, JSON.stringify(a3, null, 2));
		fs.writeFileSync(ADMINS, JSON.stringify(filter2, null, 2));

		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		res.end(JSON.stringify(o));
		return;
	}
};
