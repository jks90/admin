'use client'
import React, { useState } from 'react';
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";
import { Upload, FileText, Search, Filter } from 'lucide-react';
import UploadModal from './UploadModal';
import FileCard from './FileCard';
import FilterMenu from './FilterMenu';

interface FileData {
  name: string;
  category: string;
  group: string;
  access: 'public' | 'private';
  role: string;
  uploadedBy: string;
  uploadDate: string;
}

export default function Archivos() {

  const { isMenuOpen, openMenu } = useMenu();
  const { user } = useAuth();
  const router = useRouter();

  const [progress, setProgress] = React.useState(13);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    role: 'All',
    category: 'All',
    group: 'All',
    access: 'All',
  });

  // Sample data - in a real app, this would come from an API
  const files: FileData[] = [
    {
      name: "Chemistry Notes.pdf",
      category: "Quimica",
      group: "PRIMERO",
      access: "public",
      role: "STUDENT",
      uploadedBy: "John Doe",
      uploadDate: "2024-03-15"
    },
    {
      name: "Math Exercise.docx",
      category: "Matemáticas",
      group: "SEGUNDO",
      access: "private",
      role: "TEACHER",
      uploadedBy: "Jane Smith",
      uploadDate: "2024-03-14"
    }
  ];

  const handleFilterChange = (key: string, value: string) => {
    setFilters(prev => ({ ...prev, [key]: value }));
  };

  const filteredFiles = files.filter(file => {
    const matchesSearch = file.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesRole = filters.role === 'All' || file.role === filters.role;
    const matchesCategory = filters.category === 'All' || file.category === filters.category;
    const matchesGroup = filters.group === 'All' || file.group === filters.group;
    const matchesAccess = filters.access === 'All' || file.access === filters.access;

    return matchesSearch && matchesRole && matchesCategory && matchesGroup && matchesAccess;
  });


  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      openMenu();
    }
  }, [user, router]);

  React.useEffect(() => {
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
    <div className="flex flex-col h-screen bg-gray-100">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"
            }`}
        >
          <div className="">



            <div className="bg-white">
              {/* Header */}
              <header className="bg-white shadow-sm">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      <FileText className="h-6 w-6 text-indigo-600" />
                      <h1 className="text-2xl font-bold text-gray-900">File Management System</h1>
                    </div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Upload className="h-4 w-4 mr-2" />
                      Upload File
                    </button>
                  </div>
                </div>
              </header>

              {/* Main Content */}
              <main className="mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Search and Filter Section */}
                <div className="mb-8 flex flex-col sm:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search files..."
                      className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                  <div className="relative">
                    <button
                      onClick={() => setIsFilterOpen(!isFilterOpen)}
                      className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      <Filter className="h-4 w-4 mr-2" />
                      Filters
                    </button>
                    <FilterMenu
                      isOpen={isFilterOpen}
                      onClose={() => setIsFilterOpen(false)}
                      filters={filters}
                      onFilterChange={handleFilterChange}
                    />
                  </div>
                </div>

                {/* Files Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredFiles.map((file, index) => (
                    <FileCard
                      key={index}
                      {...file}
                    />
                  ))}
                </div>
              </main>

              {/* Upload Modal */}
              <UploadModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
            </div>




          </div>
        </main>
      </div>
    </div>
  )
}