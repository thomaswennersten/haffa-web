/* eslint-disable no-param-reassign */
/* eslint-disable func-names */
export const GoogleAdapter = (config: string) => {
    ;(function (w, d, s, l, i) {
        w[l] = w[l] || []
        w[l].push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
        const f = d.getElementsByTagName(s)[0]
        const j = d.createElement(s) as HTMLScriptElement
        const dl = l !== 'dataLayer' ? `&l=${l}` : ''
        j.async = true
        j.src = `https://www.googletagmanager.com/gtm.js?id=${i}${dl}`
        f.parentNode?.insertBefore(j, f)
    })(window as any, document, 'script', 'dataLayer', config)
}
