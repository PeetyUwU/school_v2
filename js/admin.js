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
