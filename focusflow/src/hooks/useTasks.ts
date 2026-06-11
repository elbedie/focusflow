import { useState, useEffect, useCallback } from 'react'
import { Task, TaskFormData, TaskStats, FilterState } from '../types'
import { taskService } from '../services/taskService'
import { useAuth } from '../contexts/AuthContext'

export function useTasks() {
  const { user } = useAuth()
  const [tasks, setTasks] = useState<Task[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const [filters, setFilters] = useState<FilterState>({
    status: 'all',
    priority: 'all',
    search: '',
  })

  const fetchTasks = useCallback(async () => {
    if (!user) return
    try {
      setLoading(true)
      setError(null)
      const data = await taskService.getAll(user.id)
      setTasks(data)
    } catch (err) {
      setError('Erro ao carregar tarefas.')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }, [user])

  useEffect(() => {
    fetchTasks()
  }, [fetchTasks])

  const createTask = async (formData: TaskFormData) => {
    if (!user) return
    const newTask = await taskService.create(user.id, formData)
    setTasks(prev => [newTask, ...prev])
  }

  const updateTask = async (id: string, formData: Partial<TaskFormData>) => {
    const updated = await taskService.update(id, formData)
    setTasks(prev => prev.map(t => (t.id === id ? updated : t)))
  }

  const deleteTask = async (id: string) => {
    await taskService.delete(id)
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  const filteredTasks = tasks.filter(task => {
    if (filters.status !== 'all' && task.status !== filters.status) return false
    if (filters.priority !== 'all' && task.priority !== filters.priority) return false
    if (filters.search) {
      const q = filters.search.toLowerCase()
      if (!task.title.toLowerCase().includes(q) && !(task.description ?? '').toLowerCase().includes(q)) return false
    }
    return true
  })

  const stats: TaskStats = {
    total: tasks.length,
    done: tasks.filter(t => t.status === 'done').length,
    pending: tasks.filter(t => t.status === 'pending').length,
    in_progress: tasks.filter(t => t.status === 'in_progress').length,
    totalMinutes: tasks.reduce((acc, t) => acc + t.estimated_time, 0),
  }

  return {
    tasks: filteredTasks,
    allTasks: tasks,
    stats,
    loading,
    error,
    filters,
    setFilters,
    createTask,
    updateTask,
    deleteTask,
    refetch: fetchTasks,
  }
}
