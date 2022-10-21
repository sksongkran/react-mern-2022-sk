export const myInterceptor1 = (req, res, next) => {
    // next();
    if (req.query.token === "1234") {
      next();
    } else {
      res.json({ result: "nok", message: "no token" });
    }
  };
  