export function loadScript(src: string, attributes: Record<string, string> = {}) {
  const scripts = document.getElementsByTagName('script')
  let script: HTMLScriptElement | null = null
  for (let i = 0; i < scripts.length; i++) {
    script = scripts.item(i)
    if (script && decodeURIComponent(script.src) === decodeURIComponent(src)) {
      return script
    }
  }
  script = document.createElement('script')
  script.src = src
  script.type = "module"
  script.defer = true
  for (const key in attributes) {
    script.setAttribute(key, attributes[key])
  }

  ;(document.head || document.documentElement).appendChild(script)

  return script
}

export function loadLink(src: string) {
  return new Promise((resolve, reject) => {
    const links = document.getElementsByTagName('link')
    let link: HTMLLinkElement | null = null
    for (let i = 0; i < links.length; i++) {
      link = links.item(i)
      if (link && decodeURIComponent(link.href) === decodeURIComponent(src)) {
        return resolve(true)
      }
    }
    link = document.createElement('link')
    link.href = src
    link.rel = 'stylesheet'
    ;(document.head || document.documentElement).appendChild(link)
  })
}