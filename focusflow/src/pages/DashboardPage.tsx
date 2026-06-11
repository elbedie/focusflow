import { useState } from 'react'
import {
  Plus,
  CheckCircle2,
  Clock,
  ListTodo,
  Timer,
  AlertCircle,
  Loader2,
  Inbox,
} from 'lucide-react'
import { useTasks } from '../hooks/useTasks'
import { DashboardLayout } from '../layouts/DashboardLayout'
import { StatCard } from '../components/StatCard'
import { TaskCard } from '../components/TaskCard'
import { TaskModal } from '../components/TaskModal'
import { ConfirmModal } from '../components/ConfirmModal'
import { FilterBar } from '../components/FilterBar'
import { Task, TaskFormData } from '../types'
import { formatMinutes } from '../utils'
import { useAuth } from '../contexts/AuthContext'

export function DashboardPage() {
  const { user } = useAuth()
  const {
    tasks,
    allTasks,
    stats,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
  } = useTasks()

  const [modalOpen, setModalOpen] = useState(false)
  const [editingTask, setEditingTask] = useState<Task | null>(null)
  const [deletingTask, setDeletingTask] = useState<Task | null>(null)
  const [deleteLoading, setDeleteLoading] = useState(false)

  const username = user?.email?.split('@')[0] ?? 'usuário'

  const openCreate = () => {
    setEditingTask(null)
    setModalOpen(true)
  }

  const openEdit = (task: Task) => {
    setEditingTask(task)
    setModalOpen(true)
  }

  const handleSave = async (data: TaskFormData) => {
    if (editingTask) {
      await updateTask(editingTask.id, data)
    } else {
      await createTask(data)
    }
  }

  const handleDelete = async () => {
    if (!deletingTask) return
    try {
      setDeleteLoading(true)
      await deleteTask(deletingTask.id)
      setDeletingTask(null)
    } finally {
      setDeleteLoading(false)
    }
  }

  const handleStatusChange = async (task: Task, newStatus: Task['status']) => {
    await updateTask(task.id, { status: newStatus })
  }

  const progressPct = stats.total > 0 ? Math.round((stats.done / stats.total) * 100) : 0

  return (
    <DashboardLayout>
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <h1 className="text-xl font-bold text-white mb-0.5">
              Olá, <span className="text-neon-400">{username}</span> 👋
            </h1>
            <p className="text-sm text-slate-400">
              {stats.pending + stats.in_progress > 0
                ? `Você tem ${stats.pending + stats.in_progress} tarefa(s) em aberto.`
                : 'Tudo em dia! Parabéns.'}
            </p>
          </div>
          <button onClick={openCreate} className="btn-primary flex-shrink-0">
            <Plus size={16} />
            <span className="hidden sm:inline">Nova tarefa</span>
          </button>
        </div>

        {/* Progress bar */}
        {stats.total > 0 && (
          <div className="card p-4 animate-fade-in">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-slate-400">Progresso geral</span>
              <span className="text-xs font-bold text-neon-400 font-mono">{progressPct}%</span>
            </div>
            <div className="h-2 bg-surface-50 rounded-full overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-neon-600 to-neon-400 rounded-full transition-all duration-500"
                style={{ width: `${progressPct}%` }}
              />
            </div>
            <div className="flex justify-between mt-2 text-xs text-slate-500">
              <span>{stats.done} concluídas</span>
              <span>{stats.total} total</span>
            </div>
          </div>
        )}

        {/* Stats grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
          <StatCard
            label="Total de tarefas"
            value={stats.total}
            icon={<ListTodo size={18} className="text-slate-300" />}
            iconBg="bg-slate-700/60"
          />
          <StatCard
            label="Concluídas"
            value={stats.done}
            icon={<CheckCircle2 size={18} className="text-neon-400" />}
            iconBg="bg-neon-400/10"
            trend={stats.total > 0 ? `${progressPct}%` : undefined}
          />
          <StatCard
            label="Pendentes"
            value={stats.pending}
            icon={<Clock size={18} className="text-amber-400" />}
            iconBg="bg-amber-400/10"
          />
          <StatCard
            label="Tempo estimado"
            value={formatMinutes(stats.totalMinutes)}
            icon={<Timer size={18} className="text-blue-400" />}
            iconBg="bg-blue-400/10"
          />
        </div>

        {/* Task list */}
        <div className="card p-5">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-semibold text-white">Tarefas</h2>
            <button onClick={openCreate} className="btn-secondary py-1.5 text-xs">
              <Plus size={13} />
              Adicionar
            </button>
          </div>

          <div className="mb-4">
            <FilterBar
              filters={filters}
              onChange={setFilters}
              total={allTasks.length}
              filtered={tasks.length}
            />
          </div>

          {/* States */}
          {loading && (
            <div className="flex flex-col items-center justify-center py-16 gap-3">
              <Loader2 size={24} className="text-neon-500 animate-spin" />
              <p className="text-sm text-slate-500">Carregando tarefas...</p>
            </div>
          )}

          {!loading && error && (
            <div className="flex flex-col items-center justify-center py-12 gap-3">
              <AlertCircle size={24} className="text-red-400" />
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}

          {!loading && !error && tasks.length === 0 && (
            <div className="flex flex-col items-center justify-center py-16 gap-3 text-center">
              <div className="w-14 h-14 rounded-2xl bg-slate-800/60 flex items-center justify-center">
                <Inbox size={24} className="text-slate-500" />
              </div>
              <div>
                <p className="text-sm font-medium text-slate-400 mb-1">
                  {allTasks.length === 0 ? 'Nenhuma tarefa ainda' : 'Nenhum resultado para esses filtros'}
                </p>
                <p className="text-xs text-slate-600">
                  {allTasks.length === 0
                    ? 'Clique em "Nova tarefa" para começar.'
                    : 'Tente ajustar ou limpar os filtros.'}
                </p>
              </div>
              {allTasks.length === 0 && (
                <button onClick={openCreate} className="btn-primary mt-2">
                  <Plus size={15} />
                  Criar primeira tarefa
                </button>
              )}
            </div>
          )}

          {!loading && !error && tasks.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-3">
              {tasks.map(task => (
                <TaskCard
                  key={task.id}
                  task={task}
                  onEdit={openEdit}
                  onDelete={setDeletingTask}
                  onStatusChange={handleStatusChange}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modals */}
      <TaskModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        onSave={handleSave}
        editingTask={editingTask}
      />

      <ConfirmModal
        isOpen={!!deletingTask}
        title="Excluir tarefa"
        message={`Tem certeza que deseja excluir "${deletingTask?.title}"? Esta ação não pode ser desfeita.`}
        onConfirm={handleDelete}
        onCancel={() => setDeletingTask(null)}
        loading={deleteLoading}
      />
    </DashboardLayout>
  )
}
