import { Users, Home, Settings, HelpCircle, LogOut, FileText,Calendar,BookCheck ,ClipboardType  } from 'lucide-react';
import { useAuth } from '@/app/lib/auth'

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '/dashboard' },
  { icon: Users, label: 'Usuarios', href: '/usuarios' },
  { icon: Calendar, label: 'Eventos', href: '/calendar' },
  { icon: FileText, label: 'Archivos', href: '/archivos' },
  { icon: BookCheck , label: 'Examenes', href: '/exams' },
  { icon: ClipboardType , label: 'Foro manager', href: '/foro' },
  { icon: Settings, label: 'Configuración mail', href: '/mail-config' },
  { icon: HelpCircle, label: 'Ayuda', href: 'http://serverman:83/' },
];

export default function LateralPanel({ isMenuOpen }) {
  const { logout } = useAuth()
  return (
    <aside
      className={`bg-gray-100 w-64 h-screen fixed top-16 left-0 transition-transform duration-300 ease-in-out transform ${isMenuOpen ? "translate-x-0" : "-translate-x-full"
        } z-40`}
    >
      <div className="bg-white barSidebar h-full shadow-lg flex flex-col">
        <div className="p-4 border-b">
          <h2 className="text-xl font-bold text-indigo-600">Panel</h2>
        </div>
        <nav className="p-4 flex-1 overflow-y-auto">
          <ul className="space-y-2">
            {menuItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-indigo-50 hover:text-indigo-600 transition-colors duration-200"
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4">
          <button className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full"
          onClick={logout}>
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </div>
    </aside>
  )
}
