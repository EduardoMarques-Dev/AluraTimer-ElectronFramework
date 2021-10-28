const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require("../../data")

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let nomeCurso = document.querySelector(".curso").textContent;
let imgs = ['img/play-button.svg','img/stop-button.svg']
let play = true;

window.onload = ()=>{
    /*
    Busca os dados salvos em Json do tempo corrido do curso
    e atualiza a informação no html.
    */
    data.pegaDados(nomeCurso)
    .then((dados)=>{
        tempo.textContent=dados.tempo;
    });
}

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', function(){

    //Controla fluxo do timer
    if (play){
        timer.iniciar(tempo);
        play = false;
    } else {
        timer.parar(nomeCurso);
        play = true;
    }

    //Inverte imagem do botão
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0];
});