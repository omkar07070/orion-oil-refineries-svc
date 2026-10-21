import { useEffect } from 'react'
import { NOT_FOUND_META, PAGE_META, canonicalUrl } from '../routes/meta'
import { PATHS } from '../routes/paths'

/**
 * Apply per-route document title, meta description and canonical link.
 * @param {string} pathname current route path
 */
export function usePageMeta(pathname) {
  useEffect(() => {
    const known = PAGE_META[pathname]
    const meta = known || NOT_FOUND_META

    document.title = meta.title

    let description = document.head.querySelector('meta[name="description"]')
    if (!description) {
      description = document.createElement('meta')
      description.setAttribute('name', 'description')
      document.head.appendChild(description)
    }
    description.setAttribute('content', meta.description)

    let canonical = document.head.querySelector('link[rel="canonical"]')
    if (!canonical) {
      canonical = document.createElement('link')
      canonical.setAttribute('rel', 'canonical')
      document.head.appendChild(canonical)
    }
    canonical.setAttribute('href', known ? canonicalUrl(pathname) : canonicalUrl(PATHS.HOME))
  }, [pathname])
}

export default usePageMeta
