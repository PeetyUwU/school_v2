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
function vyber() {
	location.href = 'vyber';
}

async function backLogin() {
	location.href = '/';
}
async function admin() {
	location.href = 'admin';
}
