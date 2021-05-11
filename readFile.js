const fs = require('fs')
const path = require('path')

const caminho = path.join(__dirname, 'nomes.txt')
//Callback
const toStringSplit = (conteudo) => {
    const string = conteudo.toString();
    const arr = string.split(' ');
    return arr
}

const mostrarQuandoProcessar = (_, conteudo) => {
    const toStringSplit = (conteudo) => {
        const string = conteudo.toString();
        const arr = string.split(' ');
        return arr
    }
    
    const exibirConteudo = (_, conteudo) => {
        console.log(conteudo.toString());
        console.log(" ");
    }
    
    const exibirComQuebraDeLinha = (_, conteudo) => {
        arr = toStringSplit(conteudo);
        arr.map(element => console.log(element));
        console.log(" ");
    }
    
    const exibirEmOrdemAlfabetica = (_, conteudo) => {
        const arrSort = toStringSplit(conteudo).sort();
        arrSort.map(element => console.log(element));
        console.log(' ')
    }

    fs.readFile(caminho, exibirConteudo);
    fs.readFile(caminho, exibirComQuebraDeLinha)
    fs.readFile(caminho, exibirEmOrdemAlfabetica);

    console.log('Está dentro da callback.')
    console.log(' ')
}

fs.readFile(caminho, mostrarQuandoProcessar)

console.log("Vai aparecer primeiro.")
console.log(' ');