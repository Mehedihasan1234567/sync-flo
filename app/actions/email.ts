"use server";

import { Resend } from "resend";
import WelcomeEmail from "@/emails/WelcomeEmail";
import ClientUpdateEmail from "@/emails/ClientUpdateEmail";
import FeedbackEmail from "@/components/emails/FeedbackEmail";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function sendWelcomeEmail(email: string, name: string) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SyncFlow <onboarding@resend.dev>",
      to: [email],
      subject: "Welcome to SyncFlow! 🚀",
      react: WelcomeEmail({ name }),
    });

    if (error) {
      console.error("Error sending welcome email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception sending welcome email:", error);
    return { success: false, error };
  }
}


export async function sendClientUpdateEmail(
  clientEmail: string,
  clientName: string,
  projectName: string,
  progress: number,
  currentTask: string,
  projectSlug: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SyncFlow <updates@resend.dev>",
      to: [clientEmail],
      subject: `Project Update: ${projectName} is ${progress}% Complete`,
      react: ClientUpdateEmail({
        clientName,
        projectName,
        progress,
        currentTask,
        projectSlug,
      }),
    });

    if (error) {
      console.error("Error sending client update email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception sending client update email:", error);
    return { success: false, error };
  }
}

export async function sendFeedbackEmail(
  toEmail: string,
  clientName: string,
  feedback: string,
  projectName: string
) {
  try {
    const { data, error } = await resend.emails.send({
      from: "SyncFlow <notifications@resend.dev>",
      to: [toEmail],
      subject: `New Feedback from ${clientName}`,
      react: FeedbackEmail({
        clientName,
        projectName,
        feedback,
      }),
    });

    if (error) {
      console.error("Error sending feedback email:", error);
      return { success: false, error };
    }

    return { success: true, data };
  } catch (error) {
    console.error("Exception sending feedback email:", error);
    return { success: false, error };
  }
}
