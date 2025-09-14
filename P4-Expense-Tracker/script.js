const balanceEl = document.getElementById('balance')
const incomeAmountEl = document.getElementById('income-amount')
const expenseAmountEl = document.getElementById('expense-amount')
const transactionListEl = document.getElementById('transaction-list')
const transactionFormEl = document.getElementById('transaction-form')
const descriptionEl = document.getElementById('description')
const amountEl = document.getElementById('amount')
// lắng nghe
transactionFormEl.addEventListener('submit', addTransaction)

// dùng để lưu trữ các giao dịch khi reload lại trang vẫn còn
let transactions = JSON.parse(localStorage.getItem('transactions')) || []

function addTransaction(e) {
  // Ngăn hành vi mặc định của form (reload trang khi submit).
  // Đảm bảo trang không refresh, giữ UX mượt mà và cho phép JS xử lý dữ liệu mà không mất trạng thái.
  e.preventDefault()
  // get form values
  const description = descriptionEl.value.trim()
  //  Lấy giá trị từ input amount, chuyển thành số thực bằng parseFloat() (vì input là string).
  const amount = parseFloat(amountEl.value)
  // Lưu giao dịch vào bộ nhớ tạm thời. Mảng này sẽ được dùng để tính toán balance, income, expenses và hiển thị danh sách.
  transactions.push({
    id: Date.now(),
    description,
    amount
  })

  // Lưu trữ giao dịch vào localStorage
  localStorage.setItem('transactions', JSON.stringify(transactions))

  updateTransactionList()
  updateSummary()

  transactionFormEl.reset()
}

function updateTransactionList() {
  // Xóa toàn bộ nội dung HTML bên trong element #transaction-list
  transactionListEl.innerHTML = ''
  // Mục đích code: Tạo bản sao của mảng transactions bằng spread operator [...transactions], sau đó đảo ngược thứ tự bằng .reverse() (mới nhất lên đầu).
  // Business: Hiển thị giao dịch gần đây nhất trước, cải thiện UX vì người dùng thường quan tâm đến giao dịch mới.
  const sortedTransactions = [...transactions].reverse()

  sortedTransactions.forEach(transaction => {
    const transactionEl = createTransactionElement(transaction)
    transactionListEl.appendChild(transactionEl)
  })
}

function createTransactionElement(transaction) {
  // Tạo element <li> mới cho giao dịch
  // Business: Mỗi giao dịch sẽ là một item trong danh sách
  const li = document.createElement('li')
  // Thêm class 'transaction' cho styling chung
  li.classList.add('transaction')
  // Thêm class 'income' nếu amount > 0, ngược lại 'expenses'
  // Business: Phân biệt visual giữa thu nhập (xanh) và chi tiêu (đỏ)
  li.classList.add(transaction.amount > 0 ? 'income' : 'expenses')

  // Đặt nội dung HTML cho <li>, bao gồm description, amount format, và nút xóa
  // Business: Hiển thị thông tin giao dịch và cho phép xóa
  li.innerHTML = `
    <span>${transaction.description}</span>
    <span>

    ${formatCurrency(transaction.amount)}
      <button class="delete-btn" onclick="removeTransaction(${
        transaction.id
      })">x</button>
    </span>
  `

  // Trả về element <li> đã tạo để append vào danh sách
  return li
}

function updateSummary() {
  // 100, -50, 200, -200 => 50
  const balance = transactions.reduce(
    (acc, transaction) => acc + transaction.amount,
    0
  )

  const income = transactions
    .filter(transaction => transaction.amount > 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  const expenses = transactions
    .filter(transaction => transaction.amount < 0)
    .reduce((acc, transaction) => acc + transaction.amount, 0)

  // update ui => todo: fix the formatting
  balanceEl.textContent = formatCurrency(balance)
  incomeAmountEl.textContent = formatCurrency(income)
  expenseAmountEl.textContent = formatCurrency(expenses)
}

// trả ra text đã format
function formatCurrency(number) {
  // Sử dụng Intl.NumberFormat để format số thành currency
  // Business: Hiển thị số tiền đẹp mắt, dễ đọc (ví dụ: $50.00 thay vì 50)
  return new Intl.NumberFormat('en-US', {
    // Locale 'en-US' cho format Mỹ (dấu chấm ngăn cách, $ trước)
    style: 'currency',
    // Style 'currency' để thêm ký hiệu tiền tệ
    currency: 'USD'
    // Currency 'USD' cho đô la Mỹ
  }).format(number)
  // Trả về string đã format (ví dụ: "$123.45")
}

function removeTransaction(id) {
  // filter out the one we wanted to delete
  transactions = transactions.filter(transaction => transaction.id !== id)

  localStorage.setItem('transactions', JSON.stringify(transactions))

  updateTransactionList()
  updateSummary()
}

// initial render
updateTransactionList()
updateSummary()
// removeTransaction()
