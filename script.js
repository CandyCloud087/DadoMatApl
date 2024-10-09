// Dados das faces do dado
const faces = [
    { x: 0, y: 0, name: "Média Aritmética", description: "A média aritmética é a soma de um conjunto de números dividida pela quantidade de números. É usada para encontrar o valor médio de um grupo de dados. Por exemplo, para as notas 8, 7 e 9, a média aritmética é (8 + 7 + 9) / 3 = 8." },
    { x: 0, y: 90, name: "Payback", description: "O payback é um indicador financeiro que mede o tempo necessário para recuperar o investimento inicial em um projeto. Em outras palavras, ele calcula quanto tempo levará para que o lucro acumulado iguale o valor investido. Por exemplo, se você investe R$ 50.000 em um negócio e espera recuperar esse valor em 10 meses, o payback é de 10 meses." },
    { x: 0, y: 180, name: "Juros compostos", description: "Os juros compostos são uma forma de calcular juros onde os juros acumulados são adicionados ao capital inicial, e os juros futuros são calculados sobre esse novo valor. Isso resulta em um crescimento exponencial do montante ao longo do tempo." },
    { x: 0, y: -90, name: "Fluxos de caixa", description: "O fluxo de caixa registra todas as entradas e saídas de dinheiro de uma empresa em um período específico. Ele é essencial para monitorar a liquidez e a saúde financeira do negócio." },
    { x: 90, y: 0, name: "Tir", description: "A TIR (Taxa Interna de Retorno) é uma métrica financeira que indica a taxa de retorno de um investimento, considerando o valor presente dos fluxos de caixa futuros. Ela é usada para avaliar a viabilidade e a rentabilidade de projetos." },
    { x: -90, y: 0, name: "Excel", description: "O Excel é crucial na administração por sua capacidade de organizar e analisar dados, automatizar processos, criar relatórios e gráficos, e auxiliar no planejamento financeiro. Ele aumenta a eficiência e precisão nas operações empresariais." }
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
        // Repopula as faces quando todas forem sorteadas
        remainingFaces = [...faces];
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

// Adiciona event listeners
startButton.addEventListener('click', startGame);
rollButton.addEventListener('click', rollDice);