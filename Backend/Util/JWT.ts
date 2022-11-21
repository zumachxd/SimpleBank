import { NextFunction, Request, Response } from 'express';
import * as jwt from 'jsonwebtoken';

const secret: string = process.env.JWT_SECRET || 'jwt_secret';

const tokenGenerator = (email:string) => {
  const payload = { email };
  try {
    const token = jwt.sign(payload, secret);
    return token;
  } catch (err) {
    console.log(err);
  }
};

const tokenValidation = async (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.authorization) return res.status(401).json({ message: 'Token not found' });
  try {
    const decode = jwt.verify(req.headers.authorization as string, secret);
    req.body.decode = decode;
  } catch (error) {
    return res.status(401).json({ message: 'Token must be a valid token' });
  }

  next();
};

export default { tokenGenerator, tokenValidation };