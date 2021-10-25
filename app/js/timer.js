const moment = require('moment');
let segundos;
let timer;

module.exports = {
    iniciar(el){
        //CONFIGURANDO STRING
        let tempo = moment.duration(el.textContent);
        segundos = tempo.asSeconds();

        //INCREMENTO DO TIMER
        console.log("Limpou o timer id: ", timer);
        clearInterval(timer);
        timer = setInterval(()=>{
            segundos++;
            el.textContent = this.segundosParaTempo(segundos);
        },1000);
        console.log("Iniciou o timer id: ", timer);
    },
    
    segundosParaTempo(segundos){
        return moment().startOf('day').seconds(segundos).format("HH:mm:ss");
    }, 
    
    parar(el){
        clearInterval(timer);
    }
}