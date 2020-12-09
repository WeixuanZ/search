import algoliasearch from 'algoliasearch/lite'
import instantsearch from 'instantsearch.js'
import { searchBox } from 'instantsearch.js/es/widgets'
import { connectHits } from 'instantsearch.js/es/connectors'

import { decodeQuery } from './utils'
import { addMouseOverHandler, updateTargets, handleArrowUp, handleArrowDown, handleEnter } from './nav'

const param = decodeQuery(location.search.substr(1))

// if the device does not have a touch screen, show keyboard hint
const touchDevice =
  navigator.maxTouchPoints || 'ontouchstart' in document.documentElement
if (!touchDevice) {
  document.querySelector('.hints-wrapper').style.display = 'block'
}

const searchClient = algoliasearch(param.appid, param.searchkey)

const search = instantsearch({
  indexName: param.indexname,
  searchClient
})

const renderBreadcrumb = (headings) =>
  headings
    .map((match) => {
      return `<span class="post-breadcrumb">${match.value}</span>`
    })
    .join(' > ')

const renderBreadcrumbs = (hit) =>
  hit._highlightResult.headings
    ? `<div class="post-breadcrumbs">${renderBreadcrumb(
        hit._highlightResult.headings
      )}</div>`
    : ''

const renderSnippet = (hit) =>
  hit._highlightResult.html
    ? `<div class="post-snippet">${instantsearch.highlight({
        attribute: 'content',
        hit
      })}</div>`
    : ''

const renderHit = (hit) => `
  <div
    class="post-item"
    data-url="${param.origin}${hit.url}"
    onclick="window.open(this.getAttribute('data-url'), '_top')"
    onmouseleave="this.classList.remove('current')"
  >
    <span class="post-title">${hit.title}</span>
    ${renderBreadcrumbs(hit)}
    ${renderSnippet(hit)}
  </div>`

const renderHits = (renderOptions, isFirstRender) => {
  const { hits, widgetParams } = renderOptions
  document.querySelector(widgetParams.container).innerHTML = hits
    .map(renderHit)
    .join('')
  updateTargets()
  addMouseOverHandler()
}

const customHits = connectHits(renderHits)

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Type to search',
    autofocus: true,
    showReset: false,
    showSubmit: false,
    showLoadingIndicator: false
  }),
  customHits({
    container: '#hits'
  })
])

search.start()

interface CloseMessage {
  type: 'close'
}

const hideFrame = () => {
  const msg: CloseMessage = { type: 'close' }
  parent.postMessage(msg, param.origin)
}

const handleCloseClick = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  hideFrame()
}

document.querySelector('.wrapper').addEventListener('click', handleCloseClick)

const frameHidden = () =>
  parent.document.querySelector('#search').style.display === 'none'

// listenn to keyboard events
const handleKeydown = (event) => {
  if (frameHidden()) {
    return
  }
  switch (event.keyCode) {
    case 27:
      event.preventDefault()
      hideFrame()
      break
    case 13: // enter
      handleEnter()
      break
    case 38: // arrow up
      handleArrowUp()
      break
    case 40: // arrow down
      handleArrowDown()
      break
  }
}

parent.addEventListener('keydown', handleKeydown)
