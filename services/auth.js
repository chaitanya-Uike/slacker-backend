const jwtService = require("./jwt");
const redisService = require("./redis");
const db = require("../models");
const ServerError = require("../errors");

class AuthService {
  register({ email, username, password }) {
    return db.User.create({ email, username, password });
  }

  async login({ email, password }) {
    const user = await db.User.findOne({ where: { email } });

    if (!user) throw new ServerError(401, "Invalid Credentials");

    const isPasswordMatching = user.comparePassword(password);

    if (!isPasswordMatching) throw new ServerError(401, "Invalid Credentials");

    const { access_token, refresh_token } = jwtService.generateToken(
      user.id,
      email
    );

    redisService.set(
      refresh_token,
      1,
      parseInt(process.env.REFRESH_TOKEN_EXPIRY, 10)
    );

    return { access_token, refresh_token };
  }

  async refresh(refresh_token) {
    const exists = await redisService.exists(refresh_token);

    if (exists !== 1) throw new ServerError(403, "Invalid Token");

    const decode = jwtService.verifyRefreshToken(refresh_token);

    if (!decode) throw new ServerError(403, "Invalid Token");

    const { access_token } = jwtService.generateToken(decode.id, decode.email);

    return access_token;
  }
}

module.exports = new AuthService();
