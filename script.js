const questionElement = document.getElementById("question");
const answerButtons = document.querySelectorAll(".answer-buttons");
const playerHPBar = document.getElementById("playerHP");
const enemyHPBar = document.getElementById("enemyHP");
const avatarImg = document.getElementById("avatar-img");
const dialogueBox = document.getElementById("dialogueBox");
const overlay = document.getElementById("overlay");
const attackEffect = document.getElementById("attackEffect");
const enemyAttackEffect = document.getElementById("enemyAttackEffect");
const enemy = document.getElementById("enemy");
const player = document.getElementById("player-sprite");
const enemySprite = document.getElementById("enemy-sprite");
const gameOverScreen = document.getElementById("gameOverScreen");
const winScreen = document.getElementById("winScreen");
const introDialogue = document.getElementById("introDialogue");
const startButton = document.getElementById("startButton");
const introTextElement = document.getElementById("introText");

let currentQuestionIndex = 0;
let playerHP = 75;
let enemyHP = 50;

const fullIntro = [
  "Dịch bệnh có nguy cơ bùng phát trở lại, cả thế giới đang đối mặt với một kẻ thù nguy hiểm – virus corona.",
  "Chúng lặng lẽ xâm nhập, lây lan nhanh chóng và xuất hiện các biến dị mạnh hơn.",
  "Trong trò chơi này, bạn chính là chiến binh trí tuệ – sử dụng kiến thức để chiến đấu với virus.",
  "Mỗi câu trả lời đúng là một đòn tấn công mạnh mẽ, làm virus suy yếu.",
  "Nhưng hãy cẩn thận, nếu bạn trả lời sai, virus sẽ phản công và khiến bạn nhiễm bệnh!",
  "Bạn đã sẵn sàng chưa? Cùng bắt đầu hành trình tiêu diệt virus corona và bảo vệ cộng đồng!"
];

function updateSpriteByHP(target, hp) {
  if (target === "player") {
    if (hp <= 0) {
      player.src = "./assets/player/dead.png";
    } else if (hp <= 37) {
      player.src = "./assets/player/critical.png";
    } else if (hp <= 56) {
      player.src = "./assets/player/weakened.png";
    } else {
      player.src = "./assets/player/normal.png";
    }
  } else if (target === "enemy") {
    if (hp <= 0) {
      enemySprite.src = "./assets/enemy/virus1/dead.png";
    } else if (hp <= 25) {
      enemySprite.src = "./assets/enemy/virus1/critical.png";
    } else if (hp <= 37) {
      enemySprite.src = "./assets/enemy/virus1/weakened.png";
    } else {
      enemySprite.src = "./assets/enemy/virus1/normal.png";
    }
  }
}

function displayQuestion() {
  const current = questions[currentQuestionIndex];
  questionElement.textContent = current.question;
  avatarImg.src = "./assets/avatar/doctor.png";

  answerButtons.forEach((btn, i) => {
    const letter = String.fromCharCode(65 + i);
    btn.textContent = `${letter}. ${current.answers[i]}`;
    btn.dataset.choice = letter;
    btn.disabled = false;
    btn.classList.remove("correct", "incorrect");
  });

  dialogueBox.style.display = "flex";
  overlay.style.display = "block";
}

function handleAnswer(e) {
  const selected = e.target.dataset.choice;
  const current = questions[currentQuestionIndex];

  answerButtons.forEach(btn => btn.disabled = true);
  answerButtons.forEach(btn => {
    if (btn.dataset.choice === current.correct) {
      btn.classList.add("correct");
    } else if (btn.dataset.choice === selected) {
      btn.classList.add("incorrect");
    }
  });

  setTimeout(() => {
    dialogueBox.style.display = "none";
    overlay.style.display = "none";

    setTimeout(() => {
      if (selected === current.correct) {
        enemyHP = Math.max(0, enemyHP - 5);
        updateHPBar(enemyHPBar, enemyHP);
        updateSpriteByHP("enemy", enemyHP);

        player.src = "./assets/player/attack.png";
        attackEffect.style.display = "block";
        attackEffect.style.animation = "none";
        attackEffect.offsetHeight;
        attackEffect.style.animation = "shoot 5s cubic-bezier(0.25, 1, 0.5, 1) forwards";

        enemy.classList.add("shake");
        setTimeout(() => {
          attackEffect.style.display = "none";
          enemy.classList.remove("shake");
          updateSpriteByHP("player", playerHP);
        }, 800);
      } else {
        playerHP = Math.max(0, playerHP - 5);
        updateHPBar(playerHPBar, playerHP);
        updateSpriteByHP("player", playerHP);

        enemy.src = "./assets/enemy/virus1/normal.png";
        enemyAttackEffect.style.display = "block";
        enemyAttackEffect.style.animation = "none";
        enemyAttackEffect.offsetHeight;
        enemyAttackEffect.style.animation = "virusShoot 15s cubic-bezier(0.25, 1, 0.5, 1) forwards";

        enemy.classList.add("enemy-attack");
        player.classList.add("shake");

        setTimeout(() => {
          enemy.classList.remove("enemy-attack");
          player.classList.remove("shake");
          enemyAttackEffect.style.display = "none";
          updateSpriteByHP("enemy", enemyHP);
        }, 1000);
      }

      if (enemyHP === 0) {
        winScreen.style.display = "flex";
        return;
      }

      if (playerHP === 0) {
        gameOverScreen.style.display = "flex";
        return;
      }

      setTimeout(() => {
        nextQuestion();
      }, 2100);
    }, 500);
  }, 1000);
}

function updateHPBar(bar, hp) {
  bar.style.width = `${(hp / 75) * 100}%`;
}

function nextQuestion() {
  currentQuestionIndex = (currentQuestionIndex + 1) % questions.length;
  displayQuestion();
}

function restartGame() {
  playerHP = 75;
  enemyHP = 50;
  currentQuestionIndex = 0;

  updateHPBar(playerHPBar, playerHP);
  updateHPBar(enemyHPBar, enemyHP);
  updateSpriteByHP("player", playerHP);
  updateSpriteByHP("enemy", enemyHP);

  gameOverScreen.style.display = "none";
  winScreen.style.display = "none";

  displayQuestion();
}

startButton.addEventListener("click", () => {
  introDialogue.style.display = "none";
  displayQuestion();
});

answerButtons.forEach(button => {
  button.addEventListener("click", handleAnswer);
});

window.onload = () => {
  updateHPBar(playerHPBar, playerHP);
  updateHPBar(enemyHPBar, enemyHP);
  updateSpriteByHP("player", playerHP);
  updateSpriteByHP("enemy", enemyHP);

  // Hiển thị intro từng câu
  introTextElement.textContent = "";
  let introIndex = 0;
  const interval = setInterval(() => {
    if (introIndex >= fullIntro.length) {
      clearInterval(interval);
      startButton.style.display = "block";
    } else {
      introTextElement.textContent = fullIntro[introIndex];
      introIndex++;
    }
  }, 2500);
};
