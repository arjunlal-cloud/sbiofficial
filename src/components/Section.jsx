const WEIGHTS = {
  anchor: 'section-y-lg',
  support: 'section-y',
  inline: 'section-y-sm',
}

export default function Section({
  weight = 'support',
  as: Tag = 'section',
  bordered = false,
  center = false,
  id,
  className = '',
  innerClassName = '',
  backdrop = null,
  children,
  ...rest
}) {
  return (
    <Tag
      id={id}
      className={`${WEIGHTS[weight]} relative px-6 sm:px-8 ${
        bordered ? 'border-t border-canvas-border' : ''
      } ${backdrop ? 'isolate overflow-hidden' : ''} ${id ? 'scroll-mt-24' : ''} ${className}`}
      {...rest}
    >
      {backdrop}
      <div
        className={`relative z-10 mx-auto w-full max-w-page ${
          center ? 'text-center' : ''
        } ${innerClassName}`}
      >
        {children}
      </div>
    </Tag>
  )
}
