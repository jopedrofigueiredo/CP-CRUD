let cards = [
  {
    "nome": "Andressa Alves",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/andressa.jpg",
    "gols": 15,
    "assistencias": 10,
    "jogos": 28,
    "favorita": false
  },
  {
    "nome": "Dayana Rodríguez",
    "posicao": "Meio-campo",
    "clube": "Corinthians",
    "foto": "https://example.com/dayana.jpg",
    "gols": 5,
    "assistencias": 12,
    "jogos": 30,
    "favorita": false
  },
  {
    "nome": "Mariza",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/mariza.jpg",
    "gols": 2,
    "assistencias": 1,
    "jogos": 32,
    "favorita": false
  },
  {
    "nome": "Thaís Regina",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/thais.jpg",
    "gols": 1,
    "assistencias": 2,
    "jogos": 25,
    "favorita": false
  },
  {
    "nome": "Letícia Teles",
    "posicao": "Zagueira",
    "clube": "Corinthians",
    "foto": "https://example.com/leticia.jpg",
    "gols": 0,
    "assistencias": 0,
    "jogos": 18,
    "favorita": false
  }
];


//Inicialização
 window.onload = function() {
//     carregarCards();
       displayCards();
       salvarCards();
      
       document.getElementById('cardForm').addEventListener('submit', addCard);
//     document.getElementById('Cardslist').addEventListener('submit', handleClick);
}




// Create
function addCard(cardSecurity) {
  cardSecurity.preventDefault();

  let nomeCard = document.querySelector('#cardNome').value;
  let posCard = document.querySelector('#cardPos').value;
  let clubeCard = document.querySelector('#cardClube').value;
  let imgCard = document.querySelector('#cardImg').value;
  let golsCard = document.querySelector('#cardGols').value;
  let asstCard = document.querySelector('#cardAsst').value;
  let jogosCard = document.querySelector('#cardJogos').value;

  let card = {
    nome: nomeCard,
    posicao: posCard,
    clube: clubeCard,
    foto: imgCard,
    gols: golsCard,
    assistencias: asstCard,
    jogos: jogosCard,
    favorita: false
  };

  cards.unshift(card);
  salvarCards();
  console.log(cards);
  displayCards();

  document.getElementById('cardForm').reset();
}


// Exibir Cards
function displayCards() {
  let listaCards = document.querySelector('#Cardslist');
  listaCards.innerHTML = '';

  cards.forEach((item) => {
    let CardDiv = document.createElement('div');

    CardDiv.innerHTML = `
    <p>Nome = ${item.nome}</p>
    <p>Posição = ${item.posicao}</p>
    <p>Clube = ${item.clube}</p>
    <img src"${item.foto} alt="Imagem da jogadora">
    <p>Gols = ${item.gols}</p>
    <p>Assistências = ${item.assistencias}</p>
    <p>Jogos = ${item.jogos}</p>
    `

    listaCards.append(CardDiv);
  });
}



//Salvar Cards
function salvarCards(){
  localStorage.setItem("Cards", JSON.stringify(cards));
}


