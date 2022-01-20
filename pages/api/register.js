import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import cryptoRandomString from "crypto-random-string";
import dbConnect from "../../lib/dbConnect";
import sendVerificationMail from "../../lib/sendVerificationMail";

function validate(email, password) {
  if (!email || !password) return false;
  const emailRegex = /^.+@.+\..+/;
  if (!emailRegex.test(email)) return false;
  const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
  if (!passwordRegex.test(password)) return false;
  return true;
}

export default async function handler(req, res) {
  if (req.method != "POST")
    return res
      .status(405)
      .json({ error: { message: `${req.method} method not allowed` } });
  const password = req.body.password;
  const email = req.body.email.toLowerCase();
  if (!validate(email, password)) {
    return res.status(400).json({ error: { message: "bad request" } });
  }
  try {
    await dbConnect();
    const foundUser = await User.findOne({ email });
    if (foundUser)
      return res
        .status(403)
        .json({ error: { message: "This user already exists." } });
    async function hashPassword(password) {
      const saltRounds = 10;
      const hashedPassword = await new Promise((resolve, reject) => {
        bcrypt.hash(password, saltRounds, function (err, hash) {
          if (err) reject(err);
          resolve(hash);
        });
      });
      return hashedPassword;
    }
    const hashedPassword = await hashPassword(password);
    const randomString = cryptoRandomString({ length: 10, type: "url-safe" });
    const mailVerification = process.env.MAIL_VERIFICATION == "true";
    const newUser = await User({
      email,
      password: hashedPassword,
      verified: {
        isVerified: !mailVerification,
        hash: randomString,
      },
    });
    await newUser.save();

    if (mailVerification) {
      await sendVerificationMail(
        req.headers.host,
        randomString,
        newUser.id,
        newUser.email
      );
    }
    const token = jwt.sign({ user: newUser.id }, process.env.JWT_SECRET);
    res.status(200).json({ jwt: token });
  } catch (error) {
    console.log(error.message);
    res.status(400).send(error.message);
  }
}
