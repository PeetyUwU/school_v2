function onLoad() {
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
	let inp = document.getElementById('password');
	inp.addEventListener('keyup', (key) => {
		if (key.key == 'Enter') {
			logIn();
		}
	});
}

async function logIn() {
	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;

	let url = location.href + 'login/login';
	let body = {};
	body.name = name;
	body.password = password;
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
	}
	if (data.token == 'err') {
		let txt = document.getElementById('pass');
		txt.innerHTML = 'Špatné uživatelské jméno nebo heslo';
		txt.style.color = 'red';

		return;
	}
	if (data.stav == 'ok') {
		sessionStorage.setItem('status', 'loggedIn');
		sessionStorage.setItem('name', name);
		sessionStorage.setItem('admin', data.admin);
		if (data.admin == true) {
			location.href = 'start-admin';
		} else {
			location.href = 'start';
		}
	}
	//TODO if(sessionStorage.getItem("status") != loggedIn)
}
async function register() {
	location.href = 'register';
}
