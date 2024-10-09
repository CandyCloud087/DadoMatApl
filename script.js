// Dados das faces do dado
const faces = [
    { x: 0, y: 0, name: "Estatística", description: "Estatística: Estudo de dados e probabilidades. Envolve a coleta, análise, interpretação e apresentação de grandes volumes de dados para descobrir padrões e tendências." },
    { x: 0, y: 90, name: "Teoria dos Números", description: "Teoria dos Números: Propriedades dos números inteiros. Explora conceitos como primalidade, divisibilidade e a distribuição dos números primos." },
    { x: 0, y: 180, name: "Álgebra Linear", description: "Álgebra Linear: Estudo de vetores, matrizes e espaços vetoriais. Essencial para resolver sistemas lineares e amplamente utilizada em computação, física e engenharia." },
    { x: 0, y: -90, name: "Cálculo", description: "Cálculo: Análise de taxas de variação e acumulação. É fundamental para entender fenômenos contínuos em física, engenharia, economia e outras áreas." },
    { x: 90, y: 0, name: "Análise Numérica", description: "Análise Numérica: Métodos para resolver problemas matemáticos de forma aproximada. Utiliza algoritmos para computação de soluções numéricas em engenharia, física e outras ciências." },
    { x: -90, y: 0, name: "Geometria", description: "Geometria: Estudo de formas, tamanhos e propriedades do espaço. Abrange desde geometria euclidiana até tópicos avançados como topologia e geometria diferencial." }
];

let remainingFaces = [...faces];
let isRolling = false;

// Seleção de elementos do DOM
const initialScreen = document.getElementById('initialScreen');
const startButton = document.getElementById('startButton');
const diceContainer = document.getElementById('diceContainer');
const rollButton = document.getElementById('rollButton');
const dice = document.getElementById('dice');
const description = document.getElementById('description');

// Função para iniciar o jogo
const startGame = () => {
    initialScreen.style.display = 'none';
    diceContainer.style.display = 'block';
    diceContainer.setAttribute('aria-hidden', 'false');
    rollButton.style.display = 'block';
    rollButton.focus();

    // Rola o dado automaticamente ao iniciar o jogo
    rollDice();
};


// Função para rolar o dado
const rollDice = () => {
    if (isRolling) return;

    if (remainingFaces.length === 0) {
        alert("Todas as faces foram sorteadas! O jogo será resetado.");
        resetGame(); // Chama a função resetGame para voltar à tela inicial
        return;
    }

    isRolling = true;
    rollButton.disabled = true;

    // Seleciona uma face aleatória
    const randomIndex = Math.floor(Math.random() * remainingFaces.length);
    const selectedFace = remainingFaces[randomIndex];
    remainingFaces.splice(randomIndex, 1);

    // Aplica a rotação no dado
    dice.style.transform = `rotateX(${selectedFace.x}deg) rotateY(${selectedFace.y}deg)`;

    // Atualiza a descrição logo após a rotação
    setTimeout(() => {
        description.innerHTML = `<p>${selectedFace.description}</p>`;
        isRolling = false;
        rollButton.disabled = false;
    }, 500); // Ajusta o tempo para sincronizar com a rotação do dado
};

// Função para resetar o jogo e voltar à tela inicial
const resetGame = () => {
    remainingFaces = [...faces];
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
    description.innerHTML = '<p>Clique no botão "Rolar o Dado" para ver a descrição do tema selecionado.</p>';

    // Esconde o dado e botão de rolar, mostra a tela inicial
    diceContainer.style.display = 'none';
    rollButton.style.display = 'none';
    initialScreen.style.display = 'block';
};

// Adiciona event listeners
startButton.addEventListener('click', startGame);
rollButton.addEventListener('click', rollDice);