const { ipcRenderer } = require ('electron');
const moment = require('moment');

let duracao;
let segundos;
let timer;


module.exports = {
    iniciar(tempo){
        //CONFIGURANDO STRING
        duracao = moment.duration(tempo.textContent);
        segundos = duracao.asSeconds();

        //INCREMENTO DO TIMER
        console.log("Limpou o timer id: ", timer);
        clearInterval(timer);
        timer = setInterval(()=>{
            segundos++;
            tempo.textContent = this.segundosParaTempo(segundos);
        },1000);
        console.log("Iniciou o timer id: ", timer);
    },
    
    segundosParaTempo(segundos){
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    }, 
    parar(curso){
        clearInterval(timer);
        let tempoEstudado = this.segundosParaTempo(segundos);
        ipcRenderer.send('curso-parado', curso, tempoEstudado);
    }
}