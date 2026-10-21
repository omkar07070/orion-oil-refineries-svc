import Button from '../components/Button'
import { PATHS } from '../routes/paths'

/**
 * Route-level error boundary — shown when a route fails to load or render.
 */
export default function RouteError() {
  return (
    <section className="py-20 md:py-32 bg-ink">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <span className="text-gold uppercase tracking-widest text-xs font-semibold mb-4 block">
          Error
        </span>
        <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
          Something went wrong
        </h1>
        <p className="text-slate mb-8">
          We couldn&apos;t load this page. Please try again.
        </p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button variant="primary" onClick={() => window.location.reload()}>
            Reload
          </Button>
          <Button variant="secondary" to={PATHS.HOME}>
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  )
}
