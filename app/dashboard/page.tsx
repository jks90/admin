'use client'
import * as React from "react"
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '../lib/auth'
import ControlPanel from '@/app/dashboard/control-panel'
import { Progress } from "@/components/ui/progress"
import { useMenu } from "@/app/lib/menuContext";

export default function Dashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const { isMenuOpen,openMenu} = useMenu();

  const [progress, setProgress] = React.useState(13);

  useEffect(() => {
    if (!user) {
      const timer = setTimeout(() => setProgress(100), 500);
      return () => clearTimeout(timer);
    } else{
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

  return <ControlPanel isMenuOpen={isMenuOpen}/>
}