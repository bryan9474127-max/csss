let clicks = 0;
const maxClicks = 1000;
const clicksPerLevel = 50;
const maxLevels = 20;

const clickCountEl = document.getElementById('click-count');
const levelCountEl = document.getElementById('level-count');
const progressBarEl = document.getElementById('progress-bar');
const evolutionBtn = document.getElementById('evolution-btn');
const buttonArea = document.getElementById('button-area');
const evolutionDesc = document.getElementById('evolution-desc');
const messageBox = document.getElementById('message-box');

// Dados das 20 evoluções (Cores de fundo, texto do botão, estilos e posição)
const evolutions = [
    { level: 1, title: "Início", text: "CLIQUE EM MIM!", bg: "linear-gradient(135deg, #1f4068, #162447)", btnBg: "#0ea5e9", radius: "12px", pos: {top: "50%", left: "50%"} },
    { level: 2, title: "Botão de Bronze", text: "CONTINUE CLICANDO", bg: "linear-gradient(135deg, #2c3e50, #bdc3c7)", btnBg: "#d35400", radius: "15px", pos: {top: "50%", left: "50%"} },
    { level: 3, title: "Despertar Prateado", text: "MAIS RÁPIDO!", bg: "linear-gradient(135deg, #34495e, #7f8c8d)", btnBg: "#7f8c8d", radius: "20px", pos: {top: "45%", left: "50%"} },
    { level: 4, title: "Estilo Redondo", text: "CIRCULAR!", bg: "linear-gradient(135deg, #4ca1af, #2c3e50)", btnBg: "#16a085", radius: "50px", pos: {top: "50%", left: "55%"} },
    { level: 5, title: "Energia Dourada", text: "PODEROSO", bg: "linear-gradient(135deg, #f39c12, #d35400)", btnBg: "#f1c40f", radius: "25px", pos: {top: "55%", left: "45%"} },
    { level: 6, title: "Modo Neon", text: "NEON GLOW", bg: "linear-gradient(135deg, #0f2027, #203a43, #2c5364)", btnBg: "#00ffcc", radius: "8px", pos: {top: "50%", left: "50%"} },
    { level: 7, title: "A Esquerda!", text: "PEGUE-ME", bg: "linear-gradient(135deg, #833ab4, #fd1d1d, #fcb045)", btnBg: "#e84393", radius: "30px", pos: {top: "50%", left: "30%"} },
    { level: 8, title: "A Direita!", text: "ESTOU AQUI", bg: "linear-gradient(135deg, #134e5e, #71b280)", btnBg: "#00b894", radius: "12px", pos: {top: "50%", left: "70%"} },
    { level: 9, title: "Fogo Ardente", text: "QUEIMANDO", bg: "linear-gradient(135deg, #cb356b, #bd3f32)", btnBg: "#ff4757", radius: "15px", pos: {top: "35%", left: "50%"} },
    { level: 10, title: "Metade do Caminho!", text: "NÍVEL 10!", bg: "linear-gradient(135deg, #2b5876, #4e4376)", btnBg: "#6c5ce7", radius: "40px", pos: {top: "50%", left: "50%"} },
    { level: 11, title: "Cyberpunk", text: "CYBER", bg: "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)", btnBg: "#e94560", radius: "4px", pos: {top: "60%", left: "40%"} },
    { level: 12, title: "Galáxia Sombria", text: "ESPAÇO", bg: "linear-gradient(135deg, #050505, #1a0033)", btnBg: "#9b59b6", radius: "20px", pos: {top: "40%", left: "60%"} },
    { level: 13, title: "Esmeralda Viva", text: "VIBRANTE", bg: "linear-gradient(135deg, #0b6623, #133337)", btnBg: "#2ecc71", radius: "25px", pos: {top: "50%", left: "50%"} },
    { level: 14, title: "Caos Suave", text: "QUASE LÁ", bg: "linear-gradient(135deg, #ff7e5f, #feb47b)", btnBg: "#ff6b81", radius: "35px", pos: {top: "45%", left: "35%"} },
    { level: 15, title: "Super Cristal", text: "CRISTALINO", bg: "linear-gradient(135deg, #3a6073, #16222a)", btnBg: "#00d2d3", radius: "12px", pos: {top: "55%", left: "65%"} },
    { level: 16, title: "Prisma Mágico", text: "MÁGICO", bg: "linear-gradient(135deg, #ff007f, #7f00ff)", btnBg: "#ff9ff3", radius: "50px", pos: {top: "50%", left: "50%"} },
    { level: 17, title: "Titânio Rígido", text: "TITÂNIO", bg: "linear-gradient(135deg, #434343, #000000)", btnBg: "#dfe4ea", color: "#000", radius: "10px", pos: {top: "35%", left: "65%"} },
    { level: 18, title: "Supremo I", text: "SUPREMO", bg: "linear-gradient(135deg, #f12711, #f5af19)", btnBg: "#fffa65", color: "#000", radius: "20px", pos: {top: "60%", left: "35%"} },
    { level: 19, title: "Supremo II", text: "ESTÁ QUASE", bg: "linear-gradient(135deg, #11998e, #38ef7d)", btnBg: "#7efff5", color: "#000", radius: "30px", pos: {top: "50%", left: "50%"} },
    { level: 20, title: "Deus do Clique", text: "COMPLETO!", bg: "linear-gradient(135deg, #8E2DE2, #4A00E0)", btnBg: "#fff", color: "#4A00E0", radius: "50px", pos: {top: "50%", left: "50%"} }
];

evolutionBtn.addEventListener('click', () => {
    if (clicks < maxClicks) {
        clicks++;
        updateGame();
    }
});

function updateGame() {
    clickCountEl.textContent = clicks;
    
    // Calcula o nível atual (a cada 50 cliques sobe 1 nível, limitado a 20)
    let currentLevel = Math.min(Math.floor(clicks / clicksPerLevel) + 1, maxLevels);
    if (clicks === maxClicks) currentLevel = maxLevels;
    
    levelCountEl.textContent = currentLevel;

    // Barra de progresso geral (0 a 1000)
    let progressPercent = (clicks / maxClicks) * 100;
    progressBarEl.style.width = `${progressPercent}%`;

    // Aplica as características da evolução correspondente (índice 0 a 19)
    const evoData = evolutions[currentLevel - 1];
    
    document.body.style.background = evoData.bg;
    evolutionBtn.textContent = evoData.text;
    evolutionBtn.style.backgroundColor = evoData.btnBg;
    if(evoData.color) {
        evolutionBtn.style.color = evoData.color;
    } else {
        evolutionBtn.style.color = "#ffffff";
    }
    evolutionBtn.style.borderRadius = evoData.radius;
    
    // Mudança de posição do botão na área permitida
    evolutionBtn.style.top = evoData.pos.top;
    evolutionBtn.style.left = evoData.pos.left;
    evolutionBtn.style.transform = "translate(-50%, -50%)";

    evolutionDesc.textContent = `Evolução ${currentLevel}: ${evoData.title}`;

    // Mensagem de conclusão ao atingir 1000 cliques
    if (clicks >= maxClicks) {
        messageBox.textContent = "Parabéns! Você alcançou o limite máximo de 1000 cliques e completou todas as evoluções!";
        messageBox.classList.remove('hidden');
        evolutionBtn.textContent = "CONCLUÍDO!";
        evolutionBtn.disabled = true;
    }
}