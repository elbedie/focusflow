import { supabase } from '../lib/supabase'
import { Task, TaskFormData } from '../types'

export const taskService = {
  async getAll(userId: string): Promise<Task[]> {
    const { data, error } = await supabase
      .from('tasks')
      .select('*')
      .eq('user_id', userId)
      .order('created_at', { ascending: false })

    if (error) throw error
    return data ?? []
  },

  async create(userId: string, formData: TaskFormData): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .insert([{ ...formData, user_id: userId }])
      .select()
      .single()

    if (error) throw error
    return data
  },

  async update(id: string, formData: Partial<TaskFormData>): Promise<Task> {
    const { data, error } = await supabase
      .from('tasks')
      .update(formData)
      .eq('id', id)
      .select()
      .single()

    if (error) throw error
    return data
  },

  async delete(id: string): Promise<void> {
    const { error } = await supabase
      .from('tasks')
      .delete()
      .eq('id', id)

    if (error) throw error
  },
}
