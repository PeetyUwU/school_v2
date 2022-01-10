function onLoad() {
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
	let url = location.replace('/');
	let body = {};
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav != 'ok') {
		alert(data.chyba);
	}
	return;
}
async function admin() {
	location.replace('admin');
}
