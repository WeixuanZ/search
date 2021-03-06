import { formatQuery } from './utils'

let script = document.currentScript as HTMLScriptElement
if (script === undefined) {
  script = document.querySelector(
    'script[src^="https://weixuanz.github.io/search/client.js"],script[src^="http://localhost:4000/search/client.js"]'
  ) as HTMLScriptElement
}

// gather script element's attributes
const attrs: Record<string, string> = Object.values(script.attributes).reduce(
  (acc, val) => {
    acc[val.name.replace(/^data-/, '')] = val.value
    return acc
  },
  {}
)

// gather page attributes
const canonicalLink = document.querySelector(
  'link[rel="canonical"]'
) as HTMLLinkElement
attrs.url = canonicalLink
  ? canonicalLink.href
  : location.origin + location.pathname + location.search
attrs.origin = location.origin
attrs.pathname =
  location.pathname.length < 2
    ? 'index'
    : location.pathname.substr(1).replace(/\.\w+$/, '')

// add styles for the injected search iframe
document.head.insertAdjacentHTML(
  'afterbegin',
  `<style>
    #search {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: 9999;
      display: none;
    }
    #search-frame {
      position: absolute;
      height: 100%;
      width: 100%;
      left: 0;
      top: 0;
      border: none;
    }
  </style>`
)

// create the comments iframe and it's responsive container
const searchOrigin = script.src.match(
  /^https:\/\/weixuanz\.github\.io|http:\/\/localhost:\d+/
)[0]
const url = `${searchOrigin}/search/search.html`
script.insertAdjacentHTML(
  'afterend',
  `<div id="search"><iframe id="search-frame" title="Search" scrolling="no" src="${url}?${formatQuery(
    attrs
  )}"></iframe></div>`
)
const frameWrapper = script.nextSibling as HTMLDivElement
const searchBtn = document.querySelector('#search-btn') as HTMLDivElement
searchBtn.style.cursor = 'pointer'
searchBtn.addEventListener('click', () => {
  frameWrapper.style.display = 'block'
  const frame = frameWrapper.firstChild as HTMLIFrameElement
  frame.contentWindow.focus()
})

script.remove() // remove the original script tag

// listen to message for hiding the search iframe
addEventListener('message', (event) => {
  if (event.origin !== searchOrigin) {
    return
  }
  const data = event.data
  if (data && data.type === 'close') {
    frameWrapper.style.display = 'none'
    window.focus()
  }
})
