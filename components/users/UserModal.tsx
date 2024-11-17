import React from 'react';
import { X } from 'lucide-react';
import type { Role ,UserListResponseDto} from '@/interfaces/user-interfaces';

interface UserModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (userData: Partial<UserListResponseDto>) => void;
  user?: UserListResponseDto;
}

const availableRoles: Role[] = [
  { name: 'Admin', permissions: [{ permission: 'ALL' }] },
  { name: 'User', permissions: [{ permission: 'READ' }] },
  { name: 'Manager', permissions: [{ permission: 'READ' }, { permission: 'WRITE' }] }
];

export function UserModal({ isOpen, onClose, onSave, user }: UserModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            {user ? 'Editar Usuario' : 'Nuevo Usuario'}
          </h3>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-500"
          >
            <X className="h-5 w-5" />
          </button>
        </div>
        <form
          onSubmit={(e) => {
            e.preventDefault();
            const formData = new FormData(e.currentTarget);
            const selectedRoles = availableRoles.filter(role => 
              formData.getAll('roles').includes(role.name)
            );
            
            onSave({
              username: formData.get('username') as string,
              email: formData.get('email') as string,
              roles: selectedRoles,
              enabled: formData.get('enabled') === 'true',
              accountNonExpired: formData.get('accountNonExpired') === 'true',
              accountNonLocked: formData.get('accountNonLocked') === 'true',
              credentialsNonExpired: true
            });
          }}
          className="space-y-4"
        >
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Nombre de Usuario
            </label>
            <input
              type="text"
              name="username"
              defaultValue={user?.username}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              name="email"
              defaultValue={user?.email}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Roles
            </label>
            <div className="space-y-2">
              {availableRoles.map((role) => (
                <label key={role.name} className="flex items-center space-x-2">
                  <input
                    type="checkbox"
                    name="roles"
                    value={role.name}
                    defaultChecked={user?.roles.some(r => r.name === role.name)}
                    className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                  />
                  <span className="text-sm text-gray-700">{role.name}</span>
                </label>
              ))}
            </div>
          </div>
          <div className="space-y-2">
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="enabled"
                value="true"
                defaultChecked={user?.enabled ?? true}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Cuenta Activa</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="accountNonExpired"
                value="true"
                defaultChecked={user?.accountNonExpired ?? true}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Cuenta No Expirada</span>
            </label>
            <label className="flex items-center space-x-2">
              <input
                type="checkbox"
                name="accountNonLocked"
                value="true"
                defaultChecked={user?.accountNonLocked ?? true}
                className="rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
              />
              <span className="text-sm text-gray-700">Cuenta No Bloqueada</span>
            </label>
          </div>
          <div className="flex justify-end space-x-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-md"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}