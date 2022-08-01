var genes = [];
var maxCromossomos = 30;
var maxGeracoes = 20;
var geracaoAtual = 0;

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
    populacao[individuo].pontuacao = x * x - 3 * x + 4;
  }
}

// Terceiro passo -> Enquanto critério de parada não for satisfeito
function algoritmoGenetico(populacao) {
  var novaPopulacao = [];
  // Selecionar os indivíduos mais aptos.
  populacao.sort(function (a, b) { // Realiza uma ordenação por aqueles que possuem uma melhor pontuação
    if (a.pontuacao > b.pontuacao) {
      return -1;
    }
    if (a.pontuacao < b.pontuacao) {
      return 1;
    }
    return 0;
  })
  pai = populacao[0];
  mae = populacao[1];
  achou = true;
  // Garantir que os 2 resultados sejam diferentes.
  for(individuo in populacao){
    if(populacao[individuo].pontuacao != pai.pontuacao && achou == true){
      mae = populacao[individuo];
      achou = false;
    }
  }

  if(geracaoAtual < maxGeracoes) { // Criterio de parada gerar 20 gerações

    // Dois melhores resultados da população foram salvos.
    novaPopulacao.push(pai);
    novaPopulacao.push(mae);

    // Criar novos indivíduos aplicando os operadores crossover e mutação.
    for(var j=0; j<maxCromossomos-2; j++){
      var novoCromossomo = new cromossomos();
      // Mutação
      var randomMutacao = Math.floor((Math.random()*100)+1); // Aplicar Mutação com taxa de 1%
      if(randomMutacao == 1){
        novoCromossomo.numero = randomInt(min, max)
        novoCromossomo.binario = novoCromossomo.numero.toString(2);
        console.log("Digimon digienvolve para ANTEDEGUEMON!!!"); 
      }
      else {
        console.log("Pai:"+pai.binario)
        console.log("Mãe: "+mae.binario)
      }
      // Armazenar os novos indivíduos em uma nova população.
      novaPopulacao.push(novoCromossomo);
    }
    geracaoAtual++;
    //Avaliar cada cromossomo da nova população.
    avaliacao(novaPopulacao)
    algoritmoGenetico(novaPopulacao);
  }
  else {
    console.log("Acabou!")
    //console.log(populacao)
  }
}

populacaoInicial();
avaliacao(genes);
algoritmoGenetico(genes);

