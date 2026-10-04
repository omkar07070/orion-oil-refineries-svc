/**
 * Shared Button component —统一 primary (gold pill) and secondary (outlined) styles.
 * @param {{ variant?: 'primary' | 'secondary', href?: string, onClick?: () => void, children: React.ReactNode, className?: string, type?: string, disabled?: boolean }} props
 */
export default function Button({
  variant = 'primary',
  href,
  onClick,
  children,
  className = '',
  type = 'button',
  disabled = false,
}) {
  const baseClasses = `
    inline-flex items-center justify-center gap-2
    font-semibold text-sm
    transition-all duration-200
    min-h-[44px] min-w-[44px]
    focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2
  `

  const primaryClasses = `
    ${baseClasses}
    px-6 py-2.5
    bg-gold text-white
    rounded-lg
    hover:bg-gold-light hover:-translate-y-0.5 hover:shadow-lg
    active:bg-gold-dark
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0
  `

  const secondaryClasses = `
    ${baseClasses}
    px-6 py-2.5
    border-2 border-gold text-gold
    rounded-lg
    hover:bg-gold hover:text-white
    active:bg-gold-dark
  `

  const classes = variant === 'primary' ? primaryClasses : secondaryClasses

  if (href) {
    return (
      <a href={href} className={`${classes} ${className}`}>
        {children}
      </a>
    )
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${classes} ${className}`}
    >
      {children}
    </button>
  )
}
