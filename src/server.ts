import { createConnection } from 'typeorm';
import { config } from './common/config';
import server from './serverCreate';
// import Board from './entity/Board';
// import { boardsRoutes } from './resources/boards/board.router';
// import { tasksRoutes } from './resources/tasks/task.router';
// import { usersRoutes } from './resources/users/user.router';

createConnection()
  .catch((err: Error | unknown) =>
    server.log.error('Error in connection with Data Base: ', err)
  )
  .then(() => {
    // return getConnection().manager.find(Board);
  })
  // .then((boards) => {
  //   // server.log.info(`App has ${boards.length} boards`);
  // })
  .then(

  
    /**
     * starts Fastify server
     * that try server to connect if error then process.exit code = 1
     * and catch Error if any with server log error and process exit = 1
     *
     */
    () => {

    // server.register(usersRoutes);
  
    // server.register(boardsRoutes);
  
    // server.register(tasksRoutes);

      server.listen(
        config.PORT,
        '0.0.0.0',
        (err: Error | unknown, address: string) => {
          if (err) {
            if (err instanceof Error) {
              server.log.error(err);
              process.exit(1);
            }
          }
          server.log.info(
            `Server listening at port ${config.PORT} at ${address}`
          );
        }
      )
      })
  .catch((error: Error | unknown) => {
    if (error instanceof Error) {
      server.log.error(error);
      process.exit(1);
    }
  });
