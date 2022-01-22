import jwt from "jsonwebtoken";
import User from "../models/user";
import dbConnect from "../lib/dbConnect";

const WithoutAuth = (gssp) => {
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
      if (req.cookies.jwt) {
        const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        if (decode) {
          await dbConnect();
          const id = decode.user;
          const user = await User.findById(id);
          if (user) return redirect("/dashboard");
        }
      }
      return await gssp(context);
    } catch (error) {
      return await gssp(context);
    }
  };
};

export default WithoutAuth;
