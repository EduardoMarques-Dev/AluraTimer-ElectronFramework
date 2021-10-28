const jsonFile = require('jsonfile-promised');
// fs = File System, é um módulo do node.
const fs = require('fs');
const { X_OK } = require('constants');
let CaminhoDoCurso = (X)=>{
    return `${__dirname}/data/${X}.json`
}

module.exports = {
    salvaDados(nomeCurso, tempoEstudado){
        // Seta o caminho do arquivo que guarda as informações do curso
        let arquivoDoCurso = CaminhoDoCurso(nomeCurso);
        // Verifica se já existe um arquivo no caminho especificado
        if(fs.existsSync(arquivoDoCurso)){
            // Adiciona o tempo corrido ao arquivo
            this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
        }else{
            // Cria o arquivo
            this.criaArquivoDeCurso(arquivoDoCurso,{})
                .then(()=>{
                    // Adiciona o tempo corrido ao arquivo
                    this.adicionaTempoAoCurso(arquivoDoCurso,tempoEstudado);
                })
        }
    },
    pegaDados(nomeCurso){
        let ArquivoDoCurso = CaminhoDoCurso(nomeCurso);
        return jsonFile.readFile(ArquivoDoCurso);
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
    },
    pegaNomeDosCursos(){
        // Salva os nomes dos arquivos especificados no caminho
        let nomeArquivos = fs.readdirSync(`${__dirname}/data/`);
        let nomeCursos = nomeArquivos.map((arquivo)=>{
            return arquivo.substr(0, arquivo.lastIndexOf('.')).replace("-"," ");
        });
        
        return nomeCursos;
    }
}