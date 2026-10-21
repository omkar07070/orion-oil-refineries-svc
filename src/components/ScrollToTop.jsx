import { useEffect, useRef } from 'react'
import { useLocation } from 'react-router-dom'

/**
 * The site sets `html { scroll-behavior: smooth }` globally, which would animate a
 * scrollTo(0, 0). Suspend it for the frame so route changes land at the top instantly.
 */
function scrollToTopInstant() {
  const root = document.documentElement
  const previous = root.style.scrollBehavior
  root.style.scrollBehavior = 'auto'
  window.scrollTo(0, 0)
  root.style.scrollBehavior = previous
}

function prefersReducedMotion() {
  return window.matchMedia('(prefers-reduced-motion: reduce)').matches
}

/** Scroll to the element behind the hash, waiting for lazily loaded content. */
function scrollToHash(hash) {
  const id = decodeURIComponent(hash.replace(/^#/, ''))
  if (!id) return

  const attempt = (tries) => {
    const el = document.getElementById(id)
    if (el) {
      const root = document.documentElement
      const previous = root.style.scrollBehavior
      if (prefersReducedMotion()) {
        root.style.scrollBehavior = 'auto'
        el.scrollIntoView({ block: 'start' })
        root.style.scrollBehavior = previous
      } else {
        el.scrollIntoView({ behavior: 'smooth', block: 'start' })
      }
      return
    }
    if (tries > 0) window.requestAnimationFrame(() => attempt(tries - 1))
  }

  attempt(90)
}

function focusMain() {
  const main = document.getElementById('main-content')
  if (main && typeof main.focus === 'function') main.focus()
}

/**
 * Route-change side effects:
 * - scroll to the top on navigation, unless the URL carries a hash
 * - scroll smoothly to the hash target when there is one
 * - move focus to <main> for screen readers
 */
export default function ScrollToTop() {
  const location = useLocation()
  const mounted = useRef(false)
  const prevPathname = useRef(location.pathname)

  useEffect(() => {
    const isFirstRender = !mounted.current
    mounted.current = true

    const pathnameChanged = prevPathname.current !== location.pathname
    prevPathname.current = location.pathname

    if (location.hash) {
      scrollToHash(location.hash)
      if (pathnameChanged && !isFirstRender) focusMain()
      return
    }

    if (isFirstRender || !pathnameChanged) return

    scrollToTopInstant()
    focusMain()
  }, [location.pathname, location.hash])

  return null
}
