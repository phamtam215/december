// thay thế cho const generateBtn = document.getElementById('generate-btn')
const generateBtn = document.querySelector('#generate-btn')
// thay thế cho const paletteContainer = document.getElementsByClassName('generate-btn')
const paletteContainer = document.querySelector('.palette-container')

generateBtn.addEventListener('click', generatePalette)

// catch event click vào bất kỳ chỗ nào của paletteContainer
paletteContainer.addEventListener('click', async function (e) {
  // catch event click button copy
  // e.target là element mà bạn đang click vào trực tiếp
  // element anh em ngay trước (sibling đứng trước e.target trong cùng một cha).
  // element anh em ngay trước của copy-btn là <span class="hex-value">#FF0000</span> -> textContent =#FF0000
  if (e.target.classList.contains('copy-btn')) {
    const hexValue = e.target.previousElementSibling.textContent
    // navigator.clipboard (Clipboard API) cho phép đọc/ghi dữ liệu vào clipBoard của hệ điều hành (chạy trong https hoặc local)
    try {
      await navigator.clipboard.writeText(hexValue)
      showCopiedIcon(e.target)
    } catch (err) {
      console.log(err)
    }
  }

  // catch event click color palette
  if (e.target.classList.contains('color')) {
    // Lấy ra text của mã màu nằm trong element kế tiếp (next sibling) -> "color-info"
    // Nếu không dùng querySelector thì sẽ copy nguyên tất cả các text của các element còn của "color-info"
    const hexValue =
      e.target.nextElementSibling.querySelector('.hex-value').textContent

    console.log(hexValue)

    try {
      // Copy mã màu vào clipboard bằng cách nhấn vào mã màu
      await navigator.clipboard.writeText(hexValue)
      // Nếu thành công -> highlight nút copy nằm trong element kế bên
      // showCopySuccess(e.target.nextElementSibling.querySelector('.copy-btn'))
    } catch (err) {
      console.log(err)
    }

    return
  }
})

function showCopiedIcon(element) {
  // xoá class copy icon
  element.classList.remove('far', 'fa-copy')
  // thêm class check icon
  element.classList.add('fas', 'fa-check')

  element.style.color = '#48bb78'
  // sau 1500s thì reset lại trạng thái copy icon
  setTimeout(() => {
    element.classList.remove('fas', 'fa-check')
    element.classList.add('far', 'fa-copy')
    element.style.color = ''
  }, 1500)
}

function generatePalette() {
  const colors = []

  for (let i = 0; i < 7; i++) {
    colors.push(generateRandomColor())
  }

  updatePaletteDisplay(colors)
}

function generateRandomColor() {
  const letters = '0123456789ABCDEF'
  let color = '#'
  // CHỈ lặp 6 lần
  for (let i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)]
  }
  return color
}

function updatePaletteDisplay(colors) {
  const colorBoxes = document.querySelectorAll('.color-box')
  // NodeList(6) [div.color-box, div.color-box, div.color-box, div.color-box, div.color-box, div.color-box]
  colorBoxes.forEach((box, index) => {
    const color = colors[index]
    // get element .color
    const colorDiv = box.querySelector('.color')
    // get element .hex-value
    const hexValue = box.querySelector('.hex-value')
    // style
    colorDiv.style.backgroundColor = color
    hexValue.textContent = color
    if (index == 1) {
      console.log(color)
      console.log(colorDiv.style.backgroundColor)
    }
  })
}

generatePalette()
