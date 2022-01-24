import { FastifyInstance, FastifyRequest, FastifyServerOptions } from 'fastify';
import { ILogin } from '../../common/interfaces';
import { getUserId } from './login.controller';

// import ajv from '../../auth/ajv';

// const postLoginOpts = {
//   schema: {
//     body: ajv?.getSchema('urn:schema:request:user')?.schema,
//     headers: ajv?.getSchema('urn:schema:request:UserAccessToken')?.schema,
//   },
//   handler: async (
//     _req: FastifyRequest<{ Body: ILogin }>,
//     reply: FastifyReply
//   ) => {
//     // const newLoginData = req.body;
//     // const newLogin = await getAuth(newLoginData);
//     // await reply.code(201).send(newLogin);

//     await reply.code(201);
//   },
// };
// const LoginSchema = {
//   type: 'object',
//   properties: {
//     token: { token: typeof jwtToken },
//   },
// };

const postLoginOpts = {
  schema: {
    body: {
      type: 'object',
      required: ['login', 'password'],
      properties: {
        login: { type: 'string' },
        password: { type: 'string' },
      },
    },
    // response: {
    //   201: LoginSchema,
    // },
  },
  // handler: loginUser,
};
/**
 * login Route use Fastify factory function for the standard fastify routes creation
 * with optional FastifyServerOptions and call back
 * @param fastify - FastifyInstance
 * @param _options - FastifyServerOptions
 * @param  done - callback function
 * @returns login route method post
 */
export const loginRoute = (
  fastify: FastifyInstance,
  _options: FastifyServerOptions,
  done: () => void
) => {
  /**
   * Fastify factory method that is used to add user
   * by path, specific Schema and handler
   * '/users' -  users path
   * postUserOpts - route options with UserPostSchema and handler
   */
  fastify.post(
    '/login',
    postLoginOpts,
    async (req: FastifyRequest<{ Body: ILogin }>, reply) => {
      const { login, password } = req.body;
      const userId = await getUserId(login, password);
      if (userId) {
        const token = fastify.jwt.sign({ login, userId });
        // const token = fastify.jwt.sign({ login, userId } , config.JWT_SECRET_KEY, { expiresIn: '120m'});
        await reply.code(200).type('application/json').send({ token });
      }
      await reply.code(403).send('incorect user login or password');
    }
  );

  done();
};
