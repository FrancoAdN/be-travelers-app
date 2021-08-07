import { IsString, MinLength, MaxLength, Matches, IsEmail } from "class-validator";

export class SignUpDto {

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    name: string;

    @IsString()
    @MinLength(1)
    @MaxLength(20)
    lastname: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    username: string;

    @IsString()
    @MinLength(4)
    @MaxLength(20)
    @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {message: 'password too weak'})
    password: string;

    @IsString()
    @IsEmail()
    email: string;
}