const optDark = document.getElementById('dark');
const optLight = document.getElementById('light');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
let width = {};
let theme = {};
let viv = {};
let opr = {};

chrome.management.getSelf(function(info) {
	const ver = info.version;
	const version = document.getElementById('version');
	version.innerHTML = ' ' + ver;
});

chrome.storage.sync.get({'theme': '', 'width': '195'}, function(start) {
	width = start.width;
	slide.value = width;
	disp.innerHTML = width + 'px';
	theme = start.theme;
	if (theme === 'dark') {
		optDark.classList.add('enabled');
	}
	else if (theme === 'light') {
		optLight.classList.add('enabled');
	}
	else {
		userAgent();
		if (viv === true || opr === true) {
			theme = 'dark';
			optDark.classList.add('enabled');
			setTheme();
		}
		else {
			theme = 'light';
			optLight.classList.add('enabled');
			setTheme();
		}
	}
});

function setTheme() {
	chrome.storage.sync.set({'theme': theme}, function(lightDark) {
		console.log(theme);
	});
};

function setDark() {
	if (theme === 'light') {
		theme = 'dark';
		optLight.classList.remove('enabled');
		optDark.classList.add('enabled');
		setTheme();
	}
};

function setLight() {
	if (theme === 'dark') {
		theme = 'light';
		optDark.classList.remove('enabled');
		optLight.classList.add('enabled');
		setTheme();
	}
};

function userAgent() {
	const browser = navigator.userAgent;
	if (browser.includes('Vivaldi') === true) {
		viv = true;
	}
	if (browser.includes('OPR') === true) {
		opr = true;
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
