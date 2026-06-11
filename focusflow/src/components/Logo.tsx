interface LogoProps {
  size?: 'sm' | 'md' | 'lg'
  collapsed?: boolean
}

export function Logo({ size = 'md', collapsed = false }: LogoProps) {
  const sizes = {
    sm: { icon: 'w-7 h-7', text: 'text-base' },
    md: { icon: 'w-9 h-9', text: 'text-xl' },
    lg: { icon: 'w-12 h-12', text: 'text-2xl' },
  }

  return (
    <div className="flex items-center gap-3">
      <div className={`${sizes[size].icon} rounded-xl bg-neon-500/10 border border-neon-500/30 flex items-center justify-center flex-shrink-0 shadow-neon-sm`}>
        <svg viewBox="0 0 24 24" fill="none" className="w-4/6 h-4/6">
          <circle cx="12" cy="12" r="9" stroke="#22c55e" strokeWidth="1.5" />
          <path d="M12 7v5l3 1.5" stroke="#22c55e" strokeWidth="1.5" strokeLinecap="round" />
        </svg>
      </div>
      {!collapsed && (
        <span className={`${sizes[size].text} font-bold tracking-tight text-white`}>
          Focus<span className="text-neon-400">Flow</span>
        </span>
      )}
    </div>
  )
}
