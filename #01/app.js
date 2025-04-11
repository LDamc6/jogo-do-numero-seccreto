// let titulo = document.querySelector ('h1');
// titulo.innerHTML = 'Jogo do número secreto'

// let paragrafo = document.querySelector ('p');
// paragrafo.innerHTML = 'Escolha um número entre 1 a 10';
let numeroEscolhidoSorteado = [];
let numeroLimite = 10
let numeroSecreto = numeroAleatorio()
let tentativas = 1;
exibirMensagemInicial()
function exibirNaTela (tag, texto){
    let campo = document.querySelector (tag);
    campo.innerHTML = texto;
    if ('speechSynthesis' in window) {
        let utterance = new SpeechSynthesisUtterance(texto);
        utterance.lang = 'pt-BR'; 
        utterance.rate = 1.2; 
        window.speechSynthesis.speak(utterance); 
    } else {
        console.log("Web Speech API não suportada neste navegador.");
    }
    
}
function exibirMensagemInicial(){
    exibirNaTela('h1','Jogo do número secreto');
exibirNaTela('p','Escolha um número entre 1 a 10' );
}

function verificarChute(){
    let chute = document.querySelector('input').value
   if (chute == numeroSecreto){
    exibirNaTela('h1', 'Acertou!');
    let palavraTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
    let mensagemTentativas = `Você acertou o número secreto com ${tentativas} ${palavraTentativas}!`;
    exibirNaTela('p',mensagemTentativas);
    document.getElementById('reiniciar').removeAttribute('disabled')
   }else{
    if(chute > numeroSecreto){
        exibirNaTela('p','O número é menor');
    }else{
        exibirNaTela('p','O número é maior');
    }
    
   } 
   tentativas++;
   limparCampo();
}

function numeroAleatorio() {
    let numeroEscolhido = parseInt(Math.random() * numeroLimite + 1)
    let quantidadeDeElementosNaLista = numeroEscolhidoSorteado.length;
    if(quantidadeDeElementosNaLista == numeroLimite){
        numeroEscolhidoSorteado = [];
    }
    if(numeroEscolhidoSorteado.includes(numeroEscolhido))
        return numeroAleatorio();
    else{
        numeroEscolhidoSorteado.push(numeroEscolhido);
        return numeroEscolhido;
    }
}

function limparCampo(){
    chute = document.querySelector('input')
    chute.value = ''
}
function reiniciarjogo(){
    numeroSecreto = numeroAleatorio()
    limparCampo();
    tentativas = 1;
  exibirMensagemInicial()
  document.getElementById('reiniciar').getAttribute('disabled', true)
 
}