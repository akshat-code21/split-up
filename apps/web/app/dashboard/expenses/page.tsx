import ExpensesPage from "@/components/pages/ExpensesPage"
import { headers } from "next/headers";
import axios from "axios";
import expensesApi from "@/apiClient/expenses"

export default async function Expenses() {
  const headerList = await headers();
  const userId = headerList.get('x-user-id') || "";
  const expenses = await expensesApi.getAllExpenses(userId as string)
  console.log(expenses);
  return <ExpensesPage userId={userId as string} expenses={expenses}/>
}