import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Mail, Lock, Eye, EyeOff, CheckCircle } from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { AuthLayout } from '../layouts/AuthLayout'

export function RegisterPage() {
  const { signUp } = useAuth()
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirm, setConfirm] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)

    if (!email || !password || !confirm) {
      setError('Preencha todos os campos.')
      return
    }
    if (password.length < 6) {
      setError('A senha deve ter pelo menos 6 caracteres.')
      return
    }
    if (password !== confirm) {
      setError('As senhas não coincidem.')
      return
    }

    try {
      setLoading(true)
      const { error } = await signUp(email, password)
      if (error) {
        if (error.message.includes('already registered')) {
          setError('Este email já está cadastrado.')
        } else {
          setError('Erro ao criar conta. Tente novamente.')
        }
        return
      }
      setSuccess(true)
      setTimeout(() => navigate('/login'), 3000)
    } finally {
      setLoading(false)
    }
  }

  if (success) {
    return (
      <AuthLayout title="Conta criada!" subtitle="Verifique seu email para continuar">
        <div className="text-center py-4">
          <div className="flex justify-center mb-4">
            <CheckCircle size={48} className="text-neon-400" />
          </div>
          <p className="text-sm text-slate-400 mb-4">
            Enviamos um link de confirmação para <strong className="text-white">{email}</strong>.
            Verifique sua caixa de entrada.
          </p>
          <Link to="/login" className="text-neon-400 hover:text-neon-300 text-sm font-medium transition-colors">
            Ir para o login →
          </Link>
        </div>
      </AuthLayout>
    )
  }

  return (
    <AuthLayout title="Criar conta" subtitle="Comece a gerenciar seu tempo hoje">
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
              autoComplete="email"
            />
          </div>
        </div>

        <div>
          <label className="label">Senha</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-9 pr-10"
              placeholder="Mínimo 6 caracteres"
              value={password}
              onChange={e => setPassword(e.target.value)}
              autoComplete="new-password"
            />
            <button
              type="button"
              onClick={() => setShowPassword(v => !v)}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
            >
              {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
            </button>
          </div>
        </div>

        <div>
          <label className="label">Confirmar senha</label>
          <div className="relative">
            <Lock size={15} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
            <input
              type={showPassword ? 'text' : 'password'}
              className="input-field pl-9"
              placeholder="Repita a senha"
              value={confirm}
              onChange={e => setConfirm(e.target.value)}
              autoComplete="new-password"
            />
          </div>
        </div>

        <button type="submit" disabled={loading} className="btn-primary w-full justify-center py-3 mt-2">
          {loading ? (
            <>
              <span className="w-4 h-4 border-2 border-surface-200/40 border-t-surface-200 rounded-full animate-spin" />
              Criando conta...
            </>
          ) : 'Criar conta grátis'}
        </button>

        <p className="text-center text-sm text-slate-500 pt-2">
          Já tem uma conta?{' '}
          <Link to="/login" className="text-neon-400 hover:text-neon-300 font-medium transition-colors">
            Fazer login
          </Link>
        </p>
      </form>
    </AuthLayout>
  )
}
