import jwt from "jsonwebtoken";

const WithoutAuth = (gssp) => {
  return async (context) => {
    try {
      const { req } = context;
      if (req.cookies.jwt) {
        const decode = jwt.verify(req.cookies.jwt, process.env.JWT_SECRET);
        if (decode) {
          return {
            redirect: {
              destination: "/dashboard",
              statusCode: 302,
            },
          };
        }
      }
      return await gssp(context);
    } catch (error) {
      return await gssp(context);
    }
  };
};

export default WithoutAuth;
