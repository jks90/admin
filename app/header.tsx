'use client'
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '@/app/lib/auth'
import { Bell, User, Settings, LogOut, Menu } from "lucide-react"
import Link from 'next/link'

export default function AdminHeader({ toggleMenu, user }) {

  const { logout } = useAuth()

  return (
    <header className="bg-white h-16 fixed top-0 right-0 left-0 shadow-sm z-10">
      <div className="flex items-center justify-between h-full px-6">
        <div className="flex items-center">
        <Button className="mr-4 bg-indigo-50 text-indigo-600 hover:bg-indigo-100" onClick={toggleMenu}>
            <Menu className="h-6 w-6" />
          </Button>
          <Link href="/">
            <h1 className="text-xl font-bold">Admin Dashboard</h1>
          </Link>
        </div>

        <div className="flex items-center space-x-4">
          <Bell className="h-6 w-6 text-gray-600" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <div className="flex items-center space-x-2">
                <div className="w-8 h-8 bg-indigo-100 rounded-full flex items-center justify-center">
                  <User className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm font-medium text-gray-800">{user}</span>
              </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-1">
                  <p className="text-sm font-medium leading-none">{user}</p>
                  <p className="text-xs leading-none text-muted-foreground">usuario@ejemplo.com</p>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <User className="mr-2 h-4 w-4" />
                <Link href="/profile"><span>Perfil</span></Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                <Link href="/settings"><span>Configuración</span></Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem >
                <LogOut className="mr-2 h-4 w-4" />
                <span onClick={logout}>Cerrar sesión</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}
