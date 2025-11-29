import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

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
