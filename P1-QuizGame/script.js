// DOM Elements - Lấy các element HTML để thao tác (business: quản lý UI động)
// Lấy element có id 'start-screen' từ DOM để hiển thị màn hình bắt đầu
const startScreen = document.getElementById('start-screen')
// Lấy element có id 'quiz-screen' từ DOM để hiển thị màn hình quiz
const quizScreen = document.getElementById('quiz-screen')
// Lấy element có id 'result-screen' từ DOM để hiển thị màn hình kết quả
const resultScreen = document.getElementById('result-screen')
// Lấy button có id 'start-btn' để bắt đầu quiz
const startButton = document.getElementById('start-btn')
// Lấy element hiển thị câu hỏi
const questionText = document.getElementById('question-text')
// Lấy container chứa các đáp án
const answersContainer = document.getElementById('answers-container')
// Lấy span hiển thị số câu hỏi hiện tại
const currentQuestionSpan = document.getElementById('current-question')
// Lấy span hiển thị tổng số câu hỏi
const totalQuestionsSpan = document.getElementById('total-questions')
// Lấy span hiển thị điểm hiện tại
const scoreSpan = document.getElementById('score')
// Lấy span hiển thị điểm cuối cùng
const finalScoreSpan = document.getElementById('final-score')
// Lấy span hiển thị điểm tối đa
const maxScoreSpan = document.getElementById('max-score')
// Lấy element hiển thị thông điệp kết quả
const resultMessage = document.getElementById('result-message')
// Lấy button restart
const restartButton = document.getElementById('restart-btn')
// Lấy thanh progress
const progressBar = document.getElementById('progress')

// Quiz data: mảng câu hỏi (business: nội dung quiz, dễ mở rộng)
// Định nghĩa mảng chứa các câu hỏi và đáp án
const quizQuestions = [
  {
    question: 'What is the capital of France?', // Câu hỏi
    answers: [
      // Mảng đáp án
      { text: 'London', correct: false }, // Đáp án sai
      { text: 'Berlin', correct: false },
      { text: 'Paris', correct: true }, // Đáp án đúng
      { text: 'Madrid', correct: false }
    ]
  },
  {
    question: 'Which planet is known as the Red Planet?',
    answers: [
      { text: 'Venus', correct: false },
      { text: 'Mars', correct: true },
      { text: 'Jupiter', correct: false },
      { text: 'Saturn', correct: false }
    ]
  },
  {
    question: 'What is the largest ocean on Earth?',
    answers: [
      { text: 'Atlantic Ocean', correct: false },
      { text: 'Indian Ocean', correct: false },
      { text: 'Arctic Ocean', correct: false },
      { text: 'Pacific Ocean', correct: true }
    ]
  },
  {
    question: 'Which of these is NOT a programming language?',
    answers: [
      { text: 'Java', correct: false },
      { text: 'Python', correct: false },
      { text: 'Banana', correct: true },
      { text: 'JavaScript', correct: false }
    ]
  },
  {
    question: 'What is the chemical symbol for gold?',
    answers: [
      { text: 'Go', correct: false },
      { text: 'Gd', correct: false },
      { text: 'Au', correct: true },
      { text: 'Ag', correct: false }
    ]
  }
]

// QUIZ STATE VARS - Biến trạng thái quiz (business: theo dõi tiến trình, điểm)
// Chỉ số câu hỏi hiện tại, bắt đầu từ 0
let currentQuestionIndex = 0
// Điểm số hiện tại
let score = 0
// Cờ để vô hiệu hóa đáp án sau khi chọn
let answersDisabled = false

// Khởi tạo UI ban đầu
// Hiển thị tổng số câu hỏi
totalQuestionsSpan.textContent = quizQuestions.length
// Hiển thị điểm tối đa
maxScoreSpan.textContent = quizQuestions.length

// event listeners - Gắn sự kiện click cho buttons (business: trigger actions)
// Gắn sự kiện click cho start button, gọi hàm startQuiz
startButton.addEventListener('click', startQuiz)
// Gắn sự kiện click cho restart button, gọi hàm restartQuiz
restartButton.addEventListener('click', restartQuiz)

// Function: bắt đầu quiz (business: reset state, chuyển màn hình)
function startQuiz() {
  // reset vars - Reset các biến trạng thái
  currentQuestionIndex = 0 // Đặt lại chỉ số câu hỏi
  score = 0 // Đặt lại điểm
  scoreSpan.textContent = 0 // Cập nhật UI điểm

  // Chuyển màn hình: ẩn start, hiện quiz
  startScreen.classList.remove('active')
  quizScreen.classList.add('active')

  // Hiển thị câu hỏi đầu tiên
  showQuestion()
}

// Function: hiển thị câu hỏi (business: render UI động)
function showQuestion() {
  // reset state - Reset trạng thái cho câu hỏi mới
  answersDisabled = false // Cho phép chọn đáp án

  // Lấy câu hỏi hiện tại từ mảng
  const currentQuestion = quizQuestions[currentQuestionIndex]

  // Cập nhật số câu hỏi hiện tại (1-based)
  currentQuestionSpan.textContent = currentQuestionIndex + 1

  // Tính % tiến trình và cập nhật thanh progress
  const progressPercent = (currentQuestionIndex / quizQuestions.length) * 100
  progressBar.style.width = progressPercent + '%'

  // Hiển thị câu hỏi
  questionText.textContent = currentQuestion.question

  // Xóa các đáp án cũ
  answersContainer.innerHTML = ''

  // Tạo button cho mỗi đáp án
  currentQuestion.answers.forEach(answer => {
    // Tạo element button
    const button = document.createElement('button')
    // Đặt text cho button
    button.textContent = answer.text
    // Thêm class CSS
    button.classList.add('answer-btn')

    // Lưu thông tin đúng/sai vào dataset (custom data attribute)
    button.dataset.correct = answer.correct

    // Gắn sự kiện click, gọi selectAnswer
    button.addEventListener('click', selectAnswer)

    // Thêm button vào container
    answersContainer.appendChild(button)
  })
}

// Function: xử lý chọn đáp án (business: logic game, feedback)
function selectAnswer(event) {
  // optimization check - Kiểm tra nếu đã vô hiệu hóa
  if (answersDisabled) return

  // Vô hiệu hóa để tránh click nhiều lần
  answersDisabled = true

  // Lấy button được click
  const selectedButton = event.target
  // Kiểm tra đáp án đúng (dataset là string, so sánh với 'true')
  const isCorrect = selectedButton.dataset.correct === 'true'

  // Duyệt qua tất cả buttons để thêm class feedback
  Array.from(answersContainer.children).forEach(button => {
    // Nếu là đáp án đúng, thêm class 'correct'
    if (button.dataset.correct === 'true') {
      button.classList.add('correct')
      // Nếu là button được chọn và sai, thêm 'incorrect'
    } else if (button === selectedButton) {
      button.classList.add('incorrect')
    }
  })

  // Nếu đúng, tăng điểm và cập nhật UI
  if (isCorrect) {
    score++
    scoreSpan.textContent = score
  }

  // Chờ 1 giây rồi chuyển câu hỏi tiếp theo
  setTimeout(() => {
    // Tăng chỉ số câu hỏi
    currentQuestionIndex++

    // Kiểm tra còn câu hỏi không
    if (currentQuestionIndex < quizQuestions.length) {
      // Còn thì hiển thị câu hỏi tiếp
      showQuestion()
    } else {
      // Hết thì hiển thị kết quả
      showResults()
    }
  }, 1000)
}

// Function: hiển thị kết quả (business: tổng kết, khuyến khích)
function showResults() {
  // Chuyển màn hình: ẩn quiz, hiện result
  quizScreen.classList.remove('active')
  resultScreen.classList.add('active')

  // Hiển thị điểm cuối
  finalScoreSpan.textContent = score

  // Tính % đúng
  const percentage = (score / quizQuestions.length) * 100

  // Hiển thị thông điệp dựa trên %
  if (percentage === 100) {
    resultMessage.textContent = "Perfect! You're a genius!"
  } else if (percentage >= 80) {
    resultMessage.textContent = 'Great job! You know your stuff!'
  } else if (percentage >= 60) {
    resultMessage.textContent = 'Good effort! Keep learning!'
  } else if (percentage >= 40) {
    resultMessage.textContent = 'Not bad! Try again to improve!'
  } else {
    resultMessage.textContent = "Keep studying! You'll get better!"
  }
}

// Function: restart quiz (business: reset toàn bộ)
function restartQuiz() {
  // Ẩn màn hình result
  resultScreen.classList.remove('active')

  // Bắt đầu lại quiz
  startQuiz()
}
