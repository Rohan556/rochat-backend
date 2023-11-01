import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, signupInput } from './inputs/auth.input';
import { Args } from '@nestjs/graphql';
import { JWTToken, LoginOutput } from './dto/token.dto';
import { HttpException, HttpStatus } from '@nestjs/common';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /******************************Queries************************* */
  @Query(() => LoginOutput)
  async login(@Args('data') data: LoginInput) {
    try {
      console.log('here');

      const token = await this.authService.loginUser(data);
      console.log({ token });

      if (!token) throw new HttpException('Fobidden', HttpStatus.FORBIDDEN);

      return token;
    } catch (err) {
      console.log({ err });
    }
  }

  /******************************Mutations************************** */
  @Mutation(() => LoginOutput)
  async signup(@Args('data') data: signupInput): Promise<LoginOutput> {
    const token = await this.authService.createUser(data);

    return token;
  }
}
