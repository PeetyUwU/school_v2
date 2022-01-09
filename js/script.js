function onLoad() {}

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
		alert('Špatné heslo');
		return;
	}
}
async function register() {
	location.href = 'register';
}
