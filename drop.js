const switcher = document.getElementById('switcher');
const thisID = chrome.runtime.id;

function light() {
    document.body.style.setProperty('--bg', 'hsl(0,0%,93%)');
    document.body.style.setProperty('--fg', 'hsl(207,5%,58%)');
    document.body.style.setProperty('--fgShadow', 'hsl(207,5%,73%)');
    document.body.style.setProperty('--headerBg', 'hsl(240,3%,96%)');
    document.body.style.setProperty('--headerHi', 'hsl(349, 60%, 59%)');
    document.body.style.setProperty('--headerHiShadow', 'hsl(349, 60%, 74%)');
    document.body.style.setProperty('--headerFg', 'hsl(228,3%,60%)');
    document.body.style.setProperty('--headerFgShadow', 'hsl(228,3%,75%)');
    document.body.style.setProperty('--extBgHi', 'hsl(240, 5%, 78%');
    document.body.style.setProperty('--extFgHi', 'hsl(360, 100%, 100%)');
    document.body.style.setProperty('--extEn', 'hsl(228,57%,36%)');
    document.body.style.setProperty('--extEnShadow', 'hsl(228,57%,57%)');
    document.body.style.setProperty('--extEnHi', 'hsl(228,57%,36%)');
    document.body.style.setProperty('--extEnHiShadow', 'hsl(228,57%,57%)');
    document.body.style.setProperty('--menuBg', 'hsl(240, 5%, 78%)');
    document.body.style.setProperty('--menuFgAct', 'hsl(360, 100%, 100%)');
    document.body.style.setProperty('--menuFgActHi', 'hsl(0, 0%, 94%)');
    document.body.style.setProperty('--menuBgHi', 'hsl(229, 59.8%, 59%)');
    document.body.style.setProperty('--menuBgHi2', 'hsl(349, 60%, 59%)');
    document.body.style.setProperty('--desc', 'hsl(349, 60%, 59%)');
    document.body.style.setProperty('--descShadow', 'hsl(349, 60%, 69%)');
};

function lighter() {
    document.body.style.setProperty('--bg', 'hsl(0,0%,99%)');
    document.body.style.setProperty('--fg', 'hsl(207,5%,58%)');
    document.body.style.setProperty('--fgShadow', 'hsl(207,5%,69%)');
    document.body.style.setProperty('--headerBg', 'hsl(240,3%,94%)');
    document.body.style.setProperty('--headerHi', 'hsl(0,0%,28%)');
    document.body.style.setProperty('--headerHiShadow', 'hsl(0, 0%, 38%)');
    document.body.style.setProperty('--headerFg', 'hsl(228,3%,69%)');
    document.body.style.setProperty('--headerFgShadow', 'hsl(228,3%,75%)');
    document.body.style.setProperty('--extBgHi', 'hsl(240, 5%, 78%');
    document.body.style.setProperty('--extFgHi', 'hsl(360, 100%, 100%)');
    document.body.style.setProperty('--extEn', 'hsl(0,0%,28%)');
    document.body.style.setProperty('--extEnShadow', 'hsl(0,0%,40%)');
    document.body.style.setProperty('--extEnHi', 'hsl(0,0%,22%)');
    document.body.style.setProperty('--extEnHiShadow', 'hsl(0,0%,35%)');
    document.body.style.setProperty('--menuBg', 'hsl(240, 5%, 78%)');
    document.body.style.setProperty('--menuFgAct', 'hsl(360, 100%, 100%)');
    document.body.style.setProperty('--menuFgActHi', 'hsl(0, 0%, 94%)');
    document.body.style.setProperty('--menuBgHi', 'hsl(240,5%,69%)');
    document.body.style.setProperty('--menuBgHi2', 'hsl(349, 60%, 59%)');
    document.body.style.setProperty('--desc', 'hsl(0,0%,28%)');
    document.body.style.setProperty('--descShadow', 'hsl(0,0%,38%)');
};

function dark() {
    document.body.style.setProperty('--bg', 'hsl(0,0%,10%)');
    document.body.style.setProperty('--fg', 'hsl(207,5%,42%)');
    document.body.style.setProperty('--fgShadow', 'hsl(207,5%,32%)');
    document.body.style.setProperty('--headerBg', 'hsl(240,3%,13%)');
    document.body.style.setProperty('--headerHi', 'hsl(228,57%,73%)');
    document.body.style.setProperty('--headerHiShadow', 'hsl(228, 57%, 58%)');
    document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--headerFgShadow', 'hsl(228,3%,51%)');
    document.body.style.setProperty('--extBgHi', 'hsl(240,2%,19%)');
    document.body.style.setProperty('--extFgHi', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--extFgHiShadow', 'hsl(228,3%,46%)');
    document.body.style.setProperty('--extEn', 'hsl(228,57%,73%)');
    document.body.style.setProperty('--extEnShadow', 'hsl(228,57%,53%)');
    document.body.style.setProperty('--extEnHi', 'hsl(228,57%,73%)');
    document.body.style.setProperty('--extEnHiShadow', 'hsl(228,57%,53%)');
    document.body.style.setProperty('--menuBg', 'hsl(240,2%,19%)');
    document.body.style.setProperty('--menuFgAct', 'hsl(210,2%,81%)');
    document.body.style.setProperty('--menuFgActHi', 'hsl(210,2%,95%)');
    document.body.style.setProperty('--menuBgHi', 'hsl(229, 59.8%, 59%)');
    document.body.style.setProperty('--menuBgHi2', 'hsl(349, 60%, 59%)');
    document.body.style.setProperty('--desc', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--descShadow', 'hsl(228,3%,56%)');
};

function darker() {
    document.body.style.setProperty('--bg', 'hsl(0, 0%, 8%)');
    document.body.style.setProperty('--fg', 'hsl(207,5%,38%)');
    document.body.style.setProperty('--fgShadow', 'hsl(228,3%,38%)');
    document.body.style.setProperty('--headerBg', 'hsl(0, 0%, 6%)');
    document.body.style.setProperty('--headerHi', 'hsl(357, 55%, 52%)');
    document.body.style.setProperty('--headerHiShadow', 'hsl(357, 55%, 42%)');
    document.body.style.setProperty('--headerFg', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--headerFgShadow', 'hsl(228,3%,51%)');
    document.body.style.setProperty('--extBgHi', 'hsl(0, 0%, 5%)');
    document.body.style.setProperty('--extFgHi', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--extFgHiShadow', 'hsl(228,3%,46%)');
    document.body.style.setProperty('--extEn', 'hsl(357, 55%, 52%)');
    document.body.style.setProperty('--extEnShadow', 'hsl(357, 55%, 22%)');
    document.body.style.setProperty('--extEnHi', 'hsl(357,55%,52%)');
    document.body.style.setProperty('--extEnHiShadow', 'hsl(357,55%,42%)');
    document.body.style.setProperty('--menuBg', 'hsl(0, 0%, 3%)');
    document.body.style.setProperty('--menuFgAct', 'hsl(210,2%,81%)');
    document.body.style.setProperty('--menuFgActHi', 'hsl(210,2%,95%)');
    document.body.style.setProperty('--menuBgHi', 'hsl(0, 0%, 15%)');
    document.body.style.setProperty('--menuBgHi2', 'hsl(357, 55%, 52%)');
    document.body.style.setProperty('--desc', 'hsl(228,3%,66%)');
    document.body.style.setProperty('--descShadow', 'hsl(228,3%,56%)');
};

function small() {
    document.body.style.setProperty('--top', '48px');
    document.body.style.setProperty('--height', '520px');
    var fontsize = document.createElement('style');
    fontsize.innerHTML = '#header {font-size: 14px} body {font-size: 12px} .options, .uninstall, .info, .hide {font-size: 11px}';
    document.body.appendChild(fontsize);
};

function medium() {
    document.body.style.setProperty('--top', '50px');
    document.body.style.setProperty('--height','513px');
    var fontsize = document.createElement('style');
    fontsize.innerHTML = '#header {font-size: 15px} body {font-size: 13px} .options, .uninstall, .info, .hide {font-size: 12px}';
    document.body.appendChild(fontsize);
};

function large() {
    document.body.style.setProperty('--top', '51px');
    document.body.style.setProperty('--height', '532px');
    var fontsize = document.createElement('style');
    fontsize.innerHTML = '#header {font-size: 16px} body {font-size: 14px} .options, .uninstall, .info, .hide {font-size: 13px}';
    document.body.appendChild(fontsize);
};

function gutter() {
    var styleGut = document.createElement('style');
    styleGut.innerHTML = '#header {padding: 16px 20px 11px;} .extension, #menu {padding: 5px 15px 5px 20px;} #txtdiv {padding: 0 15px 0 20px} .extension.dev div::before {content:"$"} .extension.out div::before {content:"[]"}';
    document.body.appendChild(styleGut);
};

function font() {
    var styleWin = document.createElement('style');
    styleWin.innerHTML = 'body {text-shadow: var(--fgShadow) 0 0 1px;} #header{text-shadow: var(--headerFgShadow) 0 0 1px;} #contrast{text-shadow: var(--headerHiShadow) 0 0 1px;} .extension:hover{text-shadow: var(--extFgHiShadow) 0 0 1px;} .extension.enabled {text-shadow: var(--extEnShadow) 0 0 1px;} .extension.enabled:hover {text-shadow: var(--extEnHiShadow) 0 0 1px;} .desc {text-shadow: var(--descShadow) 0 0 1px;}';
    document.body.appendChild(styleWin);
};

function rmMenu() {
    const thisMenu = document.getElementById('menu');
    const thisInfo = document.getElementById('txtdiv');
    if (thisMenu) {
        thisMenu.outerHTML = '';
    }
    if (thisInfo) {
        thisInfo.outerHTML = '';
    }
};

function options() {
    chrome.runtime.openOptionsPage();
};

chrome.storage.sync.get({
    'theme': '',
    'width': '195',
    'fontsize': 'medium',
    'os': ''
}, function(start) {
    const width = start.width;
    document.body.style.maxWidth = width + 'px';
    const theme = start.theme;
    if (theme === 'dark') {
        dark();
    }
    else if (theme === 'light') {
        light();
    }
    else if (theme === 'lighter') {
        lighter();
    }
    else {
        darker();
    }
    const fontsize = start.fontsize;
    if (fontsize === 'small') {
        small();
    }
    else if (fontsize === 'medium') {
        medium();
    }
    else {
        large();
    }
    const os = start.os;
    if (os === 'win') {
        font();
    }
});

chrome.management.getAll(function(info) {
    console.log(info);
    let extItem = {};
    let extID = {};
    let gut = {};
    info.sort(function (a,b) {
        return a.shortName.trim().localeCompare(b.shortName.trim());
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
    if (gut === true) {
        gutter();
    }

    for (i=0; i<extensions.length; i++) {
        extensions[i].addEventListener('click', function(i) {
            rmMenu();
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

            // info
            var inf = document.createElement('span');
            inf.classList.add('info');
            inf.innerHTML = 'info';
            menu.appendChild(inf);
            inf.addEventListener('click', function() {
                const toggle = document.getElementById('txtdiv');
                if (toggle) {
                    toggle.outerHTML = '';
                }
                else {
                    chrome.management.get(extID, function(text) {
                        var version = text.version;
                        var txtdiv = document.createElement('div');
                        txtdiv.id = 'txtdiv';
                        txtdiv.innerHTML = '<p><span class="desc">version </span>' + version + '</p><span class="desc">id </span><span id="copy">' + extID + '</span></p>';
                        extensions[i].insertAdjacentElement('afterend', txtdiv);
                        const cpID = document.getElementById('copy');cpID.addEventListener('click', function() {
                            navigator.clipboard.writeText(extID);
                            cpID.style.cursor = 'default';
                            cpID.innerHTML = 'copied';
                        });
                    });
                }
            });

            //hide
            var hide = document.createElement('span');
            hide.classList.add('hide');
            hide.innerHTML = 'hide';
            menu.appendChild(hide);
            hide.addEventListener('click', function() {

                rmMenu();
                extensions[i].style.display = 'none';
            });

            //options
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

            // uninstall
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
                        rmMenu();
                        extensions[i].style.display = 'none';
                    }
                });
            });
        }.bind(this, i));
    }
});

switcher.addEventListener('mouseleave', rmMenu);
document.getElementById('header').addEventListener('click', options);
