const faces = [
    { x: 0, y: 0, name: "Média Aritmética", description: "A média aritmética é a soma de um conjunto de números dividida pela quantidade de números. É usada para encontrar o valor médio de um grupo de dados. Por exemplo, para as notas 8, 7 e 9, a média aritmética é (8 + 7 + 9) / 3 = 8." }, // 1
    { x: 0, y: 90, name: "Payback", description: "O payback é um indicador financeiro que mede o tempo necessário para recuperar o investimento inicial em um projeto. Em outras palavras, ele calcula quanto tempo levará para que o lucro acumulado iguale o valor investido. Por exemplo, se você investe R$ 50.000 em um negócio e espera recuperar esse valor em 10 meses, o payback é de 10 meses." }, // 2
    { x: 0, y: 180, name: "Juros Compostos", description: "Os juros compostos são uma forma de calcular juros onde os juros acumulados são adicionados ao capital inicial, e os juros futuros são calculados sobre esse novo valor. Isso resulta em um crescimento exponencial do montante ao longo do tempo." }, // 3
    { x: 0, y: -90, name: "Fluxos de Caixa", description: "O fluxo de caixa registra todas as entradas e saídas de dinheiro de uma empresa em um período específico. Ele é essencial para monitorar a liquidez e a saúde financeira do negócio." }, // 4
    { x: 90, y: 0, name: "?", description: "Parece que você ganhou algo inesperado... que tal mostrar para um dos representantes da barraca e resgatar o seu prêmio? :D" }, // 5
    { x: -90, y: 0, name: "Excel", description: "O Excel é crucial na administração por sua capacidade de organizar e analisar dados, automatizar processos, criar relatórios e gráficos, e auxiliar no planejamento financeiro. Ele aumenta a eficiência e precisão nas operações empresariais." } // 6
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

    rollDice(); // Rolar o dado automaticamente ao iniciar o jogo
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

    // Aplica a rotação no dado
    dice.style.transform = `rotateX(${selectedFace.x}deg) rotateY(${selectedFace.y}deg)`;

    console.log(`Face selecionada: ${randomIndex + 1}, Rotação aplicada: X=${selectedFace.x}, Y=${selectedFace.y}`);

    // Atualiza a descrição logo após a rotação
    setTimeout(() => {
        // Verifica se a face selecionada é "?"
        if (selectedFace.name === "?") {
            description.querySelector('h2').innerText = "Você ganhou um prêmio!"; // Título especial
        } else {
            description.querySelector('h2').innerText = `Tema: ${selectedFace.name}`; // Título normal
        }
        
        description.querySelector('p').innerText = selectedFace.description; // Atualiza a descrição da face selecionada

        // Remove a face selecionada do array
        remainingFaces.splice(randomIndex, 1); // Remove a face do array

        isRolling = false;
        rollButton.disabled = false;
    }, 1500); // Tempo ajustado para a transição de 1.5s
};

// Função para resetar o jogo e voltar à tela inicial
const resetGame = () => {
    remainingFaces = [...faces];
    dice.style.transform = 'rotateX(0deg) rotateY(0deg)';
    description.querySelector('h2').innerText = 'Nome do Tema';
    description.querySelector('p').innerText = 'Clique no botão "Próxima Face" para ver a descrição do próximo tema.';

    // Esconde o dado e botão de rolar, mostra a tela inicial
    diceContainer.style.display = 'none';
    rollButton.style.display = 'none';
    initialScreen.style.display = 'block';
};

// Adiciona event listeners
startButton.addEventListener('click', startGame);
rollButton.addEventListener('click', rollDice);