import jwt from "jsonwebtoken";
import User from "../models/user";
import dbConnect from "../lib/dbConnect";

const WithAuth = (gssp) => {
  return async (context) => {
    const redirect = (destination) => {
      return {
        redirect: {
          destination,
          statusCode: 302,
        },
      };
    };
    try {
      const { req } = context;
      if (!req.cookies.jwt) return redirect("/login");
      const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
      const id = decode.user;
      await dbConnect();
      const user = await User.findById(id);
      if (!user) return redirect("/login");
      if (!user.verified.isVerified) return redirect("/verify");
      context.user = JSON.stringify(user);
      return await gssp(context);
    } catch (error) {
      return { redirect };
    }
  };
};

export default WithAuth;
