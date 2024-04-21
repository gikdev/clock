class Dialog {
  #isOpen = false
  #modal = null
  #openBtn = null
  #closeBtn = null

  constructor({ modal, openBtn, closeBtn }) {
    this.#modal = modal
    this.#openBtn = openBtn
    this.#closeBtn = closeBtn

    this.#openBtn.addEventListener('click', this.open.bind(this))
    this.#closeBtn.addEventListener('click', this.close.bind(this))
    this.#modal.addEventListener('click', e => {
      if (e.target === this.#modal) this.close()
    })
  }

  get isOpen() { return this.#isOpen }

  open() {
    this.#isOpen = true
    this.#modal.hidden = !this.#isOpen
  }
  close() {
    this.#isOpen = false
    this.#modal.hidden = !this.#isOpen
  }
}

// SELECTORS
const addH = document.querySelector('#add-h')
const addM = document.querySelector('#add-m')
const addS = document.querySelector('#add-s')
const minH = document.querySelector('#min-h')
const minM = document.querySelector('#min-m')
const minS = document.querySelector('#min-s')
const timeBtns = document.querySelectorAll('#add-h, #add-m, #add-s, #min-h, #min-m, #min-s')
const html = document.querySelector('html')
const hours = document.querySelector('#hours')
const minutes = document.querySelector('#minutes')
const seconds = document.querySelector('#seconds')
const auto = document.querySelector('#auto')
const dayOrNight = document.querySelector('#day-or-night')
const tap = document.querySelector('#tap')
const clickables = document.querySelectorAll('#auto, #add-h, #add-m, #add-s, #min-h, #min-m, #min-s')
const openBtn = document.querySelector('#open-modal')
const closeBtn = document.querySelector('#close-modal')
const modal = document.querySelector('#modal')
const themeToggle = document.querySelector('#theme-toggle')
const iconMoon = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" /></svg>'
const iconSun = '<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6"><path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" /></svg>'

// STATE
let isAuto = false
let isDark = true
let time = new Date()

// UTILS
const zeroify = obj => (obj < 10) ? (`0${obj}`) : (obj)
const isDay = () => (5 < time.getHours() && time.getHours() < 20)
const playTap = () => tap.play()

// FUNCTIONS
function toggleTheme() {
  html.setAttribute('data-theme', isDark ? 'light' : 'dark')
  themeToggle.innerHTML = isDark ? iconMoon : iconSun
  isDark = !isDark
}
function showTime() {
  hours.innerText = zeroify(time.getHours())
  minutes.innerText = zeroify(time.getMinutes())
  seconds.innerText = zeroify(time.getSeconds())
  dayOrNight.innerText = isDay() ? 'روز' : 'شب'
}
function handleTick() {
  if (isAuto) time = new Date()
  else time.setSeconds(time.getSeconds() + 1)
}
function setAuto(val) {
  isAuto = val
  timeBtns.forEach(btn => btn.disabled = isAuto)
  if (isAuto) {
    hours.removeEventListener('click', inputEditH)
    minutes.removeEventListener('click', inputEditM)
    seconds.removeEventListener('click', inputEditS)
  } else {
    hours.addEventListener('click', inputEditH)
    minutes.addEventListener('click', inputEditM)
    seconds.addEventListener('click', inputEditS)
  }
}
function addTime(h, m, s) {
  time.setHours(time.getHours() + h)
  time.setMinutes(time.getMinutes() + m)
  time.setSeconds(time.getSeconds() + s)
  showTime()
}
function minTime(h, m, s) {
  time.setHours(time.getHours() - h)
  time.setMinutes(time.getMinutes() - m)
  time.setSeconds(time.getSeconds() - s)
  showTime()
}
function inputEdit(target, method) {
  const input = document.createElement('INPUT')
  input.setAttribute('type', 'number')
  input.setAttribute('size', '2')
  target.replaceWith(input)
  input.focus()

  input.addEventListener('keyup', e => {
    if (e.key === 'Enter' || e.key === 'Escape') input.blur()
  })
  input.addEventListener('blur', e => {
    time[method](Number(e.target.value))
    input.replaceWith(target)
    showTime()
    input.remove()
  })
}
function inputEditH(e) { return inputEdit(e.target,'setHours') }
function inputEditM(e) { return inputEdit(e.target,'setMinutes') }
function inputEditS(e) { return inputEdit(e.target,'setSeconds') }

// EVENT LISTENERS
addH.addEventListener('click', e => addTime(1, 0, 0))
addM.addEventListener('click', e => addTime(0, 1, 0))
addS.addEventListener('click', e => addTime(0, 0, 1))
minH.addEventListener('click', e => minTime(1, 0, 0))
minM.addEventListener('click', e => minTime(0, 1, 0))
minS.addEventListener('click', e => minTime(0, 0, 1))
auto.addEventListener('change', e => setAuto(e.target.checked))
clickables.forEach(el => el.addEventListener('click', playTap))
themeToggle.addEventListener('click', toggleTheme)
setInterval(showTime, 1000)
setInterval(handleTick, 1000)
document.addEventListener('DOMContentLoaded', () => {

})
// MISC.
showTime()
setAuto(false)
const infoDialog = new Dialog({ modal, openBtn, closeBtn })