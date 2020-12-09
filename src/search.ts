import algoliasearch from 'algoliasearch/lite'
import instantsearch from 'instantsearch.js'
import { searchBox } from 'instantsearch.js/es/widgets'
import { connectHits } from 'instantsearch.js/es/connectors'

import { decodeQuery } from './utils'

const param = decodeQuery(location.search.substr(1))

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
    data-url="${param.origin}/${hit.url}"
    onclick="window.open(this.getAttribute('data-url'), '_top')"
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
}

const customHits = connectHits(renderHits)

search.addWidgets([
  searchBox({
    container: '#searchbox',
    placeholder: 'Type to search'
  }),
  customHits({
    container: '#hits'
  })
])

search.start()

interface CloseMessage {
  type: 'close'
}

const handleCloseClick = (event) => {
  if (event.target !== event.currentTarget) {
    return
  }
  const msg: CloseMessage = { type: 'close' }
  parent.postMessage(msg, param.origin)
}

document.querySelector('.wrapper').addEventListener(
  'click', handleCloseClick
)
