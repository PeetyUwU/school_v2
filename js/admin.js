function onLoad() {
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
}
async function admin() {
	if (checkValid == false) {
		return;
	}
	let emailAdd = document.getElementById('emailAdd').value;

	let url = location.href + 'admin/addAdmin';
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
function checkValid(Email) {
	let form = document.getElementById('form');
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
