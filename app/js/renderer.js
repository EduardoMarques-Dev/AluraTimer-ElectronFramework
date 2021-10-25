const { ipcRenderer } = require('electron');
const timer = require('./timer');

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');


linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

let imgs = ['img/play-button.svg','img/stop-button.svg']
let play = false;
botaoPlay.addEventListener('click', function(){

    //Controla fluxo do timer
    if (play){
        timer.iniciar(tempo);
        play = true;
    } else {
        timer.parar(tempo);
        play = false;
    }

    //Inverte imagem do botão
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0];
});