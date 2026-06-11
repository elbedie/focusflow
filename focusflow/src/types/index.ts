export type TaskStatus = 'pending' | 'in_progress' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'

export interface Task {
  id: string
  user_id: string
  title: string
  description: string | null
  category: string
  status: TaskStatus
  priority: TaskPriority
  estimated_time: number
  created_at: string
}

export type TaskFormData = Omit<Task, 'id' | 'user_id' | 'created_at'>

export interface TaskStats {
  total: number
  done: number
  pending: number
  in_progress: number
  totalMinutes: number
}

export interface FilterState {
  status: TaskStatus | 'all'
  priority: TaskPriority | 'all'
  search: string
}
