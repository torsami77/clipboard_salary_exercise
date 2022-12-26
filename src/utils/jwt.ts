import { config } from 'dotenv';
import jwt, { JwtPayload } from 'jsonwebtoken';
import 'dotenv/config';

config();

// I minimised the setup to ensure only docker compose up is required to run this app
//const secretKey = process.env.SECRET;
const secretKey = 'SECRET';

export default class Jwt {

  static async generateToken(payload:object, secret:any = secretKey) {
    const token = await jwt.sign(payload, secret, { expiresIn: '1d' });
    return token;
  }

  static async verifyToken(token:string, secret:any = secretKey) {
    const decoded = await jwt.verify(token, secret);
    return decoded;
  }
}