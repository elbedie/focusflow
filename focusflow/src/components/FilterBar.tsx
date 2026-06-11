import { Search, X } from 'lucide-react'
import { FilterState, TaskPriority, TaskStatus } from '../types'

interface FilterBarProps {
  filters: FilterState
  onChange: (filters: FilterState) => void
  total: number
  filtered: number
}

export function FilterBar({ filters, onChange, total, filtered }: FilterBarProps) {
  const set = <K extends keyof FilterState>(key: K, value: FilterState[K]) =>
    onChange({ ...filters, [key]: value })

  const hasFilters = filters.status !== 'all' || filters.priority !== 'all' || filters.search !== ''

  const clear = () => onChange({ status: 'all', priority: 'all', search: '' })

  return (
    <div className="flex flex-col sm:flex-row gap-3 items-start sm:items-center">
      {/* Search */}
      <div className="relative flex-1 max-w-sm">
        <Search size={14} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-500" />
        <input
          type="text"
          className="input-field pl-9 pr-8"
          placeholder="Buscar tarefas..."
          value={filters.search}
          onChange={e => set('search', e.target.value)}
        />
        {filters.search && (
          <button
            onClick={() => set('search', '')}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-500 hover:text-slate-300 transition-colors"
          >
            <X size={13} />
          </button>
        )}
      </div>

      {/* Status filter */}
      <select
        className="input-field w-auto"
        value={filters.status}
        onChange={e => set('status', e.target.value as TaskStatus | 'all')}
      >
        <option value="all">Todos os status</option>
        <option value="pending">Pendente</option>
        <option value="in_progress">Em andamento</option>
        <option value="done">Concluído</option>
      </select>

      {/* Priority filter */}
      <select
        className="input-field w-auto"
        value={filters.priority}
        onChange={e => set('priority', e.target.value as TaskPriority | 'all')}
      >
        <option value="all">Todas as prioridades</option>
        <option value="low">Baixa</option>
        <option value="medium">Média</option>
        <option value="high">Alta</option>
      </select>

      {/* Clear + count */}
      <div className="flex items-center gap-2 flex-shrink-0">
        {hasFilters && (
          <button onClick={clear} className="btn-secondary py-2 text-xs">
            <X size={12} />
            Limpar
          </button>
        )}
        <span className="text-xs text-slate-500 font-mono whitespace-nowrap">
          {filtered}/{total}
        </span>
      </div>
    </div>
  )
}
