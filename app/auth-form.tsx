'use client'
import * as React from "react"
import { useState } from 'react'
import { useAuth } from "@/app/lib/auth"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Lock, LogIn, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation'
import { Progress } from "@/components/ui/progress"
import { useEffect } from 'react'
import { useMenu } from "@/app/lib/menuContext"

export default function AuthForm() {

  const { closeMenu, openMenu } = useMenu()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const { login } = useAuth()
  const router = useRouter();
  const [progress, setProgress] = React.useState(13)
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    closeMenu();
    console.log('isLoading', isLoading);
    let timer: ReturnType<typeof setTimeout> | null = null;
    if (isLoggedIn) {
      timer = setTimeout(() => setProgress(100), 500);
    }
    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [isLoggedIn]);

  useEffect(() => {
    // Lógica cuando la barra de progreso llega a 100
    if (progress === 100) {
      // Añadir un delay de 1 segundo antes de ejecutar la función
      const delayTimer: ReturnType<typeof setTimeout> = setTimeout(() => {
        handleProgressComplete();
      }, 1000);
      return () => clearTimeout(delayTimer);
    }
  }, [progress]);

  const handleProgressComplete = () => {
    router.push('/dashboard');
    openMenu();
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsLoading(true)
    setError('')

    try {
      await login(email, password)
      setIsLoggedIn(true)
    } catch (err) {
      console.error(err)
      setError('Login failed. Please check your credentials.')
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoggedIn) {
    return (
      <Card className="w-[300px]">
        <CardHeader>
          <CardTitle>Login Successful</CardTitle>
          <CardDescription>You have successfully logged in.</CardDescription>
        </CardHeader>
        <CardContent>
            <Progress value={progress} className="w-full" />
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <div className="absolute inset-0 -z-10"></div>
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-xl p-8">
          <div className="mb-8 text-center">
            <LogIn className="h-12 w-12 text-indigo-600 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-gray-800">Bienvenido</h2>
            <p className="text-gray-600 mt-2">Ingresa a tu cuenta</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Email
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Mail className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 ease-in-out"
                  placeholder="tu@email.com"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Contraseña
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <Lock className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="block w-full pl-10 pr-3 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-600 focus:border-transparent transition duration-200 ease-in-out"
                  placeholder="••••••••"
                />
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 text-red-600 bg-red-50 p-3 rounded-lg">
                <AlertCircle className="h-5 w-5" />
                <span className="text-sm">{error}</span>
              </div>
            )}

            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center">
                <input
                  type="checkbox"
                  className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded"
                />
                <span className="ml-2 text-gray-600">Recordarme</span>
              </label>
              <a
                href="#"
                className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 ease-in-out"
              >
                ¿Olvidaste tu contraseña?
              </a>
            </div>

            <button
              type="submit"
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 ease-in-out"
            >
              Iniciar Sesión
            </button>
          </form>

          <p className="mt-6 text-center text-sm text-gray-600">
            ¿No tienes una cuenta?{' '}
            <a
              href="#"
              className="font-medium text-indigo-600 hover:text-indigo-500 transition duration-200 ease-in-out"
            >
              Regístrate
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}