import "dotenv/config"
export function resendTemplate({
  inviterName,
  groupName,
  inviteId,
}: {
  inviterName: string;
  groupName: string;
  inviteId: string;
}) {
  return `
    <div style="font-family: sans-serif;">
      <h2>${inviterName} invited you to join <strong>${groupName}</strong></h2>
      <p>Click the link below to accept:</p>
      <a href="${process.env.APP_URL}/invite/${inviteId}">
        Accept Invite
      </a>
    </div>
  `;
}
