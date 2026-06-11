import { TaskStatus, TaskPriority } from '../types'

export function formatMinutes(minutes: number): string {
  if (minutes < 60) return `${minutes}min`
  const h = Math.floor(minutes / 60)
  const m = minutes % 60
  return m > 0 ? `${h}h ${m}min` : `${h}h`
}

export const statusConfig: Record<TaskStatus, { label: string; color: string; bg: string; dot: string }> = {
  pending: {
    label: 'Pendente',
    color: 'text-amber-400',
    bg: 'bg-amber-400/10 border-amber-400/20',
    dot: 'bg-amber-400',
  },
  in_progress: {
    label: 'Em andamento',
    color: 'text-blue-400',
    bg: 'bg-blue-400/10 border-blue-400/20',
    dot: 'bg-blue-400',
  },
  done: {
    label: 'Concluído',
    color: 'text-neon-400',
    bg: 'bg-neon-400/10 border-neon-400/20',
    dot: 'bg-neon-400',
  },
}

export const priorityConfig: Record<TaskPriority, { label: string; color: string; bg: string }> = {
  low: {
    label: 'Baixa',
    color: 'text-slate-400',
    bg: 'bg-slate-400/10 border-slate-400/20',
  },
  medium: {
    label: 'Média',
    color: 'text-orange-400',
    bg: 'bg-orange-400/10 border-orange-400/20',
  },
  high: {
    label: 'Alta',
    color: 'text-red-400',
    bg: 'bg-red-400/10 border-red-400/20',
  },
}

export const CATEGORIES = [
  'Geral',
  'Trabalho',
  'Pessoal',
  'Estudos',
  'Saúde',
  'Financeiro',
  'Projetos',
]
