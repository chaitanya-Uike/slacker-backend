const authService = require("../../services/auth");

async function register(request, reply) {
  await authService.register({ ...request.body });
  reply.status(201).send({ msg: "user created successfully" });
}

async function login(request, reply) {
  const { access_token, refresh_token } = await authService.login({
    ...request.body,
  });

  reply.status(200).send({ access_token, refresh_token });
}

async function refresh(request, reply) {
  const { refresh_token } = request.body;
  access_token = await authService.refresh(refresh_token);

  reply.status(200).send({ access_token });
}

module.exports = { register, login, refresh };
