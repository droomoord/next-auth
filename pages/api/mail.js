import nodemailer from "nodemailer";

export default async function handler(req, res) {
  try {
    let transporter = nodemailer.createTransport({
      host: process.env.MAIL_HOST,
      port: Number(process.env.MAIL_PORT),
      secure: true,
      auth: {
        user: process.env.MAIL_USER,
        pass: process.env.MAIL_PASS,
      },
    });

    let info = await transporter.sendMail({
      from: '"Kris Heijnen" <info@krisheijnen.dev>',
      to: "heijnenkris@gmail.com",
      subject: "Hello ✔",
      text: "Hello world?",
      html: "<b>Hello world?</b>",
    });

    console.log("Message sent: %s", info.messageId);

    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
    return res.send("check mail");
  } catch (error) {
    return res.send(error.message);
  }
}
