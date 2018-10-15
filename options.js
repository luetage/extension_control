const optlight = document.getElementById('light');
const optlighter = document.getElementById('lighter');
const optdark = document.getElementById('dark');
const optdarker = document.getElementById('darker');
const optSmall = document.getElementById('small');
const optMedium = document.getElementById('medium');
const optLarge = document.getElementById('large');
const slide = document.getElementById('maxwidth');
const disp = document.getElementById('display');
let width = {};
let theme = {};
let fontsize = {};

chrome.management.getSelf(function(info) {
    const ver = info.version;
    const version = document.getElementById('version');
    version.innerHTML = ' ' + ver;
});

chrome.storage.sync.get({
    'theme': '',
    'width': '195',
    'fontsize': 'medium'
}, function(start) {
    width = start.width;
    slide.value = width;
    disp.innerHTML = width + 'px';
    theme = start.theme;
    if (theme === 'dark') {
        optdark.classList.add('enabled');
    }
    else if (theme === 'light') {
        optlight.classList.add('enabled');
    }
    else if (theme === 'lighter') {
        optlighter.classList.add('enabled');
    }
    else {
        optdarker.classList.add('enabled');
    }    
    fontsize = start.fontsize;
    if (fontsize === 'large') {
        optLarge.classList.add('enabled');
    }
    else if (fontsize === 'small') {
        optSmall.classList.add('enabled');
    }
    else {
        optMedium.classList.add('enabled');
    }
});

function setTheme() {
    chrome.storage.sync.set({'theme': theme}, function(lightlighterdarkdarker) {
        console.log(theme);
    });
};

function setdark() {
    if (theme !== 'dark') {
        theme = 'dark';
        optlight.classList.remove('enabled');
        optlighter.classList.remove('enabled');
        optdarker.classList.remove('enabled');
        optdark.classList.add('enabled');
        setTheme();
    }
};

function setlight() {
    if (theme !== 'light') {
        theme = 'light';
        optlighter.classList.remove('enabled');
        optdark.classList.remove('enabled');
        optdarker.classList.remove('enabled');
        optlight.classList.add('enabled');
        setTheme();
    }
};

function setlighter() {
    if (theme !== 'lighter') {
        theme = 'lighter';
        optlight.classList.remove('enabled');
        optdark.classList.remove('enabled');
        optdarker.classList.remove('enabled');
        optlighter.classList.add('enabled');
        setTheme();
    }
};

function setdarker() {
    if (theme !== 'darker') {
        theme = 'darker';
        optlight.classList.remove('enabled');
        optlighter.classList.remove('enabled');
        optdark.classList.remove('enabled');
        optdarker.classList.add('enabled');
        setTheme();
    }
};

function setFontsize() {
    chrome.storage.sync.set({'fontsize': fontsize}, function(smallToLarge) {
        console.log(fontsize);
    });
};

function setSmall() {
    if (fontsize !== 'small') {
        fontsize = 'small';
        optMedium.classList.remove('enabled');
        optLarge.classList.remove('enabled');
        optSmall.classList.add('enabled');
        setFontsize();
    }
};

function setMedium() {
    if (fontsize !== 'medium') {
        fontsize = 'medium';
        optMedium.classList.add('enabled');
        optLarge.classList.remove('enabled');
        optSmall.classList.remove('enabled');
        setFontsize();
    }
};

function setLarge() {
    if (fontsize !== 'large') {
        fontsize = 'large';
        optMedium.classList.remove('enabled');
        optLarge.classList.add('enabled');
        optSmall.classList.remove('enabled');
        setFontsize();
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

optlight.addEventListener('click', setlight);
optlighter.addEventListener('click', setlighter);
optdark.addEventListener('click', setdark);
optdarker.addEventListener('click', setdarker);
optSmall.addEventListener('click', setSmall);
optMedium.addEventListener('click', setMedium);
optLarge.addEventListener('click', setLarge);
document.getElementById('extPage').addEventListener('click', function() {
    chrome.runtime.sendMessage('extensions pls');
});
