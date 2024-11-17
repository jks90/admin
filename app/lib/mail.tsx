'use client'

import React, { createContext, useContext } from 'react'
import { Template, EmailList, MailContextType, MailRequestDto, TemplateRequestDto, EmailListRequestDto ,ApiEmailResponse, ApiTemplateResponse } from '@/interfaces/mail-interfaces'

const MailContext = createContext<MailContextType | undefined>(undefined)

export function MailProvider({ children }: { children: React.ReactNode }) {
  const BASE_HOST = process.env.NEXT_PUBLIC_BASE_HOST;
  const BASE_PORT = process.env.NEXT_PUBLIC_PORT_MAIL;
  const API_URL = `${BASE_HOST}:${BASE_PORT}`

  const sendEmail = async (emailData: MailRequestDto) => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailData),
      })

      if (!response.ok) {
        throw new Error('Failed to send email')
      }

      console.log('Email sent successfully')
    } catch (error) {
      console.error('Send email error:', error)
      throw error
    }
  }

  const getTemplates = async (): Promise<Template[] | null> => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/templates`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      })

      if (!response.ok) {
        throw new Error('Failed to fetch templates')
      }

      const data = await response.json() as ApiTemplateResponse;

      return data[0].data[0] || [];
    } catch (error) {
      console.error('Get templates error:', error)
      return null
    }
  }

  const createTemplate = async (templateData: TemplateRequestDto) => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/templates`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(templateData),
      })

      if (!response.ok) {
        throw new Error('Failed to create template')
      }

      console.log('Template created successfully')
    } catch (error) {
      console.error('Create template error:', error)
      throw error
    }
  }

  const getEmailLists = async (): Promise<EmailList[] | null> => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/email-lists`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch email lists');
      }
  
      const data = await response.json() as ApiEmailResponse;

      return data[0].data[0] || [];
    } catch (error) {
      console.error('Get email lists error:', error);
      return null;
    }
  };  

  const createEmailList = async (emailListData: EmailListRequestDto) => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/email-lists`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailListData),
      })

      if (!response.ok) {
        throw new Error('Failed to create email list')
      }

      console.log('Email list created successfully')
    } catch (error) {
      console.error('Create email list error:', error)
      throw error
    }
  }

  const getEmailListById = async (listId: string): Promise<EmailList | null> => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/email-lists/${listId}`, {
        method: 'GET',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch email list by ID');
      }

      const data = await response.json() as EmailList;
      return data;
    } catch (error) {
      console.error('Get email list by ID error:', error);
      return null;
    }
  };

  const updateEmailList = async (listId: string, emailListData: EmailListRequestDto) => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/email-lists/${listId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(emailListData),
      });

      if (!response.ok) {
        throw new Error('Failed to update email list');
      }

      console.log('Email list updated successfully');
    } catch (error) {
      console.error('Update email list error:', error);
      throw error;
    }
  };

  const deleteEmailList = async (listId: string) => {
    try {
      const response = await fetch(`${API_URL}/ms-mail/api/v1/email-lists/${listId}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) {
        throw new Error('Failed to delete email list');
      }

      console.log('Email list deleted successfully');
    } catch (error) {
      console.error('Delete email list error:', error);
      throw error;
    }
  };



  return (
    <MailContext.Provider value={{ sendEmail, getTemplates, createTemplate, getEmailLists, createEmailList,getEmailListById,updateEmailList,deleteEmailList }}>
      {children}
    </MailContext.Provider>
  )
}

export const useMail = () => {
  const context = useContext(MailContext)
  if (context === undefined) {
    throw new Error('useMail must be used within a MailProvider')
  }
  return context
}
