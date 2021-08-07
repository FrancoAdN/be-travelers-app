import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { MongooseModule } from "@nestjs/mongoose";
import { PassportModule } from '@nestjs/passport';
import { AuthController } from './auth.controller';
import { AuthRepository } from './auth.repository';
import { AuthService } from './auth.service';
import { JwtStrategy } from './strategies';
import { User, UserSchema } from './user.schema';

@Module({
    imports: [
        MongooseModule.forFeature([
            { name: User.name, schema: UserSchema }
        ]),
        PassportModule.register({defaultStrategy: 'jwt'}),
        JwtModule.register({
            secret: 'topSecretKey',
            signOptions: {
                expiresIn: 3600
            }
        })
    ],
    controllers: [AuthController],
    providers: [AuthRepository, AuthService, JwtStrategy, PassportModule],
    exports: [AuthRepository, AuthService, JwtStrategy, PassportModule],
})
export class AuthModule {}
