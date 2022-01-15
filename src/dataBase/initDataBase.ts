import { Connection, createConnection, getConnection } from 'typeorm';
import { customLogger } from '../customLogger';
// import ormConfig from "../ormconfig.json";
import ormConfig from '../../ormconfig';

export const initDataBase = async () => {
  let connection: Connection | undefined;
  try {
    connection = getConnection();
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      customLogger.error('ERROR: Database get connection failed!', error);
      throw new Error(
        `postgres database get connection error: ${error.message}`
      );
    }
  }
  try {
    if (connection) {
      if (!connection.isConnected) {
        await connection.connect();
      }
    } else {
      await createConnection(ormConfig);
    }
    customLogger.info(' Database connection was successful!');
  } catch (error: Error | unknown) {
    if (error instanceof Error) {
      customLogger.error('ERROR: Database connection failed!', error);
      throw new Error(`postgres database connection error: ${error.message}`);
    }
  }
};

// export const initDataBase = async (error, next?) => {
//   try {
//     await connectDataBase();
//     if (next) {
//       next();
//     }
//   } catch (e) {
//     onError();
//   }
// };
