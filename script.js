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

let currentQuestionIndex = 0;
let playerHP = 75;
let enemyHP = 50;

const questions = [
  {
    "question": "Trong các tình huống sau, khi nào nguy cơ lây nhiễm COVID-19 là cao nhất?",
    "answers": [
      "Đứng gần người nhiễm bệnh ngoài trời, không đeo khẩu trang",
      "Ngồi họp trong phòng kín, không mở cửa sổ, có đeo khẩu trang",
      "Dùng chung ly nước với người nhiễm đã tiêm vaccine",
      "Chạm vào tay vịn cầu thang rồi sờ mặt, sau đó rửa tay"
    ],
    "correct": "A"
  },
  {
    "question": "Thời gian ủ bệnh phổ biến của SARS-CoV-2 là bao lâu?",
    "answers": [
      "1–2 ngày",
      "2–14 ngày",
      "15–21 ngày",
      "Trên 30 ngày"
    ],
    "correct": "B"
  },
  {
    "question": "Người đã tiêm đầy đủ vaccine COVID-19 vẫn có thể lây bệnh do đâu?",
    "answers": [
      "Kháng thể suy giảm theo thời gian",
      "Do vaccine gây bệnh nhẹ",
      "Vì miễn dịch chỉ bảo vệ tạm thời",
      "Vì người đó không mang khẩu trang"
    ],
    "correct": "A"
  },
  {
    "question": "Biến thể NB.1.8.1 của virus SARS-CoV-2 gây lo ngại vì lý do nào?",
    "answers": [
      "Làm giảm hiệu quả thuốc hạ sốt",
      "Khả năng gây tử vong cao hơn biến thể Delta",
      "Khả năng lây truyền cao hơn",
      "Lây qua đường tiêu hóa mạnh hơn"
    ],
    "correct": "C"
  },
  {
    "question": "Theo WHO, tiêu chí nào sau đây cho thấy bệnh nhân COVID-19 thể nhẹ đã khỏi và không còn lây?",
    "answers": [
      "Test âm tính 1 lần sau 5 ngày",
      "Không sốt trong 2 ngày liên tục",
      "Ít nhất 10 ngày từ khởi phát và không triệu chứng 3 ngày",
      "Ho giảm và test âm tính sau điều trị"
    ],
    "correct": "C"
  },
  {
    "question": "Đối tượng nào nên ưu tiên tiêm nhắc lại vaccine COVID-19 trong giai đoạn 2024–2025?",
    "answers": [
      "Người cao tuổi và bệnh nền",
      "Tất cả người dân không phân biệt nguy cơ",
      "Người đã từng mắc COVID-19",
      "Người có kháng thể cao"
    ],
    "correct": "A"
  },
  {
    "question": "Triệu chứng hậu COVID (long COVID) kéo dài có thể gây ảnh hưởng gì?",
    "answers": [
      "Không đáng lo, thường tự khỏi",
      "Chủ yếu là tâm lý nên không cần theo dõi",
      "Có thể ảnh hưởng hô hấp, tim mạch, tâm thần kéo dài",
      "Chỉ xảy ra ở người cao tuổi"
    ],
    "correct": "C"
  },
  {
    "question": "Lo lắng quá mức về COVID-19 có thể dẫn đến hậu quả gì?",
    "answers": [
      "Không cần phòng bệnh vì stress làm giảm miễn dịch",
      "Ảnh hưởng sức khỏe tâm thần và hành vi tránh né y tế",
      "Tăng kháng thể do phản ứng tâm lý",
      "Giảm khả năng lây nhiễm do đề kháng tâm lý"
    ],
    "correct": "B"
  },
  {
    "question": "Nguồn thông tin nào nên được ưu tiên tham khảo để phòng bệnh đúng cách?",
    "answers": [
      "Mạng xã hội và hội nhóm chia sẻ",
      "Trang web của HCDC, Bộ Y tế, WHO",
      "Kinh nghiệm truyền miệng trong cộng đồng",
      "Thông tin từ người từng mắc COVID-19"
    ],
    "correct": "B"
  },
  {
    "question": "Bạn tiếp xúc gần F0 nhưng không có triệu chứng. Biện pháp nào sau đây là phù hợp nhất?",
    "answers": [
      "Cách ly 5 ngày",
      "Tự theo dõi sức khỏe và đeo khẩu trang khi ra ngoài",
      "Test PCR ngay và cách ly tại nhà",
      "Không cần làm gì nếu đã tiêm vaccine"
    ],
    "correct": "B"
  },
  {
    "question": "Hành động nào đúng khi bạn ho hoặc hắt hơi nơi công cộng?",
    "answers": [
      "Dùng tay che miệng và rửa tay sau đó",
      "Quay mặt đi chỗ khác",
      "Che bằng khuỷu tay hoặc khăn giấy và rửa tay ngay",
      "Không cần che nếu đã tiêm vaccine"
    ],
    "correct": "C"
  },
  {
    "question": "Thời điểm quan trọng cần rửa tay để phòng COVID-19 là khi nào?",
    "answers": [
      "Sau khi ra ngoài và trước khi ăn",
      "Chỉ khi có triệu chứng ho",
      "Khi cảm thấy tay bẩn",
      "Trước khi đi ngủ"
    ],
    "correct": "A"
  },
  {
    "question": "Trong bối cảnh hiện tại, khi COVID-19 không còn là tình trạng khẩn cấp toàn cầu, hành vi nào sau đây vẫn nên được duy trì để phòng bệnh hiệu quả trong cộng đồng?",
    "answers": [
      "Hạn chế tiếp xúc với mọi người, kể cả khi khỏe mạnh",
      "Đeo khẩu trang mọi lúc, kể cả khi ở nhà",
      "Tự theo dõi sức khỏe, ở nhà khi có triệu chứng hô hấp và đeo khẩu trang khi đến nơi đông người",
      "Không cần thực hiện gì nếu đã tiêm vaccine đầy đủ"
    ],
    "correct": "C"
  },
  {
    "question": "Khẩu trang phòng COVID-19 cần được thay trong trường hợp nào?",
    "answers": [
      "Sau mỗi 8 tiếng sử dụng",
      "Khi thấy ẩm, bẩn hoặc sau tiếp xúc môi trường nguy cơ",
      "Chỉ thay sau 24 giờ",
      "Không cần thay nếu dùng khẩu trang vải dày"
    ],
    "correct": "B"
  },
  {
    "question": "Bạn chuẩn bị tham gia buổi họp đông người trong phòng kín. Cách phòng bệnh hiệu quả nhất là gì?",
    "answers": [
      "Uống vitamin C trước khi họp",
      "Mở cửa sổ, đeo khẩu trang và giữ khoảng cách",
      "Ngồi gần người đã khỏi COVID để tạo miễn dịch chéo",
      "Không ăn uống gì trong buổi họp"
    ],
    "correct": "B"
  }
];

function updateSpriteByHP(target, hp) {
  if (target === "player") {
    if (hp <= 0) {
      player.src = "./assets/player/dead.png";
    } else if (hp <= hp*0.5) {
      player.src = "./assets/player/critical.png";
    } else if (hp <= hp*0.75) {
      player.src = "./assets/player/weakened.png";
    } else {
      player.src = "./assets/player/normal.png";
    }
  } else if (target === "enemy") {
    if (hp <= 0) {
      enemySprite.src = "./assets/enemy/virus1/dead.png";
    } else if (hp <= hp*0.5) {
      enemySprite.src = "./assets/enemy/virus1/critical.png";
    } else if (hp <= hp*0.75) {
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

        // virus attack
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
  playerHP = 15;
  enemyHP = 15;
  currentQuestionIndex = 0;

  updateHPBar(playerHPBar, playerHP);
  updateHPBar(enemyHPBar, enemyHP);
  updateSpriteByHP("player", playerHP);
  updateSpriteByHP("enemy", enemyHP);

  gameOverScreen.style.display = "none";
  winScreen.style.display = "none";

  displayQuestion();
}

document.getElementById("restartButton").addEventListener("click", restartGame);
document.getElementById("restartButtonWin").addEventListener("click", restartGame);

answerButtons.forEach(button => {
  button.addEventListener("click", handleAnswer);
});
const introDialogue = document.getElementById("introDialogue");
const startButton = document.getElementById("startButton");

startButton.addEventListener("click", () => {
  introDialogue.style.display = "none";
  displayQuestion(); // show first question
});


const fullIntro = [
  "Dịch bệnh có nguy cơ bùng phát trở lại, cả thế giới đang đối mặt với một kẻ thù nguy hiểm – virus corona.",
  "Chúng lặng lẽ xâm nhập, lây lan nhanh chóng và xuất hiện các biến dị mạnh hơn.",
  "Trong trò chơi này, bạn chính là chiến binh trí tuệ – sử dụng kiến thức để chiến đấu với virus.",
  "Mỗi câu trả lời đúng là một đòn tấn công mạnh mẽ, làm virus suy yếu.",
  "Nhưng hãy cẩn thận, nếu bạn trả lời sai, virus sẽ phản công và khiến bạn nhiễm bệnh!",
  "Bạn đã sẵn sàng chưa? Cùng bắt đầu hành trình tiêu diệt virus corona và bảo vệ cộng đồng!"
];

const introTextElement = document.getElementById("introText");
let introLineIndex = 0;
let introTimer = null;

function showNextIntroLine() {
  if (introLineIndex >= fullIntro.length) {
    clearInterval(introTimer);
    startButton.style.display = "block";
    return;
  }

  introTextElement.textContent = fullIntro[introLineIndex];
  introLineIndex++;
}

window.onload = () => {
  updateHPBar(playerHPBar, playerHP);
  updateHPBar(enemyHPBar, enemyHP);
  updateSpriteByHP("player", playerHP);
  updateSpriteByHP("enemy", enemyHP);

  // Hiển thị intro dạng từng dòng
  dialogueBox.style.display = "none";
  overlay.style.display = "block";
  introDialogue.style.display = "flex";

  introTextElement.textContent = "";
  introLineIndex = 0;

  // 👇 Hiện ngay câu đầu tiên
  showNextIntroLine();

  // 👇 Sau đó mới chạy các câu còn lại mỗi 1.5s
  introTimer = setInterval(showNextIntroLine, 2500);
};
