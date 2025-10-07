import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import { Response } from 'express';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    register(dto: RegisterDto): Promise<{
        message: string;
        user: import("../users/users.entity").User;
    }>;
    login(dto: LoginDto, res: Response): Promise<{
        message: string;
        payload: {
            sub: number;
            email: string;
            role: import("../common/enum/user-role.enum").UserRole;
        };
    }>;
    logout(res: Response): {
        message: string;
    };
}
