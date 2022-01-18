const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');

exports.zpracovaniPozadavku = async function (req, par, res) {
	if (req.url.startsWith('/english/eng3B8/control')) {
		let grades = JSON.parse(fs.readFileSync('./json/grades.json'));

		let one = par.x;
		let two = par.y;
		let three = par.z;
		let four = par.a;
		let five = par.u;
		let six = par.p;
		let name = par.name;

		for (let g of grades) {
			if (g.name == name) {
				res.writeHead(200, {
					'Content-type': 'application/json',
				});
				let o = {};
				o.stav = 'err';
				o.chyba = 'Toto cvičení jste již vyplnily';
				res.end(JSON.stringify(o));
				return;
			}
		}

		let points = 6;
		if (one == 'snows') {
			one = 'succes';
		} else {
			one = 'misstake';
			points--;
		}
		if (two == 'will meet' || two == "'ll meet") {
			two = 'succes';
		} else {
			two = 'misstake';
			points--;
		}
		if (three == 'miss') {
			three = 'succes';
		} else {
			three = 'misstake';
			points--;
		}
		if (four == "won't lose" || four == 'will not lose') {
			four = 'succes';
		} else {
			four = 'misstake';
			points--;
		}
		if (five == 'am') {
			five = 'succes';
		} else {
			five = 'misstake';
			points--;
		}
		if (six == 'will play' || six == "'ll play") {
			six = 'succes';
		} else {
			six = 'misstake';
			points--;
		}
		let grade;
		if (points == 6) {
			grade = 1;
		}
		if (points == 5) {
			grade = 2;
		}
		if (points == 4) {
			grade = 3;
		}
		if (points == 3) {
			grade = 4;
		}
		if (points <= 2) {
			grade = 5;
		}
		let answers = [
			{ correct: one },
			{ correct: two },
			{ correct: three },
			{ correct: four },
			{ correct: five },
			{ correct: six },
		];
		let ans = {};
		ans.point = points;
		ans.grade = grade;
		ans.name = name;
		ans.date = Date.now();
		ans.work = par.work;

		let userAns = [ans, ...grades];

		fs.writeFileSync(
			'./json/grades.json',
			JSON.stringify(userAns, null, 2)
		);

		res.writeHead(200, {
			'Content-type': 'application/json',
		});
		let o = {};
		o.stav = 'ok';
		o.answers = answers;
		res.end(JSON.stringify(o));
		return;
	}
};
