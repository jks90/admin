import React from 'react';
import { Pencil, Trash2, Check, X } from 'lucide-react';
import type { UserListResponseDto } from '@/interfaces/user-interfaces';

interface UserTableProps {
  users: UserListResponseDto[];
  onEdit: (user: UserListResponseDto) => void;
  onDelete: (userId: string) => void;
}

const StatusIndicator = ({ status }: { status: boolean }) => (
  <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full ${
    status ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
  }`}>
    {status ? <Check className="w-4 h-4" /> : <X className="w-4 h-4" />}
  </span>
);

export function UserTable({ users, onEdit, onDelete }: UserTableProps) {
  return (
    <div className="bg-white rounded-lg shadow overflow-hidden">
      <div className="overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Usuario
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Estado de Cuenta
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Roles y Permisos
              </th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Último Acceso
              </th>
              <th className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {users.map((user) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                      <span className="text-indigo-600 font-medium">
                        {user.username.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div className="ml-4">
                      <div className="text-sm font-medium text-gray-900">{user.username}</div>
                      <div className="text-sm text-gray-500">{user.email}</div>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <StatusIndicator status={user.accountNonExpired} />
                      <span className="text-sm text-gray-500">Cuenta Vigente</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIndicator status={user.accountNonLocked} />
                      <span className="text-sm text-gray-500">Cuenta Desbloqueada</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <StatusIndicator status={user.enabled} />
                      <span className="text-sm text-gray-500">Cuenta Activa</span>
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="space-y-2">
                    <div className="flex flex-wrap gap-1">
                      {user.roles.map((role, index) => (
                        <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-indigo-100 text-indigo-800">
                          {role.name}
                        </span>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {user.roles.flatMap(role => 
                        role.permissions.map((perm, index) => (
                          <span key={index} className="px-2 py-1 text-xs font-semibold rounded-full bg-gray-100 text-gray-800">
                            {perm.permission}
                          </span>
                        ))
                      )}
                    </div>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                  {/* {user.lastLogin} */}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                  <button
                    onClick={() => onEdit(user)}
                    className="text-indigo-600 hover:text-indigo-900 mx-2"
                  >
                    <Pencil className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => onDelete(user.id.toString())}
                    className="text-red-600 hover:text-red-900 mx-2"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}