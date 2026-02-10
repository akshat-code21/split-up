import settlementsApi from "@/apiClient/settlements"
import SettlementsClientPage from "@/components/pages/SettlementsPage";
import { headers } from "next/headers";

export default async function SettlementsPage() {
  const headerList = await headers();
  const userId = headerList.get('x-user-id') || "";
  const settlements = await settlementsApi.getAllSettments(userId);
  console.log(settlements);
  return <SettlementsClientPage settlements={settlements} />
}
