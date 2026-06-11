import { Clock, Edit2, Trash2, Tag } from 'lucide-react'
import { Task } from '../types'
import { statusConfig, priorityConfig, formatMinutes } from '../utils'
import { Badge } from './Badge'
import { format } from 'date-fns'
import { ptBR } from 'date-fns/locale'

interface TaskCardProps {
  task: Task
  onEdit: (task: Task) => void
  onDelete: (task: Task) => void
  onStatusChange: (task: Task, status: Task['status']) => void
}

export function TaskCard({ task, onEdit, onDelete, onStatusChange }: TaskCardProps) {
  const status = statusConfig[task.status]
  const priority = priorityConfig[task.priority]

  const nextStatus: Record<Task['status'], Task['status']> = {
    pending: 'in_progress',
    in_progress: 'done',
    done: 'pending',
  }

  return (
    <div className="card p-5 hover:bg-card-hover hover:shadow-card-hover transition-all duration-200 group animate-fade-in">
      <div className="flex items-start justify-between gap-3 mb-3">
        <div className="flex-1 min-w-0">
          <h3 className={`font-semibold text-sm leading-tight mb-1 ${task.status === 'done' ? 'line-through text-slate-500' : 'text-white'}`}>
            {task.title}
          </h3>
          {task.description && (
            <p className="text-xs text-slate-500 line-clamp-2">{task.description}</p>
          )}
        </div>
        <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity duration-150 flex-shrink-0">
          <button
            onClick={() => onEdit(task)}
            className="p-1.5 rounded-lg hover:bg-slate-700/50 text-slate-400 hover:text-slate-200 transition-colors"
            title="Editar"
          >
            <Edit2 size={13} />
          </button>
          <button
            onClick={() => onDelete(task)}
            className="p-1.5 rounded-lg hover:bg-red-500/20 text-slate-400 hover:text-red-400 transition-colors"
            title="Excluir"
          >
            <Trash2 size={13} />
          </button>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-3">
        <Badge className={status.bg + ' ' + status.color}>
          <span className={`w-1.5 h-1.5 rounded-full ${status.dot}`} />
          {status.label}
        </Badge>
        <Badge className={priority.bg + ' ' + priority.color}>
          {priority.label}
        </Badge>
        <Badge className="bg-slate-700/40 border-slate-700/60 text-slate-400">
          <Tag size={10} />
          {task.category}
        </Badge>
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 text-xs text-slate-500">
          <Clock size={12} />
          <span>{formatMinutes(task.estimated_time)}</span>
          <span className="text-slate-700">·</span>
          <span>{format(new Date(task.created_at), "d MMM", { locale: ptBR })}</span>
        </div>
        <button
          onClick={() => onStatusChange(task, nextStatus[task.status])}
          className="text-xs text-slate-500 hover:text-neon-400 transition-colors font-medium"
          title="Avançar status"
        >
          {task.status === 'done' ? 'Reabrir →' : 'Avançar →'}
        </button>
      </div>
    </div>
  )
}
