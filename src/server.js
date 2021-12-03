const path = require('path');
// const fastify = require('fastify')({ logger: true });
const fastify = require('fastify')();
const { PORT } = require('./common/config');

// const app = require('./app');

// app.listen(PORT, () =>
//   console.log(`App is running on http://localhost:${PORT}`)
// );
fastify.register(require('fastify-swagger'), {
  exposeRoute: true,
  routePrefix: '/doc',
  swagger: {
    info: {
      title: 'fastify REST Service',
      description: 'Testing the Fastify swagger API',
    },
  },
  mode: 'static',
  specification: {
    // path: '../doc/api.yaml',
    path: path.join(__dirname, '../doc/api.yaml'),
  },
  // baseDir: 'doc',
});

fastify.register(require('./resources/users/user.router'));

const start = async () => {
  try {
    await fastify.listen(PORT);
  } catch (error) {
    fastify.log.error(error);
    process.exit(1);
  }
};

start();
