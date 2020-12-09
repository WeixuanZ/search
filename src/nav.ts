let currTarget: HTMLDivElement
let targets: Array<HTMLDivElement>

export const updateTargets = (): void => {
  targets = Array.from(document.querySelectorAll('.post-item'))
}

function handleMouseOver(): void {
  if (currTarget) {
    currTarget.classList.remove('current')
  }
  this.classList.add('current')
  currTarget = this
}

export const addMouseOverHandler = (): void => {
  targets.forEach((el) => el.addEventListener('mouseover', handleMouseOver))
}

const getTargetIndex = (target: HTMLDivElement): number =>
  targets.findIndex((el) => el === target)

const updateCurrTarget = (newIndex: number): void => {
  if (currTarget) {
    currTarget.classList.remove('current')
  }
  const n = targets.length
  currTarget = targets[((newIndex % n) + n) % n] // :(
  currTarget.classList.add('current')
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
