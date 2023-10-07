import { Mutation, Resolver, Query } from '@nestjs/graphql';
import { AuthService } from './auth.service';
import { LoginInput, signupInput } from './inputs/auth.input';
import { Args } from '@nestjs/graphql';
import { JWTToken } from './dto/token.output';

@Resolver()
export class AuthResolver {
  constructor(private authService: AuthService) {}

  /******************************Queries************************** */
  @Query(() => JWTToken)
  async login(@Args('data') data: LoginInput) {
    try {
      const token = await this.authService.loginUser(data);
      return token;
    } catch (err) {
      console.log({ err });
    }
  }

  /******************************Mutations************************** */
  @Mutation(() => JWTToken)
  async signup(@Args('data') data: signupInput): Promise<JWTToken> {
    const token = await this.authService.createUser(data);

    return token;
  }
}
