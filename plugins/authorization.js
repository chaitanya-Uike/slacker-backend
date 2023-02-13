const jwtService = require("../services/jwt");
const ServerError = require("../errors");

function verifyJWT(request, reply, done) {
  try {
    const authHeader = request.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) throw new ServerError(401, "No authorization token provided");

    const decode = jwtService.verifyAccessToken(token);

    if (!decode) throw new ServerError(401, "Authentication failed");

    request.user = { id: decode.id, email: decode.email };

    done();
  } catch (error) {
    done(error);
  }
}

module.exports = verifyJWT;
