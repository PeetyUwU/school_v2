let znamky;
let users;

function onLoad() {
	loggedIn();
	if (sessionStorage.getItem('status') != 'loggedIn') {
		backLogin();
	}
	if (sessionStorage.getItem('admin') != 'true') {
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

	loadGrades();
	getUsers();
	let inp = document.getElementById('searchBar');
	inp.addEventListener('keyup', (e) => {
		let search = e.target.value;
		console.log(search);
		let filtred = znamky.filter((w) => w.name.includes(search));
		if (
			filtred.length == 0 ||
			e.key == 'Enter' ||
			e.key == 'Shift' ||
			e.key == 'Control'
		) {
			mapZnamka(filtred);
			return;
		} else {
			mapZnamka(filtred);
		}
	});
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

	sessionStorage.setItem('admin', data.admin);

	if (data.stav != 'ok') {
		location.href = '/';
		sessionStorage.setItem('admin', data.admin);
		sessionStorage.clear();
	}
}
async function admin(inp, form) {
	if (checkValid(inp, form) == false) {
		return;
	}
	let emailAdd = document.getElementById('emailAdd').value;

	let url = '/admin/addAdmin';
	let body = {};
	body.email = emailAdd;
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
	}
}
function checkValid(Email, form) {
	let email = Email.value;
	let pattern = /^[^ ]+@zsceskemladeze.cz$/;

	if (email.match(pattern)) {
		form.classList.add('valid');
		form.classList.remove('invalid');
		valid = true;
		form.innerHTML = 'Platná emailová adresa';
		return true;
	} else {
		form.classList.add('invalid');
		form.classList.remove('valid');
		valid = false;
		form.innerHTML = 'Neplatná emailová adresa';
		return false;
	}
}

function logOut() {
	sessionStorage.clear();
	location.replace('/');
}
function back() {
	location.replace('/start-admin');
}
async function backLogin() {
	location.replace('/');
}

async function loadGrades() {
	let url = '/admin/loadGrades';
	let body = {};
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
		return;
	}

	znamky = data.grades;
}

function mapZnamka(filter) {
	let mapped = '';
	for (let f of filter) {
		let dt = new Date(f.date);
		mapped =
			mapped +
			`<li class="list">
			<h3>${f.name || 'Error'}</h3>
			<p>Cvičení: ${f.work || 'Error'}</p>
			<p>Známka: ${f.grade || 'Error'}</p>
			<p>Počet správných odpovědí: ${f.point || 'Error'}</p>
			<p>Datum vyplnění: ${dt.toLocaleString() || 'Error'}</p>
			</li>`;
	}
	document.getElementById('form2').innerHTML = mapped;
}
function showGrades() {
	let mapped = '';
	znamky.map((z) => {
		let dt = new Date(z.date);
		mapped =
			mapped +
			`<li class="list">
			<h3>${z.name || 'Error'}</h3>
			<p>Cvičení: ${z.work || 'Error'}</p>
			<p>Známka: ${z.grade || 'Error'}</p>
			<p>Počet správných odpovědí: ${z.point || 'Error'}</p>
			<p>Datum vyplnění: ${dt.toLocaleString() || 'Error'}</p>
			</li>`;
	});
	document.getElementById('form2').innerHTML = mapped;
}
function selectFilter(val) {
	console.log(val.value);
}
async function getUsers() {
	let url = '/admin/getUsers';
	let body = {};
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
		return;
	}

	users = data.users;
}
function showUsers() {
	let mapped = '';
	users.map((u) => {
		let dt = new Date(u.date);
		mapped =
			mapped +
			`<li class="list">
			<h3>${u.name || 'Error'}</h3>
			<p>Email: ${u.email || 'Error'}</p>
			<p>Administrátor: ${u.admin || 'Error'}</p>
			<p>Datum registrace: ${dt.toLocaleString() || 'Error'}</p>
			</li>`;
	});
	document.getElementById('form3').innerHTML = mapped;
}

async function removeAdmin(inp, form) {
	if (checkValid(inp, form) == false) {
		return;
	}
	let email = document.getElementById('removeAdmin').value;

	let url = '/admin/removeAdmin';
	let body = {};
	body.email = email;
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
	}
}
