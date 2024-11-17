'use client'
import * as React from "react"
import { useEffect } from 'react'
import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";
import ListManager from './ListManager';
import TemplatePreview from './TemplatePreview';
import {  updateListEmail } from './ListEmailData';
import {  addTemplate } from './TemplateData';
import { useMail } from '../lib/mail';
import { Template} from '@/interfaces/mail-interfaces'

export default function Mail() {

  const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);
  const { isMenuOpen, openMenu } = useMenu();
  const { user } = useAuth();
  const router = useRouter();
  const [progress, setProgress] = React.useState(13);
  const { getTemplates,getEmailLists } = useMail();

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      openMenu();
      fetchListTemplates();
      fetchListEmails();
    }
  }, [user, router]);

  React.useEffect(() => {
    // Lógica cuando la barra de progreso llega a 100
    if (progress === 100) {
      // Añadir un delay de 1 segundo antes de ejecutar la función
      const delayTimer = setTimeout(() => {
        handleProgressComplete();
      }, 1000);
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  const handleProgressComplete = () => {
    router.push('/');
  };

  const fetchListTemplates = async () => {
    
    try {
        const emailTemplateList:Template[] = await getTemplates();
        if (emailTemplateList) {
          emailTemplateList.forEach((template) => {
            console.log(template);
            addTemplate(template);
          });
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }

  const fetchListEmails = async () => {
    try {
        const emailList = await getEmailLists();
        if (emailList) {
          console.log(emailList);
          updateListEmail(emailList);
        }
      } catch (error) {
        console.error('Error fetching users:', error);
      }
  }

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
          <div className="">
            <div className="">
              <div className="mx-auto">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                  <div className="bg-white rounded-lg shadow">
                    <ListManager />
                  </div>

                  <div className="bg-white rounded-lg shadow">
                    <div className="p-6">
                      <h2 className="text-2xl font-bold text-gray-900 mb-6">Email Templates</h2>
                      <TemplatePreview
                        selectedTemplate={selectedTemplate}
                        onTemplateSelect={setSelectedTemplate}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>


  );

}