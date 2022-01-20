import { createConnection } from "typeorm";

createConnection()
.then(async (connection) => {
    // .then(() => {
  await connection.runMigrations();
  // tests out repo functionality
  // might be commented out
 console.log('connected');

  // start server
//   app.listen(8080, () => console.log('server running on port 8080'));
})
.catch((error) => console.log(error));