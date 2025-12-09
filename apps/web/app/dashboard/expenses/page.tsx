import ExpensesPage from "@/components/pages/ExpensesPage"
import { headers } from "next/headers";
import expensesApi from "@/apiClient/expenses"

export default async function Expenses() {
  const headerList = await headers();
  const userId = headerList.get('x-user-id') || "";
  const expensesData = await expensesApi.getAllExpenses(userId as string)
  return <ExpensesPage userId={userId as string} expensesData={expensesData}/>
}