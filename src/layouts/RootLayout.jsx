import { Suspense } from 'react'
import { Navigate, Outlet, useLocation } from 'react-router-dom'
import Header from '../components/Header'
import Footer from '../components/Footer'
import WhatsAppButton from '../components/WhatsAppButton'
import ErrorBoundary from '../components/ErrorBoundary'
import ScrollToTop from '../components/ScrollToTop'
import { usePageMeta } from '../hooks/usePageMeta'

// Minimal skeleton fallback — avoids layout shift, no spinner or pulse animation
function PageFallback() {
  return (
    <div
      style={{
        minHeight: '60vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#0B0F14',
      }}
      aria-hidden="true"
    />
  )
}

/**
 * Root layout — renders the chrome once for every route.
 * Header, <main> (wrapping the page outlet), Footer and the floating WhatsApp button.
 */
export default function RootLayout() {
  const location = useLocation()

  usePageMeta(location.pathname)

  // Trailing-slash variants (/about/) redirect to the canonical path
  if (location.pathname.length > 1 && location.pathname.endsWith('/')) {
    return <Navigate to={location.pathname.replace(/\/+$/, '')} replace />
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1} className="focus:outline-none">
        <ErrorBoundary>
          <Suspense fallback={<PageFallback />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
      <WhatsAppButton />
      <ScrollToTop />
    </>
  )
}
