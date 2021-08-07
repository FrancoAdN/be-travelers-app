import { Body, Controller, Post } from "@nestjs/common";
import { SignUpDto } from "src/auth/dtos";
import { CredentialsDto } from "src/auth/dtos/credentials.dto";
import { AuthService } from "./auth.service";
import { User } from "./user.schema";

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService ) {}

    @Post('signUp')
    signUp(@Body() credentials: SignUpDto): Promise<User> {
        return this.authService.signUp(credentials);
    }

    @Post('signIn')
    signIn(@Body() credentials: CredentialsDto): Promise<{token:string}> {
        return this.authService.signIn(credentials);
    }
    
}