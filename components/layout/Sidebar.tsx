import React from 'react';
import { Users, Home, Settings, HelpCircle, LogOut } from 'lucide-react';

const menuItems = [
  { icon: Home, label: 'Dashboard', href: '#' },
  { icon: Users, label: 'Usuarios', href: '#' },
  { icon: Settings, label: 'Configuración', href: '#' },
  { icon: HelpCircle, label: 'Ayuda', href: '#' },
];

export function Sidebar() {
  return (
    <aside className="bg-white w-64 min-h-screen shadow-lg fixed left-0 top-0">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold text-indigo-600">Admin Panel</h2>
      </div>
      <nav className="p-4">
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
        <div className="absolute bottom-4 left-4 right-4">
          <button className="flex items-center space-x-3 text-gray-700 p-2 rounded-lg hover:bg-red-50 hover:text-red-600 transition-colors duration-200 w-full">
            <LogOut className="h-5 w-5" />
            <span>Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </aside>
  );
}