import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ObjectId } from "mongodb";
import { ExtractJwt, Strategy } from "passport-jwt";
import { AuthService } from "src/auth/auth.service";
import { User } from "../user.schema";

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy){
    constructor(private readonly authService: AuthService ) {
        super({
            secretOrKey:'topSecretKey',
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
        });
    }

    async validate(payload: {userId: ObjectId}) {
        const user: User = await this.authService.findById(payload.userId);
        if (!user) throw new UnauthorizedException()
        return user;
    }
}