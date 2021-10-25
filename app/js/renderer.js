const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');


linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg','img/stop-button.svg']
botaoPlay.addEventListener('click', function(){
    imgs = imgs.reverse();

    timer.iniciar(tempo);

    botaoPlay.src = imgs[0];
});