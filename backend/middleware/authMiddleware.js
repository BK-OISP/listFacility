const jwtHelper = require("../helper/jwt");
const HttpError = require("../model/http-error");

const isAuth = (req, res, next) => {
  if (req.headers["authorization"]) {
    const accessToken = req.headers["authorization"].split(" ")[1];
    const data = jwtHelper.verifyToken(
      accessToken,
      process.env.ACCESS_TOKEN_SECRET
    );
    if (data) {
      req.userId = data.userId;
      req.role = data.role;
      next();
    } else {
      const err = new HttpError("Verify Failed", 403);
      return next(err);
    }
  } else return next(new HttpError("Invalid authorization", 403));
};

module.exports = {
  isAuth,
};
