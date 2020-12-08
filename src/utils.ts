const decodeURI = (uri: string): string =>
  decodeURIComponent(uri.replace(/[+]/g, '%20'))

export const decodeQuery = (query: string): Record<string, string> =>
  query.split('&').reduce((acc, val) => {
    acc[decodeURI(val.split('=')[0])] = decodeURI(val.split('=')[1])
    return acc
  }, {})

export const formatQuery = (obj: Record<string, string>): string =>
  Object.entries(obj)
    .map(
      (val: [string, string]): string =>
        `${encodeURIComponent(val[0])}=${encodeURIComponent(val[1])}`
    )
    .join('&')
