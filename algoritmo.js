var genes = [];
var maxCromossomos = 30;
var maxGeracoes = 20;

// Intervalo do valores de X
var min = -10;
var max = 10;

function cromossomos() {
  this.numero = null;
  this.pontuacao = null;
  this.binario = null;
}

// Função para gerar numero randomico dentro do intervalo.
function randomInt(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}

// Primeiro passo -> Gerar a população inicial.
function populacaoInicial() {
  for (var i = 0; i < maxCromossomos; i++) {
    var novoCromossomo = new cromossomos();
    novoCromossomo.numero = randomInt(min, max)
    novoCromossomo.binario = novoCromossomo.numero.toString(2)
    genes.push(novoCromossomo);
  }
}

// Segundo passo -> Avaliar cada indivíduo da população. 
function avaliacao(populacao) {
  for (individuo in populacao) {
    //Calculo de Fitness
    x = populacao[individuo].numero;
    populacao[individuo].pontuacao = x*x-3*x+4;
  }
}

// Terceiro passo -> Enquanto critério de parada não for satisfeito
function algoritmoGenetico(populacao){
  for(var i=0; i<20; i++){
    // Selecionar os indivíduos mais aptos.

    // Criar novos indivíduos aplicando os operadores crossover e mutação.

    // Armazenar os novos indivíduos em uma nova população.

    // Avaliar cada cromossomo da nova população.
  }
}

populacaoInicial();
avaliacao(genes);
console.log(genes)
algoritmoGenetico(genes);

