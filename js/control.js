const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path');
const crypto = require('crypto');
const requestIp = require('request-ip');

exports.zpracovaniPozadavku = async function (req, par, res) {
	if (req.url.startsWith('/english/eng3B8/control')) {
		let one = par.x;
		let two = par.y;
		let three = par.z;
		let four = par.a;
		let five = par.u;
		let six = par.p;

		if (one == 'snows') {
			one = 'succes';
		} else {
			one = 'misstake';
		}
		if (two == 'will meet' || two == "'ll meet") {
			two = 'succes';
		} else {
			two = 'misstake';
		}
		if (three == 'miss') {
			three = 'succes';
		} else {
			three = 'misstake';
		}
		if (four == "won't lose" || four == 'will not lose') {
			four = 'succes';
		} else {
			four = 'misstake';
		}
		if (five == 'am') {
			five = 'succes';
		} else {
			five = 'misstake';
		}
		if (six == 'will play' || six == "'ll play") {
			six = 'succes';
		} else {
			six = 'misstake';
		}
		let answers = [
			{ correct: one },
			{ correct: two },
			{ correct: three },
			{ correct: four },
			{ correct: five },
			{ correct: six },
		];

		fs.writeFileSync('./json/grades', JSON.stringify(answers, null, 2));
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
