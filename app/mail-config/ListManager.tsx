import React, { useEffect, useState } from 'react';
import { Plus, Trash2, Edit2, Save, X, Mail } from 'lucide-react';
import { EmailList } from '@/interfaces/mail-interfaces';
import EmailInput from './EmailInput';

import { listEmails, updateListEmail } from './ListEmailData';

export default function ListManager() {

  const [showNewListForm, setShowNewListForm] = useState(false);
  const [newListName, setNewListName] = useState('');
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editName, setEditName] = useState('');
  const [newEmail, setNewEmail] = useState('');
  const [emailInputs, setEmailInputs] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    console.log("Component mounted");
    setTimeout(() => {
      setShowNewListForm(true);
      updateListEmail(listEmails);
    }, 1000);
    setTimeout(() => {
       setShowNewListForm(false);
    }, 1010);
  }, []);

  const handleCreateList = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newListName.trim()) return;

    const newList: EmailList = {
      id: Date.now().toString(),
      name: newListName,
      subscribers: [],
      lastUpdated: new Date().toISOString().split('T')[0],
    };

    updateListEmail([...listEmails, newList]);
    setNewListName('');
    setShowNewListForm(false);
  };

  const handleEditList = (email: string, listId: string) => {
    setNewEmail(email);
    handleAddEmail(listId)
  };

  const handleAddEmail = (listId: string) => {
    if (!newEmail.trim()) return;

    updateListEmail(listEmails.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          subscribers: [...list.subscribers, { id: Date.now().toString(), email: newEmail }],
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return list;
    }));

    setNewEmail('');

  };

  const handleDeleteEmail = (listId: string, emailId: string) => {
    updateListEmail(listEmails.map(list => {
      if (list.id === listId) {
        return {
          ...list,
          subscribers: list.subscribers.filter(sub => sub.id !== emailId),
          lastUpdated: new Date().toISOString().split('T')[0],
        };
      }
      return list;
    }));
  };

  return (
    <div className="p-6 space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-gray-900">Email Lists</h2>
        <button
          onClick={() => setShowNewListForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New List</span>
        </button>
      </div>

      {showNewListForm && (
        <div className="bg-gray-50 p-4 rounded-lg border border-gray-200">
          <form onSubmit={handleCreateList} className="flex space-x-4">
            <input
              type="text"
              value={newListName}
              onChange={(e) => setNewListName(e.target.value)}
              placeholder="Enter list name"
              className="flex-1 rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
            />
            <button
              type="submit"
              className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700"
            >
              Create List
            </button>
            <button
              type="button"
              onClick={() => setShowNewListForm(false)}
              className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700"
            >
              Cancel
            </button>
          </form>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6">
        {listEmails.map(list => (
          <div key={list.id} className="bg-white rounded-lg shadow border border-gray-200">
            <div className="p-4 border-b border-gray-200">
              <div className="flex items-center justify-between">
                {editingId === list.id ? (
                  <div className="flex space-x-2">
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="rounded-md border-gray-300 shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                    />
                    <button
                      onClick={() => {
                        updateListEmail(listEmails.map(l =>
                          l.id === list.id ? { ...l, name: editName } : l
                        ));
                        setEditingId(null);
                      }}
                      className="text-green-600 hover:text-green-900"
                    >
                      <Save className="h-5 w-5" />
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="text-gray-600 hover:text-gray-900"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center space-x-4">
                    <h3 className="text-lg font-medium text-gray-900">{list.name}</h3>
                    <span className="text-sm text-gray-500">
                      ({list.subscribers.length} subscribers)
                    </span>
                  </div>
                )}
                <div className="flex space-x-2">
                  <button
                    onClick={() => {
                      setEditingId(list.id);
                      setEditName(list.name);
                    }}
                    className="text-indigo-600 hover:text-indigo-900"
                  >
                    <Edit2 className="h-5 w-5" />
                  </button>
                  <button
                    onClick={() => updateListEmail(listEmails.filter(l => l.id !== list.id))}
                    className="text-red-600 hover:text-red-900"
                  >
                    <Trash2 className="h-5 w-5" />
                  </button>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="flex space-x-2 mb-4">

                <EmailInput
                  value={emailInputs[list.id] || ''}
                  onChange={(value) => setEmailInputs(prev => ({ ...prev, [list.id]: value }))}
                  onSubmit={() => handleEditList(emailInputs[list.id], list.id)}
                />
              </div>

              <div className="space-y-2">
                {list.subscribers.map(subscriber => (
                  <div
                    key={subscriber.id}
                    className="flex items-center justify-between p-2 bg-gray-50 rounded-lg"
                  >
                    <div className="flex items-center space-x-2">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <span className="text-sm text-gray-600">{subscriber.email}</span>
                    </div>
                    <button
                      onClick={() => handleDeleteEmail(list.id, subscriber.id)}
                      className="text-red-600 hover:text-red-900"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}