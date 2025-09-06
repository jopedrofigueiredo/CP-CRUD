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
       document.getElementById('favorito').addEventListener('click', Favoritar);
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
    CardDiv.classList.add('card')

    CardDiv.innerHTML = `
    <p name="favorito" id="favorito" class="favorito">&#9733</p>
    <div class="fotojogadora">
    <img src="${item.foto}" alt="Imagem da jogadora" width="150px" height="150px">
    </div>
    <div>
    <div class="infs">
    <p>Nome: ${item.nome}</p>
    <p>Posição: ${item.posicao}</p>
    <p>Clube: ${item.clube}</p>
    <p>Gols: ${item.gols}</p>
    <p>Assistências: ${item.assistencias}</p>
    <p>Jogos: ${item.jogos}</p>
    </div>
    <div class="botoes">
    <button data-action="editar" data-index="${index}">Editar</button>
    <button data-action="apagar" data-index="${index}">Apagar</button>
    </div>
    </div>
    `

    listaCards.append(CardDiv);
  });
}


//Editar Card
function editarCard(index) {
  let escolha = document.createElement('div');  
  escolha.classList.add('selecionarCampo');
  document.body.classList.add('travado');
  document.body.appendChild(escolha);

  escolha.innerHTML = `
    <button class="fechar">&times;</button>
    <form id="escolhaCampo">
      <select name="campo" id="campo-escolhido">
         <option value="nome">Nome</option>
         <option value="posicao">Posição</option>
         <option value="clube">Clube</option>
         <option value="foto">Foto</option>
         <option value="gols">Gols</option>
         <option value="assistencias">Assistências</option>
         <option value="jogos">Jogos</option>
      </select>
      <input type="text" id="novoValor" placeholder="Novo valor" required />
      <button type="submit">Atualizar</button>
    </form>
  `;

  let fechar = escolha.querySelector('.fechar');

  fechar.addEventListener("click", () => {
      escolha.remove();
      document.body.classList.remove('travado');
  });

  document.getElementById('escolhaCampo').addEventListener("submit", function(e) {
    e.preventDefault();

    let campoEscolhido = document.getElementById('campo-escolhido').value;
    let novoValor = document.getElementById('novoValor').value;

    if (novoValor === '') {
      alert('Por favor, insira um valor válido!');
      return;
    }

    cards[index][campoEscolhido] = novoValor;
    
    salvarCards();

    displayCards();

    escolha.remove();
    document.body.classList.remove('travado');
  });
}



//Apagar Card
function apagarCard(index) {
   let confirmar = confirm("Você deseja mesmo apagar esse perfil?");
   if (confirmar) {
    cards.splice(index, 1);
   }
   displayCards();
}

// Favoritar
function Favoritar(index) {
  let btn_favoritar = document.getElementById('favorito');
  let situacao = btn_favoritar.className;

  if (situacao === "favorito") {
    btn_favoritar.classList.add('active');
  } else {
    btn_favoritar.classList.remove('active');
  }

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

