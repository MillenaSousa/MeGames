var senhaGerada = [];
var senhaDigitada = [];
var tentativaAtual = 0;
const botaoEnviar = document.querySelector(".btn-enviar");

botaoEnviar.disabled = true;
function criarSenha() {  
    while (senhaGerada.length <= 3) {
        var valor = Math.floor(Math.random() * 10)
        if (senhaGerada.indexOf(Number(valor)) < 0) {
            senhaGerada.push(valor)
        }
    }

}

function inserir(num) {
    if (senhaDigitada.length < 4) {
        senhaDigitada.push(num)
        document.getElementById('num-digitados').innerHTML += num;
        botaoEnviar.disabled = senhaDigitada.length !== 4;
    }


}
function remover() { 
    var numDigitados = document.getElementById('num-digitados').innerHTML;
    document.getElementById('num-digitados').innerHTML = numDigitados.substring(0, numDigitados.length - 1)
    senhaDigitada.pop()

}
function limparCampo() {
    document.getElementById('num-digitados').innerHTML = "";
    senhaDigitada = []

}
function adicionar() {
    tentativaAtual ++ ;
    document.getElementById('historico').innerHTML +=
        `<div class="div-tentativa div-tent-${tentativaAtual}">
            <p class="numero${tentativaAtual}">${tentativaAtual}°</p>
            <p class="digito digito-${tentativaAtual}-1">${senhaDigitada[0]}</p>
            <p class="digito digito-${tentativaAtual}-2">${senhaDigitada[1]}</p>
            <p class="digito digito-${tentativaAtual}-3">${senhaDigitada[2]}</p>
            <p class="digito digito-${tentativaAtual}-4">${senhaDigitada[3]}</p>
        </div>`;

}
function conferirDigitos() {
    const elementosDigito = document.querySelectorAll(`.div-tent-${tentativaAtual} .digito`);

    for (let i = 0; i < senhaDigitada.length; i++) {
        if (senhaGerada.indexOf(senhaDigitada[i]) >= 0) {
            if (senhaDigitada.indexOf(senhaDigitada[i]) === senhaGerada.indexOf(senhaDigitada[i])) {
                elementosDigito[i].style.color = 'green';
            } else {
                elementosDigito[i].style.color = 'yellow';
            }
        } else if (senhaGerada.indexOf(senhaDigitada[i]) < 0) {
            elementosDigito[i].style.color = 'red';
        }
    }


    for (let x = 0; x < senhaDigitada.length; x++) {
        if (tentativaAtual == 5) {
            if (senhaGerada[0] == senhaDigitada[0] &&
                senhaGerada[1] == senhaDigitada[1] &&
                senhaGerada[2] == senhaDigitada[2] &&
                senhaGerada[3] == senhaDigitada[3]) {
                return jogaNovamente()
            } else if (senhaDigitada[x] !== senhaGerada[x]) {
                return tentativas()
            }
        } else if (senhaGerada[0] == senhaDigitada[0] &&
            senhaGerada[1] == senhaDigitada[1] &&
            senhaGerada[2] == senhaDigitada[2] &&
            senhaGerada[3] == senhaDigitada[3]) {
            return jogaNovamente()
        }
    }
}
function novaAba(url) {
    var win = window.open(url, '_blank');
    win.focus();
}
function jogaNovamente() {
    setTimeout(() => {
        if (confirm("parabens você acertou a senha!! Jogar novamente? ") == true) {
            return recarregar()
        } else {
            return novaAba('../pages/index.html')
        }
    }, 1000);

}
function recarregar() {
    window.location.reload(true);
    return
}
function tentativas() {
    setTimeout(() => {
        alert("tentativas esgotada")
        return recarregar()
    }, 800);
}

function enviar() {
    criarSenha();
    console.log(senhaGerada)
    if (senhaDigitada.length === 4) {
        adicionar()
        conferirDigitos()
        limparCampo()
        botaoEnviar.disabled = true;
    } else {
        alert("Por favor, digite 4 números.")
    }

}