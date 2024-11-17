'use client'
import * as React from "react"
import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import { Progress } from "@/components/ui/progress"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { useMenu } from "@/app/lib/menuContext";

export default function Profile() {
  const { isMenuOpen } = useMenu();
  const { user, getSelfUserDetails, updateSelfUserDetails } = useAuth();
  const router = useRouter();

  const [progress, setProgress] = useState(13);
  const [userData, setUserData] = useState({
    id: '',
    name: '',
    firstName: '',
    secondName: '',
    email: '',
    phone: '',
    role: '',
    category: '',
    group: ''
  });

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else {
      fetchUserData();
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

  const fetchUserData = async () => {
    try {
      const data = await getSelfUserDetails();
      if (data) {
        setUserData({
          id: data.id.toString(),
          name: data.name,
          firstName: data.firstName,
          secondName: data.secondName,
          email: data.email,
          phone: data.phone,
          role: data.role,
          category: data.category,
          group: data.group
        });
      }
    } catch (error) {
      console.error('Error fetching user data:', error);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = event.target;
    setUserData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    try {
      await updateSelfUserDetails({
        name: userData.name,
        password: '', // Assuming password is not updated here
        firstName: userData.firstName,
        secondName: userData.secondName,
        email: userData.email,
        phone: userData.phone,
        is_notification_email: false // Assuming this value or add it to the form
      });
      console.log('User details updated successfully');
    } catch (error) {
      console.error('Error updating user details:', error);
    }
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
    <div className="flex flex-col h-screen">
      <div className="flex flex-1 overflow-hidden pt-16">
        <main
          className={`flex-1 p-4 overflow-y-auto transition-all duration-300 ease-in-out ${isMenuOpen ? "ml-64" : "ml-0"
            }`}
        >
          <div className="container mx-auto">
            <form className="space-y-6 max-w-2xl mx-auto p-6 bg-card rounded-lg shadow" onSubmit={handleSubmit}>
              <h2 className="text-2xl font-bold mb-6">Formulario de Usuario</h2>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="id">ID</Label>
                  <Input id="id" value={userData.id} readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="usuario">Usuario</Label>
                  <Input id="usuario" value={userData.name} readOnly />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="primerApellido">Primer Apellido</Label>
                  <Input id="primerApellido" value={userData.firstName} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="segundoApellido">Segundo Apellido</Label>
                  <Input id="segundoApellido" value={userData.secondName} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" value={userData.email} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="telefono">Teléfono</Label>
                  <Input id="telefono" type="tel" value={userData.phone} onChange={handleInputChange} />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="rol">Rol</Label>
                  <Select value={userData.role} disabled>
                    <SelectTrigger id="rol">
                      <SelectValue placeholder="Seleccione un rol" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="ADMIN">ADMIN</SelectItem>
                      <SelectItem value="MANAGER">MANAGER</SelectItem>
                      <SelectItem value="STUDENT">STUDENT</SelectItem>
                      <SelectItem value="TEACHER">TEACHER</SelectItem>
                      <SelectItem value="GUEST">INVITADO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="categoria">Categoría</Label>
                  <Select value={userData.category} disabled>
                    <SelectTrigger id="categoria">
                      <SelectValue placeholder="Seleccione una categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="QUIMICA">QUIMICA</SelectItem>
                      <SelectItem value="FARMACIA">FARMACIA</SelectItem>
                      <SelectItem value="MATEMATICAS">MATEMATICAS</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="grupo">Grupo</Label>
                  <Select value={userData.group} disabled>
                    <SelectTrigger id="grupo">
                      <SelectValue placeholder="Seleccione un grupo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PRIMERO">PRIMERO</SelectItem>
                      <SelectItem value="SEGUNDO">SEGUNDO</SelectItem>
                      <SelectItem value="TERCERO">TERCERO</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <Button type="submit" className="w-full">Enviar</Button>
            </form>
          </div>
        </main>
      </div>
    </div>
  )
}