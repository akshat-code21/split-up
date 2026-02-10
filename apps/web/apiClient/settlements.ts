import axios from "axios";

const settlementsApi = {
	getAllSettments: async (userId: string) => {
		try {
			const response = await axios.get(
				`${process.env.NEXT_PUBLIC_API_URL}/api/settlements`,
				{
					headers: {
						"x-user-id": userId,
					},
				}
			);
			return response.data.data;
		} catch (error) {
			console.error(error);
			return [];
		}
	},
};

export default settlementsApi;
