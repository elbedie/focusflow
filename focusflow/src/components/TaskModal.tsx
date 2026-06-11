import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Task, TaskFormData, TaskStatus, TaskPriority } from '../types'
import { CATEGORIES } from '../utils'

interface TaskModalProps {
  isOpen: boolean
  onClose: () => void
  onSave: (data: TaskFormData) => Promise<void>
  editingTask?: Task | null
}

const DEFAULT_FORM: TaskFormData = {
  title: '',
  description: '',
  category: 'Geral',
  status: 'pending',
  priority: 'medium',
  estimated_time: 30,
}

export function TaskModal({ isOpen, onClose, onSave, editingTask }: TaskModalProps) {
  const [form, setForm] = useState<TaskFormData>(DEFAULT_FORM)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (editingTask) {
      setForm({
        title: editingTask.title,
        description: editingTask.description ?? '',
        category: editingTask.category,
        status: editingTask.status,
        priority: editingTask.priority,
        estimated_time: editingTask.estimated_time,
      })
    } else {
      setForm(DEFAULT_FORM)
    }
    setError(null)
  }, [editingTask, isOpen])

  if (!isOpen) return null

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!form.title.trim()) {
      setError('O título é obrigatório.')
      return
    }
    try {
      setSaving(true)
      setError(null)
      await onSave(form)
      onClose()
    } catch {
      setError('Erro ao salvar tarefa. Tente novamente.')
    } finally {
      setSaving(false)
    }
  }

  const set = <K extends keyof TaskFormData>(key: K, value: TaskFormData[K]) =>
    setForm(prev => ({ ...prev, [key]: value }))

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in"
      onClick={e => e.target === e.currentTarget && onClose()}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative w-full max-w-lg bg-card border border-card-border rounded-2xl shadow-card-hover animate-slide-up">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-card-border">
          <h2 className="text-base font-semibold text-white">
            {editingTask ? 'Editar tarefa' : 'Nova tarefa'}
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-400 hover:text-white hover:bg-slate-700/50 transition-colors"
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          {error && (
            <div className="px-4 py-3 bg-red-500/10 border border-red-500/20 rounded-xl text-red-400 text-sm">
              {error}
            </div>
          )}

          <div>
            <label className="label">Título *</label>
            <input
              type="text"
              className="input-field"
              placeholder="Ex: Revisar relatório mensal"
              value={form.title}
              onChange={e => set('title', e.target.value)}
              autoFocus
              maxLength={120}
            />
          </div>

          <div>
            <label className="label">Descrição</label>
            <textarea
              className="input-field resize-none"
              placeholder="Detalhes da tarefa (opcional)..."
              value={form.description ?? ''}
              onChange={e => set('description', e.target.value)}
              rows={3}
              maxLength={500}
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Categoria</label>
              <select
                className="input-field"
                value={form.category}
                onChange={e => set('category', e.target.value)}
              >
                {CATEGORIES.map(c => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="label">Tempo estimado</label>
              <select
                className="input-field"
                value={form.estimated_time}
                onChange={e => set('estimated_time', Number(e.target.value))}
              >
                {[15, 30, 45, 60, 90, 120, 180, 240, 300, 480].map(m => (
                  <option key={m} value={m}>
                    {m < 60 ? `${m} min` : `${m / 60}h${m % 60 ? ` ${m % 60}min` : ''}`}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="label">Status</label>
              <select
                className="input-field"
                value={form.status}
                onChange={e => set('status', e.target.value as TaskStatus)}
              >
                <option value="pending">Pendente</option>
                <option value="in_progress">Em andamento</option>
                <option value="done">Concluído</option>
              </select>
            </div>
            <div>
              <label className="label">Prioridade</label>
              <select
                className="input-field"
                value={form.priority}
                onChange={e => set('priority', e.target.value as TaskPriority)}
              >
                <option value="low">Baixa</option>
                <option value="medium">Média</option>
                <option value="high">Alta</option>
              </select>
            </div>
          </div>

          <div className="flex justify-end gap-3 pt-2">
            <button type="button" onClick={onClose} className="btn-secondary">
              Cancelar
            </button>
            <button type="submit" disabled={saving} className="btn-primary">
              {saving ? (
                <>
                  <span className="w-4 h-4 border-2 border-surface-200/40 border-t-surface-200 rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                editingTask ? 'Salvar alterações' : 'Criar tarefa'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
