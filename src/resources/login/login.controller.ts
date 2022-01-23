import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import { SAULT_ROUND } from '../../common/constants';
import User from '../../entity/User';

export const getUserId = async (login: string, rawPassword: string) => {
  const password = bcrypt.hashSync(rawPassword, SAULT_ROUND);
  const singleUser = await getRepository(User).findOne({ login, password });
  if (singleUser) {
    return singleUser.id;
  }
  throw new Error('no user with such login or password');
};

// export const loginUser = async (
//   req: FastifyRequest<{ Body: ILogin }>,
//   reply: FastifyReply
// ): Promise<void> => {
//   // some code
//   const { login, password } = req.body;
//   const userId = await getUserId(login, password);
//   const token: ILogin = fastify.jwt.sign({ login, userId });
//   await reply.send(token);
// };
