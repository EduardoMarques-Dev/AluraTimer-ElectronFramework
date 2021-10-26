const jsonFile = require('jsonfile-promised');
const fs = require('fs');

module.exports = {
    salvaDados(nomeCurso, tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/' + nomeCurso + '.json';
        if(fs.existsSync(arquivoDoCurso)){

        }else{
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(()=>{

                })
        }
    },
    criaArquivoDeCurso(arquivoDoCurso, conteudoArquivo){
       return jsonFile.writeFile(arquivoDoCurso, conteudoArquivo)
            .then(()=>{
                console.log('Arquivo Criado')
            }).catch(()=>{
                console.log(err);
            });
    }
}