let valid = false;
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
}

function checkValid() {
	let form = document.getElementById('form');
	let email = document.getElementById('email').value;
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

async function register() {
	let email = document.getElementById('email');
	let name = document.getElementById('name').value;
	let password = document.getElementById('password').value;
	let password2 = document.getElementById('password2').value;
	let passTxt = document.getElementById('passTxt');

	if (checkValid() == false) return;

	if (name == '' && password == '') {
		passTxt.innerHTML = 'Prosím zadejte jméno a heslo';
		passTxt.style.color = 'red';
		return;
	}

	if (password != password2) {
		passTxt.innerHTML = 'Neplatné heslo';
		passTxt.style.color = 'red';
		return;
	}

	let url = location.href + '/register';
	let body = {};
	body.email = email.value;
	body.name = name;
	body.password = password;
	let response = await fetch(url, {
		method: 'POST',
		body: JSON.stringify(body),
	});
	let data = await response.json();

	if (data.stav == 'ok') {
		alert('Na email jsme vám odeslali ověření registrace');
	}
	if (data.stav == 'err') {
		alert(data.chyba);
	}
}

async function login() {
	location.replace('/');
}
