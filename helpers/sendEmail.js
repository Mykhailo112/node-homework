import sgMail from "@sendgrid/mail";
import "dotenv/config";

const { SENDGRID_API_KEY, CORPORATE_EMAIL } = process.env;

sgMail.setApiKey(SENDGRID_API_KEY);

const sendEmail = async (data) => {
  const email = { ...data, from: CORPORATE_EMAIL };
  await sgMail.send(email);

  return true;
};

export default sendEmail;
