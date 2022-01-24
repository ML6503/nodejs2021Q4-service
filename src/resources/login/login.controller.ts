import { getRepository } from 'typeorm';
import bcrypt from 'bcryptjs';
import User from '../../entity/User';

export const getUserId = async (login: string, rawPassword: string) => {
  const singleUser = await getRepository(User).findOne({ login });

  if (!singleUser) {
    throw new Error('no user with such login');
  }
  const match = await bcrypt.compare(rawPassword, singleUser.password);

  if (!match) {
    throw new Error('wrong password');
  }
  return singleUser.id;
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
