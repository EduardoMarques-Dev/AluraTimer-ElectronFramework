const { ipcRenderer, shell } = require('electron');
    const process = require('process');

let linkFechar = document.querySelector("#link-fechar");
let linkTwitter = document.querySelector("#link-linkedin");
let versaoElectron = document.querySelector('#versao-electron');

window.onload = function(){
    versaoElectron.textContent = process.versions.electron;
}

linkFechar.addEventListener('click', function () {
    ipcRenderer.send('fechar-janela-sobre');
})

linkTwitter.addEventListener('click', function () {
    /*
    Shel é utilizado para abrir o link no navegador padrão
    Sem ele, o link abriria dentro do próprio electron.
    */
    shell.openExternal("https://www.linkedin.com/in/carlosedmarques/");
})
