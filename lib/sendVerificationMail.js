import nodemailer from "nodemailer";

const SendVerificationMail = async (host, randomString, userId, userEmail) => {
  const transporter = nodemailer.createTransport({
    host: process.env.MAIL_HOST,
    port: Number(process.env.MAIL_PORT),
    secure: process.env.MAIL_SECURE == "true",
    auth: {
      user: process.env.MAIL_USER,
      pass: process.env.MAIL_PASS,
    },
  });

  const activationLink = `${host}/verify/${randomString}?id=${userId}`;

  const mailData = {
    from: '"Kris Heijnen" <noreply@krisheijnen.dev>',
    to: userEmail,
    subject: "Verify your email",
    text: `Thank you for signing up! Please activate your acount by pasting this url into your browser: \n\n${activationLink}`,
    html: `<div>
    <h1>Thank you for signing up!</h1>
    <p>Please activate your acount by clicking on the following URL:</p>
    <br />
    <a href="${activationLink}" target="_blank">${activationLink}</a>
  </div>`,
  };

  await new Promise((resolve, reject) => {
    transporter.sendMail(mailData, (err, info) => {
      if (err) {
        console.error(err);
        reject(err);
      } else {
        console.log(info);
        resolve(info);
      }
    });
  });
};
export default SendVerificationMail;
