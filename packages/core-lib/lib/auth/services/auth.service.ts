import { Injectable, UnauthorizedException } from '@nestjs/common';

// import * as bcrypt from 'bcrypt';

import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { AuthRepository } from '../repositories';
import { User } from '../schemas';
import { CredentialsDto, SignUpDto } from '../dtos';
import { USER_DEFAULT_AVATAR } from '../constants/user-default.constants';

@Injectable()
export class AuthService {
  constructor(
    protected readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, lastname, username, email, password } = signUpDto;
    // const salt = await bcrypt.genSalt();
    // const hash = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      lastname,
      username,
      email,
      password,
      avatar: USER_DEFAULT_AVATAR,
    });
    return this.repository.signUp(user);
  }

  async signIn(credentials: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentials;
    const user: User = await this.repository.findOneByEmail(email);
    if (user && user.password === password) {
      const payload = {
        _id: user._id,
        avatar: user.avatar,
        username: user.username,
      };
      const token = this.jwtService.sign(payload);
      return { token };
    }

    throw new UnauthorizedException();
  }

  findById(id: ObjectId): Promise<User> {
    return this.repository.findById(id);
  }
}
