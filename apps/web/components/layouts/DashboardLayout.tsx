"use client"
import type React from "react"
import { Sidebar } from "@/components/dashboard/Sidebar"
import { Topbar } from "@/components/dashboard/TopBar"
import { useState } from "react";

interface DashboardLayoutClientProps {
  userImageUrl: string;
  userName: string;
  userEmail: string;
  children: React.ReactNode;
}

export function DashboardLayoutClient({
  userImageUrl,
  userName,
  userEmail,
  children
}: DashboardLayoutClientProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  
  return (
    <div className="flex h-screen bg-background overflow-hidden">
      <Sidebar 
        userImageUrl={userImageUrl}
        userName={userName}
        userEmail={userEmail}
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />
      <div className="flex-1 flex flex-col md:pl-64 min-w-0 transition-all duration-300 ease-in-out">
        <Topbar userName={userName} onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-10 scroll-smooth">
          <div className="mx-auto max-w-7xl animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
        </main>
      </div>
    </div>
  );
}