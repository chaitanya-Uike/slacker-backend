module.exports = function (error, request, reply) {
  const code = error.code || 500;
  const msg = error.message || "Some error occurred, please try again";

  reply.status(code).send({ msg });
};
