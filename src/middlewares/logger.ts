import { Request, Response, NextFunction } from 'express';

export const loggerMiddleware = function (
  req: Request,
  res: Response,
  next: NextFunction,
) {
  const payload = {
    method: req.method,
    url: req.url,
    body: req.body,
    query: req.query,
    params: req.params,
    headers: req.headers,
  };
  console.log('--------------------------------');
  console.log('LOGGED', payload);
  console.log('--------------------------------');
  next();
};
