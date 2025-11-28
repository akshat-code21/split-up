import type React from "react"
import { headers } from "next/headers";
import { DashboardLayoutClient } from "@/components/layouts/DashboardLayout";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const headerList = await headers();
  const userImageUrl = headerList.get('x-user-image') || "";
  const userName = headerList.get('x-user-name') || "";
  const userEmail = headerList.get('x-user-email') || "";

  return (
    <DashboardLayoutClient
      userImageUrl={userImageUrl}
      userName={userName}
      userEmail={userEmail}
    >
      {children}
    </DashboardLayoutClient>
  );
}