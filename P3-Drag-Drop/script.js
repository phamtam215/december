const cards = document.querySelectorAll('.card')
const lists = document.querySelectorAll('.list')

// Lặp qua tất cả các card (thẻ draggable)
for (const card of cards) {
  // Khi bắt đầu kéo card, gọi hàm dragStart
  card.addEventListener('dragstart', dragStart)

  // Khi kết thúc kéo (thả hoặc hủy), gọi hàm dragEnd
  card.addEventListener('dragend', dragEnd)
}

// Lặp qua tất cả các list (vùng chứa card)
for (const list of lists) {
  // Khi kéo card vào trong list, gọi dragOver
  // dragOver thường dùng e.preventDefault() để cho phép drop
  list.addEventListener('dragover', dragOver)

  // Khi kéo card vào vùng list (chạm vào), gọi dragEnter
  list.addEventListener('dragenter', dragEnter)

  // Khi kéo card ra khỏi vùng list (rời khỏi vùng), gọi dragLeave
  list.addEventListener('dragleave', dragLeave)

  // Khi thả card vào list, gọi dragDrop
  list.addEventListener('drop', dragDrop)
}

function dragStart(e) {
  // Khi bắt đầu kéo thẻ card
  // e.dataTransfer: là object lưu dữ liệu tạm thời trong quá trình kéo
  // setData('text/plain', this.id): lưu id của thẻ đang kéo
  // -> để biết khi thả vào đâu, lấy ra thẻ này
  e.dataTransfer.setData('text/plain', this.id)
}

function dragEnd() {
  // Khi kết thúc kéo (thả hoặc hủy)
  console.log('Drag ended')
  // Thường dùng để reset style nếu cần
}

function dragOver(e) {
  // Phải preventDefault, vì mặc định browser không cho phép drop
  // Nếu không gọi preventDefault, sự kiện drop sẽ không xảy ra
  // Mặc định là chỉ kéo cái bóng rồi về lại vị trí cũ
  e.preventDefault()
}

function dragEnter(e) {
  e.preventDefault() // cũng phải preventDefault để cho phép drop
  // Thêm class 'over' để highlight vùng drop khi kéo thẻ vào
  this.classList.add('over')
}

function dragLeave(e) {
  // Khi kéo thẻ rời khỏi vùng drop
  // Loại bỏ highlight để trở về trạng thái bình thường
  this.classList.remove('over')
}

function dragDrop(e) {
  // Lấy id của thẻ đang kéo từ dataTransfer
  const id = e.dataTransfer.getData('text/plain')
  // Lấy element thẻ từ DOM
  const card = document.getElementById(id)

  // Thêm thẻ vào vùng drop (append vào list mới)
  this.appendChild(card)
  // Loại bỏ highlight
  this.classList.remove('over')
}
