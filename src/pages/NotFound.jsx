import Button from '../components/Button'
import { PATHS } from '../routes/paths'

/**
 * 404 page — shown for any URL that does not match a route.
 */
export default function NotFound() {
  return (
    <section className="py-20 md:py-32 bg-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">
          Error 404
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">Page not found</h1>
        <p className="text-slate mb-8">
          The page you are looking for doesn&apos;t exist or has been moved.
        </p>
        <Button variant="primary" to={PATHS.HOME}>
          Back to Home
        </Button>
      </div>
    </section>
  )
}
