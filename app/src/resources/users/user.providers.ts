// import { createConnection } from 'typeorm';
// import ormconfig from 'src/database/ormconfig';
// import { DATABASE_CONNECTION } from '../../common/constants';
// import User from './user.model';

// export const userProviders = [
//   {
//     provide: 'USER_REPOSITORY',
//     // useFactory: (connection: Connection): Repository<User> =>{
//     useFactory: async () => {
//       const connection = await createConnection(ormconfig);
//       connection.getRepository(User);
//     },
//     inject: [DATABASE_CONNECTION],
//   },
// ];
