![Search](/docs/search.png)

Algolia Search integration for my blog - https://weixuanz.github.io.

To use it on your website, simply set `search-btn` as the id of your search button element, then add the following to the end of `<body />`:

```html
<script
  src="https://weixuanz.github.io/search/client.js"
  appid="xxxxxxxxxx"
  searchkey="xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx"
  indexname="xxxx"
  defer
></script>
```

where `searchkey` is your **search-only** api key.

---

Inspired by [Utterances](https://github.com/utterance/utterances), built on top of [instantsearch.js](https://github.com/algolia/instantsearch.js).

MIT © [Weixuan Zhang](https://weixuanz.github.io/about/).
