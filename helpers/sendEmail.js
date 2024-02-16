import nodemailer from "nodemailer";
import "dotenv/config";

const { META_PASSWORD, META_NET_FROM } = process.env;

const nodemailerConfig = {
  host: "smtp.meta.ua",
  port: 465, // 25, 465, 2525
  secure: true,
  auth: {
    user: META_NET_FROM,
    pass: META_PASSWORD,
  },
};

const tranport = nodemailer.createTransport(nodemailerConfig);

const sendEmail = (data) => {
  const email = { ...data, from: META_NET_FROM };
  return tranport.sendMail(email);
};

export default sendEmail;
