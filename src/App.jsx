import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import WhatsAppButton from './components/WhatsAppButton'
import ErrorBoundary from './components/ErrorBoundary'
import Home from './pages/Home'

// Lazy-load all non-home pages for route-level code splitting
const About = lazy(() => import('./pages/About'))
const Products = lazy(() => import('./pages/Products'))
const Technology = lazy(() => import('./pages/Technology'))
const Quality = lazy(() => import('./pages/Quality'))
const Industries = lazy(() => import('./pages/Industries'))
const Contact = lazy(() => import('./pages/Contact'))

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

// Helper: wraps a lazy component with error boundary + suspense
function LazyPage({ children }) {
  return (
    <ErrorBoundary>
      <Suspense fallback={<PageFallback />}>
        {children}
      </Suspense>
    </ErrorBoundary>
  )
}

export default function App() {
  return (
    <BrowserRouter>
      <Header />
      <main id="main-content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<LazyPage><About /></LazyPage>} />
          <Route path="/products" element={<LazyPage><Products /></LazyPage>} />
          <Route path="/technology" element={<LazyPage><Technology /></LazyPage>} />
          <Route path="/quality" element={<LazyPage><Quality /></LazyPage>} />
          <Route path="/industries" element={<LazyPage><Industries /></LazyPage>} />
          <Route path="/contact" element={<LazyPage><Contact /></LazyPage>} />
        </Routes>
      </main>
      <Footer />
      <WhatsAppButton />
    </BrowserRouter>
  )
}
