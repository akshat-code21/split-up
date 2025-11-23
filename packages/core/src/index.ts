import { client } from "@repo/db";

export const checkForUser = async (userId: string): Promise<Boolean> => {
	const user = await client.user.findUnique({
		where: {
			id: userId,
		},
	});
	if (!user) {
		return false;
	}
	return true;
};


export type NotFoundError = {
	message?: string;
	success: boolean;
};