function onLoad() {
	loggedIn();
	if (sessionStorage.getItem('status') != 'loggedIn') {
		backLogin();
	}
	if (sessionStorage.getItem('admin') != 'true') {
		backLogin();
	}
	document.getElementById(
		'welcome'
	).innerHTML = `Vítejte ${sessionStorage.getItem('name')}`;
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
		sessionStorage.setItem('admin', data.admin);
		sessionStorage.clear();
	}
}
async function admin() {
	location.href = 'admin';
}
function notAdmin() {
	location.href = '/start';
}
function vyber() {
	location.href = 'vyber';
}
