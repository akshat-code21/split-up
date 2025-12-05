import axios from "axios";
const expensesApi = {
  getAllExpenses: async (userId: string) => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/expenses`,
        {
          headers: {
            "x-user-id": userId,
          },
        }
      );
      return res.data.data;
    } catch (error) {
      console.error(error);
      return [];
    }
  },
};
export default expensesApi;
