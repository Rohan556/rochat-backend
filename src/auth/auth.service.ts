import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginInput, signupInput } from './inputs/auth.input';
import * as bcrypt from 'bcrypt';
import { AuthModel } from './auth.model';
import * as jwt from 'jsonwebtoken';
import { JWTToken, LoginOutput } from './dto/token.dto';
import { Users } from 'src/users/dto/users.dto';
import { ForbiddenError } from 'apollo-server-express';

@Injectable()
export class AuthService {
  constructor(private authModel: AuthModel) {}

  async createUser(data: signupInput): Promise<LoginOutput> {
    if (data.password.length < 6 && data.password !== data.confirmPassword) {
      throw new BadRequestException('Passwords do not match!');
    }

    let user = {} as Users;

    await bcrypt.hash(data.password, 10).then(async (hashing: string) => {
      data.password = hashing || 'Tukshdkljash';
      user = await this.authModel.createUser(data);
    });

    if (!user) {
      throw new HttpException('Username already taken', HttpStatus.FORBIDDEN);
    }

    const token = await this.generateJWTToken({
      username: data.username,
    });

    return {
      userId: user?.id,
      token,
    };
  }

  async loginUser(
    data: LoginInput,
  ): Promise<{ token: JWTToken; userId: number }> {
    try {
      const password = data.password;
      const hashedPassword = await this.authModel.getUserPassword(
        data.username,
      );

      if (!hashedPassword)
        throw new UnauthorizedException('Not authorized user');
      const isValidUser = await bcrypt.compareSync(
        password,
        hashedPassword.password,
      );

      if (!isValidUser) throw new UnauthorizedException('Not authorized user');
      const token = await this.generateJWTToken({ username: data.username });
      return {
        token,
        userId: hashedPassword.userId,
      };
    } catch (err) {
      console.log({ err });
    }
  }

  async generateJWTToken(payload: { username: String }): Promise<JWTToken> {
    const options: jwt.SignOptions = {
      expiresIn: '24h',
    };

    const token: string = await jwt.sign(payload, 'rochat', options);

    return {
      refreshToken: token,
      accessToken: token,
    };
  }
}
