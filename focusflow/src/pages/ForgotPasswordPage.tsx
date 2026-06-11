import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Mail, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../layouts/AuthLayout'

export function ForgotPasswordPage() {
  const { resetPassword } = useAuth()
  const [email, setEmail] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [sent, setSent] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email) {
      setError('Informe seu email.')
      return
    }

    try {
      setLoading(true)
      const { error } = await resetPassword(email)
      if (error) {
        setError('Erro ao enviar email. Verifique o endereço e tente novamente.')
        return
      }
      setSent(true)
    } finally {
      setLoading(false)
    }
  }

  if (sent) {
    return (
      <AuthLayout title="Email enviado!" subtitle="Verifique sua caixa de entrada">
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <CheckCircle size={48} className="text-neon-400" />
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Enviamos um link de redefinição para <strong className="text-white">{email}</strong>.
          </p>
          <Link to="/login" className="text-neon-400 hover:text-neon-300 text-sm font-medium transition-colors">
            ← Voltar ao login
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Redefinir senha" subtitle="Enviaremos um link para o seu email">
      <form onSubmit={handleSubmit} className="space-y-4">
        {error && (
          <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
            {error}
          </div>
        )}

        <div>
          <label className="label">Email</label>
          <div className="relative">
            <Mail size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type="email"
              className="input-field pl-9"
              placeholder="seu@email.com"
              value={email}
              onChange={e => setEmail(e.target.value)}
              autoFocus
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-surface-200/40 border-t-surface-200 rounded-full animate-spin" />
              Enviando...
            </>
          ) : 'Enviar link de redefinição'}
        </button>

        <p className="text-center text-sm text-slate-500 pt-2">
          <Link to="/login" className="text-neon-400 hover:text-neon-300 font-medium transition-colors">
            ← Voltar ao login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
