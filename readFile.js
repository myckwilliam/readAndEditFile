const fs = require('fs')
const path = require('path')

const caminho = path.join(__dirname, 'nomes.txt')
//Callback
const transformarEmString = (string) => {
    return string.toString();
}

const removerTodasSujeiras = (string) => {
    return string.replace(/([\u0300-\u036f]|[^a-zA-Z' 'à-úÀ-Ú])/g, '');
}

const separarPalavras = (string) => {
    return string.split(' ')
}

const retirarEspacosVazios = (lista) => {
    return lista.filter(element => element != '')
}

const colocarNoLog = (lista) => {
    console.log(lista);
}

const composicao = (...fns) => (_, lista) => fns.reduce((acc,fn) => fn(acc), lista)

const tratamentoDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    separarPalavras,
    retirarEspacosVazios,
    colocarNoLog
)


fs.readFile(caminho, tratamentoDoArquivo)

console.log("Vai aparecer primeiro.")
console.log(' ');