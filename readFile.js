const fs = require('fs')
const path = require('path')

const listaPrincipal = [];
const palavrasUsadas = [];
const listaObjetos = [];

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

const criarObjetoContagem = (palavra, quantidade, percentual) => {
    return {
        palavra,
        quantidade,
        percentual
    }
}

const obterInfoDasPalavras = (listaPalavras) => {
    listaPalavras.map(element => {
        if (palavrasUsadas.indexOf(element) === -1) {
            palavrasUsadas.push(element);
            const listaQuantidade = listaPalavras.filter(element2 => element2 === element);
            const quantidade = listaQuantidade.length;
            const percentual = (quantidade/listaPalavras.length) * 100;
            listaObjetos.push(criarObjetoContagem(element, quantidade, percentual))
        }   
    })
    return listaObjetos
}

const composicao = (...fns) => (_, lista) => fns.reduce((acc,fn) => fn(acc), lista)

const tratamentoDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    separarPalavras,
    retirarEspacosVazios,
    adicionarAListaPrincipal,
    obterInfoDasPalavras
)

const gerarResultado = (dados) => {
    dados.map(element => fs.readFile(path.join(__dirname, element), tratamentoDoArquivo));
}

const dados = ['nomes.txt', 'nomes2.txt']

console.log(gerarResultado(dados))







