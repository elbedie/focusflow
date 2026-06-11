import { AlertTriangle, X } from 'lucide-react'

interface ConfirmModalProps {
  isOpen: boolean
  title: string
  message: string
  onConfirm: () => void
  onCancel: () => void
  loading?: boolean
}

export function ConfirmModal({ isOpen, title, message, onConfirm, onCancel, loading }: ConfirmModalProps) {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onCancel} />
      <div className="relative w-full max-w-sm bg-card border border-card-border rounded-2xl shadow-card-hover animate-slide-up">
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <div className="flex items-center gap-2">
            <AlertTriangle size={16} className="text-red-400" />
            <h2 className="text-sm font-semibold text-white">{title}</h2>
          </div>
          <button onClick={onCancel} className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors">
            <X size={15} />
          </button>
        </div>
        <div className="px-6 py-5">
          <p className="text-sm text-slate-400 mb-5">{message}</p>
          <div className="flex justify-end gap-3">
            <button onClick={onCancel} className="btn-secondary">Cancelar</button>
            <button onClick={onConfirm} disabled={loading} className="btn-danger">
              {loading ? (
                <span className="w-4 h-4 border-2 border-red-400/40 border-t-red-400 rounded-full animate-spin" />
              ) : 'Excluir'}
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
