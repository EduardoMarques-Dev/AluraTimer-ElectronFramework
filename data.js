const jsonFile = require('jsonfile-promised');
const fs = require('fs');


module.exports = {
    salvaDados(nomeCurso, tempoEstudado){
        let arquivoDoCurso = __dirname + '/data/' + nomeCurso + '.json';
        if(fs.existsSync(arquivoDoCurso)){
            this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
        }else{
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(()=>{
                    this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
                })
        }
    },
    pegaDados(nomeCurso){
        let arquivoDoCurso = __dirname + '/data/' + nomeCurso + '.json';
        console.log("Arquivo do curso = " + arquivoDoCurso)
        return jsonFile.readFile(arquivoDoCurso)
    },
    adicionaTempoAoCurso(arquivoDoCurso, tempoEstudado){
        let dados = {
            ultimoEstudo: new Date().toString(),
            tempo: tempoEstudado
        }

        jsonFile.writeFile(arquivoDoCurso,dados,{spaces:2})
            .then(()=>{
                console.log('Tempo salvo com sucesso')
            }).catch(()=>{
                console.log(err)
            })
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