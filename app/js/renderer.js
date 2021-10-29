const { ipcRenderer } = require('electron');
const timer = require('./timer');
const data = require("../../data")

let linkSobre = document.querySelector('#link-sobre');
let botaoPlay = document.querySelector('.botao-play');
let tempo = document.querySelector('.tempo');
let nomeCurso = document.querySelector(".curso");
let imgs = ['img/play-button.svg','img/stop-button.svg']
let play = true;
let botaoAdicionar = document.querySelector(".botao-adicionar");
let campoAdicionar = document.querySelector(".campo-adicionar")

window.onload = ()=>{
    /*
    Busca os dados salvos em Json do tempo corrido do curso
    e atualiza a informação no html.
    */
    data.pegaDados(nomeCurso.textContent)
    .then((dados)=>{
        tempo.textContent=dados.tempo;
    });
}
// Essa função está recebendo informações da main.
ipcRenderer.on('curso-trocado', (event, x)=>{
    nomeCurso.textContent = x;
    /*
    Busca os dados salvos em Json do tempo corrido do curso
    e atualiza a informação no html.
    */
    data.pegaDados(nomeCurso.textContent)
        .then((dados)=>{
            tempo.textContent=dados.tempo;
        })
})

linkSobre.addEventListener('click' , function(){
    ipcRenderer.send('abrir-janela-sobre');
});

botaoPlay.addEventListener('click', function(){

    //Controla fluxo do timer
    if (play){
        timer.iniciar(tempo);
        play = false;
    } else {
        timer.parar(nomeCurso.textContent);
        play = true;
        ipcRenderer.send('recarregar-tray-meu');
    }

    //Inverte imagem do botão
    imgs = imgs.reverse()
    botaoPlay.src = imgs[0];
});

botaoAdicionar.addEventListener('click', ()=>{

    let textoDoCampo = campoAdicionar.value.trim();

    if (textoDoCampo != ""){

        if(play == false){
            timer.parar(nomeCurso.textContent);
            imgs = imgs.reverse()
            botaoPlay.src = imgs[0];
            play=true;
        }
            nomeCurso.textContent = textoDoCampo;
            tempo.textContent = "00:00:00";
            campoAdicionar.value="";

            //ipcRenderer.send("curso-adicionado",nomeCurso.textContent);

    }

});