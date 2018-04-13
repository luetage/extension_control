const optDark = document.getElementById('dark');
const optLight = document.getElementById('light');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
let width = {};
let theme = {};

chrome.management.getSelf(function(info) {
	const ver = info.version;
	const version = document.getElementById('version');
	version.innerHTML = ' ' + ver;
});

chrome.storage.sync.get({
	'theme': '',
	'width': '195',
}, function(start) {
	width = start.width;
	slide.value = width;
	disp.innerHTML = width + 'px';
	theme = start.theme;
	if (theme === 'dark') {
		optDark.classList.add('enabled');
	}
	else {
		optLight.classList.add('enabled');
	}
});

function setTheme() {
	chrome.storage.sync.set({'theme': theme}, function(lightDark) {
		console.log(theme);
	});
};

function setDark() {
	if (theme !== 'dark') {
		theme = 'dark';
		optLight.classList.remove('enabled');
		optDark.classList.add('enabled');
		setTheme();
	}
};

function setLight() {
	if (theme !== 'light') {
		theme = 'light';
		optDark.classList.remove('enabled');
		optLight.classList.add('enabled');
		setTheme();
	}
};

slide.oninput = function() {
	width = this.value
	disp.innerHTML = width + 'px';
};

slide.onchange = function() {
	chrome.storage.sync.set({'width': width}, function(maxWidth) {
		disp.innerHTML = width + 'px';
	});
};

optDark.addEventListener('click', setDark);
optLight.addEventListener('click', setLight);
document.getElementById('extPage').addEventListener('click', function() {
	chrome.runtime.sendMessage('extensions pls');
});
