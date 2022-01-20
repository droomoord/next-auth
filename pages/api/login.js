import User from "../../models/user";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dbConnect from "../../lib/dbConnect";

function validate(email, password) {
  if (!email || !password) return false;
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
    const user = await User.findOne({ email }).select("password");
    if (!user) return res.status(401).send("wrong credentials");

    async function compare(password, storedPassword) {
      const match = await new Promise((resolve, reject) => {
        bcrypt.compare(password, storedPassword, function (err, result) {
          if (err) reject(err);
          resolve(result);
        });
      });
      return match;
    }
    const match = await compare(password, user.password);
    if (match) {
      const token = jwt.sign({ user: user.id }, process.env.JWT_SECRET);
      res.status(200).json({ jwt: token });
    } else res.status(401).send("unauthorized");
  } catch (error) {
    console.log(error);
    res.status(401).send("wrong credentials");
  }
}
