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

	console.log(`Initially ${window.navigator.onLine ? 'on' : 'off'}line`);
	window.addEventListener('online', () => {
		console.log('You are online');
		document.getElementById('online-status').classList.add('online');
		document.getElementById('online-status').innerHTML = 'You are online';
		setTimeout(() => {
			document.getElementById('online-status').classList.remove('online');
		}, 5000);
	});
	window.addEventListener('offline', () => {
		console.log('You are offline');
		document.getElementById('online-status').classList.add('offline');
		document.getElementById('online-status').innerHTML = 'You are offline';
		setTimeout(() => {
			document
				.getElementById('online-status')
				.classList.remove('offline');
		}, 5000);
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
		sessionStorage.setItem('token', data.token);
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
