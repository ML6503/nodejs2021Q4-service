import { LoggerModule } from 'nestjs-pino';
import pretty from 'pino-pretty';
import { config } from 'src/common/config';
import { ERROR, INFO } from 'src/common/constants';
// import { ERROR, INFO } from '../common/constants';
// import { config } from '../common/config';

export default LoggerModule.forRoot({
  pinoHttp: [
    pretty({
      colorize: true,
      ignore: 'hostname, pid',
      levelFirst: true,
      translateTime: 'UTC:dd/mm/yyyy, h:MM:ss TT Z',
    }),
    {
      level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',
      transport: {
        targets: [
          {
            level: ERROR,
            target: 'pino/file',
            options: {
              destination: './src/logs/error.log',
              mkdir: true,
              colorize: true,
              ignore: 'hostname, pid',
              translateTime: 'UTC:mm/mm/yyyy, h:MM:ss TT Z',
            },
          },
          {
            level: config.LOG_LEVEL || INFO,
            target: 'pino/file',
            options: {
              colorize: true,
              ignore: 'hostname, pid',
              translateTime: 'UTC:mm/mm/yyyy, h:MM:ss TT Z',
              destination: './src/logs/info.log',
              mkdir: true,
            },
          },
        ],
      },
    },
  ],
});

// export default LoggerModule.forRoot({
//   pinoHttp: [
//     {
//       level: process.env.NODE_ENV !== 'production' ? 'trace' : 'info',

//       transport:
//         // config.NODE_ENV !== 'production'
//         // ?
//         {
//           targets: [
//             {
//               level: ERROR,
//               target: 'pino/file',
//               options: {
//                 destination: './src/logs/error.log',
//                 mkdir: true,
//                 colorize: true,
//                 ignore: 'hostname, pid',
//                 translateTime: 'UTC:mm/mm/yyyy, h:MM:ss TT Z',
//               },
//             },
//             {
//               level: config.LOG_LEVEL || INFO,
//               target: 'pino/file',
//               options: {
//                 colorize: true,
//                 ignore: 'hostname, pid',
//                 // translateTime: 'yyyy-dd-mm, h:MM:ss TT',
//                 translateTime: 'UTC:mm/mm/yyyy, h:MM:ss TT Z',
//                 destination: './src/logs/info.log',
//                 mkdir: true,
//               },
//             },
//             {
//               target: 'pino-pretty',
//               colorize: true,
//               ignore: 'hostname, pid',
//               levelFirst: true,
//               translateTime: 'UTC:mm/mm/yyyy, h:MM:ss TT Z',
//             },
//           ],
//         }
//       // : undefined,
//     },
//   ],
// });
