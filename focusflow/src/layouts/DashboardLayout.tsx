import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {
  LayoutDashboard,
  LogOut,
  Menu,
  X,
  ChevronLeft,
  ChevronRight,
  Bell,
  User,
  Zap,
} from 'lucide-react'
import { useAuth } from '../contexts/AuthContext'
import { Logo } from '../components/Logo'

interface DashboardLayoutProps {
  children: React.ReactNode
}

export function DashboardLayout({ children }: DashboardLayoutProps) {
  const { user, signOut } = useAuth()
  const navigate = useNavigate()
  const [collapsed, setCollapsed] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/login')
  }

  const username = user?.email?.split('@')[0] ?? 'Usuário'
  const initials = username.slice(0, 2).toUpperCase()

  const SidebarContent = () => (
    <div className="flex flex-col h-full">
      {/* Logo area */}
      <div className={`flex items-center justify-between p-4 border-b border-card-border ${collapsed ? 'px-3' : ''}`}>
        <Link to="/dashboard" onClick={() => setMobileOpen(false)}>
          <Logo collapsed={collapsed} />
        </Link>
        {!collapsed && (
          <button
            onClick={() => setCollapsed(true)}
            className="hidden lg:flex p-1.5 rounded-lg text-slate-500 hover:text-slate-300 hover:bg-slate-700/40 transition-colors"
          >
            <ChevronLeft size={15} />
          </button>
        )}
      </div>

      {/* Nav */}
      <nav className="flex-1 p-3 space-y-1">
        <Link
          to="/dashboard"
          onClick={() => setMobileOpen(false)}
          className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium bg-neon-500/10 text-neon-400 border border-neon-500/20 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LayoutDashboard size={16} />
          {!collapsed && <span>Dashboard</span>}
        </Link>
      </nav>

      {/* Bottom: user */}
      <div className={`p-3 border-t border-card-border`}>
        {!collapsed ? (
          <div className="flex items-center gap-3 px-3 py-2 rounded-xl hover:bg-card-hover transition-colors">
            <div className="w-8 h-8 rounded-xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center text-neon-400 text-xs font-bold flex-shrink-0">
              {initials}
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-xs font-semibold text-white truncate">{username}</p>
              <p className="text-xs text-slate-500 truncate">{user?.email}</p>
            </div>
          </div>
        ) : (
          <div className="flex justify-center">
            <div className="w-8 h-8 rounded-xl bg-neon-500/10 border border-neon-500/20 flex items-center justify-center text-neon-400 text-xs font-bold">
              {initials}
            </div>
          </div>
        )}

        <button
          onClick={handleSignOut}
          className={`mt-2 w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-slate-400 hover:text-red-400 hover:bg-red-500/10 transition-colors ${collapsed ? 'justify-center' : ''}`}
        >
          <LogOut size={14} />
          {!collapsed && <span>Sair</span>}
        </button>
      </div>
    </div>
  )

  return (
    <div className="flex h-screen bg-surface-300 overflow-hidden">
      {/* Sidebar desktop */}
      <aside
        className={`hidden lg:flex flex-col bg-surface-100 border-r border-card-border transition-all duration-300 flex-shrink-0 ${collapsed ? 'w-16' : 'w-60'}`}
      >
        <SidebarContent />
        {collapsed && (
          <button
            onClick={() => setCollapsed(false)}
            className="absolute left-16 top-5 -translate-y-1/2 w-5 h-5 bg-card border border-card-border rounded-full flex items-center justify-center text-slate-400 hover:text-slate-200 hover:border-neon-500/40 transition-colors z-10 shadow-card"
            style={{ top: '48px' }}
          >
            <ChevronRight size={11} />
          </button>
        )}
      </aside>

      {/* Mobile sidebar overlay */}
      {mobileOpen && (
        <div className="fixed inset-0 z-40 lg:hidden">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
          <aside className="absolute left-0 top-0 h-full w-64 bg-surface-100 border-r border-card-border z-50 animate-slide-in">
            <SidebarContent />
          </aside>
        </div>
      )}

      {/* Main content */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Topbar */}
        <header className="bg-surface-100 border-b border-card-border px-4 lg:px-6 h-14 flex items-center justify-between flex-shrink-0">
          <div className="flex items-center gap-3">
            <button
              onClick={() => setMobileOpen(true)}
              className="lg:hidden p-2 rounded-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/40 transition-colors"
            >
              <Menu size={18} />
            </button>
            <div className="flex items-center gap-2">
              <Zap size={14} className="text-neon-400" />
              <span className="text-sm font-semibold text-white">Dashboard</span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 transition-colors">
              <Bell size={16} />
            </button>
            <button className="p-2 rounded-xl text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 transition-colors">
              <User size={16} />
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="flex-1 overflow-y-auto p-4 lg:p-6">
          {children}
        </main>
      </div>
    </div>
  )
}
