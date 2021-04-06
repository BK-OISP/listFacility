const { OAuth2Client } = require("google-auth-library");
const Employee = require("../model/employee");
const jwtHelper = require("../helper/jwt");
const HttpError = require("../model/http-error");
const { genAccessToken } = require("../helper/jwt");

const client = new OAuth2Client(`${process.env.OAUTH_CLIENT_ID}`);

const googleLogin = async (req, res, next) => {
  const { tokenId } = req.body;
  try {
    const response = await client.verifyIdToken({
      idToken: tokenId,
      audience: `${process.env.OAUTH_CLIENT_ID}`,
    });

    const { family_name, given_name, picture, email } = response.getPayload();

    const existEmployee = await Employee.findOne({ email: email });
    if (existEmployee) {
      const userToken = jwtHelper.genAccessToken(existEmployee);
      const userRf = jwtHelper.genRefreshToken(existEmployee);
      const userData = {
        acToken: userToken,
        rfToken: userRf,
        fullName: existEmployee.fullName,
        userId: existEmployee._id,
        role: existEmployee.role,
      };
      existEmployee.acToken = userToken;
      existEmployee.rfToken = userRf;
      await existEmployee.save();
      return res.json({ user: userData });
    } else {
      const newEmployee = new Employee({
        email: email,
        fullName: `${family_name} ${given_name}`,
        picture: picture,
      });
      const saveEmployee = await newEmployee.save();

      const userToken = jwtHelper.genAccessToken(saveEmployee);
      const userRf = jwtHelper.genRefreshToken(saveEmployee);
      const newUserData = {
        acToken: userToken,
        rfToken: userRf,
        fullName: saveEmployee.fullName,
        userId: saveEmployee._id,
        role: saveEmployee.role,
      };
      saveEmployee.acToken = userToken;
      saveEmployee.rfToken = userRf;
      await saveEmployee.save();

      return res.json({ user: newUserData });
    }
  } catch (error) {
    return new HttpError("Can't log you in. Please try again!");
  }
};

const refreshToken = async (req, res, next) => {
  const { userData } = req.body;
  const { userId, acToken, rfToken } = userData;
  const employee = await Employee.findById(userId);
  const data = jwtHelper.verifyToken(rfToken, process.env.REFRESH_TOKEN_SECRET);

  if (
    employee.acToken === acToken &&
    employee.rfToken === rfToken &&
    data.userId === employee._id.toString()
  ) {
    const newAcToken = genAccessToken(employee);
    employee.acToken = newAcToken;
    await employee.save();
    return res.json({ acToken: newAcToken });
  }
  return next(new HttpError("Can't create acToken"));
};

module.exports = {
  googleLogin,
  refreshToken,
};
