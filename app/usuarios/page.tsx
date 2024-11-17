'use client'
import * as React from "react"
import { useEffect, useState, useMemo } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";
import { UserPlus, Search } from "lucide-react";
import { UserTable } from '@/components/users/UserTable';
import { UserModal } from '@/components/users/UserModal';
import type { User,UserListResponseDto } from '@/interfaces/user-interfaces';
import Link from "next/link"


export default function Usuario() {

  const [users, setUsers] = useState<UserListResponseDto[]>([]);
  const { isMenuOpen, openMenu } = useMenu();
  const { user, getListUsers } = useAuth();
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [selectedUser, setSelectedUser] = useState<UserListResponseDto | undefined>();

  const [progress, setProgress] = React.useState(13)
  const [searchTerms, setSearchTerms] = useState({
    username: "",
    email: ""
  })
  const [roleFilter, setRoleFilter] = useState("[]")

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      fetchUsers();
      openMenu();
    }
  }, [user]);

  useEffect(() => {
    if (progress === 100) {
      const delayTimer = setTimeout(() => {
        handleProgressComplete();
      }, 1000);
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  const handleProgressComplete = () => {
    router.push('/');
  };

  const filteredUsers = useMemo(() => {
    return users.filter(user => {
      const matchesUsername = user.username.toLowerCase().includes(searchTerms.username.toLowerCase())
      const matchesEmail = user.email.toLowerCase().includes(searchTerms.email.toLowerCase())
      const matchesRole = roleFilter === "[]" || user.roles.some(role => role.name === roleFilter)

      return matchesUsername && matchesEmail && matchesRole
    })
  }, [users, searchTerms, roleFilter])

  const fetchUsers = async () => {
    try {
      const usersList = await getListUsers();
      console.log(usersList)
      if (usersList) {
        setUsers(usersList);
      }
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  const handleDelete = (userId: string) => {
    if (confirm('¿Estás seguro de que deseas eliminar este usuario?')) {
      // setUsers(users.filter(user => user.id !== userId));
      console.log('User deleted:', userId);
    }
  };

  const handleSave = (userData: Partial<UserListResponseDto>) => {
    if (selectedUser) {
      // setUsers(users.map(user =>
      //   user.id === selectedUser.id ? { ...user, ...userData } : user
      // ));
    } else {
      const newUser: User = {
        id: Date.now().toString(),
        lastLogin: new Date().toISOString(),
        credentialsNonExpired: true,
        ...userData as Omit<User, 'id' | 'lastLogin'>
      };
      console.log('New user:', newUser);
      // setUsers([...users, newUser]);
    }
    setIsModalOpen(false);
    setSelectedUser(undefined);
  };

  const handleEdit = (user: UserListResponseDto) => {
    setSelectedUser(user);
    setIsModalOpen(true);
  };

  if (!user) {
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-center w-full max-w-2xl px-4">
          <p className="mb-6 text-lg font-semibold">Loading...</p>
          <Progress value={progress} className="w-full h-4 bg-gray-300 rounded-lg" />
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-screen  bg-gray-100">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"
            }`}
        >
            <div className="min-h-screen ">
              <main className="">
                <div className="mx-auto">
                  <div className="bg-white rounded-lg shadow-lg p-6">
                    <div className="mb-6">
                      <h2 className="text-2xl font-bold text-gray-800 mb-2">Gestión de Usuarios</h2>
                      <p className="text-gray-600">Administra las cuentas de usuario del sistema</p>
                    </div>

                    <div className="flex flex-col space-y-4 mb-6">
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="relative">
                          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
                          <input
                            type="text"
                            placeholder="Buscar por usuario..."
                            className="pl-10 w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={searchTerms.username}
                            onChange={(e) => setSearchTerms({ ...searchTerms, username: e.target.value })}
                          />
                        </div>
                        <div className="relative">
                          <input
                            type="text"
                            placeholder="Buscar por email..."
                            className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                            value={searchTerms.email}
                            onChange={(e) => setSearchTerms({ ...searchTerms, email: e.target.value })}
                          />
                        </div>
                        <select
                          className="w-full rounded-lg border border-gray-300 focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
                          value={roleFilter}
                          onChange={(e) => setRoleFilter(e.target.value)}
                        >
                          <option value="">Todos los roles</option>
                          <option value="ADMIN">Administrador</option>
                          <option value="USER">Usuario</option>
                          <option value="TEACHER">Teacher</option>
                        </select>
                      </div>

                      <div className="flex justify-end">
                        <Link className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors duration-200" href="/usuarios/create">
                          <UserPlus className="h-5 w-5" />
                          <span>Nuevo Usuario</span>
                        </Link>
                      </div>
                    </div>

                    <UserTable
                      users={filteredUsers}
                      onEdit={handleEdit}
                      onDelete={handleDelete}
                    />
                  </div>
                </div>
              </main>

              <UserModal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                  setSelectedUser(undefined);
                }}
                onSave={handleSave}
                user={selectedUser}
              />
            </div>
        </main>
      </div>
    </div>
  );
}
