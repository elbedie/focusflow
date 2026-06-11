import React from 'react'

interface StatCardProps {
  label: string
  value: string | number
  icon: React.ReactNode
  iconBg: string
  trend?: string
}

export function StatCard({ label, value, icon, iconBg, trend }: StatCardProps) {
  return (
    <div className="card p-5 hover:bg-card-hover transition-colors duration-200 animate-slide-up">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${iconBg}`}>
          {icon}
        </div>
        {trend && (
          <span className="text-xs text-neon-400 font-medium font-mono">{trend}</span>
        )}
      </div>
      <p className="text-2xl font-bold text-white mb-1">{value}</p>
      <p className="text-xs text-slate-400">{label}</p>
    </div>
  )
}
