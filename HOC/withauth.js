import jwt from "jsonwebtoken";
import User from "../models/user";

const WithAuth = (gssp) => {
  return async (context) => {
    try {
      const { req } = context;
      if (!req.cookies.jwt) {
        return {
          redirect: {
            destination: "/login",
            statusCode: 302,
          },
        };
      }
      const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);

      const user = await User.findById(decode.user.id);

      context.user = JSON.stringify(user);
      return await gssp(context);
    } catch (error) {
      return {
        redirect: {
          destination: "/login",
          statusCode: 302,
        },
      };
    }
  };
};

export default WithAuth;
