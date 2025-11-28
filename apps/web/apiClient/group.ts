import axios from "axios";

const groupApi = {
    getGroupDetails: async (groupId: string, userId: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}`, {
            headers: {
                "x-user-id": userId
            }
        });
        return response.data.groupDetails;
    },
    getPendingMembers: async (groupId: string, userId: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}/invites`, {
            headers: {
                "x-user-id": userId
            }
        });
        return response.data.data;
    },
    getBalances: async (groupId: string, userId: string) => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/groups/${groupId}/balances`, {
            headers: {
                "x-user-id": userId
            }
        });
        return response.data.balances;
    },
}

export default groupApi;