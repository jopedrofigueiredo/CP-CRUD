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
       carregarCards();
       displayCards();
       salvarCards();
      
       document.getElementById('cardForm').addEventListener('submit', addCard);
       document.getElementById('Cardslist').addEventListener('click', handleClick);
}

function handleClick(infEvent) {

  console.log(infEvent.target);

  let action = infEvent.target.dataset.action;
  let index = infEvent.target.dataset.index;

  if (action === "editar") {
    console.log("editou" + index);
    editarCard(index);
  }
  else if ( action === "apagar") {
    console.log("apagou" + index);
    apagarCard(index)
  }
}



//CRUD

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

  cards.forEach((item, index) => {
    let CardDiv = document.createElement('div');

    CardDiv.innerHTML = `
    <p>Nome = ${item.nome}</p>
    <p>Posição = ${item.posicao}</p>
    <p>Clube = ${item.clube}</p>
    <img src"${item.foto} alt="Imagem da jogadora">
    <p>Gols = ${item.gols}</p>
    <p>Assistências = ${item.assistencias}</p>
    <p>Jogos = ${item.jogos}</p>
    <button data-action="editar" data-index="${index}">Editar</button>
    <button data-action="apagar" data-index="${index}">Apagar</button>
    `

    listaCards.append(CardDiv);
  });
}


//Editar Card
function editarCard() {
    let escolha = document.createElement('div');  
    escolha.classList.add('selecionarCampo');
    document.body.classList.add('travado');
    document.body.appendChild(escolha);

    escolha.innerHTML = `
      <button class="fechar">&times;</button>
      <form id="escolhaCampo">
            <select name="escolha" id="campo-escolhido">
               <option value="nome">Nome</option>
               <option value="posição">Posição</option>
               <option value="clube">Clube</option>
               <option value="foto">Foto</option>
               <option value="gols">Gols</option>
               <option value="assistencias">Assistências</option>
               <option value="jogos">Jogos</option>
            </select>
            <button type="submit" onclick="event.preventDefault()">Atualizar</button>
        </form>
    `;

    let fechar = escolha.querySelector('.fechar');

    fechar.addEventListener("click", () => {
            escolha.remove();
            document.body.classList.remove('travado');
        }
    );
    
    document.getElementById('escolhaCampo').addEventListener("submit", function(e) {
      e.preventDefault();

      let escolhido = document.getElementById('campo-escolhido');
      let valor = escolhido.value;

      console.log(escolhido);
      console.log(valor);
    })
    
}



//Apagar Card
function apagarCard(index) {
   let confirmar = confirm("Você deseja mesmo apagar esse perfil?");
   if (confirmar) {
    cards.splice(index, 1);
   }
   displayCards();
}



//LocalStorage

//Salvar Cards
function salvarCards(){
  localStorage.setItem("cards", JSON.stringify(cards));
}

//Carregar Cards
function carregarCards() {
  let cardsSalvos = localStorage.getItem("cards");
  if (cardsSalvos) {
    cards = JSON.parse(cardsSalvos);
  }
}

