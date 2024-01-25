import nodemailer from "nodemailer";
import "dotenv/config";

const { SENDGRID_API_KEY, CORPORATE_EMAIL } = process.env;

const nodemailerConfig = {
  host: "smtp.ukr.net",
  port: 465,
  secure: true,
  auth: {
    user: CORPORATE_EMAIL,
    pass: SENDGRID_API_KEY,
  },
};

const tranport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: CORPORATE_EMAIL };
  return tranport.sendMail(email);
};

export default sendEmail;
