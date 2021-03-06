function onLoad() {
	loggedIn();
	if (sessionStorage.getItem('status') != 'loggedIn') {
		backLogin();
	}
	let btn = document.getElementById('theme');
	btn.addEventListener('click', function () {
		let darkThemeEnabled = document
			.getElementById('dark-theme')
			.classList.toggle('dark-theme');
		document.body.classList.remove('load');
		localStorage.setItem('theme', darkThemeEnabled);
	});

	if (JSON.parse(localStorage.getItem('theme'))) {
		document.body.classList.toggle('dark-theme');
		document.body.classList.toggle('load');
	}
}

async function backLogin() {
	location.href = '/';
}
function logOut() {
	sessionStorage.clear();
	location.href = '/';
}
async function loggedIn() {
	let url = '/login/token';
	let body = {};
	body.token = sessionStorage.getItem('token');
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		location.href = '/';
	}
}
function main() {
	location.href = '/start-admin';
}
function english() {
	location.href = '/english';
}
async function eng3B8c() {
	let one = document.getElementById('x1');
	let two = document.getElementById('y1');
	let three = document.getElementById('z1');
	let four = document.getElementById('a1');
	let five = document.getElementById('u1');
	let six = document.getElementById('p1');
	let name = sessionStorage.getItem('name');

	let url = location.href + '/control';
	let body = {};
	body.x = one.value;
	body.y = two.value;
	body.z = three.value;
	body.a = four.value;
	body.u = five.value;
	body.p = six.value;
	body.name = name;
	body.work = 'eng3B8';
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	console.log(data);

	if (data.stav == 'ok') {
		let answers = data.answers;
		let index = 0;

		answers.map((ans) => {
			let val = document.getElementById(index);
			if (ans.correct == 'succes') {
				val.innerHTML = 'Correct';
				val.style.color = 'lightgreen';
			} else {
				val.innerHTML = 'Incorrect';
				val.style.color = 'red';
			}
			index++;
		});
	} else {
		alert(data.chyba);
	}
}
