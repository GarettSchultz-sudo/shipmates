import { cn } from '../lib/utils'

export function Tag({ children, selected, onClick, className }) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200',
        selected
          ? 'bg-brand-500 text-white'
          : 'bg-dark-700 text-gray-300 hover:bg-dark-600',
        className
      )}
    >
      {children}
    </button>
  )
}

export function TagGroup({ options, selected, onChange, multi = false }) {
  const handleClick = (value) => {
    if (multi) {
      const newSelected = selected.includes(value)
        ? selected.filter((v) => v !== value)
        : [...selected, value]
      onChange(newSelected)
    } else {
      onChange(value)
    }
  }

  return (
    <div className="flex flex-wrap gap-2">
      {options.map((option) => {
        const value = typeof option === 'string' ? option : option.value
        const label = typeof option === 'string' ? option : option.label
        const isSelected = multi ? selected.includes(value) : selected === value

        return (
          <Tag
            key={value}
            selected={isSelected}
            onClick={() => handleClick(value)}
          >
            {typeof option === 'object' && option.emoji && (
              <span className="mr-1">{option.emoji}</span>
            )}
            {label}
          </Tag>
        )
      })}
    </div>
  )
}
