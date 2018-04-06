const switcher = document.getElementById('switcher');
const thisID = chrome.runtime.id;
let width = {};
let win = {};

userAgent();
if (win === true) {font()}

chrome.storage.sync.get({'theme': '', 'width': '195'}, function(start) {
	width = start.width;
	document.body.style.maxWidth = width + 'px';
	theme = start.theme;
	if (theme === 'dark') {dark()}
	else {light()}
});

chrome.management.getAll(function(info) {
	console.log(info);
	let extItem = {};
	let extID = {};
	let gut = {};
    info.sort(function (a,b) {
    	return a.shortName.trim().localeCompare(b.shortName.trim());
    	return (a.shortName.replace(/\s/g,'').toLowerCase() < b.shortName.replace(/\s/g,'').toLowerCase());
	});

	for (i=0; i<info.length; i++) {
		if (info[i].type === 'extension' && info[i].id !== thisID) {
			extID = info[i].id;
			extItem = document.createElement('div');
			extItem.classList.add('extension');
			if (info[i].updateUrl == null) {
        		gut = true;
        		extItem.classList.add('out');
        	}
			if (info[i].installType === 'development') {
				gut = true;
				extItem.classList.remove('out');
				extItem.classList.add('dev');
        	}
        	if (info[i].enabled === true) {
				extItem.classList.add('enabled');
        	}
        	extItem.setAttribute('id', extID);
       		extItem.innerHTML = '<div>' + info[i].shortName + '</div>';
			switcher.appendChild(extItem);
		}
	}
	
	const extensions = document.getElementsByClassName('extension');
	if (gut === true) {gutter()}
	
	for (i=0; i<extensions.length; i++) {
  		extensions[i].addEventListener('click', function(i) {
  			extID = extensions[i].getAttribute('id');
			if (extensions[i].classList.contains('enabled')) {
				chrome.management.setEnabled(extID, false);
				extensions[i].classList.remove('enabled');
			}
			else {
				chrome.management.setEnabled(extID, true);
				extensions[i].classList.add('enabled');
			}
  		}.bind(this, i));
  		
  		extensions[i].addEventListener('contextmenu', function(i) {
  			event.preventDefault();
  			rmMenu();
  			extID = extensions[i].getAttribute('id');
  			menu = document.createElement('div');
  			menu.id = 'menu';
  			extensions[i].insertAdjacentElement('afterend', menu); 

  			var unInst = document.createElement('span');
  			unInst.classList.add('uninstall');
  			unInst.innerHTML = 'uninstall';
			menu.appendChild(unInst);
  			unInst.addEventListener('click', function() {
  				chrome.management.uninstall(extID, function() {
  					if (chrome.runtime.lastError) {
  						extensions[i].style.display = 'block';
  					}
  					else {
  						extensions[i].style.display = 'none';
  					}
  				});
  			});

  			var options = document.createElement('span');
  			options.classList.add('options');
  			options.innerHTML = 'options';
  			chrome.management.get(extID, function(opt) {
				var extOpt = opt.optionsUrl;
				if (extOpt !== '') {
					menu.appendChild(options);
					if (opt.enabled === true) {
						options.classList.add('optActive');
  						options.addEventListener('click', function() {
							chrome.tabs.create({url: extOpt});
						});
					}
				}
			});
  		}.bind(this, i));
	}
});

function userAgent() {
	const browser = navigator.userAgent;
	console.log(browser);
	if (browser.includes('Windows') === true) {win = true}
};

function dark() {
	document.body.style.setProperty('--bg', 'hsl(0,0%,10%)');
	document.body.style.setProperty('--fg', 'hsl(207,5%,42%)');
	document.body.style.setProperty('--fgShadow', '#595e62');
	document.body.style.setProperty('--headerBg', 'hsl(240,3%,13%)');
	document.body.style.setProperty('--headerHi', 'hsl(228,57%,73%)');
	document.body.style.setProperty('--headerHiShadow', '#9ca3d1');
	document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
	document.body.style.setProperty('--headerFgShadow', '#595e62');
	document.body.style.setProperty('--extBgHi', 'hsl(240,2%,19%)');
	document.body.style.setProperty('--extFgHi', 'hsl(228,3%,66%)');
	document.body.style.setProperty('--extFgHiShadow', '#2d2d2d');
	document.body.style.setProperty('--extEn', 'hsl(228,57%,73%)');
	document.body.style.setProperty('--extEnShadow', '#8d94cb');
	document.body.style.setProperty('--extEnHi', 'hsl(228,57%,73%)');
	document.body.style.setProperty('--extEnHiShadow', '#8193dc');
	document.body.style.setProperty('--menuBg', 'hsl(240,2%,19%)');
	document.body.style.setProperty('--menuFgAct', 'hsl(210,2%,81%)');
	document.body.style.setProperty('--menuFgActHi', '#f0f0f0');
	document.body.style.setProperty('--optBgHi', '#5aa598');
	document.body.style.setProperty('--uninstBgHi', '#d5596f');
};

function light() {
	document.body.style.setProperty('--bg', 'hsl(0,0%,93%)');
	document.body.style.setProperty('--fg', 'hsl(207,5%,58%)');
	document.body.style.setProperty('--fgShadow', '#c4c5c6');
	document.body.style.setProperty('--headerBg', 'hsl(240,3%,96%)');
	document.body.style.setProperty('--headerHi', '#d5596f');
	document.body.style.setProperty('--headerHiShadow', '#808080');
	document.body.style.setProperty('--headerFg', 'hsl(228,3%,60%)');
	document.body.style.setProperty('--headerFgShadow', '#b0b1b5');
	document.body.style.setProperty('--extBgHi', '#c3c3c9');
	document.body.style.setProperty('--extFgHi', '#ffffff');
	document.body.style.setProperty('--extEn', 'hsl(228,57%,42%)');
	document.body.style.setProperty('--extEnShadow', '#93a3e1');
	document.body.style.setProperty('--extEnHi', 'hsl(228,57%,42%)');
	document.body.style.setProperty('--extEnHiShadow', '#6d81da');
	document.body.style.setProperty('--menuBg', '#c3c3c9');
	document.body.style.setProperty('--menuFgAct', '#ffffff');
	document.body.style.setProperty('--menuFgActHi', '#f0f0f0');
	document.body.style.setProperty('--optBgHi', '#5aa598');
	document.body.style.setProperty('--uninstBgHi', '#d5596f');
};

function gutter() {
	var styleGut = document.createElement('style');
	styleGut.innerHTML = '#header {padding: 16px 20px 11px;} .extension, #menu {padding: 5px 10px 5px 20px;} .extension.dev div::before {content:"$"} .extension.out div::before {content:"[]"}';
	document.body.appendChild(styleGut);
};

function font() {
	var styleWin = document.createElement('style');
	styleWin.innerHTML = 'body {text-shadow: var(--fgShadow) 0 0 1px;} #header{text-shadow: var(--headerFgShadow) 0 0 1px;} #contrast{text-shadow: var(--headerHiShadow) 0 0 1px;} .extension:hover{text-shadow: var(--extFgHiShadow) 0 0 1px;} .extension.enabled {text-shadow: var(--extEnShadow) 0 0 1px;} .extension.enabled:hover {text-shadow: var(--extEnHiShadow) 0 0 1px;}';
	document.body.appendChild(styleWin);
};

function rmMenu() {
	var thisMenu = document.getElementById('menu');
	if (thisMenu) {thisMenu.outerHTML = ''}
};

function extPage() {
	chrome.runtime.openOptionsPage();
};

switcher.addEventListener('mouseleave', rmMenu);
switcher.addEventListener('click', rmMenu);
document.getElementById('header').addEventListener('click', extPage);
		