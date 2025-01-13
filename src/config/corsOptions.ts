import { allowedOrigins } from './allowedOrigins';

export const corsOptions = {
  origin: (origin, callback) => {
    if (allowedOrigins.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  optionsSuccessStatus: 200,
};

// CORS options
// const corsOptions = {
//   origin: ['http://localhost:3000'], // Whitelist
//   methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Allowed methods
//   credentials: true, // Allow cookies and other credentials
// };
