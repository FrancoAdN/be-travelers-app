import { Injectable, UnauthorizedException } from '@nestjs/common';
import { SignUpDto } from 'src/auth/dtos';
import * as bcrypt from 'bcrypt';
import { CredentialsDto } from 'src/auth/dtos/credentials.dto';
import { JwtService } from '@nestjs/jwt';
import { ObjectId } from 'mongodb';
import { AuthRepository } from './auth.repository';
import { User } from './user.schema';

@Injectable()
export class AuthService {
  constructor(
    protected readonly repository: AuthRepository,
    private readonly jwtService: JwtService,
  ) {}

  async signUp(signUpDto: SignUpDto): Promise<User> {
    const { name, lastname, username, email, password } = signUpDto;
    const salt = await bcrypt.genSalt();
    const hash = await bcrypt.hash(password, salt);
    const user = new User({
      name,
      lastname,
      username,
      email,
      password: hash,
    });
    return this.repository.signUp(user);
  }

  async signIn(credentials: CredentialsDto): Promise<{ token: string }> {
    const { email, password } = credentials;
    const user: User = await this.repository.findOneByEmail(email);
    if (user && user.password === password) {
      const payload = { userId: user._id };
      const token = this.jwtService.sign(payload);
      return { token };
    }

    throw new UnauthorizedException();
  }

  findById(id: ObjectId): Promise<User> {
    return this.repository.findById(id);
  }
}
