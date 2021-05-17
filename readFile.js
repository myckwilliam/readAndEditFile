const fs = require('fs')
const path = require('path')

const listaPrincipal = [];

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
    return lista.filter(element => element !== '')
}

const adicionarAListaPrincipal = (lista) => {
    lista.map(element => listaPrincipal.push(element));
    return listaPrincipal
}

const composicao = (...fns) => (_, lista) => fns.reduce((acc,fn) => fn(acc), lista)

const tratamentoDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    separarPalavras,
    retirarEspacosVazios,
    adicionarAListaPrincipal,

)

const gerarResultado = (dados) => {
    dados.map(element => fs.readFile(path.join(__dirname, element), tratamentoDoArquivo));
}

const dados = ['nomes.txt', 'nomes2.txt']

gerarResultado(dados)







