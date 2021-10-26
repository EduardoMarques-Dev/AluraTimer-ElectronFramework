const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let curso = document.querySelector(".curso");
let imgs = ['img/play-button.svg','img/stop-button.svg']
let play = true;

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});


botaoPlay.addEventListener('click', function(){

    //Controla fluxo do timer
    if (play){
        timer.iniciar(tempo);
        play = false;
    } else {
        timer.parar(curso.textContent);
        play = true;
    }

    //Inverte imagem do botão
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0];
});