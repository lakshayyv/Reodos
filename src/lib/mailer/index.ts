import { VERFICATION_TEMPLATE } from "./template";
import nodemailer from "nodemailer";

const mailer = nodemailer.createTransport({
  service: "gmail",
  auth: {
    type: "OAuth2",
    user: process.env.MAILER_EMAIL,
    clientId: process.env.GOOGLE_MAIL_CLIENT_ID,
    clientSecret: process.env.GOOGLE_MAIL_CLIENT_SECRET,
    refreshToken: process.env.GOOGLE_MAIL_REFRESH_TOKEN,
  },
});

export async function sendMail(to: string, otp: string) {
  try {
    const htmlContent = VERFICATION_TEMPLATE.replace(/{{otp_code}}/g, otp);
    await mailer.sendMail({
      from: `Reodos AI <${process.env.MAILER_EMAIL}>`,
      to: to,
      subject: "Email Verification",
      html: htmlContent,
    });

    return { data: { message: "Sent", success: true } };
  } catch (error) {
    return { error: "Something went wrong" };
  }
}
