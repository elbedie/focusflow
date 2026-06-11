import { Logo } from '../components/Logo'

interface AuthLayoutProps {
  children: React.ReactNode
  title: string
  subtitle: string
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-surface-300 flex flex-col items-center justify-center p-4">
      {/* Background glow */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-96 h-96 bg-neon-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-64 h-64 bg-blue-500/3 rounded-full blur-3xl" />
      </div>

      <div className="relative w-full max-w-md">
        {/* Logo */}
        <div className="flex justify-center mb-8">
          <Logo size="lg" />
        </div>

        {/* Card */}
        <div className="card p-8 animate-slide-up">
          <div className="mb-6">
            <h1 className="text-xl font-bold text-white mb-1">{title}</h1>
            <p className="text-sm text-slate-400">{subtitle}</p>
          </div>
          {children}
        </div>

        <p className="text-center mt-6 text-xs text-slate-600">
          © {new Date().getFullYear()} FocusFlow. Todos os direitos reservados.
        </p>
      </div>
    </div>
  )
}
