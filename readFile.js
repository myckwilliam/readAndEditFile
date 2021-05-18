const fs = require('fs')
const path = require('path')
const { promisify } = require('util');

const listaPrincipal = [];
const palavrasUsadas = [];
const listaObjetos = [];

const transformarEmString = (string) => {
    return string.toString();
}

const removerTodasSujeiras = (string) => {
    return string.replace(/([^a-zA-Z' 'à-úÀ-Ú])/g, '');
}

const separarPalavras = (string) => {
    return string.split(' ')
}

const retirarEspacosVazios = (lista) => {
    return lista.filter(element => element !== '')
}

const adicionarAListaPrincipal = (lista) => {
    lista.map(element => listaPrincipal.push(element));
    return (listaPrincipal)
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
            const percentual = ((quantidade/listaPalavras.length) * 100).toFixed(2);
            listaObjetos.push(criarObjetoContagem(element, quantidade, percentual))
        }   
    })
    return listaObjetos
}

const ordenaListaDeAcordoComAQuantidade = lista => {
    lista.sort( (a, b) => {
        if (a.quantidade > b.quantidade) {
          return -1;
        }
        if (a.quantidade < b.quantidade) {
          return 1;
        }
        return 0;
      });
    return lista;
}

const transformarEmJSON = lista => {
    return JSON.stringify(lista, null, ' ')
}

const escreverArquivo = JSON => {
    fs.writeFileSync(path.join(__dirname, 'teste.txt'), JSON)
}


const composicao = (...fns) => (_, lista) => fns.reduce((acc,fn) => fn(acc), lista)

const tratamentoDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    separarPalavras,
    retirarEspacosVazios,
    adicionarAListaPrincipal,
   
)
const tratamentoDoArquivo2 = composicao(
    transformarEmString,
    removerTodasSujeiras,
    separarPalavras,
    retirarEspacosVazios,
    adicionarAListaPrincipal,
    obterInfoDasPalavras,
    ordenaListaDeAcordoComAQuantidade,
    transformarEmJSON,
    escreverArquivo
   
)

const gerarResultado = (dados) => {
    dados.map(element => {
        dados.indexOf(element) === (dados.length - 1) 
        ? fs.readFile(path.join(__dirname, element), tratamentoDoArquivo2)
        : fs.readFile(path.join(__dirname, element), tratamentoDoArquivo)
    })
}

const dados = ['dados1.txt', 'dados2.txt', 'dados3.txt'];

gerarResultado(dados)






