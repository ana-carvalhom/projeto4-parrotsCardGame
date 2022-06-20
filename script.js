let jogada = 0;
let acertos = 0;
let cardVirado = [];
let acertosFim = 0;
let jogando = 0;
let parrots = ["./img/bobrossparrot.gif",
"./img/explodyparrot.gif",
"./img/fiestaparrot.gif",
"./img/metalparrot.gif",
"./img/revertitparrot.gif",
"./img/tripletsparrot.gif",
"./img/unicornparrot.gif"
]

let selecionados = [];

function jogar(){
    let cards = parseInt(prompt("Com quantas cartas você quer jogar? Escolha um número entre 4 e 14 cartas."));

    while((cards % 2 !==0) || (cards < 4) || (cards > 14)){
        cards = parseInt(prompt("Por favor, escolha um número par entre 4 e 14."));
    }

    let game = ((cards / 2) * 150);
    let lista = document.querySelector(".cards");
    lista.style.width = game + "px";

    loadCard(cards);
    jogando = "jogando";
    acertosFim = cards;

    if (jogando === "jogando"){
        clearInterval(interval);
        interval = setInterval(cronometro, 1000);
    }
   }

   jogar();



function loadCard(cards){
sorteio(cards);

while(selecionados.length !== 0){
    let card = document.createElement("li");
    card.setAttribute('onClick', 'selectCard(this)');

    let imgCard = document.createElement('img');
    let indiceSorteio = Math.Floor(selecionados.lenght * Math.random());
    let randomImg = selecionados[indiceSorteio];
    imgCard.setAttribute('src', randomImg);


    selecionados.splice(indiceSorteio, 1);

    imgCard.style.display = "none";

    card.appendChild(imgCard);

    let lista = document.querySelector(".card");
    lista.appendChild(card);
};

}

function sorteio (cards){
    for (let i=0; i < cards/2; i++){
        let indiceSorteio = Math.floor(parrots.lenght * Math.random());
        selecionados.push(parrots[indiceSorteio]);
        selecionados.push(parrots[indiceSorteio]);
        parrots.splice(indiceSorteio,1);
    }
}

function selectCard(element){
    cardVirado.push(element);

    if (cardVirado.lenght < 3){
        virar(element, "rotateY(180deg)", "none", "initial");
        jogada++;

        if(cardVirado.lenght === 2){
            cardSegundo();
        };

        if (acertos === acertosFim){
            endGame();
            jogando = "ganhou";
        };
    };
}

function cardSegundo(){
    let firstCard = selectSrc(0);
    let secondCard = selectSrc(1);

    let compararCards = checkIgual(firstCard, secondCard);

    if (checkIgual === true){
        cardVirado = [];
        acertos +=2;
    } else if (checkIgual === false){
        setTimeout(function() {
            turn (cardVirado[0], "rotateY(0deg)", "url(./img/front.png)", "none");
            turn (cardVirado[1], "rotateY(0deg)", "url(./img/front.png)", "none");
            cardVirado = [];
        }, 1000);
        
    }
}

function resetGame(){
    let lista = document.querySelector(".card");
    lista.innerHTML = " ";


    let jogada = 0;
    let acertos = 0;
    let cardVirado = 0;
    let acertosFim = 0;
    let jogando = 0;
    let parrots = ["./img/bobrossparrot.gif",
    "./img/explodyparrot.gif",
    "./img/fiestaparrot.gif",
    "./img/metalparrot.gif",
    "./img/revertitparrot.gif",
    "./img/tripletsparrot.gif",
    "./img/unicornparrot.gif"
    ]
 
}

function selectSrc(i){
    let cards = cardVirado[i].querySelector("img");
    let parrot = cards.getAttribute('src');
    return parrot;
}

function checkIgual(valor1, valor2){
    if (valor1 === valor2)
    return true;
    else
    return false;
}

function turn(element, rotacao, backgroundImg, display){
    element.style.transform = rotacao;
    element.style.backgroundImage = backgroundImg;
    let img = element.querySelector('img');
    img.style.display = display;
}