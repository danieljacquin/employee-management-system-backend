// types/express.d.ts

declare module 'express-serve-static-core' {
  interface Request {
    validatedQuery?: any;
    validatedBody?: any;
    validatedParams?: any;
  }
}

export {};
