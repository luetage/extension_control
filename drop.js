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

function setup() {
    chrome.storage.sync.get({
        'width': '195',
        'fontsize': 'medium',
        'os': ''
    }, function(start) {
        const width = start.width;
        document.body.style.maxWidth = width + 'px';
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
};

function load() {
    chrome.management.getAll(function(info) {
        console.log(info);
        info.sort(function (a,b) {
            return a.shortName.trim().localeCompare(b.shortName.trim());
        });
        chrome.storage.sync.get({'hidden': []}, function(comp) {
            hidden = comp.hidden;
            const thisID = chrome.runtime.id;
            var gut = {};
            var present = [];
            for (i=0; i<info.length; i++) {
                if (info[i].type === 'extension' && info[i].id !== thisID) {
                    extID = info[i].id;
                    present.push(extID);
                    if (hidden.indexOf(info[i].id) === -1) {
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
            }
            var remove = hidden.filter(e => !present.includes(e));
            hidden = hidden.filter(e => !remove.includes(e));
            chrome.storage.sync.set({'hidden': hidden});
            if (gut === true) {
                gutter();
            }
            run();
        });
    });
};

function run() {
    const extensions = document.getElementsByClassName('extension');
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
                        var home = text.homepageUrl;
                        if (home !== '') {
                            var jmp = 0;
                        }
                        else {
                            var jmp = 1;
                        }
                        var txtdiv = document.createElement('div');
                        txtdiv.id = 'txtdiv';
                        txtdiv.innerHTML = '<p><span class="desc">version </span>' + version + '</p><p id="home"><a class="desc" href="' + home + '" target="_blank" rel="noreferrer noopener">homepage</a></p><p><span class="desc">id </span><span id="copy">' + extID + '</span></p>';
                        extensions[i].insertAdjacentElement('afterend', txtdiv);
                        if (jmp === 1) {
                            document.getElementById('home').style.display = 'none';
                        }
                        const cpID = document.getElementById('copy');cpID.addEventListener('click', function() {
                            navigator.clipboard.writeText(extID);
                            cpID.style.cursor = 'default';
                            cpID.innerHTML = 'copied';
                        });
                    });
                }
            });

            // hide
            var hide = document.createElement('span');
            hide.classList.add('hide');
            hide.innerHTML = 'hide';
            menu.appendChild(hide);
            hide.addEventListener('click', function() {
                chrome.storage.sync.get({'hidden': ''}, function(arr) {
                    hidden = arr.hidden;
                    hidden.push(extID);
                    chrome.storage.sync.set({'hidden': hidden}, function() {
                        rmMenu();
                        extensions[i].style.display = 'none';
                        chrome.runtime.sendMessage('hide it!');
                    });
                });
            });

            // options
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
};

hidden = [];
setup();
load();
document.getElementById('switcher').addEventListener('mouseleave', rmMenu);
document.getElementById('header').addEventListener('click', options);
