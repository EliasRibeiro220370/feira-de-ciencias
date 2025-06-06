const questions = [
  // 10 Perguntas de Ciências
  { question: "Qual é o planeta mais próximo do Sol?", answers: ["Mercúrio", "Vênus", "Terra", "Marte"], correct: 0 },
  { question: "Qual é o maior órgão do corpo humano?", answers: ["Coração", "Pulmão", "Pele", "Fígado"], correct: 2 },
  { question: "O que é fotossíntese?", answers: ["Respiração das plantas", "Processo de absorção de água", "Processo de transformação de luz em energia", "Transporte de seiva"], correct: 2 },
  { question: "Quem propôs a teoria da evolução?", answers: ["Isaac Newton", "Albert Einstein", "Charles Darwin", "Galileu Galilei"], correct: 2 },
  { question: "Qual é a unidade básica da vida?", answers: ["Molécula", "Átomo", "Célula", "Tecido"], correct: 2 },
  { question: "Qual é o gás mais abundante na atmosfera?", answers: ["Oxigênio", "Nitrogênio", "Gás Carbônico", "Hélio"], correct: 1 },
  { question: "Quantos ossos tem o corpo humano adulto?", answers: ["206", "208", "201", "210"], correct: 0 },
  { question: "Qual é a fórmula da água?", answers: ["H2O", "CO2", "O2", "CH4"], correct: 0 },
  { question: "O que significa DNA?", answers: ["Ácido desoxirribonucleico", "Ácido ribonucleico", "Proteína celular", "Cadeia alimentar"], correct: 0 },
  { question: "Qual é a função do pulmão?", answers: ["Bombear sangue", "Filtrar impurezas", "Realizar trocas gasosas", "Produzir hormônios"], correct: 2 },

  // 10 Perguntas de Meio Ambiente
  { question: "O que é efeito estufa?", answers: ["Aquecimento global", "Acúmulo de gases que retêm calor", "Aumento do nível do mar", "Derretimento das geleiras"], correct: 1 },
  { question: "Qual é o principal gás do efeito estufa?", answers: ["Oxigênio", "Gás carbônico", "Nitrogênio", "Metano"], correct: 1 },
  { question: "O que é sustentabilidade?", answers: ["Produzir sem pensar no futuro", "Usar recursos naturais de forma responsável", "Acabar com os recursos", "Desmatar florestas"], correct: 1 },
  { question: "Como podemos economizar água em casa?", answers: ["Deixando torneiras abertas", "Lavando calçadas com mangueira", "Fechando a torneira ao escovar os dentes", "Regando plantas em excesso"], correct: 2 },
  { question: "O que é reciclagem?", answers: ["Transformar lixo em energia", "Reutilizar materiais", "Queimar lixo", "Enterrar resíduos"], correct: 1 },
  { question: "Qual é a principal fonte de energia renovável no Brasil?", answers: ["Carvão", "Energia solar", "Energia eólica", "Hidrelétrica"], correct: 3 },
  { question: "O que causa o desmatamento?", answers: ["Plantio de árvores", "Falta de poluição", "Queimadas e corte ilegal de árvores", "Reflorestamento"], correct: 2 },
  { question: "Qual é a importância das florestas?", answers: ["Produzir CO2", "Fornecer oxigênio e regular o clima", "Produzir lixo", "Aumentar o desmatamento"], correct: 1 },
  { question: "O que é compostagem?", answers: ["Queimar lixo", "Misturar resíduos tóxicos", "Transformar resíduos orgânicos em adubo", "Separar lixo reciclável"], correct: 2 },
  { question: "Como reduzir o lixo plástico?", answers: ["Usar mais sacolas plásticas", "Reduzir, reutilizar e reciclar", "Jogar plástico no mar", "Usar plástico descartável"], correct: 1 },

  // 10 Perguntas de Tecnologia
  { question: "Quem criou a linguagem de programação Python?", answers: ["Linus Torvalds", "Bill Gates", "Guido van Rossum", "Ada Lovelace"], correct: 2 },
  { question: "O que é HTML?", answers: ["Linguagem de programação", "Linguagem de marcação", "Sistema operacional", "Banco de dados"], correct: 1 },
  { question: "O que significa Wi-Fi?", answers: ["Wireless Fidelity", "Wireless Future", "Wired Fiber", "Wide Fire"], correct: 0 },
  { question: "O que é inteligência artificial?", answers: ["Máquina que pensa como um humano", "Tecnologia obsoleta", "Rede de computadores", "Um software de edição"], correct: 0 },
  { question: "Qual empresa criou o sistema Android?", answers: ["Apple", "Google", "Microsoft", "IBM"], correct: 1 },
  { question: "O que é um algoritmo?", answers: ["Um tipo de vírus", "Um conjunto de instruções", "Um programa de TV", "Um sistema operacional"], correct: 1 },
  { question: "Qual é a função do mouse?", answers: ["Armazenar dados", "Movimentar o cursor", "Abrir arquivos automaticamente", "Imprimir documentos"], correct: 1 },
  { question: "O que é a nuvem (cloud)?", answers: ["Armazenamento de dados online", "Tempestade elétrica", "Disco rígido", "Rede social"], correct: 0 },
  { question: "O que é um smartphone?", answers: ["Telefone simples", "Computador de mesa", "Celular com múltiplas funções", "Tablet"], correct: 2 },
  { question: "O que significa www?", answers: ["World Wide Web", "World Web Windows", "Web World Wave", "Wireless Web Window"], correct: 0 },
];

let currentQuestion = 0;
let score = 0;
let timer;
let timeLeft = 60;

const questionEl = document.getElementById("question");
const answersEl = document.getElementById("answers");
const timerEl = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const scoreEl = document.getElementById("score");
const correctSound = document.getElementById("correct-sound");
const wrongSound = document.getElementById("wrong-sound");

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startQuiz() {
  shuffle(questions);
  currentQuestion = 0;
  score = 0;
  startBtn.style.display = "none";
  scoreEl.textContent = "";
  showQuestion();
}

function showQuestion() {
  clearInterval(timer);
  timeLeft = 60;
  timerEl.textContent = `Tempo: ${timeLeft}s`;
  timer = setInterval(updateTimer, 1000);

  const q = questions[currentQuestion];
  questionEl.textContent = q.question;
  answersEl.innerHTML = "";

  q.answers.forEach((answer, index) => {
    const btn = document.createElement("button");
    btn.textContent = answer;
    btn.onclick = () => checkAnswer(index);
    answersEl.appendChild(btn);
  });
}

function updateTimer() {
  timeLeft--;
  timerEl.textContent = `Tempo: ${timeLeft}s`;
  if (timeLeft <= 0) {
    clearInterval(timer);
    wrongSound.play();
    nextQuestion();
  }
}

function checkAnswer(index) {
  clearInterval(timer);
  const q = questions[currentQuestion];
  if (index === q.correct) {
    score++;
    correctSound.play();
    confetti();
  } else {
    wrongSound.play();
  }
  nextQuestion();
}

function nextQuestion() {
  currentQuestion++;
  if (currentQuestion < questions.length) {
    setTimeout(showQuestion, 1000);
  } else {
    endQuiz();
  }
}

function endQuiz() {
  questionEl.textContent = "Fim do Quiz!";
  answersEl.innerHTML = "";
  timerEl.textContent = "";
  scoreEl.textContent = `Você acertou ${score} de ${questions.length} perguntas.`;
  startBtn.style.display = "inline-block";
}

startBtn.addEventListener('click', () => {
  document.getElementById('bg-music').pause(); // Para a música de fundo
  startQuiz();
});
document.addEventListener('DOMContentLoaded', () => {
  const bgMusic = document.getElementById('bg-music');
  
  // Espera um clique em qualquer lugar para iniciar a música
  document.body.addEventListener('click', function playMusicOnce() {
    bgMusic.play();
    document.body.removeEventListener('click', playMusicOnce); // só toca uma vez
  });
});


