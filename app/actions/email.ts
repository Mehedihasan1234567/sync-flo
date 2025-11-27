"use server";

import { Resend } from "resend";

const resend = new Resend(process.env.RESEND_API_KEY);

export const sendFeedbackEmail = async (
  toEmail: string,
  clientName: string,
  message: string,
  projectTitle: string
) => {
  if (!process.env.RESEND_API_KEY) {
    console.error("RESEND_API_KEY is missing");
    return { success: false, error: "Server configuration error" };
  }

  try {
    const { data, error } = await resend.emails.send({
      from: "onboarding@resend.dev",
      to: toEmail,
      subject: `New Feedback from ${clientName}`,
      html: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto;">
          <h2>New Feedback Received!</h2>
          <p><strong>Project:</strong> ${projectTitle}</p>
          <p><strong>Client:</strong> ${clientName}</p>
          <div style="background-color: #f4f4f5; padding: 16px; border-radius: 8px; margin: 20px 0;">
            <p style="margin: 0;">${message}</p>
          </div>
          <p style="color: #666; font-size: 14px;">
            Log in to your dashboard to view more details.
          </p>
        </div>
      `,
    });

    if (error) {
      console.error("Resend error:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Failed to send email:", error);
    return { success: false, error: "Failed to send email" };
  }
};
