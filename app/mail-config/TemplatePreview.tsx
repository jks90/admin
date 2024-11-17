import React, { useEffect,useState } from 'react';
import { templates, addTemplate, updateTemplate } from './TemplateData';
import { Plus, Code, Eye, Edit2, Send } from 'lucide-react';

interface TemplatePreviewProps {
  selectedTemplate: string | null;
  onTemplateSelect: (templateId: string) => void;
}

export default function TemplatePreview({ selectedTemplate, onTemplateSelect }: TemplatePreviewProps) {

  const [showCode, setShowCode] = useState(false);
  const [showNewForm, setShowNewForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [showSendForm, setShowSendForm] = useState(false);
  const [selectedList, setSelectedList] = useState('');
  const [lists] = useState([
    { id: '1', name: 'Newsletter Subscribers' },
    { id: '2', name: 'Premium Users' },
  ]);

  useEffect(() => {
    setTimeout(() => {
      setShowCode(true);
    },1000);
  });

  const [newTemplate, setNewTemplate] = useState({
    name: '',
    description: '',
    html: ''
  });

  const [editingTemplate, setEditingTemplate] = useState({
    name: '',
    description: '',
    html: ''
  });

  const handleCreateTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    const template = addTemplate(newTemplate);
    onTemplateSelect(template.id);
    setShowNewForm(false);
    setNewTemplate({ name: '', description: '', html: '' });
  };

  const handleEditTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedTemplate) return;
    
    updateTemplate(selectedTemplate, editingTemplate);
    setShowEditForm(false);
  };

  const handleSendTemplate = (e: React.FormEvent) => {
    e.preventDefault();
    // Here you would integrate with your email sending service
    console.log('Sending template to list:', selectedList);
    setShowSendForm(false);
    setSelectedList('');
  };

  const selectedTemplateData = templates.find(t => t.id === selectedTemplate);

  const handleEditClick = () => {
    if (!selectedTemplateData) return;
    setEditingTemplate({
      name: selectedTemplateData.name,
      description: selectedTemplateData.description,
      html: selectedTemplateData.html
    });
    setShowEditForm(true);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-gray-900">
          {selectedTemplateData?.name || 'Select a template'}
        </h3>
        <button
          onClick={() => setShowNewForm(true)}
          className="flex items-center space-x-2 px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-colors"
        >
          <Plus className="h-5 w-5" />
          <span>New Template</span>
        </button>
      </div>

      <div className="grid grid-cols-2 gap-4">
        {templates.map((template) => (
          <button
            key={template.id}
            onClick={() => onTemplateSelect(template.id)}
            className={`text-left p-4 rounded-lg border transition-all ${
              selectedTemplate === template.id
                ? 'border-indigo-500 bg-indigo-50'
                : 'border-gray-200 hover:border-indigo-300'
            }`}
          >
            <h4 className="font-medium text-gray-900">{template.name}</h4>
            <p className="text-sm text-gray-500 mt-1">{template.description}</p>
          </button>
        ))}
      </div>

      {selectedTemplate && (
        <div className="border rounded-lg overflow-hidden">
          <div className="bg-gray-100 px-4 py-2 border-b flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <button
                onClick={handleEditClick}
                className="px-3 py-1 text-sm rounded-md transition-colors flex items-center space-x-2 hover:bg-gray-200"
              >
                <Edit2 className="h-4 w-4" />
                <span>Edit Template</span>
              </button>
              <button
                onClick={() => setShowSendForm(true)}
                className="px-3 py-1 text-sm rounded-md transition-colors flex items-center space-x-2 hover:bg-gray-200 text-green-600"
              >
                <Send className="h-4 w-4" />
                <span>Send Template</span>
              </button>
            </div>
            
            <div className="flex space-x-2">
              <button
                onClick={() => setShowCode(false)}
                className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center space-x-2 ${
                  !showCode ? 'bg-white shadow text-indigo-600' : 'hover:bg-gray-200'
                }`}
              >
                <Eye className="h-4 w-4" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => setShowCode(true)}
                className={`px-3 py-1 text-sm rounded-md transition-colors flex items-center space-x-2 ${
                  showCode ? 'bg-white shadow text-indigo-600' : 'hover:bg-gray-200'
                }`}
              >
                <Code className="h-4 w-4" />
                <span>View Code</span>
              </button>
            </div>
          </div>
          <div className="bg-white p-4 h-[400px] overflow-auto">
            {showCode ? (
              <pre className="bg-gray-50 rounded p-4 h-full overflow-auto">
                <code className="text-sm text-gray-800">
                  {selectedTemplateData?.html}
                </code>
              </pre>
            ) : (
              <div 
                className="h-full overflow-auto"
                dangerouslySetInnerHTML={{
                  __html: selectedTemplateData?.html || ''
                }}
              />
            )}
          </div>
        </div>
      )}

      {!selectedTemplate && (
        <div className="bg-gray-100 rounded-lg p-4 h-[400px] flex items-center justify-center text-gray-500">
          Select a template to preview
        </div>
      )}

      {showNewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleCreateTemplate} className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Create New Template</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={newTemplate.name}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={newTemplate.description}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">HTML Content</label>
                <textarea
                  value={newTemplate.html}
                  onChange={(e) => setNewTemplate(prev => ({ ...prev, html: e.target.value }))}
                  rows={10}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowNewForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Create Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <form onSubmit={handleEditTemplate} className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Edit Template</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={editingTemplate.name}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, name: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">Description</label>
                <input
                  type="text"
                  value={editingTemplate.description}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, description: e.target.value }))}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700">HTML Content</label>
                <textarea
                  value={editingTemplate.html}
                  onChange={(e) => setEditingTemplate(prev => ({ ...prev, html: e.target.value }))}
                  rows={10}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 font-mono text-sm"
                  required
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowEditForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md hover:bg-indigo-700"
                >
                  Save Changes
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showSendForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full">
            <form onSubmit={handleSendTemplate} className="p-6 space-y-4">
              <h3 className="text-xl font-bold text-gray-900">Send Template</h3>
              
              <div>
                <label className="block text-sm font-medium text-gray-700">Select Email List</label>
                <select
                  value={selectedList}
                  onChange={(e) => setSelectedList(e.target.value)}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                  required
                >
                  <option value="">Choose a list...</option>
                  {lists.map(list => (
                    <option key={list.id} value={list.id}>
                      {list.name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <button
                  type="button"
                  onClick={() => setShowSendForm(false)}
                  className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 text-sm font-medium text-white bg-green-600 border border-transparent rounded-md hover:bg-green-700"
                >
                  Send Template
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}