const fs = require('fs')
const path = require('path')

const listaPrincipal = []; // lista que receberá todas as palavras
const palavrasUsadas = []; // lista que armazena as palavras que já foram contabilizadas
const listaObjetos = []; // lista que irá conter todos os registros de palavras

//função que transforma o buffer retornado pelo readFile em string
const transformarEmString = (string) => { 
    return string.toString();
}

// função que utiliza RegEx para permitir somente caracteres nos intervalos indicados, substituindo os demais por uma string vazia
const removerTodasSujeiras = (string) => { //
    return string.replace(/([^a-zA-Z' 'à-úÀ-Ú])/g, '');
}

// função que deixa todas as letras da string minúsculas
const deixarMinusculo = (string) => {
    return string.toLowerCase();
}

// função que cria uma string com cada palavra através de um split que elimina os espaços vazios
const separarPalavras = (string) => {
    return string.split(' ')
}

// função que elimina da lista as strings vazias geradas pelo RegEx
const retirarStringVazia = (lista) => {
    return lista.filter(element => element !== '')
}

// função que adiciona todas as palavras lidas em uma única lista principal
const adicionarAListaPrincipal = (lista) => {
    lista.map(element => listaPrincipal.push(element));
    return (listaPrincipal)
}

// função fábrica que irá criar os objetos para cada palavra com as chaves palavra, quantidade e percentual
const criarObjetoContagem = (palavra, quantidade, percentual) => {
    return {
        palavra,
        quantidade,
        percentual
    }
}

// função que obtém as informações de cada palavra verificando se a mesma já foi processada anteriormente, caso não, a quantidade e o percentual dessa palavra será contabilizado
// e então as informações serão passadas para a função fábrica gerar os objetos, que serão armazenados na lista de objetos.
const obterInfoDasPalavras = (listaPalavras) => {
    listaPalavras.map(element => {
        if (palavrasUsadas.indexOf(element) === -1) {
            palavrasUsadas.push(element);
            const listaQuantidade = listaPalavras.filter(element2 => element2 === element);
            const quantidade = listaQuantidade.length;
            const percentual = ((quantidade/listaPalavras.length) * 100).toFixed(2);
            listaObjetos.push(criarObjetoContagem(element, quantidade, parseFloat(percentual)))
        }   
    })
    return listaObjetos
}

// função que ordena a lista de objetos baseando-se na chave quantidade e de forma decrescente
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

// função que transforma a lista de objetos naturais em JSON
const transformarEmJSON = lista => {
    return JSON.stringify(lista, null, ' ')
}

// função assíncrona responsável por escrever a lista JSON em um arquivo chamado resultado.txt
const escreverArquivo = JSON => {
    fs.writeFile(path.join(__dirname, 'resultado.txt'), JSON, (err) => {
        if (err)
          console.log(err);
        else {
          console.log("Arquivo escrito com sucesso!");
        }})
}

// função responsável por criar uma composição de outras funções
const composicao = (...fns) => (_, lista) => fns.reduce((acc,fn) => fn(acc), lista)

// função que utiliza composição para tratar os primeiros arquivos a serem lidos.
const tratamentoDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    deixarMinusculo,
    separarPalavras,
    retirarStringVazia,
    adicionarAListaPrincipal,
   
)

// função que utiliza composição para tratar o último arquivo a ser lido
const tratamentoFinalDoArquivo = composicao(
    transformarEmString,
    removerTodasSujeiras,
    deixarMinusculo,
    separarPalavras,
    retirarStringVazia,
    adicionarAListaPrincipal,
    obterInfoDasPalavras,
    ordenaListaDeAcordoComAQuantidade,
    transformarEmJSON,
    escreverArquivo
   
)

// função principal que recebe uma lista de dados de que serão lidos e tratados assincronamente
// Obs. A lista pode contar uma quantidade indeterminada de dados.
const gerarResultado = (dados) => {
    dados.map(element => {
        dados.indexOf(element) === (dados.length - 1) 
            ? fs.readFile(path.join(__dirname, element), tratamentoFinalDoArquivo)
            : fs.readFile(path.join(__dirname, element), tratamentoDoArquivo)
    })
}

// lista de dados a serem lidos
const dados = ['dados1.txt', 'dados2.txt'];

// chamada da função principal
gerarResultado(dados)






