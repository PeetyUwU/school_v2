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
function english() {
	location.href = 'english';
}
