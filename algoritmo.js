// Dicionário para auxiliar com números binários na hora de realizar cross-over e mutação
var dict = new Map();
dict.set(-10, '11010');
dict.set(-9, '11001');
dict.set(-8, '11000');
dict.set(-7, '10111');
dict.set(-6, '10110');
dict.set(-5, '10101');
dict.set(-4, '10100');
dict.set(-3, '10011');
dict.set(-2, '10010');
dict.set(-1, '10001');
dict.set(0, '00000');
dict.set(1, '00001');
dict.set(2, '00010');
dict.set(3, '00011');
dict.set(4, '00100');
dict.set(5, '00101');
dict.set(6, '00110');
dict.set(7, '00111');
dict.set(8, '01000');
dict.set(9, '01001');
dict.set(10, '01010');
////////////////////////////////////////////////////
// Variavéis auxilizares
var genes = [];
var maxCromossomos = 30;
var maxGeracoes = 20;
var geracaoAtual = 0;

// Intervalo do valores de X
var min = -10;
var max = 10;

function Cromossomo() {
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
    var novoCromossomo = new Cromossomo();
    novoCromossomo.numero = randomInt(min, max)
    novoCromossomo.binario = dict.get(novoCromossomo.numero)
    genes.push(novoCromossomo);
  }
}

// Segundo passo -> Avaliar cada indivíduo da população. 
function avaliacao(populacao) {

  for (individuo in populacao) {
    //Calculo de Fitness
    x = populacao[individuo].numero;
    populacao[individuo].pontuacao = (x * x) - (3 * x) + 4;
  }
}

// Terceiro passo -> Enquanto critério de parada não for satisfeito
function algoritmoGenetico(populacao) {
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

  // Elimina os 3 individuos menos aptos, para permanecer 2 mais aptos + 1 que será o cross-over ou mutação.

  pai = populacao[0];
  mae = populacao[1];
  achou = true;
  // Gerar 2 resultados diferentes se possível.
  for (individuo in populacao) {
    if (populacao[individuo].pontuacao != pai.pontuacao && achou == true) {
      mae = populacao[individuo];
      achou = false;
    }
  }

  if (geracaoAtual < maxGeracoes) { // Criterio de parada gerar 20 gerações
    populacao.pop();
    populacao.pop();
    // Dois melhores resultados da população foram salvos.
    populacao.push(pai);
    populacao.push(mae);

    // Criar novos indivíduos aplicando os operadores crossover e mutação.

    // Mutação
    var randomMutacao = Math.floor((Math.random() * 100) + 1);
    
    if (randomMutacao == 1) { //1% de taxa para mutação
      novoCromossomo = new Cromossomo();
      populacao.pop();  
      binarioPai = dict.get(pai.numero);
      auxMutante = binarioPai;
      posMutacao = randomInt(0,binarioPai.length-1);
      auxMutante[posMutacao] = binarioPai[posMutacao] = '1' ? '0' : '1'; 

      novoCromossomo.numero = getChave(auxMutante)
      novoCromossomo.binario = auxMutante;
      populacao.push(novoCromossomo);

    }
    else if(randomMutacao <= 70) { //70% de cross-over
      populacao.pop();
      populacao.pop();  
      binarioPai = dict.get(pai.numero);
      binarioMae = dict.get(mae.numero);
      //Cross-over (XX Y XX)
      binarioFilhoUm = binarioPai.slice(0, 2) + binarioMae[2] + binarioPai.slice(3, 5); 
      binarioFilhoDois = binarioMae.slice(0, 2) + binarioPai[2] + binarioMae.slice(3, 5); 

      filhoUm = new Cromossomo();
      filhoUm.numero = getChave(binarioFilhoUm);
      filhoUm.binario = binarioFilhoUm;
      
      filhoDois = new Cromossomo();
      filhoDois.numero = getChave(binarioFilhoDois);
      filhoDois.binario = binarioFilhoDois;

      populacao.push(filhoUm);
      populacao.push(filhoDois);
    }


    geracaoAtual++;
    //Avaliar cada cromossomo da nova população.
    avaliacao(populacao);
    console.log(populacao);
    algoritmoGenetico(populacao);
  }
  else {
    console.log("Acabou!")
    console.log(populacao)
  }
}

function getChave(valorAux) {
  for (const [chave, valor] of dict.entries()) {
    if (valor == valorAux) {
      return chave;
    }
  }
}

populacaoInicial();
avaliacao(genes);
algoritmoGenetico(genes);

