import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput, signupInput } from './inputs/auth.input';
import * as bcrypt from 'bcrypt';
import { AuthModel } from './auth.model';
import * as jwt from 'jsonwebtoken';
import { JWTToken } from './dto/token.output';

@Injectable()
export class AuthService {
  constructor(private authModel: AuthModel) {}

  async createUser(data: signupInput): Promise<JWTToken> {
    if (data.password.length < 6 && data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match!');
    }

    await bcrypt.hash(data.password, 10).then((hashing: string) => {
      data.password = hashing || 'Tukshdkljash';
      this.authModel.createUser(data);
    });

    return await this.generateJWTToken({ username: data.username });
  }

  async loginUser(data: LoginInput): Promise<JWTToken> {
    try {
      const password = data.password;
      const hashedPassword = await this.authModel.getUserPassword(
        data.username,
      );
      console.log({ password, hashedPassword });

      if (!hashedPassword)
        throw new UnauthorizedException('Not authorized user');
      const isValidUser = await bcrypt.compareSync(password, hashedPassword);
      console.log({ isValidUser });

      if (!isValidUser) throw new UnauthorizedException('Not authorized user');
      return await this.generateJWTToken({ username: data.username });
    } catch (err) {
      console.log({ err });
    }
  }

  async generateJWTToken(payload: { username: String }): Promise<JWTToken> {
    const options: jwt.SignOptions = {
      expiresIn: '24h',
    };

    const token: string = await jwt.sign(payload, 'rochat', options);
    console.log({ token });

    return {
      refreshToken: token,
      accessToken: token,
    };
  }
}
