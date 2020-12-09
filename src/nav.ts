let currTarget: HTMLDivElement
let targets: Array<HTMLDivElement>

let pauseMouse = false
let timeout: number

export const updateTargets = (): void => {
  targets = Array.from(document.querySelectorAll('.post-item'))
}

function handleMouseOver(): void {
  if (pauseMouse || this === currTarget) {
    return
  }
  if (currTarget) {
    currTarget.classList.remove('current')
  }
  this.classList.add('current')
  currTarget = this
}

function handleMouseLeave(): void {
  if (pauseMouse || this === currTarget) {
    return
  }
  this.classList.remove('current')
}

export const addMouseOverHandler = (): void => {
  targets.forEach((el) => {
    el.addEventListener('mouseover', handleMouseOver)
    el.addEventListener('mouseleave', handleMouseLeave)
  })
}

const getTargetIndex = (target: HTMLDivElement): number =>
  targets.findIndex((el) => el === target)

const scrollToTarget = (target: HTMLDivElement): void => {
  // document.querySelector('#hits').scrollTop = target.offsetTop - 70;
  target.scrollIntoView(false)
}

const updateCurrTarget = (newIndex: number): void => {
  if (currTarget) {
    currTarget.classList.remove('current')
  }
  const n = targets.length
  currTarget = targets[((newIndex % n) + n) % n] // :(
  currTarget.classList.add('current')

  pauseMouse = true // prevents race with mouseover event
  clearTimeout(timeout)
  scrollToTarget(currTarget)
  timeout = setTimeout(() => (pauseMouse = false), 200)
}

export const handleArrowUp = (): void => {
  updateCurrTarget(getTargetIndex(currTarget) - 1)
}

export const handleArrowDown = (): void => {
  updateCurrTarget(getTargetIndex(currTarget) + 1)
}

export const handleEnter = (): void => {
  window.open(currTarget.getAttribute('data-url'), '_top')
}
