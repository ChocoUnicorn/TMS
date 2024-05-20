const CustomError = require("../errors");
const { isTokenValid } = require("../utils");

const authenticateUser = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) {
    throw new CustomError.UnauthenticatedError(
      "Authentication Invalid - token missing"
    );
  }

  try {
    const { name, userId, email } = isTokenValid({ token });
    req.user = { name, userId, email };
    next();
  } catch (error) {
    throw new CustomError.UnauthenticatedError(`Authentication Invalid`);
  }
};

module.exports = {
  authenticateUser,
};
