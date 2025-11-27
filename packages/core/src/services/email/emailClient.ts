import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config();

// TODO: variables from .env not working
const resend = new Resend(`re_EJJrfkSn_N2zEZDf7VK3fPj1p85V67Edc`);

export const sendEmailFromResend = async ({
	to,
	subject,
	html,
}: {
	to: string;
	subject: string;
	html: string;
}) => {
	const { data, error } = await resend.emails.send({
		from: "Akshat <noreply@emails.akshat21.tech>",
		to,
		subject,
		html,
	});
	if (error) {
		console.error({ error });
		return;
	}

	console.log({ data });
};
