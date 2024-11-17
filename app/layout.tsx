'use client'
import './globals.css'
import { AuthProvider, useAuth  } from "@/app/lib/auth"
import { MenuProvider, useMenu } from "@/app/lib/menuContext"
import AdminHeader from './header';
import LateralPanel from "./lateral-panel"
import { MailProvider } from './lib/mail';
import {Chatbot} from '@/components/layout/Chatbot';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <AuthProvider>
          <MenuProvider>
            <MailProvider>
            <Content>
              {children}
            </Content>
            </MailProvider>
          </MenuProvider>
        </AuthProvider>
      </body>
    </html>
  )
}

function Content({ children }: { children: React.ReactNode }) {
  const { user } = useAuth()
  const { toggleMenu, isMenuOpen } = useMenu()

  return (
    <>
    {
    user ? (
      <>
        <AdminHeader toggleMenu={toggleMenu}  user={user} />
        <LateralPanel isMenuOpen={isMenuOpen}  />
        <Chatbot />
      </>
    ) : (
      <div></div>
    )}
    {children}
  </>
  )
}